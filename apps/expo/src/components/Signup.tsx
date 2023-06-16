import * as React from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

import SignInScreen from "./SignIn";
import PendingEmailVerification from "./pendingEmailVerification";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [error, setError] = React.useState("");

  const [showSignIn, setShowSignIn] = React.useState(false);

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].longMessage);
    }
  };

  return (
    <View className="flex h-screen flex-col items-center justify-center bg-[#f2f2f2]">
      {!pendingVerification && !showSignIn && (
        <View className="">
          <Text className="text-2xl font-bold">Welcome to Nane Nane</Text>
          <Text className="pt-1 text-center text-base font-light">
            Create an account to get started
          </Text>
          <View className="mt-10">
            <TextInput
              autoCapitalize="none"
              value={userName}
              placeholder="John Doe"
              placeholderTextColor="#383838"
              className="mt-2 w-full border-b-[1px] border-[#383838] py-2"
              onChangeText={(userName) => setUserName(userName)}
            />
          </View>
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

          <View className="mt-3">
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
            <Text className=" ">Already have an account?,</Text>
            <Pressable onPress={() => setShowSignIn(true)}>
              <Text className="font-medium text-indigo-500">Sign In</Text>
            </Pressable>
          </View>
          <TouchableOpacity onPress={onSignUpPress}>
            <View className="mt-3 rounded-md bg-pink-500 ">
              <Text className="px-4 py-2 text-center font-medium text-white">
                Sign up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {showSignIn && <SignInScreen setShowSignIn={setShowSignIn} />}
      {pendingVerification && <PendingEmailVerification userName={userName} />}
    </View>
  );
}
