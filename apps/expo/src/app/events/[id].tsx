import { SafeAreaView, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

function EventDetails() {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  //   if (!data) return <SplashScreen />;
  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* <Stack.Screen options={{ title: data.title as string }} /> */}
    </SafeAreaView>
  );
}
