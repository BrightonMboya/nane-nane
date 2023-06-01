import * as React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
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

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex h-screen flex-col items-center justify-center bg-[#f2f2f2]">
      {!pendingVerification && (
        <View className="">
          <Text className="text-2xl font-bold">Welcome to Nane Nane</Text>
          <Text className="pt-1 text-center text-base font-light">
            Create an account to get started
          </Text>
          <View className="mt-10">
            {/* <Text className="text-sm font-medium">Email Address</Text> */}
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="j.doe@alustudent.com"
              placeholderTextColor="#383838"
              className="mt-2 w-full border-b-[1px] border-[#383838] py-2"
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View>
            {/* <Text className="mt-5 text-sm font-medium">Email Address</Text> */}
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

          <TouchableOpacity onPress={onSignUpPress}>
            <View className="mt-5 rounded-md bg-pink-500 ">
              <Text className="px-4 py-2 text-center font-medium text-white">
                Sign up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
