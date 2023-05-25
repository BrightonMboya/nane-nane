import React from "react";
import { TouchableHighlight, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  // This example uses a basic Layout component, but you can use any Layout.
  Slot,
  // Import `SplashScreen` from `expo-router` instead of `expo-splash-screen`
  SplashScreen,
  Stack,
  useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";

import { TRPCProvider } from "~/utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

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
          router.push("/");
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
