import { api } from "~/utils/api";
import JobCard from "~/components/resources/jobs/JobCard";

export default function Component() {
  const { data, isLoading, isError } = api.resources.jobs.useQuery();
  return (

    <section className="container mx-auto p-6">

      <h1 className=" text-4xl font-bold">Job Postings</h1>
      <p className=" max-w-[69ch] text-lg leading-10 text-neutral-600 dark:text-white/50 mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque varius
        lacus at quam luctus, vel interdum nulla malesuada. Integer vehicula,{" "}
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {data?.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </section>

   
    
  );
}
