import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

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
        <P style="text-lg font-medium" textType="medium">
          {post.title}
        </P>
        <P style="text-[15px]">{post.company}</P>
        <P style="text-gray-700">4 days ago</P>
      </View>
    </TouchableOpacity>
  );
};

const Index = () => {
  const { data, isLoading, isError, error } = api.resources.all.useQuery();
  const router = useRouter();
  return (
    <SafeAreaView className="relative bg-[#f2f2f2] ">
      <ScrollView>
        <Stack.Screen options={{ title: "Profile Page", headerShown: false }} />
        <View className="flex flex-col items-center">
          <View className="mt-5 flex h-[100px] w-[300px] flex-col items-center rounded-md">
            <P style="font-medium text-center">
              Want to help the ALU community get hired?
            </P>
            <TouchableOpacity onPress={() => router.push("/resources/addJob")}>
              <P style="rounded-base mt-3 w-[170px] bg-indigo-500 px-1  py-2  text-center text-base text-white">
                Share Opportunity!
              </P>
            </TouchableOpacity>
          </View>

          <View className="mt-5 flex w-[350px] flex-col items-center rounded-md border-[1px]  border-[#ddd] bg-[#fffdfd] py-5 shadow-md">
            <P style="text-center font-medium" textType="medium">
              HandShake: For early career job hunters and seekers
            </P>
            <P style="mt-3 text-center tracking-wide">
              If you are a recent graduate looking for an additional job
              opportunity, or you represent an organization seeking to hire
              young talent. Please visit the university employer connection
              system
            </P>

            <TouchableOpacity
              onPress={() => Linking.openURL("https://www.alueducation.com/")}
            >
              <P style="mt-4  bg-purple-500 px-4 py-2 text-center text-base text-white">
                HandShake
              </P>
            </TouchableOpacity>
          </View>
        </View>

        <P style="mt-5 pl-5 text-base font-medium">Available Jobs</P>

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
