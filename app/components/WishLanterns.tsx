"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWishes } from "../hooks/useWishes"
import { Fireworks, type FireworksHandle } from "./Fireworks"

interface WishLanternsProps {
  isVisible: boolean
  onClose: () => void
}

const WishLanterns: React.FC<WishLanternsProps> = ({ isVisible, onClose }) => {
  const { wishes } = useWishes()
  const [localWishes, setLocalWishes] = useState(wishes)
  const fireworksRef = useRef<FireworksHandle>(null)
  const fireworksIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setLocalWishes(wishes)
  }, [wishes])

  useEffect(() => {
    const handleWishesUpdated = (e: CustomEvent<Wish[]>) => {
      setLocalWishes(e.detail)
    }

    window.addEventListener("wishesUpdated", handleWishesUpdated as EventListener)
    return () => window.removeEventListener("wishesUpdated", handleWishesUpdated as EventListener)
  }, [])

  useEffect(() => {
    if (isVisible) {
      launchContinuousFireworks()
    } else {
      stopContinuousFireworks()
    }

    return () => stopContinuousFireworks()
  }, [isVisible])

  const launchContinuousFireworks = () => {
    if (fireworksRef.current) {
      const rect = new DOMRect(0, 0, window.innerWidth, window.innerHeight)
  
      fireworksRef.current.launchFireworks(rect)
  
      fireworksIntervalRef.current = setInterval(() => {
        if (fireworksRef.current) {
          fireworksRef.current.launchFireworks(rect)
        }
      }, 2000)
    }
  }

  const stopContinuousFireworks = () => {
    if (fireworksIntervalRef.current) {
      clearInterval(fireworksIntervalRef.current)
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-gradient-to-b from-indigo-900 to-purple-900 z-50 overflow-hidden"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl z-10"
        aria-label="Close wish lanterns"
      >
        ×
      </button>
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-50"></div>
      <Fireworks ref={fireworksRef} />
      {localWishes.length > 0 ? (
        localWishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            className="absolute"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: "100vh",
            }}
            animate={{
              y: `-${100 + Math.random() * 50}vh`,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: index * 0.5,
            }}
          >
            <div className="relative w-32 h-40">
              <div className="absolute inset-0 bg-yellow-100 opacity-50 rounded-full filter blur-md"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 to-orange-400 rounded-full"></div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-orange-500 rounded-b-full"></div>
              <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                <p className="text-xs text-gray-800 overflow-hidden">
                  <strong>{wish.name}:</strong> {wish.message}
                </p>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-2xl">No wishes yet. Be the first to make a wish!</p>
        </div>
      )}
    </motion.div>
  )
}

export default WishLanterns

