import EventCard from "./EventCard"
import { api } from "~/utils/api"
import Spinner from "@repo/ui/components/Spinner";
export default function EventGrid() {
    const {data, isLoading, isError} =  api.events.all.useQuery();

    return (
        <div className="container flex items-center justify-between gap-3">
      <section className="grid w-full grid-flow-row grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {data?.map((event) => (
            <EventCard event={event} key={event.id}/>
        ))}
        {isLoading
         && <Spinner/>
        }
      </section>
        </div>
    )
}