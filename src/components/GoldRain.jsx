// GoldRain.jsx - Premium animated falling gold/amber particles
// More particles with varied sizes for a richer atmosphere

import { useMemo } from 'react'

// Generate particles once (doesn't change between renders)
function createParticles(count = 40) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,            // 1–4px
    opacity: Math.random() * 0.35 + 0.15,   // 0.15–0.50
    fallDuration: Math.random() * 6 + 5,     // 5–11s (slow drift)
    fallDelay: Math.random() * 8,            // stagger start
  }))
}

export default function GoldRain() {
  const particles = useMemo(() => createParticles(), [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="gold-particle absolute top-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: '#f59e0b',
            '--particle-opacity': p.opacity,
            '--fall-duration': `${p.fallDuration}s`,
            '--fall-delay': `${p.fallDelay}s`,
          }}
        />
      ))}
    </div>
  )
}
