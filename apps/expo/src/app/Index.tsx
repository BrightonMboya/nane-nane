import { useState } from "react";
import { Button, Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import IoniIcons from "react-native-vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";

import { api, type RouterOutputs } from "~/utils/api";

// import { profiles } from "../components/dummyData";
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
    <View className="mt-5 h-[130px] w-[350px] rounded-md border-[1px] border-[#ddd]">
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
      <View className="mt-5 flex flex-row space-x-1 pl-5">
        <AntDesign name="like2" size={15} color="#ddd" />
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
  return (
    <SafeAreaView className="bg-[#f2f2f2]">
      <Stack.Screen options={{ title: "Home Page", headerShown: false }} />

      <ScrollView>
        <View className="flex flex-row items-center gap-3 pl-5 pt-5">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60.jpg",
            }}
            className="h-20 w-20 rounded-full"
          />
          <View>
            <Text className="text-lg">Brighton Mboya</Text>
            <Text className="pt-1 text-base">Senior Manager at Netflix!!</Text>
          </View>

          <Button
            title="Edit"
            // onPress={() => navigation.navigate("Profile", { name: "Jane" })}
          />
        </View>

        <View className="mt-[40px] flex flex-col items-center justify-center space-y-5 bg-white">
          <TextInput
            className="h-[50px] w-[300px] rounded-md border-[1px] border-gray-500 px-5 "
            placeholder="Search for your favourite profiles"
            onChangeText={(text) => setSearch(text)}
            defaultValue={search}
          />

          {postQuery.data
            ?.filter((profile: Post) => {
              if (search === "") {
                return profile;
              } else if (
                profile.name?.toLowerCase().includes(search.toLowerCase())
              ) {
                return profile;
              }
            })
            .map((post: Post) => (
              <Card key={post.id} post={post} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
