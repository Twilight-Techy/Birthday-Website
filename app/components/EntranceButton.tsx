"use client"

import { useRouter } from "next/navigation"

export default function EntranceButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/main")
  }

  return (
    <button
      onClick={handleClick}
      className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold text-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      Enter the Celebration
    </button>
  )
}

