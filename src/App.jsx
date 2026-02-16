// App.jsx - Main game logic for Crypto Flip
// Dark theme with gold/amber accents, macOS window style

import { useState, useEffect, useCallback } from 'react'
import Window from './components/Window'
import Coin from './components/Coin'
import ScoreBoard from './components/ScoreBoard'
import ResultDisplay from './components/ResultDisplay'
import Leaderboard from './components/Leaderboard'
import NameEntry from './components/NameEntry'
import Confetti from './components/Confetti'
import GoldRain from './components/GoldRain'
import { playFlipSound, playWinSound, playLoseSound } from './utils/sounds'

// --- Constants ---
const BET_AMOUNT = 10
const WIN_PAYOUT = 20
const STARTING_BALANCE = 100

// --- localStorage helpers ---
function loadLeaderboard() {
  try {
    const data = localStorage.getItem('cryptoFlipLeaderboard')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveLeaderboard(entries) {
  localStorage.setItem('cryptoFlipLeaderboard', JSON.stringify(entries))
}

function loadBalance() {
  try {
    const data = localStorage.getItem('cryptoFlipBalance')
    return data ? JSON.parse(data) : STARTING_BALANCE
  } catch {
    return STARTING_BALANCE
  }
}

function saveBalance(balance) {
  localStorage.setItem('cryptoFlipBalance', JSON.stringify(balance))
}

function App() {
  // Game state
  const [playerChoice, setPlayerChoice] = useState(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState(null)
  const [wins, setWins] = useState(0)
  const [totalFlips, setTotalFlips] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [lastBalanceChange, setLastBalanceChange] = useState(null)

  // Balance and streak state
  const [balance, setBalance] = useState(loadBalance)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  // Landing burst effect
  const [justLanded, setJustLanded] = useState(false)

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState(loadLeaderboard)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showNameEntry, setShowNameEntry] = useState(false)
  const [playerName, setPlayerName] = useState(null)
  const [hasPrompted, setHasPrompted] = useState(false)

  // Persist balance whenever it changes
  useEffect(() => {
    saveBalance(balance)
  }, [balance])

  // Update or add a leaderboard entry
  const updateLeaderboardEntry = useCallback((name, playerWins, playerTotalFlips) => {
    setLeaderboard((prev) => {
      const existingIndex = prev.findIndex(
        (e) => e.name.toLowerCase() === name.toLowerCase()
      )

      let updated
      if (existingIndex !== -1) {
        updated = prev.map((e, i) =>
          i === existingIndex
            ? { ...e, wins: playerWins, totalFlips: playerTotalFlips }
            : e
        )
      } else {
        updated = [...prev, { name, wins: playerWins, totalFlips: playerTotalFlips }]
      }

      updated.sort((a, b) => b.wins - a.wins)
      updated = updated.slice(0, 10)
      saveLeaderboard(updated)
      return updated
    })
  }, [])

  // Check if we should prompt for name or update leaderboard
  useEffect(() => {
    if (isFlipping || totalFlips === 0) return

    if (wins >= 3 && !playerName && !hasPrompted) {
      setShowNameEntry(true)
      setHasPrompted(true)
      return
    }

    if (playerName) {
      updateLeaderboardEntry(playerName, wins, totalFlips)
    }
  }, [wins, totalFlips, isFlipping, playerName, hasPrompted, updateLeaderboardEntry])

  function handleNameSave(name) {
    setPlayerName(name)
    setShowNameEntry(false)
    updateLeaderboardEntry(name, wins, totalFlips)
  }

  function handleNameSkip() {
    setShowNameEntry(false)
    setHasPrompted(true)
  }

  function handleReset() {
    setWins(0)
    setTotalFlips(0)
    setResult(null)
    setPlayerChoice(null)
    setPlayerName(null)
    setHasPrompted(false)
    setBalance(STARTING_BALANCE)
    setStreak(0)
    setBestStreak(0)
    setLastBalanceChange(null)
    setJustLanded(false)
  }

  // Main flip handler
  function handleFlip() {
    if (!playerChoice || isFlipping) return
    if (balance < BET_AMOUNT) return

    setResult(null)
    setShowConfetti(false)
    setLastBalanceChange(null)
    setJustLanded(false)
    setIsFlipping(true)
    playFlipSound()

    const coinResult = Math.random() < 0.5 ? 'heads' : 'tails'
    setResult(coinResult)

    setTimeout(() => {
      setIsFlipping(false)
      setJustLanded(true)
      const isWin = coinResult === playerChoice

      // Clear the landing burst after the animation plays
      setTimeout(() => setJustLanded(false), 600)

      setTotalFlips((prev) => prev + 1)

      if (isWin) {
        setWins((prev) => prev + 1)
        setBalance((prev) => prev + WIN_PAYOUT)
        setLastBalanceChange(WIN_PAYOUT)
        setStreak((prev) => {
          const newStreak = prev + 1
          setBestStreak((best) => Math.max(best, newStreak))
          return newStreak
        })
        playWinSound()
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      } else {
        setBalance((prev) => prev - BET_AMOUNT)
        setLastBalanceChange(-BET_AMOUNT)
        setStreak(0)
        playLoseSound()
      }
    }, 1400)
  }

  const canFlip = playerChoice && !isFlipping && balance >= BET_AMOUNT

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #161310 0%, #0a0a0a 70%)' }}
    >
      {/* Subtle falling gold particles behind everything */}
      <GoldRain />

      {/* Win confetti */}
      <Confetti active={showConfetti} />

      {/* Main game window */}
      <Window title="Crypto Flip" onClose={() => {}} className="w-full max-w-sm sm:max-w-md relative z-10">
        <div className="p-5 sm:p-6 flex flex-col items-center gap-5">
          {/* Stats panel */}
          <ScoreBoard
            wins={wins}
            totalFlips={totalFlips}
            balance={balance}
            streak={streak}
            bestStreak={bestStreak}
            onReset={handleReset}
          />

          {/* The coin */}
          <div className="py-2">
            <Coin isFlipping={isFlipping} result={result} justLanded={justLanded} />
          </div>

          {/* Result display */}
          <div className="h-16 flex items-center justify-center">
            {!isFlipping && result && (
              <ResultDisplay
                result={result}
                playerChoice={playerChoice}
                balanceChange={lastBalanceChange}
              />
            )}
            {isFlipping && (
              <p className="text-gray-500 text-sm animate-pulse">
                Flipping...
              </p>
            )}
            {!isFlipping && !result && (
              <p className="text-gray-600 text-sm">
                {balance < BET_AMOUNT
                  ? 'Out of coins! Reset to play again.'
                  : 'Pick a side and flip!'}
              </p>
            )}
          </div>

          {/* Heads / Tails selection - gold border glow when selected */}
          <div className="flex gap-3 w-full">
            <button
              onClick={() => !isFlipping && setPlayerChoice('heads')}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-150 cursor-pointer border active:scale-95 ${
                playerChoice === 'heads'
                  ? 'bg-amber-500/15 text-amber-400 border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.25)]'
                  : 'bg-[#1a1a1a] text-gray-400 border-amber-500/15 hover:border-amber-500/40 hover:shadow-[0_0_8px_rgba(245,158,11,0.1)]'
              }`}
            >
              🪙 Heads
            </button>
            <button
              onClick={() => !isFlipping && setPlayerChoice('tails')}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-150 cursor-pointer border active:scale-95 ${
                playerChoice === 'tails'
                  ? 'bg-amber-500/15 text-amber-400 border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.25)]'
                  : 'bg-[#1a1a1a] text-gray-400 border-amber-500/15 hover:border-amber-500/40 hover:shadow-[0_0_8px_rgba(245,158,11,0.1)]'
              }`}
            >
              💰 Tails
            </button>
          </div>

          {/* Bet indicator */}
          <p className="text-[11px] text-gray-600 -mt-2">
            Bet: {BET_AMOUNT} coins per flip
          </p>

          {/* Flip button - animated shifting gold gradient */}
          <button
            onClick={handleFlip}
            disabled={!canFlip}
            className="w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider cursor-pointer gradient-shift-btn text-black hover:shadow-[0_0_24px_rgba(245,158,11,0.3)] active:scale-95 transition-all shadow-[0_4px_20px_rgba(245,158,11,0.15)] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 disabled:animate-none"
          >
            {isFlipping ? 'Flipping...' : 'Flip Coin'}
          </button>

          {/* Leaderboard toggle - shimmering gold border */}
          <button
            onClick={() => setShowLeaderboard(true)}
            className="shimmer-border text-xs font-medium text-amber-500/70 bg-amber-500/5 border border-amber-500/20 hover:bg-amber-500/10 hover:shadow-[0_0_12px_rgba(245,158,11,0.1)] transition-all cursor-pointer rounded-full px-4 py-1.5"
          >
            View Leaderboard
          </button>
        </div>
      </Window>

      {/* Leaderboard modal */}
      {showLeaderboard && (
        <Leaderboard
          entries={leaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* Name entry modal */}
      {showNameEntry && (
        <NameEntry onSave={handleNameSave} onSkip={handleNameSkip} />
      )}
    </div>
  )
}

export default App
