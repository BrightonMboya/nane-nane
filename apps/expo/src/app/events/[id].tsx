import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

const EventDetails: React.FC = () => {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.events.byId.useQuery({ id });
  if (!data) return <SplashScreen />;
  return (
    <SafeAreaView className="">
      <ScrollView>
        <Stack.Screen options={{ title: data.name as string }} />
        <View className="mt-5">
          <Image
            source={{
              uri: data.imagePreview,
            }}
            className="ml-4 h-[200px] w-[350px] rounded-md object-cover  "
          />
          <P style="ml-4 mt-5 text-lg" textType="medium">
            {data.name}
          </P>
          <View className="flex flex-row">
            <P style="ml-4 mt-2 text-[15px]">{data.location}</P>
            <P style="ml-4 mt-2 text-sm">
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(data.date)}
            </P>
          </View>
          <P style="text-justify tracking-wide text-base mt-3 px-4">
            {data.description}
          </P>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetails;
