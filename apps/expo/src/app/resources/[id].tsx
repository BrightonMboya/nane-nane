import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";

const Post: React.FC = () => {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.resources.byId.useQuery({ id });
  //   if (!data) return <SplashScreen />;

  return (
    <SafeAreaView className="">
      <Stack.Screen />
      <ScrollView>
        <View className="pl-5 pt-5">
          <Text className="mt-[5rem] text-3xl font-bold text-green-500">
            The Job listing post
          </Text>

          <View className="flex flex-col ">
            <Text className="mt-5 text-xl font-medium">{data?.title}</Text>
            <Text className="mt-2 text-purple-500">{`${data?.company}, ${data?.location}`}</Text>
            <TouchableHighlight>
              <Text className="mt-3 w-[90px] bg-indigo-500  px-4 py-2 text-center text-lg font-medium text-white">
                Apply
              </Text>
            </TouchableHighlight>
            <Text className="mt-5 text-base tracking-wider">
              {data?.description}
            </Text>
          </View>

          {/* <Text className="py-4 text-white">{data.content}</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
