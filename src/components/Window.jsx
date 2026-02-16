// Window.jsx - Frosted glass macOS window with animated gold glow border

export default function Window({ title, onClose, children, className = '' }) {
  return (
    <div
      className={`rounded-xl border border-amber-500/25 overflow-hidden backdrop-blur-xl window-glow ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(26, 26, 26, 0.92) 0%, rgba(17, 17, 17, 0.95) 100%)',
      }}
    >
      {/* Title bar - dark gradient with traffic light dots and gold title */}
      <div
        className="flex items-center px-4 py-3 border-b border-amber-500/15"
        style={{
          background: 'linear-gradient(180deg, rgba(22, 22, 22, 0.95) 0%, rgba(14, 14, 14, 0.98) 100%)',
        }}
      >
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all cursor-pointer shadow-[0_0_4px_rgba(255,95,87,0.4)]"
            aria-label="Close"
          />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_4px_rgba(254,188,46,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_4px_rgba(40,200,64,0.4)]" />
        </div>

        {/* Window title - gold text with subtle glow */}
        <span className="flex-1 text-center text-sm font-bold text-amber-500 select-none glow-amber">
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
