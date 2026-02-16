// ScoreBoard.jsx - Premium stats panel with colored left borders and glowing numbers

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
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 shadow-[0_0_8px_rgba(245,158,11,0.08)]">
          <span className="text-sm">🪙</span>
          <span className="text-base font-bold text-amber-500 glow-amber">
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

      {/* Stats grid - dark cards with colored left borders and glowing numbers */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {/* Flips - blue left border */}
        <div className="bg-[#1a1a1a] rounded-lg p-2 sm:p-3 text-center border border-white/5 border-l-[3px] border-l-blue-400/60">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Flips
          </p>
          <p className="text-lg sm:text-2xl font-bold text-blue-400 glow-blue">
            {displayFlips}
          </p>
        </div>

        {/* Wins - green left border */}
        <div className="bg-[#1a1a1a] rounded-lg p-2 sm:p-3 text-center border border-white/5 border-l-[3px] border-l-green-400/60">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Wins
          </p>
          <p className="text-lg sm:text-2xl font-bold text-green-400 glow-green">
            {displayWins}
          </p>
        </div>

        {/* Losses - red left border */}
        <div className="bg-[#1a1a1a] rounded-lg p-2 sm:p-3 text-center border border-white/5 border-l-[3px] border-l-red-400/60">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Losses
          </p>
          <p className="text-lg sm:text-2xl font-bold text-red-400 glow-red">
            {displayLosses}
          </p>
        </div>

        {/* Win % - gold left border */}
        <div className="bg-[#1a1a1a] rounded-lg p-2 sm:p-3 text-center border border-white/5 border-l-[3px] border-l-amber-400/60">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Win %
          </p>
          <p className="text-lg sm:text-2xl font-bold text-amber-500 glow-amber">
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
