import { SafeAreaView, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

function EventDetails() {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.events.byId.useQuery({ id });
  console.log(data, "some fata");
  if (!data) return <SplashScreen />;
  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* <Stack.Screen options={{ title: data.title as string }} /> */}
      <View>
        <P>Hello World</P>
      </View>
    </SafeAreaView>
  );
}
