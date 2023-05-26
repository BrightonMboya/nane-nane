import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";

const Community = () => {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");

  const communityRouter = api.post.getCommunityById.useQuery(id as string);
  if (!communityRouter.data) return <SplashScreen />;
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
