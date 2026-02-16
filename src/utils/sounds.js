// sounds.js - Web Audio API sound effects
// Generates simple tones for game events (no external audio files needed)

// Shared AudioContext (created on first use to comply with browser autoplay rules)
let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

// Play a tone with the given frequency, duration, and wave type
function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    // Fade out to avoid click/pop at the end
    gainNode.gain.setValueAtTime(volume, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  } catch {
    // Silently fail if audio isn't available
  }
}

// Coin flip sound - quick rising "whoosh" effect
export function playFlipSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = 'sine'
    // Sweep from low to high frequency for a "spin" feel
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15)
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3)

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  } catch {
    // Silently fail
  }
}

// Win sound - happy ascending two-tone chime
export function playWinSound() {
  playTone(523, 0.15, 'sine', 0.3) // C5
  setTimeout(() => playTone(659, 0.15, 'sine', 0.3), 100) // E5
  setTimeout(() => playTone(784, 0.3, 'sine', 0.25), 200)  // G5
}

// Lose sound - descending low tone
export function playLoseSound() {
  playTone(400, 0.15, 'square', 0.15)
  setTimeout(() => playTone(300, 0.3, 'square', 0.12), 120)
}
