import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Add = () => {
  return (
    <>
      <SafeAreaView className="relative bg-[#f2f2f2]">
        <Stack.Screen options={{ title: "Add Page", headerShown: false }} />
        <View className="flex h-screen items-center justify-center ">
          <Text className="text-center text-xl">
            This is the Add Page, More about this feature later.
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Add;
