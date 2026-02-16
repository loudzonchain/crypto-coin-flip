// App.jsx - Main game logic for Crypto Flip
// Ties together the Coin, ScoreBoard, and ResultDisplay components

import { useState } from 'react'
import Coin from './components/Coin'
import ScoreBoard from './components/ScoreBoard'
import ResultDisplay from './components/ResultDisplay'

function App() {
  // Game state
  const [playerChoice, setPlayerChoice] = useState(null) // 'heads' or 'tails'
  const [isFlipping, setIsFlipping] = useState(false)     // true while coin is spinning
  const [result, setResult] = useState(null)               // 'heads' or 'tails' after flip
  const [wins, setWins] = useState(0)
  const [totalFlips, setTotalFlips] = useState(0)

  // Called when the player clicks the FLIP button
  function handleFlip() {
    // Can't flip without choosing a side first
    if (!playerChoice || isFlipping) return

    // Clear previous result and start the animation
    setResult(null)
    setIsFlipping(true)

    // Randomly pick heads or tails
    const coinResult = Math.random() < 0.5 ? 'heads' : 'tails'
    setResult(coinResult)

    // After animation finishes (1.2s), update the score
    setTimeout(() => {
      setIsFlipping(false)
      setTotalFlips((prev) => prev + 1)
      if (coinResult === playerChoice) {
        setWins((prev) => prev + 1)
      }
    }, 1200)
  }

  return (
    // Full-screen purple/blue gradient background
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 flex items-center justify-center p-4">
      {/* Main game card */}
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
          Crypto Flip
        </h1>

        {/* Score tracker */}
        <ScoreBoard wins={wins} totalFlips={totalFlips} />

        {/* The coin */}
        <Coin isFlipping={isFlipping} result={result} />

        {/* Result display (shows after flip completes) */}
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

        {/* Heads or Tails selection buttons */}
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

        {/* Hint text when no choice is made */}
        {!playerChoice && !result && (
          <p className="text-purple-300/40 text-sm">
            Pick Heads or Tails to start
          </p>
        )}
      </div>
    </div>
  )
}

export default App
