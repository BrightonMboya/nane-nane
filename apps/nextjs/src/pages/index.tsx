// import { useAuth } from "@clerk/nextjs";

// import Feed from "~/components/Tweets/Feed";
import { Button } from "@repo/ui/components/button"
import Link from "next/link"


export default function Index() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  // console.log(isLoaded, userId, sessionId, getToken)

  // return <Feed/>
  return (
    <div className="container">
    <h1 className="mb-8 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Connect
      </h1>
      <p className=" max-w-[69ch] text-lg leading-10 text-neutral-600 dark:text-white/50">
       Nane-nane allows you to connect to other students, book mentorship, grow your career and more.
       Check out our Networking App and learn more
      </p>

      <Link href="">

      <Button>
        Nane-Nane App
      </Button>
      </Link>
     
    </div>
  )
}
