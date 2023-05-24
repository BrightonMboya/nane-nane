import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

// import { api } from "~/utils/api";

const Post: React.FC = () => {
  //   const { id } = useSearchParams();
  //   if (!id || typeof id !== "string") throw new Error("unreachable");
  //   const { data } = api.post.byId.useQuery({ id });

  //   if (!data) return <SplashScreen />;

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen />
      <View className="">
        <Text className="mt-[5rem] text-3xl font-bold text-green-500">
          The Job listing post
        </Text>
        {/* <Text className="py-4 text-white">{data.content}</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default Post;
