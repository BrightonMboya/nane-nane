import { useCallback, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";
import P from "../DesignSys/Text";

function AddMessageForm({ onMessagePost }: { onMessagePost: () => void }) {
  const addPost = api.chat.add.useMutation();
  const [message, setMessage] = useState("");
  const [enterToPostMessage, setEnterToPostMessage] = useState(true);
  const { user } = useUser();
  const { data } = api.users.returnUserName.useQuery({
    email: user?.primaryEmailAddress?.emailAddress as string,
  });

  async function postMessage() {
    const input = {
      text: message,
      name: data?.username as string,
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
      <View className="relative mb-5 flex flex-row rounded-lg bg-[#383A40] ">
        <TextInput
          value={message}
          onChangeText={(e) => setMessage(e)}
          multiline
          numberOfLines={message.split(/\r|\n/).length}
          autoFocus
          onBlur={() => {
            setEnterToPostMessage(true);
            isTyping.mutate({ typing: false, name: data?.username as string });
          }}
          onSubmitEditing={async (e) => {
            await postMessage();
          }}
          className="w-[90%]  px-2 py-4"
        />
        {message && (
          <TouchableOpacity
            onPress={async (e) => {
              await postMessage();
            }}
            className="absolute bottom-0 right-0 mb-2 mr-2"
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      {/* <TextInput
        value={message}
        onChangeText={(e) => setMessage(e)}
        multiline
        numberOfLines={message.split(/\r|\n/).length}
        autoFocus
        onBlur={() => {
          setEnterToPostMessage(true);
          isTyping.mutate({ typing: false, name: data?.username as string });
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
      </TouchableOpacity> */}
      {addPost.isError && (
        <P style="text-red-500" textType="medium">
          {addPost.error.message}
        </P>
      )}
    </KeyboardAwareScrollView>
  );
}

export default AddMessageForm;
