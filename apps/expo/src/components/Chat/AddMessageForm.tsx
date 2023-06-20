import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

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
  return (
    <>
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
      />
      <TouchableOpacity
        onPress={async (e) => {
          await postMessage();
        }}
      >
        <P style="text-blue-500" textType="medium">
          Send
        </P>
      </TouchableOpacity>
      {addPost.isError && (
        <P style="text-red-500" textType="medium">
          {addPost.error.message}
        </P>
      )}
    </>
  );
}

export default AddMessageForm;
