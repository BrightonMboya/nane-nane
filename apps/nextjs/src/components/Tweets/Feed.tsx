import React, { useEffect, useRef, useState } from "react";
// import { TweetInput } from "@components/inputs/TweetInput";
import { api } from "~/utils/api";
import Spinner from "@repo/ui/components/Spinner";
import TweetCard from "./TweetCard"
import { useInView } from "react-intersection-observer";
// import { newTweet } from "../../../../server/src/router/routes/tweetRouter/newTweet";

export default function HomeContent() {
  let getTweets = api.tweets.getAllTweets.useMutation();
  const [tweets, setTweets] = useState(getTweets.data?.tweets);
  const [hasMore, setHasMore] = useState(false);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  async function fetchTweets() {
    const skip = tweets?.length || 0;
    const newTweets = await getTweets.mutateAsync({ skip });
    const uniqueTweets = removeDuplicates([
      ...(tweets || []),
      ...(newTweets?.tweets || []),
    ]);
    setTweets(uniqueTweets);
    setHasMore(newTweets.hasMore);
  }

  function removeDuplicates(tweets:any) {
    const tweetSet = new Set();
    return tweets.filter((tweet) => {
      if (tweetSet.has(tweet.id)) {
        return false;
      } else {
        tweetSet.add(tweet.id);
        return true;
      }
    });
  }

  useEffect(() => {
    fetchTweets();
  }, []);

  // Refetch tweets when inView and not loading
  useEffect(() => {
    if (inView && !getTweets.isLoading && hasMore) {
      fetchTweets();
    }
  }, [getTweets.isLoading, inView, tweets, hasMore]);

  function onPost(data: any) {
    //@ts-ignore
    data && setTweets([data, ...tweets]);
  }
  return (
    <div className="main-content ">
      <div className="main-border mcz border-b border-l border-r ">
       
        {/* <TweetInput onPost={onPost} /> */}

        {/* 
         <NewTweets /> */}
        {tweets?.map((t, i) => (
          <TweetCard key={i} tweet={t} />
        ))}
        <div ref={ref}>
          {hasMore && <Spinner />}
          {getTweets.isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
}
