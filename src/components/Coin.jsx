// Coin.jsx - Gold coin with glowing amber shadow on dark background

export default function Coin({ isFlipping, result }) {
  let animationClass = ''
  if (isFlipping && result === 'heads') animationClass = 'coin-flip-heads'
  if (isFlipping && result === 'tails') animationClass = 'coin-flip-tails'

  const shimmerClass = !isFlipping ? 'coin-idle-shine' : ''

  return (
    <div className={`coin-perspective ${isFlipping ? 'coin-flipping' : ''}`}>
      <div
        className={`coin-3d relative w-36 h-36 sm:w-44 sm:h-44 ${animationClass}`}
      >
        {/* HEADS face - glowing amber shadow */}
        <div className={`coin-face absolute inset-0 flex items-center justify-center rounded-full bg-amber-400 shadow-[0_0_32px_rgba(245,158,11,0.4),0_4px_16px_rgba(0,0,0,0.3)] border-[3px] border-amber-300 ${shimmerClass}`}>
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-6xl leading-none">🪙</span>
            <span className="text-[10px] font-bold text-amber-800 mt-1 uppercase tracking-widest">
              Heads
            </span>
          </div>
        </div>

        {/* TAILS face - glowing amber shadow */}
        <div className={`coin-face coin-face-tails absolute inset-0 flex items-center justify-center rounded-full bg-orange-400 shadow-[0_0_32px_rgba(245,158,11,0.4),0_4px_16px_rgba(0,0,0,0.3)] border-[3px] border-orange-300 ${shimmerClass}`}>
          <div className="flex flex-col items-center">
            <span className="text-5xl sm:text-6xl leading-none">💰</span>
            <span className="text-[10px] font-bold text-orange-800 mt-1 uppercase tracking-widest">
              Tails
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
