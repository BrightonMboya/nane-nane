import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Linking from "expo-linking";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";

type openURLButtonProps = {
  url: string;
  children: string;
};

const Post: React.FC = () => {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data, isLoading, error } = api.resources.byId.useQuery({ id });
  //   if (!data) return <SplashScreen />;

  return (
    <SafeAreaView className="">
      <Stack.Screen />
      <ScrollView>
        <View className="pl-5 pt-5">
          <View className="pb-[2rem]">
            <Text className="mt-2 text-xl font-medium">{data?.title}</Text>
            <Text className="mt-2 text-purple-500">{`${data?.company}, ${data?.location}`}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(data?.link as string)}
            >
              <Text className="mt-2 w-[80px] bg-purple-500 px-4 py-1 text-center text-lg text-white">
                Apply
              </Text>
            </TouchableOpacity>
            {/* <Button
              title="Apply"
              onPress={() => Linking.openURL(data?.link as string)}
              style={{ backgroundColor: "purple" }}
            /> */}

            <Text className="mt-5 text-base tracking-wider">
              {data?.description}
            </Text>
          </View>

          {isLoading && <Text>Loading...</Text>}
          {error && <Text className="text-red-500">{error.message}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
