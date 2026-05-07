import { useEffect, useState } from "react";

const TOOL_ICONS = {
  calculator: "🧮",
  search: "🔍",
  get_weather: "🌤️",
};

function TypingText({ text }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-1 h-4 ml-0.5 bg-gray-400 animate-pulse rounded-sm align-middle" />
      )}
    </span>
  );
}

export default function MessageBubble({ role, content, tool, animate }) {
  const isUser = role === "user";

  return (
    <div className={`flex items-end gap-3 mb-5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
          isUser
            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
            : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col gap-1 max-w-[72%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
            isUser
              ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm"
              : "bg-gray-800 text-gray-100 border border-gray-700/50 rounded-bl-sm"
          }`}
        >
          {animate && !isUser ? <TypingText text={content} /> : content}
        </div>

        {/* Tool badge */}
        {tool && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800/80 border border-gray-700/60 text-xs text-gray-400">
            <span>{TOOL_ICONS[tool] || "🔧"}</span>
            <span className="font-medium text-gray-300">{tool}</span>
          </div>
        )}
      </div>
    </div>
  );
}