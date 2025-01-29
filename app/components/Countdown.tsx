"use client"

import { useState, useEffect } from "react"

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const birthdayDate = new Date("2025-01-29") // Replace with the actual birthday date

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
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-pink-200">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">Countdown to the Big Day!</h2>
      <div className="flex justify-center space-x-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="text-5xl font-bold text-purple-700">{value}</div>
            <div className="text-xl text-purple-600 capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

