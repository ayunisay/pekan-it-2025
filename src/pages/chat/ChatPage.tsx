import React, { useState } from "react";
import chatBg from "../../assets/images/chatBg.png";
import chatProfile from "../../assets/images/profile2.jpg";
import { MyFormInput } from "../../components/Form";
import { MyButton } from "../../components/Button";

const ChatListItem = ({
  name,
  lastMessage,
  avatar,
  isActive,
  onClick,
}: {
  name: string;
  lastMessage: string;
  avatar: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center p-3 cursor-pointer rounded-lg transition-colors duration-200 ${
      isActive ? "bg-[#4A5568]" : "hover:bg-[#2D3748]"
    }`}
  >
    <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
    <div className="flex-grow">
      <h3 className="font-semibold text-white">{name}</h3>
      <p className="text-sm text-gray-400 truncate">{lastMessage}</p>
    </div>
  </div>
);

const MessageBubble = ({
  text,
  isSender,
}: {
  text: string;
  isSender: boolean;
}) => (
  <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isSender
          ? "bg-[#4A90E2] text-white rounded-br-none"
          : "bg-[#385484] text-white rounded-bl-none"
      }`}
    >
      {text}
    </div>
  </div>
);

const ChatPage = () => {
  const chats = [
    {
      id: 1,
      name: "Ali Memb",
      lastMessage: "Ada materi tentang ini ga??",
      avatar: `${chatProfile}`,
    },
    {
      id: 2,
      name: "Rangkasatra",
      lastMessage: "Ada materi tentang ini ga??",
      avatar: `${chatProfile}`,
    },
    {
      id: 3,
      name: "Rangkasatra",
      lastMessage: "Ada materi tentang ini ga??",
      avatar: `${chatProfile}`,
    },
    {
      id: 4,
      name: "Rangkasatra",
      lastMessage: "Ada materi tentang ini ga??",
      avatar: `${chatProfile}`,
    },
    {
      id: 5,
      name: "Rangkasatra",
      lastMessage: "Ada materi tentang ini ga??",
      avatar: `${chatProfile}`,
    },
    {
      id: 6,
      name: "Rangkasatra",
      lastMessage: "Ada materi tentang ini ga??",
      avatar: `${chatProfile}`,
    },
  ];

  // dummy
  const [messages, setMessages] = useState([
    { id: 1, text: "Ada materi tentang ini ga??", isSender: false },
    {
      id: 2,
      text: "Nggak, coba tanya Mimic deh",
      isSender: true,
    },
    { id: 3, text: "Yah, yaudah deh. Makasih yaa", isSender: false },
    { id: 4, text: "Ingyah", isSender: true },
  ]);

  const [activeChat, setActiveChat] = useState(chats[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    // Bubble text baru
    const newMessage = {
      id: messages.length + 1,
      text: message,
      isSender: true,
    };

    setMessages([...messages, newMessage]);

    // reset input
    setMessage("");
  };

  return (
    <div>
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-[#2D3748] rounded-2xl shadow-2xl flex">
            {/* Sidebar */}
            <aside className="w-1/3 min-w-[300px] bg-[#16243B] rounded-l-2xl p-4 flex flex-col">
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
              <div className="flex-grow overflow-y-auto pr-2">
                {chats
                  .filter((chat) =>
                    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((chat) => (
                    <ChatListItem
                      key={chat.id}
                      name={chat.name}
                      lastMessage={chat.lastMessage}
                      avatar={chat.avatar}
                      isActive={activeChat.id === chat.id}
                      onClick={() => setActiveChat(chat)}
                    />
                  ))}
              </div>
            </aside>

            {/* Room Chat */}
            <section className="w-2/3 flex flex-col rounded-r-2xl overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{
                  backgroundImage: `url(${chatBg})`,
                  backgroundColor: "#fff",
                }}
              ></div>

              {/* Chat Header */}
              <div className="relative z-10 flex flex-col h-full">
                <header className="flex items-center p-4 border-b border-gray-700 bg-[#16243B]/80 backdrop-blur-sm rounded-tr-2xl">
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <h2 className="text-lg font-semibold text-white">
                    {activeChat.name}
                  </h2>
                </header>

                {/* Chat */}
                <div className="flex-grow p-6 overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      text={msg.text}
                      isSender={msg.isSender}
                    />
                  ))}
                </div>
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
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type message here......"
                    className="flex-grow bg-[#698EA4] border border-transparent focus:border-blue-500 rounded-lg px-4 py-2 text-white placeholder-white-400 focus:outline-none focus:ring-0 transition"
                  />
                  <MyButton text="Send" type="submit" variant="secondary" />
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
