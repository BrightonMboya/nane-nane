import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  // This example uses a basic Layout component, but you can use any Layout.
  Slot,
  // Import `SplashScreen` from `expo-router` instead of `expo-splash-screen`
  SplashScreen,
  Stack,
  useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "~/utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <TRPCProvider>
      <SafeAreaProvider className="relative">
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f472b6",
            },
          }}
        />
        <StatusBar />
        <BottomTab />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export default RootLayout;

const BottomTab: React.FC = () => {
  const router = useRouter();
  return (
    <View className="absolute bottom-0 flex h-[60px] w-full flex-row items-center justify-around border-t-[1px] border-[#ddd] bg-white">
      <TouchableHighlight
        onPress={() => {
          router.push("/Index");
        }}
      >
        <AntDesign name="home" size={25} color="#ddd" />
      </TouchableHighlight>
      <AntDesign name="search1" size={25} color="#ddd" />

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
        <AntDesign name="hearto" size={25} color="#ddd" />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          router.push("/profile");
        }}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          className="h-10 w-10 rounded-full"
        />
      </TouchableHighlight>
    </View>
  );
};
