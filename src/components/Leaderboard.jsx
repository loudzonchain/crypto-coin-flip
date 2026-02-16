// Leaderboard.jsx - Dark themed macOS window modal

import Window from './Window'

export default function Leaderboard({ entries, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Window title="Leaderboard" onClose={onClose}>
          <div className="p-4 sm:p-6">
            {entries.length === 0 ? (
              <p className="text-center text-gray-500 py-8 text-sm">
                No scores yet. Win 3+ games to get on the board!
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 border-b border-white/5">
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
                      className="border-t border-white/5 text-gray-300"
                    >
                      <td className="py-2.5 pr-2 font-bold text-sm">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && (
                          <span className="text-gray-600">{index + 1}</span>
                        )}
                      </td>
                      <td className="py-2.5 font-semibold text-sm truncate max-w-[140px]">
                        {entry.name}
                      </td>
                      <td className="py-2.5 text-right text-sm text-gray-500">
                        {entry.totalFlips > 0
                          ? Math.round((entry.wins / entry.totalFlips) * 100)
                          : 0}
                        %
                      </td>
                      <td className="py-2.5 text-right font-bold text-sm text-amber-500 pl-2">
                        {entry.wins}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Window>
      </div>
    </div>
  )
}
