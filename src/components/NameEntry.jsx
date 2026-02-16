// NameEntry.jsx - Dark themed name entry modal

import { useState } from 'react'
import Window from './Window'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm">
        <Window title="Save Score" onClose={onSkip}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-center text-amber-500 mb-1">
              Nice streak!
            </h2>
            <p className="text-sm text-gray-500 text-center mb-5">
              You hit 3 wins! Enter your name for the leaderboard.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
                maxLength={20}
                autoFocus
                className="w-full px-4 py-3 rounded-lg bg-[#222] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 text-center text-base"
              />

              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-3 rounded-lg font-bold cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
              >
                Save Score
              </button>

              <button
                type="button"
                onClick={onSkip}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
              >
                Skip
              </button>
            </form>
          </div>
        </Window>
      </div>
    </div>
  )
}
