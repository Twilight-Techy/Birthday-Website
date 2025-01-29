// hooks/useWishes.ts
import { useState, useEffect } from "react"
import { supabase, type WishRecord } from "../lib/supabase"

export interface Wish {
  id: string
  name: string
  message: string
  timestamp: number
}

export function useWishes() {
  const [wishes, setWishes] = useState<Wish[]>([])

  useEffect(() => {
    // Initial fetch of wishes
    fetchWishes()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('wishes_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'wishes'
        },
        (payload) => {
          const newWish = payload.new as WishRecord
          setWishes(currentWishes => [...currentWishes, {
            id: newWish.id,
            name: newWish.name,
            message: newWish.message,
            timestamp: newWish.timestamp
          }])

          // Dispatch custom event for WishLanterns component
          window.dispatchEvent(
            new CustomEvent("wishesUpdated", {
              detail: wishes
            })
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('timestamp', { ascending: true })

    if (error) {
      console.error('Error fetching wishes:', error)
      return
    }

    const formattedWishes: Wish[] = data.map(wish => ({
      id: wish.id,
      name: wish.name,
      message: wish.message,
      timestamp: wish.timestamp
    }))

    setWishes(formattedWishes)
  }

  const addWish = async (name: string, message: string) => {
    const newWish = {
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now()
    }

    const { error } = await supabase
      .from('wishes')
      .insert([newWish])

    if (error) {
      console.error('Error adding wish:', error)
      // You might want to handle this error in your UI
    }
  }

  return { wishes, addWish }
}