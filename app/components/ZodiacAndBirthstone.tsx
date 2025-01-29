import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Gem } from "lucide-react"

export default function ZodiacAndBirthstone() {
  const [activeTab, setActiveTab] = useState("zodiac")

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 font-cursive">
            Celestial Connections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the cosmic influences that shape your personality and the precious stones that resonate with your birth month
          </p>
        </motion.div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full max-w-5xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 mb-12 bg-white/50 backdrop-blur-sm p-1 rounded-xl border-2 border-purple-100">
            <TabsTrigger 
              value="zodiac" 
              className="flex items-center gap-2 text-lg py-4 rounded-lg data-[state=active]:bg-gradient-to-r from-purple-500 to-purple-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Zodiac Sign
            </TabsTrigger>
            <TabsTrigger 
              value="birthstone" 
              className="flex items-center gap-2 text-lg py-4 rounded-lg data-[state=active]:bg-gradient-to-r from-pink-500 to-pink-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Gem className="w-5 h-5" />
              Birthstone
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value={activeTab} className="relative">
              {activeTab === "zodiac" && (
                <motion.div
                  key="zodiac"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="order-2 md:order-1">
                          <h3 className="text-4xl font-bold text-purple-700 mb-6 font-cursive">
                            Aquarius
                            <span className="text-lg block text-purple-500 mt-1">
                              January 20 - February 18
                            </span>
                          </h3>
                          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            Born on January 29th, you embody the innovative spirit of Aquarius. As the visionary of the zodiac, 
                            your independent thinking and humanitarian nature set you apart. Your ruling planet Uranus gifts you 
                            with originality and progressive ideas.
                          </p>
                          <div className="grid grid-cols-2 gap-6">
                            {[
                              { label: "Element", value: "Air" },
                              { label: "Quality", value: "Fixed" },
                              { label: "Ruling Planet", value: "Uranus" },
                              { label: "Symbol", value: "Water Bearer" }
                            ].map((item) => (
                              <div key={item.label} className="bg-purple-50 p-4 rounded-lg">
                                <div className="text-sm text-purple-600 mb-1">{item.label}</div>
                                <div className="text-lg font-semibold text-purple-900">{item.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="order-1 md:order-2">
                          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent z-10" />
                            <img
                              src="/media/aquarius.jpg"
                              alt="Aquarius constellation"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === "birthstone" && (
                <motion.div
                  key="birthstone"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="order-2 md:order-1">
                          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent z-10" />
                            <img
                              src="/media/garnet.jpg"
                              alt="Garnet gemstone"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="order-1 md:order-2">
                          <h3 className="text-4xl font-bold text-pink-700 mb-6 font-cursive">
                            Garnet
                            <span className="text-lg block text-pink-500 mt-1">
                              January's Birthstone
                            </span>
                          </h3>
                          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            The deep red garnet, your birthstone, has been cherished for millennia as a symbol of love 
                            and passion. This precious gem is believed to bring its wearer good health, wealth, and 
                            happiness, while promoting positive energy and balance in life.
                          </p>
                          <div className="grid grid-cols-2 gap-6">
                            {[
                              { label: "Color", value: "Deep Red" },
                              { label: "Hardness", value: "6.5-7.5 Mohs" },
                              { label: "Symbolism", value: "Love & Passion" },
                              { label: "Properties", value: "Energizing" }
                            ].map((item) => (
                              <div key={item.label} className="bg-pink-50 p-4 rounded-lg">
                                <div className="text-sm text-pink-600 mb-1">{item.label}</div>
                                <div className="text-lg font-semibold text-pink-900">{item.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}