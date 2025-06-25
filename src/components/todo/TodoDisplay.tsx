import React from "react";
import profilePic from "../../assets/images/profile.png";
import ProgressBar from "../ProgressBar";
import { MoreVertical } from "lucide-react";

const TodoDisplay = () => {
  return (
    <>
    {toDoData.map((t) => (
      <div className="flex flex-col gap-5 bg-primary w-[20rem] h-[14rem] rounded-4xl p-4 mx-5">
        <div className="flex flex-row justify-between items-center mb-2">
          <div className="flex -space-x-4">
            {membersData.map((member, index) => (
              <MemberAvatar
                key={member.id}
                img={member.img}
                altText={member.alt}
                zIndex={membersData.length - index}
              />
            ))}
          </div>
          <MoreVertical className="w-6 h-6 text-white" />
        </div>
          <Todo 
          progress={t.progress}
          title={t.title}
          />
      </div>
    ))}
    </>
  );
};

const toDoData = [
  {id: 1, title: "Web development", progress: 20},
  {id: 1, title: "Backend development", progress: 40},
]

type TodoProps = {
  title: string;
  progress: number
}

const Todo: React.FC<TodoProps> = ({ title, progress }) => {
  return(
    <div className="flex flex-col">
      <h3 className="text-white text-2xl font-bold">{title}</h3>
      <ProgressBar completedPercentage={progress} tasks={progress}/>
    </div>
  )
}

const membersData = [
  { id: 1, img: profilePic, alt: "Member 1" },
  { id: 2, img: profilePic, alt: "Member 2" },
  { id: 3, img: profilePic, alt: "Member 3" },
];

type MemberAvatarProps = {
  img: string;
  altText: string;
  zIndex: number; 
};

const MemberAvatar: React.FC<MemberAvatarProps> = ({ img, altText, zIndex }) => {
  return ( //nanti di cek, maks 5
    <div
      className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white"
      style={{ zIndex: zIndex }}
    >
      <img src={img} alt={altText} className="w-full h-full object-cover" />
    </div>
  );
};


export default TodoDisplay;