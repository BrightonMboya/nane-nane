import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import IoniIcons from "react-native-vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

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
    <View style={styles.card}>
      <View style={styles.profile}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
        <Text style={{ fontSize: 15 }}>{post.name}</Text>
        <Button
          title="Follow"
          onPress={() => {
            router.push(`/post/${post.id}`);
          }}
        />
      </View>

      <Text style={{ marginTop: 2, paddingLeft: 10 }}>{post.content}</Text>
      <View style={styles.iconView}>
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
    <SafeAreaView className="">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page", headerShown: false }} />

      <ScrollView>
        <View style={styles.nav}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60.jpg",
            }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
          <View>
            <Text style={{ fontSize: 20 }}>Brighton Mboya</Text>
            <Text style={{ marginTop: 5 }}>Senior Manager at Netflix!!</Text>
          </View>

          <Button
            title="Edit"
            // onPress={() => navigation.navigate("Profile", { name: "Jane" })}
          />
        </View>
        <View style={[styles.container, styles.cardRow]}>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              width: 300,
              padding: 10,
              borderRadius: 5,
            }}
            placeholder="Search for your favourite profiles"
            onChangeText={(text) => setSearch(text)}
            defaultValue={search}
          />
          {/* <FlashList
            data={postQuery.data}
            renderItem={(item) => <Card post={item} />}
          /> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nav: {
    marginTop: 70,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  cardRow: {
    gap: 20,
    marginTop: 40,
  },
  card: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    width: 350,
    height: 130,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
});

export default Index;
