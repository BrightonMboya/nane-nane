import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

import { api, type RouterOutputs } from "~/utils/api";
import SideBar from "~/components/SideBar";
import TweetCard, { type Post } from "~/components/TweetCard";

const Index = () => {
  const [search, setSearch] = useState<string>("");
  const postQuery = api.post.all.useQuery();
  const router = useRouter();

  return (
    <SafeAreaView className="relative min-h-screen bg-[#f2f2f2]">
      <ScrollView>
        <Stack.Screen options={{ title: "Home Page", headerShown: false }} />
        <View className="">
          <TouchableOpacity
            onPress={() => {
              router.push(`/profile`);
            }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60.jpg",
              }}
              className="absolute right-5 top-5 h-10 w-10 rounded-full"
            />
          </TouchableOpacity>

          <SideBar />
        </View>

        <View className="mt-[80px] flex flex-col items-center justify-center space-y-5 ">
          <TextInput
            className="h-[50px] w-[300px] rounded-md border-[1px] border-[#ddd] px-5 "
            placeholder="Search for your favourite profiles"
            onChangeText={(text) => setSearch(text)}
            defaultValue={search}
          />

          {postQuery.data
            ?.filter((profile) => {
              if (search === "") {
                return profile;
              } else if (
                profile.name?.toLowerCase().includes(search.toLowerCase())
              ) {
                return profile;
              }
            })
            .map((post) => (
              <TweetCard key={post.id} post={post as Post} />
            ))}

          {postQuery.isLoading && <Text>Loading...</Text>}
          {postQuery.isError && <Text>Error...</Text>}
        </View>
        <View className="mt-5 h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
