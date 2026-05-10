tools = [
    {
        "type": "function",
        "function": {
            "name": "calculator",
            "description": "Evaluate a mathematical expression and return the numeric result. Use this for any arithmetic, algebra, or numeric computation.",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "A valid mathematical expression, e.g. '2 + 3 * 4' or '(100 / 5) ** 2'"
                    }
                },
                "required": ["expression"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search",
            "description": "Search the internet for real-time or up-to-date information. Use this for news, current events, facts, or any question that requires information beyond your training data.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The search query to look up on the internet."
                    }
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Fetch the LIVE, real-time current weather for a given city. You MUST call this tool whenever the user asks about weather, temperature, or climate conditions in any location. Never answer weather questions from memory — always call this tool.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "The city name to fetch weather for, e.g. 'Coimbatore' or 'London'."
                    }
                },
                "required": ["city"]
            }
        }
    },
]