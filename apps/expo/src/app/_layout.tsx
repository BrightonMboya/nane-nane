import "react-native-gesture-handler";
import "text-encoding-polyfill";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  // This example uses a basic Layout component, but you can use any Layout.
  Slot,
  // Import `SplashScreen` from `expo-router` instead of `expo-splash-screen`
  SplashScreen,
  Stack,
} from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import BottomTab from "~/components/BottomTab";
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
      <TRPCProvider>
        <SignedIn>
          <SafeAreaProvider className="relative">
            {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
            <Stack />
            <StatusBar />
            <BottomTab />
          </SafeAreaProvider>
        </SignedIn>
        <SignedOut>
          <SignUpScreen />
        </SignedOut>
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
