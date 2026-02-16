// ScoreBoard.jsx - Dark themed stats panel with gold/amber accents

import useAnimatedNumber from '../hooks/useAnimatedNumber'

export default function ScoreBoard({
  wins,
  totalFlips,
  balance,
  streak,
  bestStreak,
  onReset,
}) {
  const losses = totalFlips - wins
  const winRate = totalFlips > 0 ? Math.round((wins / totalFlips) * 100) : null

  const displayFlips = useAnimatedNumber(totalFlips)
  const displayWins = useAnimatedNumber(wins)
  const displayLosses = useAnimatedNumber(losses)
  const displayBalance = useAnimatedNumber(balance)

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Balance and streak row */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
          <span className="text-sm">🪙</span>
          <span className="text-base font-bold text-amber-500">
            {displayBalance}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-gray-400">
            Streak:{' '}
            <span className="font-bold text-amber-500">{streak}</span>
          </span>
          <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-gray-400">
            Best:{' '}
            <span className="font-bold text-amber-400">{bestStreak}</span>
          </span>
        </div>
      </div>

      {/* Stats grid - dark cards with gold/amber numbers */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-[#222] rounded-lg p-2 sm:p-3 text-center border border-white/5">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Flips
          </p>
          <p className="text-lg sm:text-2xl font-bold text-amber-500">
            {displayFlips}
          </p>
        </div>

        <div className="bg-[#222] rounded-lg p-2 sm:p-3 text-center border border-white/5">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Wins
          </p>
          <p className="text-lg sm:text-2xl font-bold text-amber-500">
            {displayWins}
          </p>
        </div>

        <div className="bg-[#222] rounded-lg p-2 sm:p-3 text-center border border-white/5">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Losses
          </p>
          <p className="text-lg sm:text-2xl font-bold text-red-400">
            {displayLosses}
          </p>
        </div>

        <div className="bg-[#222] rounded-lg p-2 sm:p-3 text-center border border-white/5">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Win %
          </p>
          <p className="text-lg sm:text-2xl font-bold text-amber-500">
            {winRate !== null ? `${winRate}%` : '—'}
          </p>
        </div>
      </div>

      {/* Reset button */}
      {totalFlips > 0 && (
        <button
          onClick={onReset}
          className="w-full text-xs text-gray-600 hover:text-red-400 transition-colors cursor-pointer"
        >
          Reset Stats
        </button>
      )}
    </div>
  )
}
