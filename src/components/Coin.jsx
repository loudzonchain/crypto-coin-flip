// Coin.jsx - The 3D animated coin with heads/tails faces
// Uses CSS animations for a realistic flip effect

export default function Coin({ isFlipping, result }) {
  // Pick the right animation class based on the result
  let animationClass = ''
  if (isFlipping && result === 'heads') animationClass = 'coin-flip-heads'
  if (isFlipping && result === 'tails') animationClass = 'coin-flip-tails'

  return (
    // Outer container adds 3D perspective (depth effect)
    <div className="coin-perspective">
      {/* Inner container holds both faces and does the flipping */}
      <div
        className={`coin-3d relative w-40 h-40 sm:w-48 sm:h-48 ${animationClass}`}
      >
        {/* HEADS face - front of the coin */}
        <div className="coin-face absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30 border-4 border-yellow-300">
          <span className="text-6xl sm:text-7xl">🪙</span>
        </div>

        {/* TAILS face - back of the coin (rotated 180deg in CSS) */}
        <div className="coin-face coin-face-tails absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30 border-4 border-amber-300">
          <span className="text-6xl sm:text-7xl">💰</span>
        </div>
      </div>
    </div>
  )
}
