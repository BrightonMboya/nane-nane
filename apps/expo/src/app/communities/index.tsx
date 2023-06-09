import { useState } from "react";
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

import { api, type RouterOutputs } from "~/utils/api";
import P from "~/components/DesignSys/Text";

const Index = () => {
  const [search, setSearch] = useState<string>("");
  const communityRouter = api.post.getCommunities.useQuery();
  const router = useRouter();
  return (
    <SafeAreaView className="relative bg-[#f2f2f2]">
      <ScrollView>
        <Stack.Screen
          options={{
            title: "",
          }}
        />
        <View className="">
          <TouchableOpacity
            onPress={() => {
              router.push(`/profile`);
            }}
          >
            <Image
              source={{
                uri: "https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg",
              }}
              className="absolute right-5 top-5 h-10 w-10 rounded-full"
            />
          </TouchableOpacity>
        </View>

        <View className="mt-[80px] flex flex-col items-center justify-center space-y-5 ">
          <TextInput
            className="h-[50px] w-[300px] rounded-md border-[1px] border-[#ddd] px-5 "
            placeholder="Search for your favourite Communities"
            onChangeText={(text) => setSearch(text)}
            defaultValue={search}
          />
          {communityRouter.data?.map(
            (community: {
              id: string;
              imagePreview: string;
              name: string;
              description: string;
            }) => (
              <TouchableOpacity
                key={community.id}
                onPress={() => {
                  router.push(`/communities/${community.id}`);
                }}
              >
                <View className="w-[350px] rounded-md  bg-white shadow-md">
                  <Image
                    source={{ uri: community.imagePreview }}
                    className="h-[120px] w-[350px] rounded-md object-cover  "
                  />
                  <P style="mt-1 pl-3 text-base " textType="medium">
                    {community.name}
                  </P>
                  <P style="pb-5 pl-3 text-justify text-base">
                    {community.description}
                  </P>
                </View>
              </TouchableOpacity>
            ),
          )}

          {communityRouter.isLoading && <P>Loading...</P>}
          {communityRouter.isError && <P>Error...</P>}
        </View>
        <View className="mt-5 h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
