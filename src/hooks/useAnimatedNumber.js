// useAnimatedNumber.js - Smoothly animates a number counting up/down
// Used in the stats panel so numbers roll instead of jumping

import { useState, useEffect, useRef } from 'react'

export default function useAnimatedNumber(target, duration = 300) {
  const [display, setDisplay] = useState(target)
  const animationRef = useRef(null)
  const startRef = useRef(target)
  const startTimeRef = useRef(null)

  useEffect(() => {
    // Cancel any running animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const start = display
    startRef.current = start
    startTimeRef.current = null

    // If no change, skip animation
    if (start === target) return

    function animate(timestamp) {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out curve for a snappy feel
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startRef.current + (target - startRef.current) * eased)

      setDisplay(current)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [target, duration]) // eslint-disable-line react-hooks/exhaustive-deps

  return display
}
