import {
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";

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
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/resources/${post.id}`);
      }}
    >
      <View className="w-[350px] gap-1 border-b-[1px] border-b-gray-300 pb-3 pt-5">
        <Text className="text-lg font-medium">{post.title}</Text>
        <Text className="text-[15px]">{post.company}</Text>
        <Text className="text-gray-700">4 days ago</Text>
      </View>
    </TouchableOpacity>
  );
};

const Index = () => {
  const jobsRouter = api.resources.all.useQuery();
  const router = useRouter();
  return (
    <SafeAreaView className="relative bg-[#f2f2f2] ">
      <ScrollView>
        <Stack.Screen options={{ title: "Profile Page", headerShown: false }} />
        <View className="flex flex-col items-center">
          <View className="mt-5 flex h-[100px] w-[300px] flex-col items-center rounded-md">
            <Text className="font-medium">
              Want to help the ALU community get hired?
            </Text>
            <TouchableHighlight
              onPress={() => router.push("/resources/addJob")}
            >
              <Text className="rounded-base mt-3 w-[170px] bg-indigo-500 px-1  py-2  text-center text-base text-white">
                Share Opportunity
              </Text>
            </TouchableHighlight>
          </View>

          <View className="mt-5 flex w-[350px] flex-col items-center rounded-md border-[1px]  border-[#ddd] bg-[#fffdfd] py-5 shadow-md">
            <Text className="text-center font-medium">
              HandShake: For early career job hunters and seekers
            </Text>
            <Text className="mt-3  tracking-wide">
              If you are a recent graduate looking for an additional job
              opportunity, or you represent an organization seeking to hire
              young talent. Please visit the university employer connection
              system
            </Text>

            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.alueducation.com/")}
            >
              <Text className="mt-4 w-[120px] bg-purple-500 px-4 py-2 text-center text-base text-white">
                HandShake
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="mt-5 pl-5 text-base font-medium">Available Jobs</Text>

        <View className="mt-1 flex flex-col  pl-5">
          {jobsRouter.data?.map((job) => (
            <JobPost post={job} key={job.id} />
          ))}
        </View>
        {jobsRouter.isLoading && <Text>Loading...</Text>}
        {jobsRouter.isError && (
          <Text className="text-red-500">{jobsRouter.error.message}</Text>
        )}
        <View className="mt-5 h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
