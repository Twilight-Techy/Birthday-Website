"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWishes } from "../hooks/useWishes"

export default function BirthdayWishes() {
  const { wishes, addWish } = useWishes()
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && message.trim()) {
      addWish(name, message)
      setName("")
      setMessage("")
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-pink-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-cursive text-pink-800 mb-6 text-center font-bold">Birthday Wishes</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
        <textarea
          placeholder="Your Birthday Wish"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mb-4 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 h-32"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
        >
          Send Wish
        </button>
      </form>
      <div className="space-y-4">
        <AnimatePresence>
          {wishes
            .slice()
            .reverse()
            .map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white p-4 rounded-lg shadow"
              >
                <p className="font-bold text-pink-800">{wish.name}</p>
                <p className="text-gray-700 mt-2">{wish.message}</p>
                <p className="text-xs text-gray-500 mt-2">{new Date(wish.timestamp).toLocaleString()}</p>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

