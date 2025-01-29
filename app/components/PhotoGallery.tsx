import Image from "next/image"

const photos = [
  "/placeholder.svg?height=300&width=300",
  "/placeholder.svg?height=300&width=300",
  "/placeholder.svg?height=300&width=300",
  // Add more photo URLs as needed
]

export default function PhotoGallery() {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">Photo Memories</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative w-64 h-64 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={photo || "/placeholder.svg"}
              alt={`Memory ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

