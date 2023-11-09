import { api } from "~/utils/api";
import JobCard from "~/components/resources/jobs/JobCard";

export default function Component() {
    const {data, isLoading, isError} = api.resources.jobs.useQuery();
  return (
    <section className="container mx-auto p-6">
      <h1 className="mb-8 text-4xl font-bold">Job Postings</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((job) => (
            <JobCard job={job} key={job.id}/>
        ))}
      </div>
    </section>
  );
}
