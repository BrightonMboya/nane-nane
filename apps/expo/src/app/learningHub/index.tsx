import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

interface jobPost {
  id: string;
  title?: string;
  category?: string;
  description?: string;
}

const JobPost: React.FC<{
  post: jobPost;
}> = ({ post }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/learningHub/${post.id}`);
      }}
    >
      <View className="w-[350px] gap-1 border-b-[1px] border-b-gray-300 pb-3 pt-5">
        <P style="text-lg text-green-600 font-medium" textType="medium">
          {post.title}
        </P>
        <P style=" text-pink-600 text-[15px] ">{post.category}</P>
        <P style="text-gray-700">4 days ago</P>
      </View>
    </TouchableOpacity>
  );
};

const Index = () => {
  const { data, isLoading, isError, error } =
    api.resources.learningResources.useQuery();
  const router = useRouter();
  return (
    <SafeAreaView className="relative bg-[#f2f2f2] ">
      <ScrollView>
        <Stack.Screen options={{ title: "Learning Hub" }} />
        <View className="flex flex-col items-center">
          <View className="mt-5 ">
            <P style="text-lg" textType="regular">
              Learning Hub,
            </P>
            <P style="text-lg pt-2" textType="medium">
              Here you will learn different skills and get access to resources
              that will elavate different aspects of your career.
            </P>
          </View>
        </View>

        <P
          style="text-base font-medium pl-3 mt-5 text-indigo-500"
          textType="medium"
        >
          Available Resources
        </P>

        <View className="mt-1 flex flex-col  pl-5">
          {data?.map((job: jobPost) => (
            <JobPost post={job} key={job.id} />
          ))}
        </View>
        {isLoading && <P>Loading...</P>}
        {isError && <P style="text-red-500">{error.message}</P>}
        {!data && !isLoading && !isError && (
          <P style="text-lg" textType="medium">
            No events found
          </P>
        )}
        <View className="mt-5 h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
