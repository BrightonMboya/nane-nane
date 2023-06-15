import { useState } from "react";
import { useRouter } from "next/router";

import { Message } from "@acme/api/src/router/room";

import { api } from "~/utils/api";

function MessageItem({ message }: { message: Message }) {
  const baseStyles =
    "mb-4 text-md w-7/12 p-4 text-gray-700 border border-gray-700 rounded-md";

  const liStyles =
    message.sender.name === "Tony"
      ? baseStyles
      : baseStyles.concat(" self-end bg-gray-700 text-white");
  console.log(message, "Hope I am not null");

  return (
    <li className={liStyles}>
      <div className="flex">
        <time>
          {message.sentAt.toLocaleTimeString("en-AU", {
            timeStyle: "short",
          })}{" "}
          - {message.sender.name}
        </time>
      </div>
      {message.message}
    </li>
  );
}

function RoomPage() {
  const { query } = useRouter();
  const roomId = query.roomId as string;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { mutateAsync: sendMessageMutation } =
    api.room.sendMessage.useMutation();

  api.room.onSendMessage.useSubscription(
    { input: { roomId: roomId } },
    {
      //   onNext: (message) => {
      //     setMessages((m) => {
      //       return [...m, message];
      //     });
      //   },
      onData: (message) => {
        setMessages((m) => {
          return [...m, message];
        });
      },
    },
  );

  // if (!session) {
  //   return (
  //     <div>
  //       <button onClick={() => signIn()}>Login</button>
  //     </div>
  //   );
  // }

  function onSubmitHandler(e: any) {
    console.log("submity");
    e.preventDefault();

    sendMessageMutation({
      input: {
        roomId,
        message,
      },
      // roomId,
      // message,
    });

    setMessage("");
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1">
        <ul className="flex flex-col p-4">
          {messages.map((m) => {
            // return <MessageItem key={m.id} message={m} session={session} />;
            return <MessageItem key={m.id} message={m} />;
          })}
        </ul>
      </div>

      <form
        className="flex"
        // onSubmit={(e) => {
        //   console.log("submity");
        //   e.preventDefault();

        //   sendMessageMutation({
        //     input: {
        //       roomId,
        //       message,
        //     },
        //     // roomId,
        //     // message,
        //   });

        //   setMessage("");
        // }}
      >
        <textarea
          className="black w-full rounded-md border border-gray-700 bg-gray-50 p-2.5 text-gray-700"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What do you want to say"
        />

        <button
          className="flex-1 bg-gray-900 p-2.5 text-white"
          type="submit"
          onClick={onSubmitHandler}
        >
          Send message
        </button>
      </form>
    </div>
  );
}

export default RoomPage;
