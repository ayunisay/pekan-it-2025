import { useState } from "react";
import type { TaskInterface } from "../../interface/Interface";

interface CalendarProps {
  tasks: TaskInterface[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const changeMonth = (offset: number) => {
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
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const calendarDays = getCalendarGrid();

  // Get tasks
  const getTasksForDay = (date: Date | null) => {
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

export default Calendar