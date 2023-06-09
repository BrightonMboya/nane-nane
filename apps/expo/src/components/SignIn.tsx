import React from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignInScreen({
  setShowSignIn,
}: {
  setShowSignIn: any;
}) {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
      setError(err.errors[0].longMessage);
    }
  };
  return (
    <View className="">
      <Text className="text-2xl font-bold">Welcome Back</Text>
      <Text className="pt-1 text-center text-base font-light">
        Enter your credentials to continue
      </Text>

      <View className="mt-3">
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="j.doe@alustudent.com"
          placeholderTextColor="#383838"
          className="mt-2 w-full border-b-[1px] border-[#383838] py-2"
          onChangeText={(email) => setEmailAddress(email)}
        />
      </View>

      <View className="mt-1">
        <TextInput
          value={password}
          placeholder="Password..."
          placeholderTextColor="#383838"
          secureTextEntry={true}
          className="mt-5 w-full border-b-[1px] border-[#383838] py-2"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      {error && (
        <View>
          <Text className="mt-5 font-medium text-red-500">{error}</Text>
        </View>
      )}
      <View className="mt-5 flex flex-row items-center">
        <Text className=" ">Don't have an account?,</Text>
        <Pressable onPress={() => setShowSignIn(false)}>
          <Text className="font-medium text-indigo-500">Sign Up</Text>
        </Pressable>
      </View>
      <TouchableOpacity onPress={onSignInPress}>
        <View className="mt-3 rounded-md bg-pink-500 ">
          <Text className="px-4 py-2 text-center font-medium text-white">
            Sign In
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
