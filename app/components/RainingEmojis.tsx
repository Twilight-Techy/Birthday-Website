"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const emojis = ["🎉", "🎂", "🎈", "🎁", "💖", "🌹", "🥳", "✨"]

interface EmojiProps {
  emoji: string
  x: number
  delay: number
}

const Emoji: React.FC<EmojiProps> = ({ emoji, x, delay }) => (
  <motion.div
    className="absolute text-4xl"
    initial={{ y: -20, x, opacity: 1 }}
    animate={{
      y: ["0vh", "100vh"],
      opacity: [1, 0],
    }}
    transition={{
      duration: Math.random() * 2 + 3,
      repeat: Number.POSITIVE_INFINITY,
      delay,
    }}
    style={{ left: `${x}%` }}
  >
    {emoji}
  </motion.div>
)

export default function RainingEmojis() {
  const [emojiElements, setEmojiElements] = useState<JSX.Element[]>([])

  useEffect(() => {
    const newEmojis = Array.from({ length: 50 }, (_, i) => (
      <Emoji
        key={i}
        emoji={emojis[Math.floor(Math.random() * emojis.length)]}
        x={Math.random() * 100}
        delay={Math.random() * 5}
      />
    ))
    setEmojiElements(newEmojis)
  }, [])

  return <div className="fixed inset-0 pointer-events-none">{emojiElements}</div>
}

