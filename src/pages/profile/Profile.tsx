import React, { useEffect, useRef, useState } from "react";
import profilePic from "../../assets/images/profile.png";

const fakeTasks = [
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

// Calendar component
const Calendar = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const changeMonth = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const getCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Add empty cells for days before the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Add day cells for the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const calendarDays = getCalendarGrid();

  // display tasks
  const getTasksForDay = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    return tasks.filter((task) => task.date === dateString);
  };

  return (
    <div className="bg-tertiary p-4 sm:p-6 rounded-2xl md:rounded-3xl shadow-lg mt-4 md:mt-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="text-white text-2xl font-bold hover:text-amber-400 transition-colors"
        >
          ‹
        </button>
        <h2 className="text-xl font-bold text-white">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="text-white text-2xl font-bold hover:text-amber-400 transition-colors"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-300 text-sm py-2"
          >
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const tasksOnDay = getTasksForDay(day);
          const isToday =
            day && day.toDateString() === new Date().toDateString();

          return (
            <div
              key={index}
              className={`h-16 sm:h-20 flex flex-col items-center justify-center rounded-lg relative transition-colors ${
                day ? "hover:bg-[#16243B]" : ""
              } ${isToday ? "bg-[#16243B]" : ""}`}
            >
              {day && (
                <>
                  <span className="text-base text-white">{day.getDate()}</span>
                  {tasksOnDay.length > 0 && (
                    <div className="absolute bottom-2 flex items-center justify-center gap-1">
                      {tasksOnDay.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className={`w-1.5 h-1.5 rounded-full ${task.color}`}
                        ></div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row w-full min-h-screen p-3 sm:p-4 md:p-6 gap-4 md:gap-6 mt-[7rem] text-white transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center w-full xl:w-1/4 xl:max-w-xs gap-4 md:gap-6">
          <div className="relative group">
            <img
              src={profilePic}
              alt="Profile"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-60 xl:h-60 rounded-full object-cover shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl"
            />
            <button className="absolute -bottom-2 right-0 bg-gradient-to-r from-amber-400 to-amber-500 text-black px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out">
              Edit Profile
            </button>
          </div>

          <div className="text-center w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 transition-all duration-200">
              Baskara
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-3 md:mb-4">
              #acno0189
            </p>

            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
              <div className="flex flex-col text-center">
                <p className="text-lg sm:text-xl md:text-2xl">5</p>
                <p className="text-xs sm:text-sm text-gray-300">Teman</p>
              </div>

              <button className="h-8 sm:h-9 md:h-10 px-4 sm:px-5 md:px-6 flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out text-xs sm:text-sm font-medium whitespace-nowrap">
                Add friends
              </button>
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
      <div className="w-full min-h-screen p-3 sm:p-4 md:p-6 gap-4 md:gap-6 text-white transition-all duration-300 ease-in-out">
        <Calendar tasks={fakeTasks} />
      </div>
    </>
  );
};

type ProgressBarProps = {
  tasks: number;
  completedPercentage: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  tasks,
  completedPercentage,
}) => {
  const remainingPercentage = 100 - completedPercentage;

  return (
    <div className="mt-2 sm:mt-3 md:mt-4">
      <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-2 sm:mb-3 font-medium">
        {tasks} Tasks | {completedPercentage}% Complete
      </p>

      <div className="w-full h-2.5 sm:h-3 md:h-4 rounded-full bg-gray-600 relative overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-white to-gray-100 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${completedPercentage}%` }}
        ></div>
        <div
          className="h-full bg-gray-500 rounded-r-full absolute top-0 right-0 transition-all duration-700 ease-out"
          style={{ width: `${remainingPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mt-1 sm:mt-2">
        <span className="text-xs text-gray-400">0%</span>
        <span className="text-xs text-gray-400">100%</span>
      </div>
    </div>
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
