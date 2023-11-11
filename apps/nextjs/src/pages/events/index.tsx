
import { Input } from "@repo/ui/components/input"
import EventGrid from "~/components/events/EventGrid"
export default function Index() {
  return (
    <section className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-6">
          <div className="relative w-full h-10">
            <div className=" h-full">
              <Input
                className="h-full w-full rounded-l-md border border-r-0"
                placeholder="Search by a Hub"
                type="text"
              />
            </div>
            {/* <div className="absolute right-0 w-1/2 h-full">
              <Input className="h-full w-full rounded-r-md border border-l-0" placeholder="Select date" type="date" />
            </div> */}
          </div>
          <EventGrid/>
         
        </div>
      </main>
    
    </section>
  )
}
