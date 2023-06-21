import React, { useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function KeyBoardAvoidView(props: { children: React.ReactNode }) {
  //   useEffect(() => {
  //     Keyboard.dismiss();
  //   }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={1}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {props.children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
// function KeyBoardAvoidView(props: { children: React.ReactNode }) {
//   return (
//     <SafeAreaView>
//       <KeyboardAwareScrollView></KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// }
export default KeyBoardAvoidView;
