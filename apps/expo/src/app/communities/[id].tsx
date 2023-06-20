import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";
import AddMessageForm from "~/components/Chat/AddMessageForm";

const Community = () => {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");

  const communityRouter = api.post.getCommunityById.useQuery(id as string);
  if (!communityRouter.data) return <SplashScreen />;

  const postsQuery = api.chat.infinite.useInfiniteQuery(
    {},
    {
      getPreviousPageParam: (d) => d.prevCursor,
    },
  );
  const utils = api.useContext();
  const { hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage } =
    postsQuery;

  // list of messages that are rendered
  const [messages, setMessages] = useState(() => {
    const msgs = postsQuery.data?.pages.map((page) => page.items).flat();
    return msgs;
  });
  type Post = NonNullable<typeof messages>[number];
  const userName = "tonero test";
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  // fn to add and dedupe new messages onto state
  const addMessages = useCallback((incoming?: Post[]) => {
    console.log("addMessages");
    setMessages((current) => {
      const map: Record<Post["id"], Post> = {};
      for (const msg of current ?? []) {
        map[msg.id] = msg;
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg;
      }
      return Object.values(map).sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      );
    });
  }, []);

  // when new data from `useInfiniteQuery`, merge with current state
  useEffect(() => {
    const msgs = postsQuery.data?.pages.map((page) => page.items).flat();
    addMessages(msgs);
  }, [postsQuery.data?.pages, addMessages]);

  const scrollToBottomOfList = useCallback(() => {
    if (scrollTargetRef.current == null) {
      return;
    }

    scrollTargetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [scrollTargetRef]);
  useEffect(() => {
    scrollToBottomOfList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // subscribe to new posts and add
  api.chat.onAdd.useSubscription(undefined, {
    onData(post) {
      addMessages([post]);
    },
    onError(err) {
      console.log("Subscription error", err);
      // we might have missed a message, so invalidate cache
      utils.chat.infinite.invalidate();
    },
  });
  const [currentlyTyping, setCurrentlyTyping] = useState<string[]>([]);
  api.chat.whoIsTyping.useSubscription(undefined, {
    onData(data) {
      setCurrentlyTyping(data);
    },
  });
  return (
    <>
      <SafeAreaView>
        <Stack.Screen
          options={{ title: communityRouter.data?.name as string }}
        />
        <View>
          <Text>{`Community Page for ${communityRouter.data?.name}`}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Community;
