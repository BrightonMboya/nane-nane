import Spinner from "@repo/ui/components/Spinner";

import { api } from "~/utils/api";
import JobCard from "~/components/resources/jobs/JobCard";

export default function Component() {
  const { data, isLoading, isError } = api.resources.jobs.useQuery();
  return (
    <section className="container mx-auto p-6">
      <h1 className=" text-4xl font-bold">Job Postings</h1>
      <p className=" mt-3 max-w-[69ch] text-lg leading-10 text-neutral-600 dark:text-white/50">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque varius
        lacus at quam luctus, vel interdum nulla malesuada. Integer vehicula,{" "}
      </p>
      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
        {isLoading && <Spinner />}
      </div>
    </section>
  );
}
