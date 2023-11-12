import { SafeAreaView, ScrollView, View } from "react-native";
import * as Linking from "expo-linking";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

const Index: React.FC = () => {
  const { id } = useSearchParams();
  //   if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data, isLoading, error } =
  //@ts-ignore
    api.resources.learningResourceById.useQuery({ id });
  //   if (!data) return <SplashScreen />;

  return (
    <SafeAreaView className="">
      <Stack.Screen
        options={{ title: "", headerStyle: { backgroundColor: "#fgjg34" } }}
      />
      <ScrollView>
        <View className="pl-5 pt-5">
          <View className="pb-[2rem]">
            <P style="text-xl mt-2 font-medium">{data?.title}</P>
            <P style="mt-2 text-purple-500">{`Category: ${data?.category}`}</P>

            <P style="mt-5 text-base tracking-wider">{data?.description}</P>
          </View>

          {isLoading && <P>Loading...</P>}
          {error && <P style="text-red-500">{error.message}</P>}
        </View>
        <View className="mt-5 h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
