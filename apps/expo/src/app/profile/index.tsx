import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Index = () => {
  return (
    <SafeAreaView className="relative bg-[#f2f2f2]">
      <Stack.Screen options={{ title: "Profile Page", headerShown: false }} />
      <View className="flex h-screen items-center justify-center ">
        <Text className="text-center text-xl">
          This is the Profile Page, More about this feature later.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
