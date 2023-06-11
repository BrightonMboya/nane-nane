import { SafeAreaView, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

const Post: React.FC = () => {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.post.byId.useQuery({ id });

  if (!data) return <SplashScreen />;

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: data.title as string }} />
      <View className="h-full w-full p-4">
        <P style="py-2 text-3xl text-white" textType="semiBold">
          {data.title}
        </P>
        <P style="py-4 text-white">{data.content}</P>
      </View>
    </SafeAreaView>
  );
};

export default Post;
