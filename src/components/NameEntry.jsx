// NameEntry.jsx - Modal that appears when the player first hits 3 wins
// Asks for their name so their score can be saved to the leaderboard

import { useState } from 'react'

export default function NameEntry({ onSave, onSkip }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed) {
      onSave(trimmed)
    }
  }

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Modal card */}
      <div className="w-full max-w-sm bg-slate-900/95 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/10 p-6">
        {/* Celebration text */}
        <h2 className="text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
          🎉 Nice streak!
        </h2>
        <p className="text-sm text-purple-200/60 text-center mb-6">
          You hit 3 wins! Enter your name for the leaderboard.
        </p>

        {/* Name input form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name..."
            maxLength={20}
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-500/30 text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 text-center text-lg"
          />

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 rounded-xl font-bold uppercase tracking-wider cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Score
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-purple-300/40 hover:text-purple-300/70 transition-colors cursor-pointer"
          >
            Skip
          </button>
        </form>
      </div>
    </div>
  )
}
