// ResultDisplay.jsx - Shows WIN or LOSE after a flip

export default function ResultDisplay({ result, playerChoice }) {
  // Don't show anything if there's no result yet
  if (!result) return null

  const isWin = result === playerChoice

  return (
    <div className="text-center">
      {/* Big WIN or LOSE text */}
      <p
        className={`text-4xl sm:text-5xl font-black tracking-wider ${
          isWin ? 'text-green-400 win-glow' : 'text-red-400'
        }`}
      >
        {isWin ? '🎉 WIN!' : '😤 LOSE'}
      </p>

      {/* Show what the coin landed on */}
      <p className="mt-2 text-sm sm:text-base text-purple-200/60">
        Coin landed on{' '}
        <span className="font-semibold text-white capitalize">{result}</span>
      </p>
    </div>
  )
}
