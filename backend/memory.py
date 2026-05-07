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
        if len(self.history) > MAX_HISTORY:
            self.history = self.history[-MAX_HISTORY:]