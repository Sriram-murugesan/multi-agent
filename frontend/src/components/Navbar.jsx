export default function Navbar({ onClear, messageCount }) {
  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-base shadow-md">
          🤖
        </div>
        <div>
          <h1 className="text-sm font-semibold text-white">AI Agent</h1>
          <p className="text-xs text-gray-500">Calculator · Search · Weather</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {messageCount > 0 && (
          <span className="text-xs text-gray-500">{messageCount} messages</span>
        )}
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 border border-gray-700 hover:border-red-500/50 hover:text-red-400 hover:bg-red-900/10 transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
          Clear
        </button>
      </div>
    </header>
  );
}