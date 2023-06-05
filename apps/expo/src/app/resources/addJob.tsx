import React from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const AddJob = () => {
  const formStates = {
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

  function handleSubmit() {}

  return (
    <SafeAreaView>
      <ScrollView className="pl-3">
        <Text className="mt-[60px] text-xl font-bold">
          Let's Create your job post
        </Text>
        <Text className="pt-2 text-sm">All fields are required</Text>

        <View className="flex flex-col gap-5 pt-[40px]">
          <View className="mt-5 ">
            <Text className={titleClassName}>Job Title</Text>
            <TextInput
              placeholder="Add the job Title"
              value={formStates.title}
              placeholderTextColor="#000"
              className={inputClassName}
              onChangeText={(text) => setForm({ ...form, title: text })}
            />
          </View>

          <View>
            <Text className={titleClassName}>Company</Text>
            <TextInput
              placeholder="Google Inc"
              value={formStates.company}
              onChangeText={(text) => setForm({ ...form, company: text })}
              className={inputClassName}
              placeholderTextColor="#000"
            />
          </View>

          <View>
            <Text className={titleClassName}>Location</Text>
            <TextInput
              placeholder="Kigali, Rwanda"
              value={formStates.location}
              onChangeText={(text) => setForm({ ...form, location: text })}
              className={inputClassName}
              placeholderTextColor="#000"
            />
          </View>

          <View>
            <Text className={titleClassName}>Job Description</Text>
            <TextInput
              placeholder="Add the job Description"
              numberOfLines={40}
              value={formStates.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              className={inputClassName}
              placeholderTextColor="#000"
            />
          </View>

          <View>
            <Text className={titleClassName}>External Link</Text>
            <TextInput
              placeholder="Add link for application"
              value={formStates.link}
              onChangeText={(text) => setForm({ ...form, link: text })}
              className={inputClassName}
              placeholderTextColor="#000"
            />
          </View>

          <TouchableHighlight onPress={handleSubmit}>
            <Text className="rounded-base mt-3 w-[170px] bg-indigo-500 px-1  py-2  text-center text-base text-white">
              Share Opportunity!
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddJob;
