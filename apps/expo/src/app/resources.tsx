import {
  Button,
  ScrollView,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { api } from "~/utils/api";

interface jobPost {
  id: string;
  title?: string;
  company?: string;
  location?: string;
  description?: string;
}

const JobPost: React.FC<{
  post: jobPost;
}> = ({ post }) => {
  return (
    <>
      <View className="w-[350px] gap-1 border-b-[1px] border-b-gray-300 pb-3 pt-5">
        <Text className="text-xl font-medium">{post.title}</Text>
        <Text className="text-[15px]">{post.company}</Text>
        <Text className="text-gray-700">4 days ago</Text>
      </View>
    </>
  );
};

const Index = () => {
  const jobsRouter = api.resources.all.useQuery();
  return (
    <SafeAreaView className="relative bg-[#f2f2f2]">
      <ScrollView>
        <Stack.Screen options={{ title: "Profile Page", headerShown: false }} />
        <View className="mt-5 flex flex-col items-center">
          <Text className="text-lg">
            Want to help the ALU community get hired?
          </Text>
          <TouchableHighlight>
            <Text className="rounded-base mt-3 w-[170px] bg-pink-500  px-1  py-2 text-center text-lg">
              Share Opportunity
            </Text>
          </TouchableHighlight>
        </View>
        <View className="mt-5 flex flex-col  pl-5">
          {jobsRouter.data?.map((job) => (
            <JobPost post={job} />
          ))}
        </View>
        {jobsRouter.isLoading && <Text>Loading...</Text>}
        {jobsRouter.isError && (
          <Text className="text-red-500">{jobsRouter.error.message}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
