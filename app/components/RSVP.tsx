"use client"

import { useState } from "react"

export default function RSVP() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [attending, setAttending] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission (e.g., send data to server)
    console.log("RSVP submitted:", { name, email, attending })
    // Reset form
    setName("")
    setEmail("")
    setAttending("")
  }

  return (
    <section className="py-16 bg-purple-200">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">RSVP</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-purple-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-purple-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-700 mb-2">Attending?</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="yes"
                checked={attending === "yes"}
                onChange={() => setAttending("yes")}
                className="form-radio text-purple-500"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="no"
                checked={attending === "no"}
                onChange={() => setAttending("no")}
                className="form-radio text-purple-500"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Submit RSVP
        </button>
      </form>
    </section>
  )
}

