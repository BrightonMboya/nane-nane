import { Image, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

const profileData = {
  mentoringAread: ["Software Engineering", "Product Management", "UX Design"],
  experience: [
    {
      company: "Google",
      role: "Software Engineer",
      duration: "2019 - Present",
    },
    {
      company: "Facebook",
      role: "Software Engineer",
      duration: "2017 - 2019",
    },
  ],
};

const Index = () => {
  const { user } = useUser();
  const { data, isLoading, isError } = api.users.profile.useQuery({
    email: user?.primaryEmailAddress?.emailAddress as string,
  });
  // console.log(data, "data");
  const { signOut } = useAuth();
  const router = useRouter();
  return (
    <SafeAreaView className="relative bg-[#f2f2f2]">
      <Stack.Screen
        options={{
          title: "",
        }}
      />
      <ScrollView>
        {isLoading && <P>Loading ...</P>}
        {isError && <P>Error while fetching</P>}
        {data && (
          <View className="flex flex-col items-center ">
            <View className="relative mt-[25px] max-h-[300px] w-[350px] rounded-md border-[1px] border-[#ddd] bg-white shadow-md">
              <Image
                source={{
                  uri: user?.profileImageUrl
                    ? user?.profileImageUrl
                    : "https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg",
                }}
                className="absolute left-[37%] top-[-30px] h-20 w-20 rounded-full"
              />
              <View className="mt-[60px] flex flex-col items-center">
                <P style="text-lg" textType="medium">
                  {data?.username}
                </P>
                <P>{data?.currentRole}</P>
                <View className="flex flex-row gap-3 pt-[10px]">
                  <P>{data?.location}</P>
                  <P>{`Class of ${data?.classOf}`}</P>
                </View>
                <View className="flex flex-row  items-center gap-3 pt-2">
                  <TouchableOpacity onPress={() => signOut()}>
                    <View className="mb-5 h-[40px] w-[100px] rounded-md bg-red-500">
                      <P
                        style="px-4 py-2 text-center text-base text-white"
                        textType="medium"
                      >
                        Sign Out
                      </P>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.push("/profile/edit")}
                  >
                    <View className="mb-5 h-[40px] w-[110px] rounded-md bg-indigo-500">
                      <P
                        style="px-4 py-2 text-center text-base text-white"
                        textType="medium"
                      >
                        Edit Profile
                      </P>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
              <View className=" pl-5 pt-5">
                <P style="text-base" textType="medium">
                  About
                </P>
                <P style="mt-2 text-sm ">
                  {data?.about ? data.about : "No Bio "}
                </P>
              </View>
            </View>

            <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
              <View className=" pl-5 pt-5">
                <P style="text-base" textType="medium">
                  Mentoring Areas
                </P>
                <View className="flex flex-col gap-3 pt-3">
                  {profileData.mentoringAread.map((area) => (
                    <View
                      className="max-w-[200px] rounded-md bg-[#f2f2f2] px-3 py-1 text-center"
                      key={area}
                    >
                      <P style="text-center">{area}</P>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
              <View className=" pl-5 pt-5">
                <P style="text-base" textType="medium">
                  Experience
                </P>
                <View className="flex flex-col gap-3 pt-3">
                  {profileData.experience.map((exp) => (
                    <View
                      className="max-w-[200px] rounded-md  "
                      key={exp.company}
                    >
                      <P style="text-lg font-medium ">{exp.company}</P>
                      <P style="">{exp.role}</P>
                      <P style="text-gray-700">{exp.duration}</P>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View className="mt-5 h-10" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
