import Feed from "~/components/Tweets/Feed"
import { useAuth } from "@clerk/nextjs";

export default function Index() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  // console.log(isLoaded, userId, sessionId, getToken)

  return <Feed/>
}