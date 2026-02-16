// Confetti.jsx - Gold-themed confetti for win celebrations

import { useState, useEffect } from 'react'

const CONFETTI_COLORS = [
  '#f59e0b', // amber
  '#fbbf24', // yellow
  '#d97706', // dark amber
  '#fcd34d', // light yellow
  '#ef4444', // red accent
  '#f97316', // orange
  '#eab308', // gold
]

function createPieces(count = 40) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 8 + 4,
    fallDuration: Math.random() * 1.5 + 1.5,
    fallDelay: Math.random() * 0.5,
    rotation: Math.random() * 360,
  }))
}

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (active) {
      setPieces(createPieces())
    }
  }, [active])

  if (!active || pieces.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute top-0"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 1.4}px`,
            backgroundColor: piece.color,
            borderRadius: '2px',
            '--fall-duration': `${piece.fallDuration}s`,
            '--fall-delay': `${piece.fallDelay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}
