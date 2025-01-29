"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import RainingEmojis from "./RainingEmojis"
import EntranceButton from "./EntranceButton"

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isCountdownOver, setIsCountdownOver] = useState(false)

  useEffect(() => {
    const birthdayDate = new Date("2025-01-29T00:00:00")

    const timer = setInterval(() => {
      const now = new Date()
      const difference = birthdayDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        clearInterval(timer)
        setIsCountdownOver(true)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center w-full max-w-md relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-cursive text-pink-800 mb-4 sm:mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Countdown to the Big Day!
        </motion.h1>
        <AnimatePresence>
          {!isCountdownOver && (
            <motion.div className="flex flex-wrap justify-center gap-4" exit={{ opacity: 0, scale: 0.5 }}>
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-pink-100 border-4 border-pink-500 flex items-center justify-center mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-700">{value}</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-xl text-pink-800 capitalize font-serif">{unit}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-2xl sm:text-3xl font-cursive text-pink-800">January 29th, 2025</p>
        </motion.div>
        {isCountdownOver && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cursive text-pink-800 mb-8">Happy Birthday!</h2>
            <EntranceButton />
          </motion.div>
        )}
      </div>
      {isCountdownOver && <RainingEmojis />}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-200 opacity-50"
            style={{
              width: `${Math.random() * 50 + 25}px`,
              height: `${Math.random() * 50 + 25}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  )
}

