import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChatBox from "./components/ChatBox";
import InputBar from "./components/InputBar";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer || "No response received.",
          tool: data.tool_used,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${err.message || "Could not connect to server."}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      await fetch("http://localhost:8000/clear", { method: "POST" });
    } catch (err) {
      console.error(err);
    }
    setMessages([]);
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-gray-950 text-white font-sans overflow-hidden">
      <Navbar onClear={clearChat} messageCount={messages.length} />
      <ChatBox messages={messages} loading={loading} />
      <InputBar onSend={sendMessage} loading={loading} />
    </div>
  );
}