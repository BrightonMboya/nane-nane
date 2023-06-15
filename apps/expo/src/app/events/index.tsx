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

import P from "~/components/DesignSys/Text";

const dummyEvents = [
  {
    id: "1",
    title: "Martin Odegard Dribling MasterClass",
    imagePreview:
      "https://plus.unsplash.com/premium_photo-1664790560098-1fac17eb495e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "2",
    title: "A small Dinner brunch",
    imagePreview:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    title: "Jazz Night",
    imagePreview:
      "https://images.unsplash.com/photo-1587407627257-27b7127c868c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

function EventCard(props: { title: string; imagePreview: string }) {
  return (
    <TouchableOpacity>
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
            {props.title}
          </P>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

export default function Index() {
  const [search, setSearch] = useState<string>("");
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
            {dummyEvents
              .filter((event) => {
                if (search === "") {
                  return event;
                } else if (
                  event.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return event;
                }
              })
              .map((event) => (
                <EventCard
                  title={event.title}
                  imagePreview={event.imagePreview}
                  key={event.id}
                />
              ))}
          </View>
        </View>
        <View className="h-[100px]" />
      </ScrollView>
    </SafeAreaView>
  );
}
