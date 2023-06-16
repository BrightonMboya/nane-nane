import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

const Index = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { data } = api.users.profile.useQuery({
    email: user?.primaryEmailAddress?.emailAddress as string,
  });

  const profileInfo = {
    username: "",
    currentRole: "",
    location: "",
    about: "",
    email: "",
    classOf: "",
  };

  const [profileData, setProfileData] = React.useState(profileInfo);
  const router = useRouter();
  const { mutate, error } = api.users.editProfile.useMutation({
    async onSuccess() {
      // invalidating the cache
      //@ts-ignore
      await utils.users.profile.invalidate();
      router.push("/profile");
    },
  });
  const utils = api.useContext();

  function editProfile() {
    mutate(profileData);
    console.log(profileData, "profileData");
    setProfileData(profileInfo);
  }

  React.useEffect(() => {
    setProfileData({
      ...profileData,
      username: data?.username as string,
      currentRole: data?.currentRole as string,
      location: data?.location as string,
      about: data?.about as string,
      email: user?.primaryEmailAddress?.emailAddress as string,
      classOf: data?.classOf as string,
    });
    return;
  }, [data]);
  return (
    <SafeAreaView className="relative bg-[#f2f2f2]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <Stack.Screen
          options={{
            title: "Editing",
          }}
        />
        <ScrollView>
          <View className="flex flex-col items-center ">
            <View className="relative mt-[25px] min-h-[280px] w-[350px] rounded-md border-[1px] border-[#ddd] bg-white shadow-md">
              <Image
                source={{
                  uri: user?.profileImageUrl,
                }}
                className="absolute left-[37%] top-[-30px] h-20 w-20 rounded-full"
              />
              <View className="mt-[60px] pl-[20px] ">
                <View className="flex flex-col gap-2">
                  <P style="text-[16px]" textType="medium">
                    Name
                  </P>
                  <TextInput
                    value={profileData.username}
                    placeholder="Your Name"
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, username: text })
                    }
                    className="font-regular w-[250px] rounded-md border-b-[1px] border-[#000] pb-2 "
                  />
                </View>

                <View className="flex flex-col gap-1 pt-5">
                  <P style="text-[16px] " textType="medium">
                    Current Role
                  </P>
                  <TextInput
                    value={profileData.currentRole}
                    placeholder="Your current Role"
                    placeholderTextColor={"#000"}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, currentRole: text })
                    }
                    className="font-regular w-[250px] rounded-md border-b-[1px] border-[#000] pb-2 "
                  />
                </View>

                <View className="flex flex-col gap-1 pt-5">
                  <P style="text-[16px] " textType="medium">
                    Location
                  </P>
                  <TextInput
                    value={profileData.location}
                    placeholder="Your current location"
                    placeholderTextColor={"#000"}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, location: text })
                    }
                    className="font-regular w-[250px] rounded-md border-b-[1px] border-[#000] pb-2 "
                  />
                </View>
              </View>
            </View>

            <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
              <View className="flex flex-col gap-1 pl-5 pt-5">
                <P style="text-[16px] font-medium">About</P>
                <TextInput
                  value={profileData.about}
                  placeholder="Add Your bio"
                  numberOfLines={40}
                  placeholderTextColor={"#000"}
                  multiline={true}
                  onChangeText={(text) =>
                    setProfileData({ ...profileData, about: text })
                  }
                  className="font-regular w-[250px] rounded-md border-b-[1px] border-[#000] pb-2 "
                />
              </View>
              <View className="flex flex-col gap-1 pl-5 pt-5">
                <P style="text-[16px] " textType="medium">
                  Class Of
                </P>
                <TextInput
                  value={profileData.classOf}
                  placeholder="The Year you started studies"
                  numberOfLines={40}
                  placeholderTextColor={"#000"}
                  onChangeText={(text) =>
                    setProfileData({ ...profileData, classOf: text })
                  }
                  className="font-regular w-[250px] rounded-md border-b-[1px] border-[#000] pb-2 "
                />
              </View>
            </View>

            <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
              <View className=" pl-5 pt-5">
                <P style="text-base">Mentoring Areas</P>
              </View>
            </View>
            <TouchableOpacity onPress={editProfile}>
              <View className="mt-5 w-[100px] rounded-md bg-pink-500 ">
                <P style="px-4 py-2 text-center text-lg font-medium text-white">
                  Edit
                </P>
              </View>
            </TouchableOpacity>

            <View className="mt-5 h-10" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Index;
