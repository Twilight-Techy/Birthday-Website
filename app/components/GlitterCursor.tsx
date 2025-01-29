"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function GlitterCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = "touches" in e ? e.touches[0] : e
      setMousePosition({ x: clientX, y: clientY })
      addToTrail(clientX, clientY)
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("touchmove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("touchmove", updateMousePosition)
    }
  }, [])

  const addToTrail = (x: number, y: number) => {
    setTrail((prevTrail) => [{ x, y, id: Date.now() }, ...prevTrail.slice(0, 20)])
  }

  return (
    <>
      <motion.div
        className="glitter-cursor"
        style={{
          position: "fixed",
          left: mousePosition.x,
          top: mousePosition.y,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {trail.map((point) => (
        <motion.div
          key={point.id}
          className="glitter-trail"
          style={{
            position: "fixed",
            left: point.x,
            top: point.y,
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            pointerEvents: "none",
            zIndex: 9998,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1 }}
        />
      ))}
    </>
  )
}

