MAX_HISTORY = 20

class Memory:
    def __init__(self):
        self.history = []

    def add(self, role: str, content: str):
        """Add a simple role/content message."""
        self.history.append({"role": role, "content": content})
        self._trim()

    def raw_append(self, message: dict):
        """Append a fully-formed message dict (e.g. with tool_calls or tool_call_id)."""
        self.history.append(message)
        self._trim()

    def get(self):
        return list(self.history)

    def clear(self):
        self.history = []

    def _trim(self):
        """Trim history to MAX_HISTORY, but never split tool-call/tool-result pairs."""
        if len(self.history) <= MAX_HISTORY:
            return
        # Trim from the front, stopping only at a clean 'user' message boundary
        self.history = self.history[-MAX_HISTORY:]
        # If the first message is a tool or assistant-with-tool_calls, drop it
        # to avoid orphaned tool messages that cause API errors
        while self.history and self.history[0].get("role") in ("tool",) or (
            self.history
            and self.history[0].get("role") == "assistant"
            and self.history[0].get("tool_calls")
        ):
            self.history.pop(0)