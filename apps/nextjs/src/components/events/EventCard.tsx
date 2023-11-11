import { Button } from "@repo/ui/components/button"
import Image from "next/image"

interface EventProps {
    id: String,
    name: String,
    previewDescription: String,
    date: Date,
    imagePreview: String,
    hubLocation: String,
    location: String
}

export default function EventCard({event} : {event: EventProps}) {
    return (
        <div className="rounded-md shadow-md overflow-hidden">
          <Image
            alt="Event Image"
            className="w-full h-48 object-cover"
            height="200"
            src={event.imagePreview as string}
            style={{
              aspectRatio: "250/200",
              objectFit: "cover",
            }}
            width="250"
          />
          <div className="p-6 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">{event.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{event.hubLocation}</p>
            {/* <p className="text-gray-600 dark:text-gray-300">{event.date}</p> */}
            <Button className="mt-4" variant="outline">
              More Details
            </Button>
          </div>
        </div>
    
    )
}