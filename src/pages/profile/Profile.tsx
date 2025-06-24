import React, { useEffect, useRef, useState } from "react";
import profilePic from "../../assets/images/profile.png";
import ProgressBar from "../../components/ProgressBar";
import { MyButton } from "../../components/Button";
import type { TaskInterface } from "../../interface/Interface";
import Calendar from "./Calendar";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
    setIsOpen(true); // Open the popup
  };

  const handlePopupClose = () => {
    setIsOpen(false); // Close the popup
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row w-full min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-[7rem] text-white transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center w-full xl:w-1/4 xl:max-w-xs gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="relative group">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full object-cover shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl"
            />
            <div className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1">
              <MyButton 
                text="Edit Profile" 
                variant="accent" 
                className="text-[10px] sm:text-xs md:text-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 shadow-lg"
              />
            </div>
          </div>

          <div className="text-center w-full">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-1 sm:mb-2 transition-all duration-200">
              Baskara
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              #acno0189
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <div className="flex flex-col text-center">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">5</p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300">Teman</p>
              </div>

              <div className="w-full sm:w-auto">
                <MyButton 
                  text="Add Friend" 
                  variant="accent" 
                  onClick={handleButtonClick}
                  className="w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 lg:py-3.5 text-sm sm:text-base md:text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4 md:gap-6 font-helvetica">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-200">
                Todo-List
              </h1>
              <Button />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 xl:gap-8">
              <div className="bg-tertiary px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 w-full h-auto min-h-[8rem] sm:min-h-[9rem] md:min-h-[10rem] rounded-2xl md:rounded-3xl lg:rounded-4xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 md:mb-3 text-white">
                  Me
                </h1>
                <ProgressBar tasks={20} completedPercentage={80} />
              </div>

              <div className="bg-tertiary px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 w-full h-auto min-h-[8rem] sm:min-h-[9rem] md:min-h-[10rem] rounded-2xl md:rounded-3xl lg:rounded-4xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 md:mb-3 text-white">
                  Group
                </h1>
                <ProgressBar tasks={20} completedPercentage={80} />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-4 md:gap-6 font-helvetica">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-200">
                POMODORO
              </h1>
              <Button />
            </div>
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4">
              <div className="bg-tertiary px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 w-full h-auto min-h-[12rem] sm:min-h-[13rem] md:min-h-[14rem] rounded-2xl md:rounded-3xl lg:rounded-4xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex justify-center items-center bg-center">
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 md:mb-3 text-white">
                  Well Well Well
                </h1>
              </div>
              <div className="bg-tertiary px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 w-full h-auto min-h-[8rem] sm:min-h-[9rem] md:min-h-[10rem] rounded-2xl md:rounded-3xl lg:rounded-4xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex justify-center items-center bg-center">
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 md:mb-3 text-white">
                  grepik
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 md:mb-3 text-white">
          Todo-List
        </h1>

        <Calendar tasks={fakeTasks} />
      </div>
    </>
  );
};

const Button: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null); //cek ukuran element
  const [buttonWidth, setButtonWidth] = useState(0);

  const buttons = ["Week", "Month"];

  useEffect(() => {
    if (containerRef.current) {
      const firstButton = containerRef.current.querySelector("button");
      if (firstButton) {
        setButtonWidth(firstButton.clientWidth);
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex font-helvetica bg-tertiary rounded-2xl gap-2 w-fit"
    >
      <div
        className="absolute h-10 rounded-2xl bg-[#16243B] transition-all duration-300"
        style={{
          width: buttonWidth,
          transform: `translateX(${activeIndex * (buttonWidth + 8)}px)`, //gap-2 = 8px
        }}
      ></div>

      {buttons.map((label, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`relative z-10 w-20 h-10 rounded-2xl text-white transition duration-200`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ProfilePage;

const fakeTasks: TaskInterface[] = [
  {
    id: 1,
    text: "Finish UI for login page",
    date: "2025-06-08",
    color: "bg-yellow-400",
  },
  { id: 2, text: "Team Sync Meeting", date: "2025-06-10", color: "bg-red-400" },
  {
    id: 3,
    text: "Deploy to staging",
    date: "2025-06-11",
    color: "bg-green-400",
  },
  {
    id: 4,
    text: "Refactor API endpoints",
    date: "2025-06-11",
    color: "bg-blue-400",
  },
  { id: 5, text: "Fix bug #112", date: "2025-06-14", color: "bg-yellow-400" },
  {
    id: 6,
    text: "Client presentation",
    date: "2025-06-16",
    color: "bg-green-400",
  },
  {
    id: 7,
    text: "Database migration plan",
    date: "2025-06-17",
    color: "bg-blue-400",
  },
  {
    id: 8,
    text: "User testing session",
    date: "2025-06-17",
    color: "bg-yellow-400",
  },
  {
    id: 9,  
    text: "Update documentation",
    date: "2025-06-20",
    color: "bg-red-400",
  },
  {
    id: 10,
    text: "Design new icons",
    date: "2025-06-22",
    color: "bg-green-400",
  },
];
