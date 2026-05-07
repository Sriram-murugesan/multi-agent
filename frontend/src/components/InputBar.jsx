import { useState, useRef, useEffect } from "react";

export default function InputBar({ onSend, loading }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 pb-5 pt-3 border-t border-gray-800 bg-gray-950">
      <div className="max-w-3xl mx-auto">
        <div
          className={`flex items-end gap-3 rounded-2xl border px-4 py-3 shadow-lg transition-all duration-200 ${
            loading
              ? "border-gray-700 bg-gray-900/60"
              : "border-gray-700 bg-gray-900 focus-within:border-indigo-500/70 focus-within:shadow-indigo-900/20"
          }`}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none outline-none leading-relaxed max-h-40"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={loading ? "Thinking..." : "Message AI Agent... (Enter to send)"}
            disabled={loading}
          />

          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
              loading || !input.trim()
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md hover:from-blue-400 hover:to-indigo-500 hover:shadow-indigo-700/40 active:scale-95"
            }`}
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-gray-600 mt-2">
          Shift+Enter for new line · Enter to send
        </p>
      </div>
    </div>
  );
}