import { Button, Image, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import IoniIcons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

export interface Post {
  id: string;
  name?: string;
  title?: string;
  content?: string;
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

export default TweetCard;
