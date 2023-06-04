import { useState } from "react";
import { Button, Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import IoniIcons from "react-native-vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";

import { api, type RouterOutputs } from "~/utils/api";

global.TextEncoder = require("text-encoding").TextEncoder;

// import SideBar from "~/components/Sidebar";

interface Post {
  id: string;
  name?: string;
  title?: string;
  content?: string;
}

const Card: React.FC<{
  post: Post;
}> = ({ post }) => {
  const router = useRouter();
  return (
    <View className="mt-5 h-[130px] w-[350px] rounded-md border-[1px] border-[#ddd] bg-white shadow-md ">
      <View className="flex flex-row items-center space-x-3 pl-5 pt-5">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          className="h-10 w-10 rounded-full"
        />

        <Text className="text-base">{post.name}</Text>
        <Button
          title="Follow"
          onPress={() => {
            router.push(`/post/${post.id}`);
          }}
        />
      </View>

      <Text className="mt-2  pl-5">{post.content}</Text>
      <View className="mt-5 flex flex-row items-center space-x-1 pl-5">
        <AntDesign name="hearto" size={15} color="#ddd" />
        <IoniIcons name="chatbubble-outline" size={15} color="#ddd" />
        <IoniIcons name="paper-plane-outline" size={15} color="#ddd" />
      </View>
    </View>
  );
};

const Index = () => {
  const utils = api.useContext();
  const [search, setSearch] = useState<string>("");
  const postQuery = api.post.all.useQuery();
  const router = useRouter();
  return (
    <SafeAreaView className="relative bg-[#f2f2f2]">
      <ScrollView>
        <Stack.Screen options={{ title: "Home Page", headerShown: false }} />
        <View className="">
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}

          {/* <SideBar /> */}
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
              <Card key={post.id} post={post as Post} />
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
