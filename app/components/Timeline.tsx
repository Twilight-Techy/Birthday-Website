import { motion } from "framer-motion"

const timelineEvents = [
  { year: 2004, event: "Born" },
  { year: 2009, event: "Started Elementary School" },
  { year: 2017, event: "Entered High School" },
  { year: 2022, event: "Graduated High School" },
  { year: 2023, event: "Turned 19!" },
]

export default function Timeline() {
  return (
    <section className="py-16 bg-purple-100">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">My Journey</h2>
      <div className="max-w-4xl mx-auto">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-1/2 text-right pr-8">
              {index % 2 === 0 && (
                <>
                  <h3 className="text-2xl font-bold text-purple-700">{event.year}</h3>
                  <p className="text-lg text-purple-600">{event.event}</p>
                </>
              )}
            </div>
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <div className="w-1/2 pl-8">
              {index % 2 !== 0 && (
                <>
                  <h3 className="text-2xl font-bold text-purple-700">{event.year}</h3>
                  <p className="text-lg text-purple-600">{event.event}</p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

