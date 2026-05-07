import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatBox({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scroll-smooth">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-center select-none">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg">
            🤖
          </div>
          <p className="text-gray-400 text-sm max-w-xs">
            Ask me anything — I can calculate, search the web, and check the weather.
          </p>
        </div>
      )}

      {messages.map((msg, i) => (
        <MessageBubble
          key={i}
          role={msg.role}
          content={msg.content}
          tool={msg.tool}
          animate={i === messages.length - 1 && msg.role === "assistant"}
        />
      ))}

      {/* Thinking indicator */}
      {loading && (
        <div className="flex items-end gap-3 mb-5">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
            AI
          </div>
          <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-gray-800 border border-gray-700/50 shadow-md">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}