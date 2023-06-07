import { Image, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";

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
  const { isLoaded, isSignedIn, user } = useUser();
  const { data } = api.users.profile.useQuery({
    email: user?.primaryEmailAddress?.emailAddress as string,
  });
  console.log(data, "data");
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
        <View className="flex flex-col items-center ">
          <View className="relative mt-[25px] max-h-[300px] w-[350px] rounded-md border-[1px] border-[#ddd] bg-white shadow-md">
            <Image
              source={{
                uri: user?.profileImageUrl,
              }}
              className="absolute left-[37%] top-[-30px] h-20 w-20 rounded-full"
            />
            <View className="mt-[60px] flex flex-col items-center">
              <Text className="text-lg">{data?.username}</Text>
              <Text>{data?.currentRole}</Text>
              <View className="flex flex-row gap-3 pt-[10px]">
                <Text>{data?.location}</Text>
                <Text>{`Class of ${data?.classOf}`}</Text>
              </View>
              <View className="flex flex-row  items-center gap-3 pt-2">
                <TouchableOpacity onPress={() => signOut()}>
                  <View className="mb-5 h-[40px] w-[100px] rounded-md bg-red-500">
                    <Text className="px-4 py-2 text-center text-base font-medium text-white">
                      Sign Out
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/profile/edit")}>
                  <View className="mb-5 h-[40px] w-[110px] rounded-md bg-indigo-500">
                    <Text className="px-4 py-2 text-center text-base font-medium text-white">
                      Edit Profile
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
            <View className=" pl-5 pt-5">
              <Text className="text-base">About</Text>
              <Text className="mt-3 text-base ">
                {data?.about ? data.about : "No Bio "}
              </Text>
            </View>
          </View>

          <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
            <View className=" pl-5 pt-5">
              <Text className="text-base">Mentoring Areas</Text>
              <View className="flex flex-col gap-3 pt-3">
                {profileData.mentoringAread.map((area) => (
                  <View
                    className="max-w-[200px] rounded-md bg-[#f2f2f2] px-3 py-1 text-center"
                    key={area}
                  >
                    <Text className="text-center">{area}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
            <View className=" pl-5 pt-5">
              <Text className="text-base">Experience</Text>
              <View className="flex flex-col gap-3 pt-3">
                {profileData.experience.map((exp) => (
                  <View
                    className="max-w-[200px] rounded-md  "
                    key={exp.company}
                  >
                    <Text className="text-lg font-medium ">{exp.company}</Text>
                    <Text className="">{exp.role}</Text>
                    <Text className="text-gray-700">{exp.duration}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View className="mt-5 h-10" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
