import React, {
  useEffect,
  useState,
  useRef,
  FC,
  FormEvent,
  ChangeEvent,
} from "react";
import chatBg from "../../assets/images/chatBg.png";
import { MyFormInput } from "../../components/Form";
import { MyButton } from "../../components/Button";
import { useFetchData } from "../../hooks/useFetchData";
import { PRIVATE_CHAT_EP } from "../../core/endpoints";
import { ChatListSkeleton } from "../../components/skeletons/ChatListSkeleton";
import { Undo2, UserRound, Send, Paperclip, Smile } from "lucide-react";
import type {
  PostPrivateChatMessageType,
  PrivateChatMessageType,
  PrivateChatType,
} from "../../types/privatechat";
import type {
  ResponseApiErrorType,
  ResponseApiType,
} from "../../types/apiType";
import type { UserType } from "../../types/user";
import socket from "../../socket/socket";
import { cn } from "../../utils/cn";
import MessageBubble from "../../components/chats/MessageBubble";
import ChatListItem from "../../components/chats/ChatListItem";

const ChatPage = () => {
  const [selectedUserChat, setSelectedUserChat] = useState<UserType | null>(
    null
  );
  const [activeChatId, setactiveChatId] = useState<number>(0);
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
    if (activeChatId) {
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

        socket.emit("private chat", activeChatId.toString());
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
  }, [activeChatId]);

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
        setactiveChatId(0);
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
      chatId: activeChatId,
      content: newMessage,
      image: null,
    };
    socket.emit("send private chat message", message);

    setNewMessage("");
  };

  const handleSelectedChat = (chatId: number, userChat: UserType) => {
    setactiveChatId(chatId);
    setSelectedUserChat(userChat);
  };

  const handleBackToListChat = () => {
    setactiveChatId(0);
    setSelectedUserChat(null);
  };

  return (
    <div className="bg-[#385484] min-h-screen">
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-[#2D3748] rounded-2xl shadow-2xl flex h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <aside
              className={cn(
                "w-full md:w-1/3 md:min-w-[300px] bg-[#16243B] rounded-l-2xl p-4 flex-col",
                selectedUserChat ? "hidden md:flex" : "flex" // Hide on mobile when chat is selected
              )}
            >
              <h1 className="text-2xl font-bold text-white mb-4">Chats</h1>
              <div className="relative mb-4">
                <MyFormInput
                  name="search"
                  type="text"
                  placeholder="Search or new chat"
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="!text-white !border-gray-600 focus:!border-blue-500"
                  label=""
                />
              </div>
              <div className="flex-grow overflow-y-auto pr-2">
                {loadingPrivateChats ? (
                  Array(5)
                    .fill(null)
                    .map((_, idx) => <ChatListSkeleton key={idx} />)
                ) : !privateChats?.data?.length ? (
                  <div className="flex flex-col gap-2 items-center text-center mt-8">
                    <p className="text-white">
                      Let's find friends to start a chat!
                    </p>
                    <a href="/friend">
                      <MyButton text={"Find Friends"} variant="secondary" />
                    </a>
                  </div>
                ) : (
                  privateChats.data
                    .filter((chat) => {
                      const otherUser =
                        userId === chat.userIdOne ? chat.userTwo : chat.userOne;
                      return otherUser.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    })
                    .map((chat) => {
                      const otherUser =
                        userId === chat.userIdOne ? chat.userTwo : chat.userOne;
                      return (
                        <ChatListItem
                          key={chat.id}
                          name={otherUser.name}
                          lastMessage={
                            chat.messages?.[0]?.content || "No messages yet."
                          }
                          avatar={otherUser.avatar}
                          isActive={activeChatId === chat.id}
                          onClick={() => handleSelectedChat(chat.id, otherUser)}
                        />
                      );
                    })
                )}
              </div>
            </aside>

            {/* Room Chat */}
            <section
              className={cn(
                "w-full flex-col rounded-r-2xl overflow-hidden relative",
                selectedUserChat ? "flex" : "hidden md:flex" // Show on mobile only when chat is selected
              )}
            >
              {selectedUserChat ? (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-25"
                    style={{ backgroundImage: `url(${chatBg})` }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <header className="flex items-center p-4 border-b border-gray-700 bg-[#16243B]/80 backdrop-blur-sm flex-shrink-0">
                      <button
                        className="md:hidden text-slate-100 p-2 mr-2"
                        type="button"
                        onClick={handleBackToListChat}
                      >
                        <Undo2 className="w-7 h-7" />
                      </button>
                      {selectedUserChat.avatar ? (
                        <img
                          src={selectedUserChat.avatar}
                          alt={selectedUserChat.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <UserRound className="w-10 h-10 rounded-full bg-gray-400 p-1" />
                      )}
                      <h2 className="text-lg font-semibold text-white ml-4">
                        {selectedUserChat.name}
                      </h2>
                    </header>
                    <div
                      className="flex-grow p-6 overflow-y-auto space-y-4"
                      ref={messagesEndRef}
                    >
                      {loadings ? (
                        <div className="text-center text-white">
                          Loading messages...
                        </div>
                      ) : (
                        messages?.map((msg) => (
                          <MessageBubble
                            message={msg}
                            key={msg.id}
                            isSender={msg.authorId === userId}
                          />
                        ))
                      )}
                    </div>
                    <div className="p-4 bg-[#16243B]/80 backdrop-blur-sm flex-shrink-0">
                      <form
                        onSubmit={handleSendMessage}
                        className="flex items-center space-x-3"
                      >
                        <MyButton
                          text={<Smile size={20} />}
                          variant="outline"
                          className="!rounded-full !p-2"
                        />
                        <MyButton
                          text={<Paperclip size={20} />}
                          variant="outline"
                          className="!rounded-full !p-2"
                        />
                        <input
                          ref={inputMessageRef}
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-grow bg-[#698EA4] border-transparent rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-0"
                        />
                        <MyButton
                          text={<Send size={20} />}
                          type="submit"
                          variant="secondary"
                          className="!rounded-full !p-2"
                        />
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col gap-4 items-center justify-center bg-black/20">
                  <h1 className="text-white text-2xl z-10">
                    Select a chat to start messaging
                  </h1>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
