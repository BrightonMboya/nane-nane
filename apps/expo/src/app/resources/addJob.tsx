import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { api } from "~/utils/api";
import P from "~/components/DesignSys/Text";

const AddJob = () => {
  const formStates = {
    title: "",
    description: "",
    location: "",
    company: "",
    link: "",
  };

  const freshFormStates = {
    title: "",
    description: "",
    location: "",
    company: "",
    link: "",
  };
  const [form, setForm] = React.useState(formStates);
  const inputClassName =
    "font-regular w-[350px] rounded-md border-b-[1px] border-[#000] pb-2 pt-3";
  const titleClassName = "text-[18px] font-medium";

  const utils = api.useContext();

  const { mutate, error } = api.resources.add.useMutation({
    async onSuccess() {
      // invalidating the cache
      //@ts-ignore
      await utils.resources.all.invalidate();
    },
  });

  function handleSubmit() {
    mutate(form);
    setForm(freshFormStates);
  }

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "" }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ScrollView className="h-full pl-3">
          <P style="mt-[60px] text-xl font-bold">Let's Create your job post</P>
          <P style="pt-2 text-sm">All fields are required</P>

          <View className="flex flex-col gap-5 pt-[40px]">
            <View className="mt-5 ">
              <P style={titleClassName}>Job Title</P>
              <TextInput
                placeholder="Add the job Title"
                value={form.title}
                placeholderTextColor="#000"
                className={inputClassName}
                onChangeText={(text) => setForm({ ...form, title: text })}
              />
            </View>

            <View>
              <P style={titleClassName}>Company</P>
              <TextInput
                placeholder="Google Inc"
                value={form.company}
                onChangeText={(text) => setForm({ ...form, company: text })}
                className={inputClassName}
                placeholderTextColor="#000"
              />
            </View>

            <View>
              <P style={titleClassName}>Location</P>
              <TextInput
                placeholder="Kigali, Rwanda"
                value={form.location}
                onChangeText={(text) => setForm({ ...form, location: text })}
                className={inputClassName}
                placeholderTextColor="#000"
              />
            </View>

            <View>
              <P style={titleClassName}>Job Description</P>
              <TextInput
                placeholder="Add the job Description"
                numberOfLines={40}
                value={form.description}
                onChangeText={(text) => setForm({ ...form, description: text })}
                className={inputClassName}
                placeholderTextColor="#000"
                multiline={true}
              />
            </View>

            <View>
              <P style={titleClassName}>External Link</P>
              <TextInput
                placeholder="Add link for application"
                value={form.link}
                onChangeText={(text) => setForm({ ...form, link: text })}
                className={inputClassName}
                placeholderTextColor="#000"
              />
            </View>

            <TouchableHighlight onPress={handleSubmit}>
              <P style="rounded-base mt-3 w-[170px] bg-indigo-500 px-1  py-2  text-center text-base text-white">
                Share Opportunity!
              </P>
            </TouchableHighlight>

            {error?.data?.zodError?.fieldErrors.content && (
              <P style="mb-2 text-red-500">
                {error.data.zodError.fieldErrors.content}
              </P>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddJob;
