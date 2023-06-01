import React from "react";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import IoniIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const BottomTab: React.FC = () => {
  const router = useRouter();
  return (
    <View className="] absolute bottom-0 flex h-[60px] w-full flex-row items-center justify-around border-t-[1px] border-[#ddd] bg-white">
      <TouchableHighlight
        onPress={() => {
          router.push("/");
        }}
      >
        <AntDesign name="home" size={25} color="#ddd" />
      </TouchableHighlight>
      {/* <AntDesign name="search1" size={25} color="#ddd" /> */}
      <TouchableOpacity
        onPress={() => {
          router.push("/communities");
        }}
      >
        <IoniIcons name="people-outline" size={25} color="#ddd" />
      </TouchableOpacity>

      <TouchableHighlight
        onPress={() => {
          router.push("/post/add");
        }}
      >
        <AntDesign name="pluscircleo" size={25} color="#ddd" />
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => {
          router.push("/resources");
        }}
      >
        <MaterialCommunityIcons
          name="briefcase-edit-outline"
          size={25}
          color="#ddd"
        />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          router.push("/profile");
        }}
      >
        <AntDesign name="mail" size={25} color="#ddd" />
      </TouchableHighlight>
    </View>
  );
};

export default BottomTab;
