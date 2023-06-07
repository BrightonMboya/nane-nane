import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";

const Index = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { data } = api.users.profile.useQuery({
    email: user?.primaryEmailAddress?.emailAddress as string,
  });

  const [userName, setUserName] = React.useState("");
  const [currentRole, setCurrentRole] = React.useState("");

  // const profileInfo = {
  //   userName: data?.username as string,
  //   currentRole: data?.currentRole as string,
  // };
  const profileInfo = {
    userName: "",
    currentRole: "",
    location: "",
  };

  const [profileData, setProfileData] = React.useState(profileInfo);

  function editProfile() {
    console.log(profileData.userName, profileData.currentRole);
  }

  React.useEffect(() => {
    setProfileData({
      ...profileData,
      userName: data?.username as string,
      currentRole: data?.currentRole as string,
    });
    return;
  }, [data]);
  return (
    <SafeAreaView className="relative bg-[#f2f2f2]">
      <Stack.Screen
        options={{
          title: "Editing",
        }}
      />
      <ScrollView>
        <View className="flex flex-col items-center ">
          <View className="relative mt-[25px] h-[260px] w-[350px] rounded-md border-[1px] border-[#ddd] bg-white shadow-md">
            <Image
              source={{
                uri: user?.profileImageUrl,
              }}
              className="absolute left-[37%] top-[-30px] h-20 w-20 rounded-full"
            />
            <View className="mt-[60px] pl-5">
              <View className="flex flex-col gap-2">
                <Text className="text-[16px] font-medium">Name</Text>
                <TextInput
                  value={profileData.userName}
                  placeholder="Your Name"
                  onChangeText={(text) =>
                    setProfileData({ ...profileData, userName: text })
                  }
                  className="font-regular w-[250px] rounded-md border-b-[1px] border-[#000] pb-2 "
                />
              </View>

              <View className="flex flex-col gap-1 pt-5">
                <Text className="text-[16px] font-medium">Current Role</Text>
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
                <Text className="text-[16px] font-medium">Location</Text>
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
            <View className=" pl-5 pt-5">
              <Text className="text-base">About</Text>
            </View>
          </View>

          <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
            <View className=" pl-5 pt-5">
              <Text className="text-base">Mentoring Areas</Text>
            </View>
          </View>

          <View className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
            <View className=" pl-5 pt-5">
              <Text className="text-base">Experience</Text>
            </View>
            <TouchableOpacity onPress={editProfile}>
              <View className="flex h-10 w-[350px] flex-row items-center justify-center rounded-md border-[1px] border-[#ddd] bg-[#f2f2f2] shadow-md">
                <Text className="text-base">Edit Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="mt-5 h-10" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
