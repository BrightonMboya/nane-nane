import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

interface eventProps {
  name: string;
  imagePreview: string;
  id: string;
}

function EventCard(props: { name: string; imagePreview: string; id: string }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/events/${props.id}`);
      }}
    >
      <View className="relative mt-5 w-[300px]">
        <Image
          source={{
            uri: props.imagePreview,
          }}
          className="h-[200px] w-[300px] rounded-md object-cover  "
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          className="absolute bottom-0 h-[100px] w-[300px]"
        >
          <P
            style="text-white text-lg absolute bottom-2 left-2"
            textType="medium"
          >
            {props.name}
          </P>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

export default function Index() {
  const [search, setSearch] = useState("");
  //@ts-ignore
  const { data, isLoading, isError, status } = api.events.all.useQuery();

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack.Screen options={{ title: "Events" }} />
        <View className="pl-5 pt-3">
          <P style="text-lg" textType="regular">
            Hello friend,
          </P>
          <P style="text-lg pt-2" textType="medium">
            Nothing beats the excitement of different community events here at
            ALU
          </P>
          <TextInput
            className="mt-3 h-[50px] w-[300px] rounded-md border-b-[1px] border-b-[#ddd] "
            placeholder="Search for recent events"
            onChangeText={(text) => setSearch(text)}
            defaultValue={search}
          />
          <View className="">
            {data
              ?.filter((event: eventProps) => {
                if (search === "") {
                  return event;
                } else if (
                  event.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return event;
                }
              })
              .map((event: eventProps) => (
                <EventCard
                  name={event.name}
                  imagePreview={event.imagePreview}
                  key={event.id}
                  id={event.id}
                />
              ))}
          </View>

          {isLoading && <P style="text-lg">Loading ...</P>}
          {isError && (
            <P style="text-red-500 text-lg" textType="medium">
              Error while loading events
            </P>
          )}
        </View>
        <View className="h-[100px]" />
      </ScrollView>
    </SafeAreaView>
  );
}
