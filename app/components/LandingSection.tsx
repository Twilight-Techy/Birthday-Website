import { motion } from "framer-motion"

export default function LandingSection() {
  return (
    <section className="h-screen flex items-center justify-center text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <h1 className="text-6xl font-bold text-purple-800 mb-4">Happy 19th Birthday, [Name]!</h1>
        <p className="text-2xl text-purple-600">Welcome to my birthday celebration!</p>
      </motion.div>
    </section>
  )
}

