// Window.jsx - Dark macOS-style window with gold/amber border glow

export default function Window({ title, onClose, children, className = '' }) {
  return (
    <div
      className={`bg-[#1a1a1a] rounded-xl shadow-[0_8px_40px_rgba(245,158,11,0.08)] border border-amber-500/20 overflow-hidden ${className}`}
    >
      {/* Title bar - dark with traffic light dots and gold title */}
      <div className="flex items-center px-4 py-3 bg-[#141414] border-b border-amber-500/15">
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all cursor-pointer"
            aria-label="Close"
          />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Window title - gold/amber text */}
        <span className="flex-1 text-center text-sm font-bold text-amber-500 select-none">
          {title}
        </span>

        {/* Spacer to keep title centered */}
        <div className="w-[52px]" />
      </div>

      {/* Window content */}
      <div>{children}</div>
    </div>
  )
}
