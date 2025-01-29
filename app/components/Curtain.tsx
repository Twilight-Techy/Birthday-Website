"use client"

import { motion } from "framer-motion"

interface CurtainProps {
  isOpen: boolean
}

export default function Curtain({ isOpen }: CurtainProps) {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1/2 h-full bg-pink-500 origin-left z-50"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')" }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 right-0 w-1/2 h-full bg-pink-600 origin-right z-50"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')" }}
        />
      </motion.div>
    </>
  )
}

