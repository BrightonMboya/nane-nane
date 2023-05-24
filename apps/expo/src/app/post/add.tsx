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
      <SafeAreaView className="relative h-screen bg-[#a09a9a]">
        <Stack.Screen options={{ title: "Add Page", headerShown: false }} />
        <View className="fflex flex-col items-center justify-center ">
          <Text className="text-center text-xl">Adding a new Nane-Nane </Text>
          <TextInput
            className="mb-2 mt-5  w-[300px] rounded border-[1px] border-[#ddd] p-2"
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            className="mb-2 mt-5  w-[300px] rounded border-[1px] border-[#ddd] p-2"
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
          />
          {error?.data?.zodError?.fieldErrors.title && (
            <Text className="mb-2 text-red-500">
              {error.data.zodError.fieldErrors.title}
            </Text>
          )}
          <TextInput
            className="mb-2 mt-5  w-[300px] rounded border-[1px] border-[#ddd] p-2"
            value={content}
            onChangeText={setContent}
            placeholder="Content"
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
            <Text className="font-semibold text-white">Publish post</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Add;
