"use client"

import { useState, useCallback, forwardRef, useImperativeHandle, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Firework {
  id: number
  x: number
  y: number
  color: string
  scale: number
}

const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", 
  "#00FFFF", "#FFA500", "#8A2BE2", "#00CED1", "#FF4500",
  "#FFD700", "#FF1493", "#7CFC00", "#FF69B4", "#4169E1"
]

export interface FireworksHandle {
  launchFireworks: (rect: DOMRect) => void
}

export const Fireworks = forwardRef<FireworksHandle>((props, ref) => {
  const [fireworks, setFireworks] = useState<Firework[]>([])
  const [isLaunching, setIsLaunching] = useState(false)

  const createFirework = useCallback((rect: DOMRect) => ({
    id: Math.random(),
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    color: colors[Math.floor(Math.random() * colors.length)],
    scale: Math.random() * 0.5 + 1 // Random scale between 1 and 1.5
  }), [])

  const launchBatch = useCallback((rect: DOMRect) => {
    // Create more fireworks per batch (15-20)
    const count = Math.floor(Math.random() * 6) + 15
    const newFireworks = Array.from({ length: count }, () => createFirework(rect))
    
    setFireworks(prev => [...prev, ...newFireworks])

    // Remove this batch after animation
    setTimeout(() => {
      setFireworks(prev => prev.filter(fw => !newFireworks.includes(fw)))
    }, 2800)
  }, [createFirework])

  const launchFireworks = useCallback((rect: DOMRect) => {
    setIsLaunching(true)
    
    // Launch initial larger batch
    launchBatch(rect)

    // Create continuous launches every 400ms for 5 seconds
    const interval = setInterval(() => {
      launchBatch(rect)
    }, 400)

    // Stop after 5 seconds
    setTimeout(() => {
      clearInterval(interval)
      setIsLaunching(false)
    }, 5000)
  }, [launchBatch])

  useImperativeHandle(ref, () => ({
    launchFireworks,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {fireworks.map((fw) => (
          <motion.div
            key={fw.id}
            className="absolute w-8 h-8 rounded-full"
            style={{ 
              backgroundColor: fw.color,
              left: fw.x,
              top: fw.y
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, fw.scale, fw.scale, 0],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 2.8,
              times: [0, 0.3, 0.7, 1],
              ease: "easeOut",
            }}
          >
            {/* Create more particles per firework */}
            {[...Array(80)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 80
              const distance = Math.random() * 200 + 150 // Larger explosion radius
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: fw.color,
                    left: "50%",
                    top: "50%",
                    originX: "0",
                    originY: "0"
                  }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{ 
                    duration: 2.8,
                    delay: 0.1,
                    ease: [0.2, 0.8, 0.2, 1]
                  }}
                />
              )
            })}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
})

Fireworks.displayName = "Fireworks"