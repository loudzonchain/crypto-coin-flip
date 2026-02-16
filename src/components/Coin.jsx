// Coin.jsx - Premium gold coin with pulse glow, light trails, and landing burst

export default function Coin({ isFlipping, result, justLanded }) {
  let animationClass = ''
  if (isFlipping && result === 'heads') animationClass = 'coin-flip-heads'
  if (isFlipping && result === 'tails') animationClass = 'coin-flip-tails'

  // Idle: shimmer shine + pulsing glow. During flip: light trails (coin-flipping)
  const shimmerClass = !isFlipping ? 'coin-idle-shine' : ''
  const pulseClass = !isFlipping && !justLanded ? 'coin-pulse-glow' : ''

  return (
    <div className={`coin-perspective relative ${isFlipping ? 'coin-flipping' : ''} ${pulseClass}`}>
      {/* Golden burst flash when the coin lands */}
      {justLanded && <div className="landing-burst" />}

      <div
        className={`coin-3d relative w-40 h-40 sm:w-48 sm:h-48 ${animationClass}`}
      >
        {/* HEADS face */}
        <div className={`coin-face absolute inset-0 flex items-center justify-center rounded-full bg-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.35),0_4px_16px_rgba(0,0,0,0.3)] border-[3px] border-amber-300 ${shimmerClass}`}>
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-7xl leading-none">🪙</span>
            <span className="text-[10px] font-bold text-amber-800 mt-1 uppercase tracking-widest">
              Heads
            </span>
          </div>
        </div>

        {/* TAILS face */}
        <div className={`coin-face coin-face-tails absolute inset-0 flex items-center justify-center rounded-full bg-orange-400 shadow-[0_0_40px_rgba(245,158,11,0.35),0_4px_16px_rgba(0,0,0,0.3)] border-[3px] border-orange-300 ${shimmerClass}`}>
          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-7xl leading-none">💰</span>
            <span className="text-[10px] font-bold text-orange-800 mt-1 uppercase tracking-widest">
              Tails
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
