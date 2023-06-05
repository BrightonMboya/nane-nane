import React from "react";
import { Text, TextInput, View } from "react-native";
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
  return (
    <View>
      <Text>Let's Create your job post</Text>
      <Text>All fields are required</Text>

      <View>
        <Text>Job Title</Text>
        <TextInput
          placeholder="Add the job Title"
          value={formStates.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
        />
      </View>

      <View>
        <Text>Company</Text>
        <TextInput
          placeholder="Google Inc"
          value={formStates.company}
          onChangeText={(text) => setForm({ ...form, company: text })}
        />
      </View>

      <View>
        <Text>Location</Text>
        <TextInput
          placeholder="Kigali, Rwanda"
          value={formStates.location}
          onChangeText={(text) => setForm({ ...form, location: text })}
        />
      </View>

      <View>
        <Text>Job Description</Text>
        <TextInput
          placeholder="Add the job Description"
          numberOfLines={40}
          value={formStates.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
        />
      </View>

      <View>
        <Text>External Link</Text>
        <TextInput
          placeholder="Add link for application"
          value={formStates.link}
          onChangeText={(text) => setForm({ ...form, link: text })}
        />
      </View>
    </View>
  );
};

export default AddJob;
