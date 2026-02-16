// Leaderboard.jsx - Modal overlay showing top 10 players
// Sorted by total wins, displays rank, name, win rate, and wins

export default function Leaderboard({ entries, onClose }) {
  return (
    // Backdrop - clicking outside the modal closes it
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal card - stop clicks inside from closing */}
      <div
        className="w-full max-w-md bg-slate-900/95 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20">
          <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            🏆 Leaderboard
          </h2>
          <button
            onClick={onClose}
            className="text-purple-300/60 hover:text-white transition-colors text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Table */}
        <div className="px-6 py-4">
          {entries.length === 0 ? (
            <p className="text-center text-purple-300/50 py-8">
              No scores yet. Win 3+ games to get on the board!
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-purple-300/60">
                  <th className="text-left py-2 pr-2">#</th>
                  <th className="text-left py-2">Name</th>
                  <th className="text-right py-2">Win %</th>
                  <th className="text-right py-2 pl-2">Wins</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr
                    key={entry.name}
                    className={`border-t border-purple-500/10 ${
                      index === 0 ? 'text-yellow-400' : 'text-purple-100'
                    }`}
                  >
                    {/* Rank - gold/silver/bronze for top 3 */}
                    <td className="py-3 pr-2 font-bold">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && (index + 1)}
                    </td>
                    {/* Player name */}
                    <td className="py-3 font-semibold truncate max-w-[140px]">
                      {entry.name}
                    </td>
                    {/* Win rate percentage */}
                    <td className="py-3 text-right text-sm text-purple-200/70">
                      {entry.totalFlips > 0
                        ? Math.round((entry.wins / entry.totalFlips) * 100)
                        : 0}
                      %
                    </td>
                    {/* Total wins */}
                    <td className="py-3 text-right font-bold pl-2 text-green-400">
                      {entry.wins}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
