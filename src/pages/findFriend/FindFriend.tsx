import React, { useState, type ChangeEvent } from "react";
import Profile from "../../assets/images/profile3.jpg";
import Mail from "../../assets/icons/mail.png";
import MailOpen from "../../assets/icons/mailOpen.png";

interface User { //sementara pake dummy dulu
  id:number
  name: string
  email: string
  avatar: string
}

// dummy
const allUsers = [
  {
    id: 1,
    name: "Rangkasatra",
    email: "rangkasatra@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 2,
    name: "Rangkasatra1",
    email: "rangkasatra1@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 3,
    name: "Rangkasatriya",
    email: "rangkasatriya@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 4,
    name: "Rangkasatra",
    email: "rangkasatra2@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 5,
    name: "Rangkasatran",
    email: "rangkasatran@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 6,
    name: "Another User",
    email: "another.user@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 7,
    name: "Yet Another",
    email: "yet.another@example.com",
    avatar: `${Profile}`,
  },
];

const initialFriends = [
  {
    id: 8,
    name: "Rangkasatra",
    email: "rangkasatra3@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 9,
    name: "Rangkasatra",
    email: "rangkasatra4@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 10,
    name: "Rangkasatra",
    email: "rangkasatra5@example.com", 
    avatar: `${Profile}`,
  },
  {
    id: 11,
    name: "Rangkasatra",
    email: "rangkasatra6@example.com", 
    avatar: `${Profile}`,
  },
  {
    id: 12,
    name: "Rangkasatra",
    email: "rangkasatra7@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 13,
    name: "Friend Six",
    email: "friend.six@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 14,
    name: "Friend Seven",
    email: "friend.seven@example.com",
    avatar: `${Profile}`,
  },
  {
    id: 15,
    name: "Friend Eight",
    email: "friend.eight@example.com",
    avatar: `${Profile}`,
  },
];

const friendRequests = allUsers.slice(0, 5); // using 5 dummy users for friend requests

type SearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => (
  <div className="relative w-full">
    <svg
      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-gray-200 text-gray-800 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
);

type UserListProps = {
  user: User,
  onAdd: () => void;
}

const UserListItem: React.FC<UserListProps> = ({ user, onAdd }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
    <div className="flex items-center gap-4">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <span className="font-semibold text-white">{user.name}</span>
    </div>
    <button
      onClick={onAdd}
      className="bg-gray-600 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors duration-300"
    >
      + Teman
    </button>
  </div>
);

type FriendListItemProps = {
  friend: User;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
    <div className="flex items-center gap-4">
      <img
        src={friend.avatar}
        alt={friend.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <span className="font-semibold text-white">{friend.name}</span>
    </div>
    <button className="bg-teal-500 text-white font-semibold px-4 py-1 rounded-lg text-sm cursor-default">
      Teman
    </button>
  </div>
);

type MailIconButtonProps = {
  notification: boolean;
  isOpen: boolean;
  onClick: () => void;
}

const MailIconButton: React.FC<MailIconButtonProps> = ({ notification, isOpen, onClick }) => (
  <div className="relative">
    <button
      onClick={onClick}
      className="text-white hover:text-yellow-400 transition-colors"
    >
      <img
        src={isOpen ? MailOpen : Mail}
        alt={isOpen ? "Open Mail" : "Closed Mail"}
        className="h-8 w-8"
      />
    </button>
    {notification && !isOpen && (
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#4E6E9A] rounded-full"></span>
    )}
  </div>
);

const FindFriendsPage = () => {
  const [view, setView] = useState("search"); // 'search' or 'requests'
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState(initialFriends);

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0 && view !== "search") {
      setView("search");
    }
  };

  const searchResults = searchQuery
    ? allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const renderLeftPanelContent = () => {
    if (view === "requests") {
      return (
        <>
          <div className="bg-gray-200 text-gray-800 font-bold text-center py-3 rounded-t-lg flex-shrink-0">
            Permintaan Pertemanan
          </div>
          <div className="overflow-y-auto p-2 space-y-1">
            {friendRequests.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                onAdd={() => alert(`Request from ${user.name} accepted!`)}
              />
            ))}
          </div>
        </>
      );
    }
    // Default to search view
    return (
      <>
        <div className="p-2 flex-shrink-0">
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search or new chat"
          />
        </div>
        {searchQuery && (
          <div className="overflow-y-auto p-2 space-y-1">
            {searchResults.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                onAdd={() => alert(`Friend request sent to ${user.name}!`)}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-[#4E6E9A] min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <main className="max-w-6xl mx-auto pt-20">
        <div className="flex justify-end mb-4">
          <MailIconButton
            notification={true}
            isOpen={view === "requests"}
            onClick={() =>
              setView((v) => (v === "search" ? "requests" : "search"))
            }
          />
        </div>

        <div
          className="bg-[#425C7F] rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden"
          style={{ height: "calc(100vh - 250px)" }}
        >
          {/* Left Panel: Search or Friend Requests */}
          <div className="border-r border-gray-600/50 flex flex-col min-h-0">
            {renderLeftPanelContent()}
          </div>

          {/* Right Panel: Friend List */}
          <div className="flex flex-col min-h-0">
            <div className="bg-gray-600/50 text-white font-bold text-center py-3 rounded-tr-lg flex-shrink-0">
              Friend List
            </div>
            <div className="overflow-y-auto p-2 space-y-1">
              {friends.map((friend) => (
                <FriendListItem key={friend.id} friend={friend} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindFriendsPage;
