// export {Resources as default} from "~/components/resources/Index";
import { ResourcesGrid } from "~/components/resources/ResourcesGrid";

export default function Index() {
  return (
    <div className="flex flex-col gap-5 py-8 md:gap-10 md:py-10">
      <div className="container">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Resources
        </h1>
        <p className=" max-w-[69ch] text-lg leading-10 text-neutral-600 dark:text-white/50">
         Nane-nane has a set of Resources that you can use to increase your chances of getting hired. These resources are
         hand picked by Industry experts to help you in your job application process
        </p>pers to enhance their skills.
       
      </div>
      <ResourcesGrid /> 
    </div>
  );
}
