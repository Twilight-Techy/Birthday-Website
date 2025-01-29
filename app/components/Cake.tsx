"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { HexColorPicker } from "react-colorful"

interface CakeColors {
  topLayer: string
  middleLayer: string
  bottomLayer: string
  candle: string
  flame: string
}

const Candle = ({ isLit, colors, isSelected }: { isLit: boolean; colors: CakeColors; isSelected: boolean }) => (
  <motion.div
    className={`w-2 h-8 rounded-full relative ${isSelected ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
    whileHover={{ scale: 1.1 }}
    style={{ backgroundColor: colors.candle }}
  >
    {isLit && (
      <motion.div
        className={`w-4 h-6 rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2 ${isSelected ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{ backgroundColor: colors.flame }}
      />
    )}
  </motion.div>
)

export default function Cake() {
  const [litCandles, setLitCandles] = useState(Array(19).fill(true))
  const [swipeStart, setSwipeStart] = useState<number | null>(null)
  const [selectedPart, setSelectedPart] = useState<keyof CakeColors | null>(null)
  const [cakeColors, setCakeColors] = useState<CakeColors>({
    topLayer: "#FFC0CB",
    middleLayer: "#FFB6C1",
    bottomLayer: "#FF69B4",
    candle: "#FFFF00",
    flame: "#FFA500",
  })

  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setSwipeStart(clientX)
  }

  const handleSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (swipeStart === null) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const swipeDistance = clientX - swipeStart

    if (Math.abs(swipeDistance) > 10) {
      const extinguishedCandles = litCandles.map((_, index) => {
        const candleElement = document.getElementById(`candle-${index}`)
        if (candleElement) {
          const candleRect = candleElement.getBoundingClientRect()
          const candleX = candleRect.left + candleRect.width / 2
          return swipeStart <= candleX && candleX <= clientX
        }
        return false
      })

      setLitCandles((prev) => prev.map((isLit, index) => isLit && !extinguishedCandles[index]))
    }
  }

  const handleSwipeEnd = () => {
    setSwipeStart(null)
  }

  const handleColorChange = useCallback(
    (color: string) => {
      if (selectedPart) {
        setCakeColors((prev) => ({ ...prev, [selectedPart]: color }))
      }
    },
    [selectedPart],
  )

  const handlePartSelect = (part: keyof CakeColors) => {
    setSelectedPart((prev) => (prev === part ? null : part))
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className="relative w-full aspect-square"
        onTouchStart={handleSwipeStart}
        onTouchMove={handleSwipeMove}
        onTouchEnd={handleSwipeEnd}
        onMouseDown={handleSwipeStart}
        onMouseMove={handleSwipeMove}
        onMouseUp={handleSwipeEnd}
        onMouseLeave={handleSwipeEnd}
      >
        <div className="absolute bottom-0 w-full h-3/4 rounded-lg shadow-lg overflow-hidden">
          <motion.div
            className="absolute bottom-0 w-full h-1/3 cursor-pointer"
            style={{ backgroundColor: cakeColors.bottomLayer }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handlePartSelect("bottomLayer")}
          />
          <motion.div
            className="absolute bottom-1/3 w-full h-1/3 cursor-pointer"
            style={{ backgroundColor: cakeColors.middleLayer }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handlePartSelect("middleLayer")}
          />
          <motion.div
            className="absolute bottom-2/3 w-full h-1/3 rounded-t-lg cursor-pointer"
            style={{ backgroundColor: cakeColors.topLayer }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handlePartSelect("topLayer")}
          />
        </div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 w-3/4">
          {litCandles.map((isLit, index) => (
            <div
              key={index}
              id={`candle-${index}`}
              className="cursor-pointer"
              onClick={() => handlePartSelect("candle")}
            >
              <Candle
                isLit={isLit}
                colors={cakeColors}
                isSelected={selectedPart === "candle" || selectedPart === "flame"}
              />
            </div>
          ))}
        </div>
      </div>
      <p className="text-center mt-4 text-pink-800 font-semibold">Swipe across the candles to blow them out!</p>
      <div className="mt-4 flex flex-col items-center">
        <div className="mb-4">
          <p className="text-center text-pink-800 font-semibold mb-2">
            {selectedPart ? `Customizing: ${selectedPart}` : "Click on a part of the cake to customize"}
          </p>
          {selectedPart && <HexColorPicker color={cakeColors[selectedPart]} onChange={handleColorChange} />}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {(Object.keys(cakeColors) as Array<keyof CakeColors>).map((part) => (
            <motion.button
              key={part}
              className={`w-12 h-12 rounded-full border-2 ${selectedPart === part ? "border-blue-500" : "border-gray-300"}`}
              style={{ backgroundColor: cakeColors[part] }}
              onClick={() => handlePartSelect(part)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

