// ScoreBoard.jsx - Displays the win/loss record

export default function ScoreBoard({ wins, totalFlips }) {
  const losses = totalFlips - wins

  return (
    <div className="flex gap-6 sm:gap-8 text-center">
      {/* Wins */}
      <div className="flex flex-col items-center">
        <span className="text-xs sm:text-sm uppercase tracking-wider text-purple-300/70">
          Wins
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-green-400">
          {wins}
        </span>
      </div>

      {/* Total flips */}
      <div className="flex flex-col items-center">
        <span className="text-xs sm:text-sm uppercase tracking-wider text-purple-300/70">
          Flips
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-white">
          {totalFlips}
        </span>
      </div>

      {/* Losses */}
      <div className="flex flex-col items-center">
        <span className="text-xs sm:text-sm uppercase tracking-wider text-purple-300/70">
          Losses
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-red-400">
          {losses}
        </span>
      </div>
    </div>
  )
}
