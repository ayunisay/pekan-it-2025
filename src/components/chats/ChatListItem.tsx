import { Trash, UserRound } from "lucide-react";
import { truncateString } from "../../utils/string";

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
}) => {
    const handleDeleteBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        alert("Tolong handle ini")
    }

  return (
    <div
      onClick={onClick}
      className={`group flex items-center p-3 cursor-pointer rounded-lg transition-colors duration-200 gap-1 ${
        isActive ? "bg-[#4A5568]" : "hover:bg-[#2D3748]"
      }`}
    >
      {avatar ? (
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
      ) : (
        <UserRound className="w-12 h-12 rounded-full bg-gray-400 p-1" />
      )}
      <div className="flex overflow-x-hidden justify-between items-center w-full">
        <div className="flex-grow">
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-sm text-gray-400 truncate">
            {truncateString(lastMessage, 30)}
          </p>
        </div>
        <button className="cursor-pointer" type="button" onClick={handleDeleteBtn}>
          <Trash className="hidden group-hover:block text-slate-50 transition-all" />
        </button>
      </div>
    </div>
  );
};

export default ChatListItem;
