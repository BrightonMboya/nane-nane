import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@repo/ui/components/card"
import Link from "next/link"

interface JobProps {
    title: string;
    jobType: string;
    location: string;
    description: string;
    link: string;
}

export default function JobCard ({job}: {job: JobProps}) {
    return (
        <Card>
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>`${job.jobType} | ${job.location}`</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm/relaxed">{job.description}</p>
          </CardContent>
          <CardFooter>
            <Link
              className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              href="#"
            >
              Learn More
            </Link>
          </CardFooter>
        </Card>
    )
}