import json
from groq import Groq
from config import GROQ_API_KEY
from tools import calculator, search, get_weather
from tool_registry import tools
from memory import Memory

client = Groq(api_key=GROQ_API_KEY)

tool_map = {
    "calculator": calculator,
    "search": search,
    "get_weather": get_weather,
}

class Agent:
    def __init__(self):
        self.memory = Memory()

        self.system_prompt = {
            "role": "system",
            "content": (
                "You are a helpful AI agent with access to real-time tools. Follow these rules strictly:\n"
                "1. WEATHER: Whenever the user asks about weather, temperature, or climate in ANY city or location, "
                "you MUST call the get_weather tool. Never guess or answer from memory — always use the tool.\n"
                "2. SEARCH: For questions about current events, news, live data, or facts outside your training, "
                "always call the search tool.\n"
                "3. MATH: For any arithmetic or calculation, use the calculator tool.\n"
                "4. After receiving a tool result, give a concise, direct answer (2–5 sentences) based solely on that result. "
                "Do NOT add disclaimers like 'I don't have real-time access' — you do, via the tools."
            ),
        }

    def chat(self, user_message: str):
        self.memory.add("user", user_message)

        messages = [self.system_prompt] + self.memory.get()

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            tools=tools,
            tool_choice="auto",
        )

        msg = response.choices[0].message

        if msg.tool_calls:
            tool_call = msg.tool_calls[0]
            name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)

            # Guard against LLM hallucinating an unregistered tool name
            if name not in tool_map:
                answer = f"I tried to use an unknown tool '{name}'. Please try rephrasing."
                self.memory.add("assistant", answer)
                return {"answer": answer, "tool_used": None}

            # Execute the tool
            result = tool_map[name](**args)

            # Append assistant's tool-call message (must include tool_calls field)
            assistant_msg = {
                "role": "assistant",
                "content": msg.content or "",
                "tool_calls": [
                    {
                        "id": tool_call.id,
                        "type": "function",
                        "function": {
                            "name": name,
                            "arguments": tool_call.function.arguments,
                        },
                    }
                ],
            }
            self.memory.raw_append(assistant_msg)

            # Append the tool result with matching tool_call_id
            tool_result_msg = {
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": str(result),
            }
            self.memory.raw_append(tool_result_msg)

            # Second call to get the final answer
            final = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[self.system_prompt] + self.memory.get(),
            )

            # Guard against None content from the model
            answer = final.choices[0].message.content or "I couldn't generate a response."
            tool_used = name
        else:
            # Guard against None content from the model
            answer = msg.content or "I couldn't generate a response."
            tool_used = None

        self.memory.add("assistant", answer)

        return {"answer": answer, "tool_used": tool_used}

    def clear(self):
        self.memory.clear()