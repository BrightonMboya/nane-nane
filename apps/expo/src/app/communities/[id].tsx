import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";
import AddMessageForm from "~/components/Chat/AddMessageForm";
import KeyBoardAvoidView from "~/components/DesignSys/KeyBoardAvoidView";
import P from "~/components/DesignSys/Text";

const Community = () => {
  const { id } = useSearchParams();
  // if (!id || typeof id !== "string") throw new Error("unreachable");

  const communityRouter = api.post.getCommunityById.useQuery(id as string);
  // if (!communityRouter.data) return <SplashScreen />;

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
  const scrollTargetRef = useRef(null);

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
  // useEffect(() => {
  //   scrollToBottomOfList();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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

  // some animations for the keyboard
  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }],
    };
  });

  return (
    <KeyBoardAvoidView>
      <SafeAreaView>
        <ScrollView>
          <Stack.Screen
            options={{ title: communityRouter.data?.name as string }}
          />
          <View className="flex h-screen flex-col md:flex-row">
            <View className="flex-1 overflow-y-hidden md:h-screen">
              <View className="flex h-full flex-col justify-end space-y-4 bg-gray-700 p-4">
                <View className="space-y-4 overflow-y-auto">
                  <TouchableOpacity onPress={() => fetchPreviousPage()}>
                    <View className="w-[170px] rounded-md bg-indigo-600 py-4">
                      <P style="text-white text-center" textType="medium">
                        {isFetchingPreviousPage
                          ? "Loading more..."
                          : hasPreviousPage
                          ? "Load More"
                          : "Nothing more to load"}
                      </P>
                    </View>
                  </TouchableOpacity>

                  <View className="space-y-4">
                    {messages?.map(
                      (item: {
                        id: string;
                        createdAt: Date;
                        text: string;
                        source: string;
                        name: string;
                      }) => (
                        <View key={item.id}>
                          <View className="flex flex-row items-center text-sm">
                            <P style="text-base text-white" textType="medium">
                              {item.source === "RAW" ? (
                                item.name
                              ) : (
                                <P
                                // href={`https://github.com/${item.name}`}
                                // target="_blank"
                                // rel="noreferrer"
                                >
                                  {item.name}
                                </P>
                              )}
                            </P>
                            <P style="text-gray-500 ml-3 text-xs">
                              {new Intl.DateTimeFormat("en-GB", {
                                dateStyle: "short",
                                timeStyle: "short",
                              }).format(item.createdAt)}
                            </P>
                          </View>
                          <P style="whitespace-pre-line text-lg leading-tight">
                            {item.text}
                          </P>
                        </View>
                      ),
                    )}
                    <View ref={scrollTargetRef}></View>
                  </View>
                </View>
                <View className="">
                  {/* <Animated.View style={translateStyle}> */}
                  <AddMessageForm
                    onMessagePost={() => scrollToBottomOfList()}
                  />
                  {/* </Animated.View> */}
                  <P style="h-2 italic text-gray-400">
                    {currentlyTyping.length
                      ? `${currentlyTyping.join(", ")} typing...`
                      : ""}
                  </P>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyBoardAvoidView>
  );
};

export default Community;
