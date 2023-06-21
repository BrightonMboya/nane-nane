import { useCallback, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";

import { api } from "~/utils/api";
import P from "../DesignSys/Text";

function AddMessageForm({ onMessagePost }: { onMessagePost: () => void }) {
  const addPost = api.chat.add.useMutation();
  const [message, setMessage] = useState("");
  const [enterToPostMessage, setEnterToPostMessage] = useState(true);
  async function postMessage() {
    const input = {
      text: message,
    };
    try {
      await addPost.mutateAsync(input);
      setMessage("");
      onMessagePost();
    } catch {}
  }
  const isTyping = api.chat.isTyping.useMutation();

  //  const onFocusEffect = useCallback(() => {
  //    AvoidSoftInput.setAdjustPan();
  //    return () => {
  //      AvoidSoftInput.setDefaultAppSoftInputMode();
  //    };
  //  }, []);

  //  useFocusEffect(onFocusEffect);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
      bounces={false}
      // contentContainerStyle={commonStyles.scrollContainer}
      contentInsetAdjustmentBehavior="always"
      overScrollMode="always"
      showsVerticalScrollIndicator={true}
    >
      <TextInput
        value={message}
        onChangeText={(e) => setMessage(e)}
        multiline
        numberOfLines={message.split(/\r|\n/).length}
        autoFocus
        onBlur={() => {
          setEnterToPostMessage(true);
          isTyping.mutate({ typing: false });
        }}
        onSubmitEditing={async (e) => {
          await postMessage();
        }}
        className="w-screen rounded-lg  bg-[#383A40] px-2 py-4"
      />
      <TouchableOpacity
        onPress={async (e) => {
          await postMessage();
        }}
        className="ml-3 mt-5 w-[80px] rounded-md bg-pink-500 px-4 py-2"
      >
        <P style="text-white text-center" textType="medium">
          Send
        </P>
      </TouchableOpacity>
      {addPost.isError && (
        <P style="text-red-500" textType="medium">
          {addPost.error.message}
        </P>
      )}
    </KeyboardAwareScrollView>
  );
}

export default AddMessageForm;
