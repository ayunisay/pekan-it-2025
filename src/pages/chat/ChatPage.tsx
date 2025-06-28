import React, { useEffect, useRef, useState } from "react";
import chatBg from "../../assets/images/chatBg.png";
import { MyFormInput } from "../../components/Form";
import { MyButton } from "../../components/Button";
import { useFetchData } from "../../hooks/useFetchData";
import { PRIVATE_CHAT_EP } from "../../core/endpoints";
import { ChatListSkeleton } from "../../components/skeletons/ChatListSkeleton";
import type {
  PostPrivateChatMessageType,
  PrivateChatMessageType,
  PrivateChatType,
} from "../../types/privatechat";
import type {
  ResponseApiErrorType,
  ResponseApiType,
} from "../../types/apiType";
import { Undo2, UserRound } from "lucide-react";
import type { UserType } from "../../types/user";
import socket from "../../socket/socket";
import { cn } from "../../utils/cn";
import MessageBubble from "../../components/chats/MessageBubble";
import ChatListItem from "../../components/chats/ChatListItem";

const ChatPage = () => {
  const [selectedUserChat, setSelectedUserChat] = useState<UserType | null>(
    null
  );
  const [activeChat, setActiveChat] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<PrivateChatMessageType[] | null>(
    null
  );
  const [newMessage, setNewMessage] = useState<string>("");
  const [loadings, setLoadings] = useState<{
    loadingLoadMessage: boolean;
    loadingSendMessage: boolean;
  }>({
    loadingLoadMessage: false,
    loadingSendMessage: false,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputMessageRef = useRef<HTMLInputElement>(null);

  // temp
  const userId = 2;

  const [
    { apiData: privateChats, loading: loadingPrivateChats },
    { reCallAPI: reFetchPrivateChats },
  ] = useFetchData<ResponseApiType<PrivateChatType[]>>({
    url: `${PRIVATE_CHAT_EP}/${userId}`,
    initialCall: false,
  });

  useEffect(() => {
    socket.connect();

    // Ambil Chat user
    const handleConnect = () => {
      console.log("Terhubung ke server Socket.IO!");
    };
    // Listener global untuk menerima pesan baru
    const handleReceiveMessage = (newMessage: PrivateChatMessageType) => {
      if (newMessage) {
        setMessages((prev) => [...(prev ?? []), newMessage]);
      }
    };
    const handleSendPrivateChatMessageError = (error: ResponseApiErrorType) => {
      alert(error.message);
    };

    socket.on("receive new private chat message", handleReceiveMessage);
    socket.on(
      "send private chat message error",
      handleSendPrivateChatMessageError
    );
    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("receive new private chat message", handleReceiveMessage);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeChat) {
      if (socket.connected) {
        setLoadings((prev) => ({ ...prev, loadingLoadMessage: true }));

        // Ambil semua message dari suatu private chat
        const handlePrivateChatMessage = (
          receivedMessages: PrivateChatType
        ) => {
          setMessages(receivedMessages?.messages || null);
          setLoadings((prev) => ({ ...prev, loadingLoadMessage: false }));
        };
        // Error nya
        const handleGetPrivateChatMessage = (error: ResponseApiErrorType) => {
          alert(error.message);
        };

        socket.emit("private chat", activeChat.toString());
        socket.on("get detail private chat message", handlePrivateChatMessage);
        socket.on(
          "get detail private chat message error",
          handleGetPrivateChatMessage
        );

        return () => {
          socket.off(
            "get detail private chat message",
            handlePrivateChatMessage
          );
          socket.off(
            "get detail private chat message error",
            handleGetPrivateChatMessage
          );
        };
      }
    } else {
      reFetchPrivateChats();
      setMessages(null);
      setLoadings((prev) => ({ ...prev, loadingLoadMessage: false }));
    }
  }, [activeChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current!.scrollTop =
          messagesEndRef.current!.scrollHeight;
      }, 0);
    }

    if (inputMessageRef.current) {
      inputMessageRef.current.focus();
    }

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveChat(0);
        setSelectedUserChat(null);
      }
    };

    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    setLoadings((prev) => ({ ...prev, loadingSendMessage: true }));
    const message: PostPrivateChatMessageType = {
      authorId: userId,
      chatId: activeChat,
      content: newMessage,
      image: null,
    };
    socket.emit("send private chat message", message);

    setNewMessage("");
  };

  const handleSelectedChat = (chatId: number, userChat: UserType) => {
    setActiveChat(chatId);
    setSelectedUserChat(userChat);
  };

  const handleBackToListChat = () => {
    setActiveChat(0);
    setSelectedUserChat(null);
  };

  return (
    <div>
      <main className="pt-16 pb-16">
        <div className="max-w-4/5 mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-[#2D3748] rounded-2xl shadow-2xl flex md:h-[40rem] md:max-h-[40rem]">
            {/* Sidebar */}
            <aside
              className={cn(
                "w-1/3 min-w-[300px] bg-[#16243B] rounded-l-2xl p-4",
                selectedUserChat ? "hidden" : "flex flex-col"
              )}
            >
              <h1 className="text-2xl font-bold text-white mb-4">Chats</h1>
              <div className="relative mb-4">
                <MyFormInput
                  name="search"
                  type="text"
                  placeholder="Search or new chat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="!text-white !border-gray-600 focus:!border-blue-500"
                  label=""
                />
              </div>
              <div className="flex-grow overflow-y-auto">
                {loadingPrivateChats ? (
                  Array(5)
                    .fill(null)
                    .map((_, idx) => <ChatListSkeleton key={idx} />)
                ) : !privateChats || privateChats.data?.length === 0 ? (
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-white">
                      Let's find friends to start chat!
                    </p>
                    <a href="/friend">
                      <MyButton
                        text={"Find"}
                        variant="secondary"
                        className="cursor-pointer hover:"
                      />
                    </a>
                  </div>
                ) : (
                  privateChats.data?.map((chat, idx) => {
                    const user =
                      userId === chat.userIdOne ? chat.userTwo : chat.userOne;
                    return (
                      <ChatListItem
                        key={idx}
                        name={user.name}
                        lastMessage={
                          chat.messages
                            ? chat.messages[0]?.content
                            : "Start chatting!"
                        }
                        avatar={user.avatar}
                        isActive={activeChat === chat.id}
                        onClick={() => handleSelectedChat(chat.id, user)}
                      />
                    );
                  })
                )}
              </div>
            </aside>

            {/* Room Chat */}
            {selectedUserChat ? (
              <section className="w-full flex flex-col rounded-2xl overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50"
                  style={{
                    backgroundImage: `url(${chatBg})`,
                    backgroundColor: "#fff",
                  }}
                />

                {/* Chat Header */}
                <div className="relative z-10 flex flex-col h-full">
                  <header className="flex items-center p-4 border-b border-gray-700 bg-[#16243B]/80 backdrop-blur-sm rounded-tr-2xl gap-4">
                    <button
                      className="text-slate-100 p-2 cursor-pointer rounded-full hover:bg-[#16243B]/40 transition-all ease-in-out duration-300"
                      type="button"
                      onClick={handleBackToListChat}
                    >
                      <Undo2 className="w-7 h-7" />
                    </button>
                    {selectedUserChat.avatar ? (
                      <img
                        src={selectedUserChat.avatar}
                        alt={"Avatar pic"}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                    ) : (
                      <UserRound className="w-10 h-10 rounded-full bg-gray-400 p-1" />
                    )}
                    <h2 className="text-lg font-semibold text-white">
                      {selectedUserChat.name}
                    </h2>
                  </header>

                  {/* Chat box */}
                  <div
                    className="flex-grow p-6 overflow-y-auto space-y-4"
                    ref={messagesEndRef}
                  >
                    {messages?.map((msg) => (
                      <MessageBubble
                        message={msg}
                        key={msg.id}
                        isSender={msg.authorId === userId}
                      />
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 bg-[#16243B]/80 backdrop-blur-sm rounded-br-2xl">
                    <form
                      onSubmit={handleSendMessage}
                      className="flex items-center space-x-3"
                    >
                      <MyButton
                        text="😀"
                        variant="outline"
                        size="small"
                        className="!rounded-full !p-2"
                      />
                      <MyButton
                        text="📎"
                        variant="outline"
                        size="small"
                        className="!rounded-full !p-2"
                      />
                      <input
                        ref={inputMessageRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow bg-[#698EA4] border border-transparent focus:border-blue-500 rounded-lg px-4 py-2 text-white placeholder-white-400 focus:outline-none focus:ring-0 transition"
                      />
                      <MyButton
                        text="Send"
                        type="submit"
                        variant="secondary"
                        className="cursor-pointer"
                      />
                    </form>
                  </div>
                </div>
              </section>
            ) : (
              <section className="w-2/3 flex flex-col rounded-r-2xl overflow-hidden relative bg-black items-center justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25 z-0"
                  style={{
                    backgroundImage: `url(${chatBg})`,
                    backgroundColor: "#fff",
                  }}
                />
                <div className="flex flex-col gap-4 items-center z-10">
                  <h1 className="text-white text-2xl">
                    Start chatting by finding your friend!
                  </h1>
                  <a href="/friend">
                    <MyButton
                      text={"Find"}
                      variant="secondary"
                      className="cursor-pointer hover:"
                    />
                  </a>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
