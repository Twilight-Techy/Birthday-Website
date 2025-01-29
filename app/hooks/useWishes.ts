import { useState, useEffect } from "react"

export interface Wish {
  id: string
  name: string
  message: string
  timestamp: number
}

export function useWishes() {
  const [wishes, setWishes] = useState<Wish[]>([])

  useEffect(() => {
    const storedWishes = localStorage.getItem("birthdayWishes")
    if (storedWishes) {
      setWishes(JSON.parse(storedWishes))
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "birthdayWishes") {
        setWishes(JSON.parse(e.newValue || "[]"))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const addWish = (name: string, message: string) => {
    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    }
    const updatedWishes = [...wishes, newWish]
    setWishes(updatedWishes)
    localStorage.setItem("birthdayWishes", JSON.stringify(updatedWishes))

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent("wishesUpdated", { detail: updatedWishes }))
  }

  return { wishes, addWish }
}

