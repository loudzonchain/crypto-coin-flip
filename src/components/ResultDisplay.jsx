// ResultDisplay.jsx - WIN = starburst glow + gold shimmer, LOSE = shake + red shimmer

export default function ResultDisplay({ result, playerChoice, balanceChange }) {
  if (!result) return null

  const isWin = result === playerChoice

  return (
    <div className={`text-center result-pop ${isWin ? 'win-starburst' : 'lose-shake'}`}>
      <p
        className={`text-3xl sm:text-4xl font-black tracking-wide ${
          isWin ? 'text-amber-500 win-shimmer' : 'text-red-500 lose-shimmer'
        }`}
      >
        {isWin ? 'WIN!' : 'LOSE'}
      </p>
      <p className="mt-1 text-xs sm:text-sm text-gray-500">
        Coin landed on{' '}
        <span className="font-semibold text-gray-300 capitalize">{result}</span>
        {balanceChange != null && (
          <span className={`ml-2 font-bold ${isWin ? 'text-amber-500' : 'text-red-400'}`}>
            {isWin ? `+${balanceChange}` : `${balanceChange}`}
          </span>
        )}
      </p>
    </div>
  )
}
