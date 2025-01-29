"use client"

import { useState, useCallback, forwardRef, useImperativeHandle } from "react"
import { motion, AnimatePresence } from "framer-motion"

const emojis = ["🎉", "🎂", "🎈", "🎁", "💖", "🌹", "🥳", "✨", "🍰", "🎊", "🎵", "🎶"]

interface Emoji {
  id: number
  emoji: string
  x: number
  delay: number
}

export interface RainEmojisHandle {
  startRain: () => void
}

const RainEmojis = forwardRef<RainEmojisHandle>((props, ref) => {
  const [fallingEmojis, setFallingEmojis] = useState<Emoji[]>([])

  const startRain = useCallback(() => {
    const newEmojis = Array.from({ length: 100 }, () => ({
      id: Math.random(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100, // This will distribute emojis across the full width (0-100%)
      delay: Math.random() * 5,
    }))
    setFallingEmojis((prev) => [...prev, ...newEmojis])
    setTimeout(() => {
      setFallingEmojis((prev) => prev.filter((emoji) => !newEmojis.includes(emoji)))
    }, 7000)
  }, [])

  useImperativeHandle(ref, () => ({
    startRain,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {fallingEmojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            className="absolute text-4xl"
            style={{
              left: `${emoji.x}%`, // Position horizontally based on the random x value
              top: -20, // Start above the viewport
            }}
            animate={{
              top: "120vh", // Animate to below the viewport
              transition: {
                duration: 7,
                delay: emoji.delay,
                ease: "linear",
              },
            }}
            exit={{ opacity: 0 }}
          >
            {emoji.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
})

RainEmojis.displayName = "RainEmojis"

export { RainEmojis }

