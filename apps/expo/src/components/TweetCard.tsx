import { Button, Image, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import IoniIcons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

import P from "./DesignSys/Text";

export interface Post {
  id: string;
  name?: string;
  title?: string;
  content?: string;
  profileUrl?: string;
}

const TweetCard: React.FC<{
  post: Post;
}> = ({ post }) => {
  const router = useRouter();
  return (
    <View className="mt-5 min-h-[130px] w-[350px] rounded-md border-[1px] border-[#ddd] bg-white shadow-md ">
      <View className="flex flex-row items-center space-x-3 pl-5 pt-5">
        <Image
          source={{
            uri: post.profileUrl
              ? post.profileUrl
              : "https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg",
          }}
          className="h-10 w-10 rounded-full"
        />

        <P style="text-base ml-3 ">{post.name}</P>
        {/* <Button
          title="Follow"
          onPress={() => {
            router.push(`/post/${post.id}`);
          }}
        /> */}
      </View>

      <P style="mt-2 pl-5">{post.content}</P>
      {/* <View className="mt-5 flex flex-row items-center space-x-1 pl-5">
        <AntDesign name="hearto" size={15} color="#ddd" />
        <IoniIcons name="chatbubble-outline" size={15} color="#ddd" />
        <IoniIcons name="paper-plane-outline" size={15} color="#ddd" />
      </View> */}
    </View>
  );
};

export default TweetCard;
