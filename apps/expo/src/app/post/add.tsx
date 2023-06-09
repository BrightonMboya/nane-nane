import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

const Add = () => {
  const [content, setContent] = useState("");

  const utils = api.useContext();
  const router = useRouter();
  const { user } = useUser();
  const { data } = api.users.returnUserName.useQuery({
    email: user?.primaryEmailAddress?.emailAddress as string,
  });

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setContent("");
      await utils.post.all.invalidate();
      router.push(`/`);
    },
  });

  return (
    <>
      <SafeAreaView className="relative h-screen bg-[#f2f2f2]">
        <Stack.Screen options={{ title: "Add Page" }} />
        <View className="fflex flex-col items-center justify-center ">
          {error?.data?.zodError?.fieldErrors.title && (
            <P style="mb-2 text-red-500">
              {error.data.zodError.fieldErrors.title}
            </P>
          )}
          <TextInput
            className="mb-2 mt-5  w-[300px] rounded border-b-[1px] border-b-[#36454F] p-2 "
            value={content}
            onChangeText={setContent}
            placeholder="What do you want to talk about"
            numberOfLines={50}
            multiline={true}
            placeholderTextColor="#36454F"
          />
          {error?.data?.zodError?.fieldErrors.content && (
            <P style="mb-2 text-red-500">
              {error.data.zodError.fieldErrors.content}
            </P>
          )}
          <TouchableOpacity
            className="mt-5 w-[100px] rounded bg-pink-400  px-4 py-2 "
            onPress={() => {
              mutate({
                content,
                name: data?.username as string,
                userId: user?.id as string,
              });
            }}
          >
            <P style="text-center text-white" textType="medium">
              Post
            </P>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Add;
