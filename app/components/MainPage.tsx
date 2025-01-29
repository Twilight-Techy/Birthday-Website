"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Carousel from "./Carousel"
import GlitterCursor from "./GlitterCursor"
import Cake from "./Cake"
import { Fireworks, type FireworksHandle } from "./Fireworks"
import { RainEmojis, type RainEmojisHandle } from "./RainEmojis"
import Curtain from "./Curtain"
import BirthdayWishes from "./BirthdayWishes"
import WishLanterns from "./WishLanterns"
import ZodiacAndBirthstone from "./ZodiacAndBirthstone"
import React from "react";

const Bubble = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-white opacity-10"
    style={{
      width: `${Math.random() * 100 + 50}px`,
      height: `${Math.random() * 100 + 50}px`,
    }}
    initial={{
      x: `${Math.random() * 100}vw`,
      y: "100vh",
    }}
    animate={{
      y: "-100vh",
      transition: {
        duration: Math.random() * 20 + 10,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "linear",
      },
    }}
  />
)

const songs = ["/media/Anne-Marie-Birthday.mp3", "/media/Katy-Perry-Birthday.mp3", "/media/will-i-am-cody-wise-it-s-my-birthday.mp3"]

export default function MainPage() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)
  const [isWishLanternsVisible, setIsWishLanternsVisible] = useState(false)
  const fireworksRef = useRef<FireworksHandle>(null)
  const rainEmojisRef = useRef<RainEmojisHandle>(null)
  const fireworksButtonRef = useRef<HTMLButtonElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCurtainOpen(true)
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsMusicPlaying(true)
          })
          .catch((error) => console.error("Error playing audio:", error))
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleLaunchFireworks = () => {
    if (fireworksRef.current && fireworksButtonRef.current) {
      const buttonRect = fireworksButtonRef.current.getBoundingClientRect()
      fireworksRef.current.launchFireworks(buttonRect)
    }
  }

  const handleRainEmojis = () => {
    if (rainEmojisRef.current) {
      rainEmojisRef.current.startRain()
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length) // Move to next song
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex]
      audioRef.current.play().catch(() => setIsMusicPlaying(true))
    }
  }, [currentSongIndex])

  const toggleWishLanterns = () => {
    setIsWishLanternsVisible((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 overflow-hidden relative">
      <Curtain isOpen={isCurtainOpen} />
      {/* Transparent Bubbles */}
      {[...Array(20)].map((_, i) => (
        <Bubble key={i} delay={Math.random() * 20} />
      ))}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="relative">
        <motion.h1
          className="text-5xl md:text-7xl font-cursive text-center mb-8 font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Happy Birthday Bethy!
        </motion.h1>
        
        {/* Sparkle emojis with animation */}
        {["Happy", "Birthday", "Bethy"].map((word, index) => (
          <React.Fragment key={word}>
            <motion.span
              className="absolute text-lg pointer-events-none"
              style={{
                left: `${index * 33}%`,
                top: "-10px"
              }}
              animate={{
                y: [-5, 0, -5],
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute text-lg pointer-events-none"
              style={{
                left: `${index * 33 + 20}%`,
                bottom: "-10px"
              }}
              animate={{
                y: [5, 0, 5],
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3 + 0.15
              }}
            >
              ✨
            </motion.span>
          </React.Fragment>
        ))}
      </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <Carousel />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-12"
        >
          <Cake />
        </motion.div>
        <motion.div
          className="flex justify-center space-x-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          <button
            ref={fireworksButtonRef}
            onClick={handleLaunchFireworks}
            className="px-6 py-3 bg-pink-500 text-white rounded-full font-bold text-lg hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Launch Fireworks 🚀
          </button>
          <button
            onClick={handleRainEmojis}
            className="px-6 py-3 bg-pink-500 text-white rounded-full font-bold text-lg hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Rain Emojis 🎉
          </button>
          <button
            onClick={toggleWishLanterns}
            className="px-6 py-3 bg-pink-500 text-white rounded-full font-bold text-lg hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View Wish Lanterns 🏮
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4 }}
          className="mt-12"
        >
          <BirthdayWishes />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.5 }}
          className="mt-12"
        >
          <ZodiacAndBirthstone />
        </motion.div>
      </div>
      <audio ref={audioRef} loop={false} onEnded={handleSongEnd}>
        <source src="media/" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <GlitterCursor />
      <Fireworks ref={fireworksRef} />
      <RainEmojis ref={rainEmojisRef} />
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 bg-pink-500 text-white rounded-full p-2 shadow-lg hover:bg-pink-600 transition-colors duration-300"
        aria-label={isMusicPlaying ? "Pause music" : "Play music"}
      >
        {isMusicPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
      <WishLanterns isVisible={isWishLanternsVisible} onClose={toggleWishLanterns} />
    </div>
  )
}

