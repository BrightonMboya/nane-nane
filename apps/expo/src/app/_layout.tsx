import React from "react";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import IoniIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  // This example uses a basic Layout component, but you can use any Layout.
  Slot,
  // Import `SplashScreen` from `expo-router` instead of `expo-splash-screen`
  SplashScreen,
  Stack,
  useRouter,
} from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import SignUpScreen from "~/components/Signup";

// fn to secure the cache from clerk
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey="pk_test_aG9uZXN0LWJvYmNhdC01OS5jbGVyay5hY2NvdW50cy5kZXYk"
      tokenCache={tokenCache}
    >
      <SignedIn>
        <TRPCProvider>
          <SafeAreaProvider className="relative">
            {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
            <Stack
            // screenOptions={{
            //   headerStyle: {
            //     backgroundColor: "#f472b6",
            //   },
            // }}
            />
            <StatusBar />
            <BottomTab />
          </SafeAreaProvider>
        </TRPCProvider>
      </SignedIn>
      <SignedOut>
        <SignUpScreen />
      </SignedOut>
    </ClerkProvider>
  );
};

export default RootLayout;

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
