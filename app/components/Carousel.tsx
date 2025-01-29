"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const videos = [
  {
    src: "/media/bethy (1).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (2).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (3).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (4).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (5).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (6).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (7).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (8).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (9).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (10).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (11).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (12).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (13).mp4",
    type: "video/mp4",
  },
  {
    src: "/media/bethy (14).mp4",
    type: "video/mp4",
  },
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  const resetAutoSlideTimer = () => {
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current)
    }
    autoSlideTimerRef.current = setTimeout(nextSlide, 5000)
  }

  useEffect(() => {
    resetAutoSlideTimer()
    return () => {
      if (autoSlideTimerRef.current) {
        clearTimeout(autoSlideTimerRef.current)
      }
    }
  }, [currentIndex])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [currentIndex])

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative aspect-[9/16] overflow-hidden rounded-3xl shadow-xl">
        <div className="absolute inset-0 border-[12px] border-pink-300 rounded-3xl z-10 pointer-events-none shadow-inner"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              src={videos[currentIndex].src}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              onEnded={nextSlide}
            />
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity z-20"
          onClick={() => {
            prevSlide()
            resetAutoSlideTimer()
          }}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity z-20"
          onClick={() => {
            nextSlide()
            resetAutoSlideTimer()
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
