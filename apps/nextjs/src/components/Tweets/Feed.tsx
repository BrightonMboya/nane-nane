import React, { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import { TweetInput } from "./inputs/TweetInput";
import Spinner from "@repo/ui/components/Spinner";
import { MainTweet } from "./MainTweet";
import { useInView } from "react-intersection-observer";
import { newTweet } from "@repo/api/src/router/tweetRouter/newTweet";

export default function Feed() {
  let getTweets = api.tweets.getAllTweets.useMutation();
  const [tweets, setTweets] = useState(getTweets.data?.tweets)
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
    return tweets.filter((tweet: any) => {
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
    data && setTweets([data, ...tweets])
  };

  return (
    <div className="main-content ">
      <div className="main-border mcz border-b border-l border-r ">
       
        <TweetInput onPost={onPost} />

        {/* 
         <NewTweets /> */}
        {tweets?.map((t, i) => (
          <MainTweet key={i} tweet={t} />
        ))}
        <div ref={ref}>
          {hasMore && <Spinner />}
          {getTweets.isLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
}
