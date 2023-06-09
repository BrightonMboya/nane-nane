import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { api } from "~/utils/api";

const Add = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const utils = api.useContext();

  //@ts-ignore
  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      setName("");
      // @ts-ignore
      await utils.post.all.invalidate();
    },
  });
  return (
    <>
      <SafeAreaView className="relative h-screen bg-[#f2f2f2]">
        <Stack.Screen options={{ title: "Add Page" }} />
        <View className="fflex flex-col items-center justify-center ">
          {/* <Text className="text-center text-xl">
            What do you want to talk about{" "}
          </Text> */}

          {error?.data?.zodError?.fieldErrors.title && (
            <Text className="mb-2 text-red-500">
              {error.data.zodError.fieldErrors.title}
            </Text>
          )}
          <TextInput
            className="mb-2 mt-5  w-[300px] rounded border-b-[1px] border-b-[#ddd] p-2 "
            value={content}
            onChangeText={setContent}
            placeholder="What do you want to talk about"
            numberOfLines={50}
            multiline={true}
          />
          {error?.data?.zodError?.fieldErrors.content && (
            <Text className="mb-2 text-red-500">
              {error.data.zodError.fieldErrors.content}
            </Text>
          )}
          <TouchableOpacity
            className="w-[150px] rounded bg-pink-400  px-4 py-2 "
            onPress={() => {
              mutate({
                title,
                content,
                name,
              });
            }}
          >
            <Text className="text-center font-semibold text-white">
              Publish post
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Add;
