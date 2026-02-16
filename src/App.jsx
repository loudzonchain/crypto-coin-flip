// App.jsx - Main game logic for Crypto Flip
// Ties together the Coin, ScoreBoard, ResultDisplay, Leaderboard, and NameEntry

import { useState, useEffect } from 'react'
import Coin from './components/Coin'
import ScoreBoard from './components/ScoreBoard'
import ResultDisplay from './components/ResultDisplay'
import Leaderboard from './components/Leaderboard'
import NameEntry from './components/NameEntry'

// --- localStorage helpers ---
// Read leaderboard from localStorage (returns array of entries)
function loadLeaderboard() {
  try {
    const data = localStorage.getItem('cryptoFlipLeaderboard')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// Save leaderboard array to localStorage
function saveLeaderboard(entries) {
  localStorage.setItem('cryptoFlipLeaderboard', JSON.stringify(entries))
}

function App() {
  // Game state
  const [playerChoice, setPlayerChoice] = useState(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState(null)
  const [wins, setWins] = useState(0)
  const [totalFlips, setTotalFlips] = useState(0)

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState(loadLeaderboard)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showNameEntry, setShowNameEntry] = useState(false)
  const [playerName, setPlayerName] = useState(null) // set once player enters their name
  const [hasPrompted, setHasPrompted] = useState(false) // only prompt once per session

  // When a flip completes, check if we should prompt for name or update score
  useEffect(() => {
    // Only run after a flip finishes (not during flipping)
    if (isFlipping || totalFlips === 0) return

    // First time hitting 3 wins → show name entry
    if (wins >= 3 && !playerName && !hasPrompted) {
      setShowNameEntry(true)
      setHasPrompted(true)
      return
    }

    // If player already has a name, silently update their leaderboard entry
    if (playerName) {
      updateLeaderboardEntry(playerName, wins, totalFlips)
    }
  }, [wins, totalFlips]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update or add an entry in the leaderboard
  function updateLeaderboardEntry(name, playerWins, playerTotalFlips) {
    setLeaderboard((prev) => {
      // Check if this player already has an entry
      const existingIndex = prev.findIndex(
        (e) => e.name.toLowerCase() === name.toLowerCase()
      )

      let updated
      if (existingIndex !== -1) {
        // Update existing entry
        updated = prev.map((e, i) =>
          i === existingIndex
            ? { ...e, wins: playerWins, totalFlips: playerTotalFlips }
            : e
        )
      } else {
        // Add new entry
        updated = [...prev, { name, wins: playerWins, totalFlips: playerTotalFlips }]
      }

      // Sort by wins (highest first), keep top 10
      updated.sort((a, b) => b.wins - a.wins)
      updated = updated.slice(0, 10)

      // Persist to localStorage
      saveLeaderboard(updated)
      return updated
    })
  }

  // Called when player saves their name from the NameEntry modal
  function handleNameSave(name) {
    setPlayerName(name)
    setShowNameEntry(false)
    updateLeaderboardEntry(name, wins, totalFlips)
  }

  // Called when player skips name entry
  function handleNameSkip() {
    setShowNameEntry(false)
    setHasPrompted(true)
  }

  // Called when the player clicks the FLIP button
  function handleFlip() {
    if (!playerChoice || isFlipping) return

    setResult(null)
    setIsFlipping(true)

    const coinResult = Math.random() < 0.5 ? 'heads' : 'tails'
    setResult(coinResult)

    setTimeout(() => {
      setIsFlipping(false)
      setTotalFlips((prev) => prev + 1)
      if (coinResult === playerChoice) {
        setWins((prev) => prev + 1)
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
          Crypto Flip
        </h1>

        {/* Score tracker */}
        <ScoreBoard wins={wins} totalFlips={totalFlips} />

        {/* The coin */}
        <Coin isFlipping={isFlipping} result={result} />

        {/* Result display */}
        <div className="h-20 flex items-center justify-center">
          {!isFlipping && result && (
            <ResultDisplay result={result} playerChoice={playerChoice} />
          )}
          {isFlipping && (
            <p className="text-purple-300/60 text-lg animate-pulse">
              Flipping...
            </p>
          )}
        </div>

        {/* Heads or Tails selection */}
        <div className="flex gap-4">
          <button
            onClick={() => !isFlipping && setPlayerChoice('heads')}
            className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              playerChoice === 'heads'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/40 scale-105'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            🪙 Heads
          </button>
          <button
            onClick={() => !isFlipping && setPlayerChoice('tails')}
            className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              playerChoice === 'tails'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/40 scale-105'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            💰 Tails
          </button>
        </div>

        {/* Flip button */}
        <button
          onClick={handleFlip}
          disabled={!playerChoice || isFlipping}
          className="w-full max-w-xs py-4 rounded-2xl font-black text-lg uppercase tracking-widest transition-all duration-200 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isFlipping ? 'Flipping...' : 'Flip!'}
        </button>

        {/* Leaderboard toggle button */}
        <button
          onClick={() => setShowLeaderboard(true)}
          className="text-sm text-purple-300/50 hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          🏆 Leaderboard
        </button>

        {/* Hint text */}
        {!playerChoice && !result && (
          <p className="text-purple-300/40 text-sm">
            Pick Heads or Tails to start
          </p>
        )}
      </div>

      {/* Leaderboard modal */}
      {showLeaderboard && (
        <Leaderboard
          entries={leaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* Name entry modal - appears once at 3 wins */}
      {showNameEntry && (
        <NameEntry onSave={handleNameSave} onSkip={handleNameSkip} />
      )}
    </div>
  )
}

export default App
