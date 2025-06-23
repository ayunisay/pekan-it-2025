import React, { useState } from "react";
import TodoDisplay from "../../components/TodoDisplay";
import { MyButton } from "../../components/Button";
import TodoTile from "../../components/TodoTile";
import { Plus } from "lucide-react";

const TodoList = () => {
  const [todoChecked, setTodoChecked] = useState(false); //Asal ada aja

  return (
    <div className="min-h-screen mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-6 sm:mb-8 lg:mb-12 gap-4 sm:gap-0">
          <MyButton
            text="Add New Task"
            icon={Plus}
            variant="accent"
            size="medium"
            className="w-full sm:w-auto"
          />
        </div>

        <div className="mb-8 sm:mb-12 flex flex-row">
          <TodoDisplay />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Task Section */}
          <div className="rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                Tasks for Today
              </h2>
              <div className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {toDoItemData.filter(item => !item.isChecked).length} pending
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {toDoItemData.length > 0 ? (
                toDoItemData.map((item) => (
                  <TodoTile
                    key={item.id}
                    isChecked={item.isChecked}
                    label={item.label}
                    id={item.id}
                    onChange={setTodoChecked}
                  />
                ))
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-gray-400 text-4xl sm:text-5xl mb-4">📝</div>
                  <p className="text-gray-500 text-sm sm:text-base">
                    No tasks yet. Add your first task to get started!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Calendar Section */}
          <div className="bg-grey-accent rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                Calendar
              </h2>
              <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {toDoItemData.filter(item => item.isChecked).length} completed
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {toDoItemData.length > 0 ? (
                toDoItemData
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((item) => (
                    <TodoTile
                      key={`calendar-${item.id}`}
                      isChecked={item.isChecked}
                      label={item.label}
                      date={item.date}
                      id={item.id}
                      onChange={setTodoChecked}
                    />
                  ))
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-gray-400 text-4xl sm:text-5xl mb-4">📅</div>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Your calendar is empty. Schedule some tasks!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-grey-accent rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
                {toDoItemData.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Total Tasks
              </div>
            </div>
            
            <div className="bg-grey-accent rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
                {toDoItemData.filter(item => item.isChecked).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Completed
              </div>
            </div>
            
            <div className="bg-grey-accent rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">
                {toDoItemData.filter(item => !item.isChecked).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Pending
              </div>
            </div>
            
            <div className="bg-grey-accent rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">
                {toDoItemData.length > 0 ? Math.round((toDoItemData.filter(item => item.isChecked).length / toDoItemData.length) * 100) : 0}%
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Progress
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const toDoItemData = [
  {
    id: "1",
    isChecked: false,
    label: "Mengerjakan Desain UI/UX Aplikasi Mobile",
    date: new Date(2025, 0, 15),
  },
  {
    id: "2",
    isChecked: true,
    label: "Revisi Laporan Keuangan Tahunan",
    date: new Date(2025, 1, 28),
  },
  {
    id: "3",
    isChecked: false,
    label: "Menyiapkan Presentasi untuk Rapat Mingguan",
    date: new Date(2025, 2, 10),
  },
  {
    id: "4",
    isChecked: false,
    label: "Mengembangkan Fitur Login di Website",
    date: new Date(2025, 3, 5),
  },
  {
    id: "5",
    isChecked: true,
    label: "Melakukan Review Kode untuk Modul Pembayaran",
    date: new Date(2024, 11, 20),
  },
  {
    id: "6",
    isChecked: false,
    label: "Mempelajari Bahasa Pemrograman Python Dasar",
    date: new Date(2025, 4, 12),
  },
  {
    id: "7",
    isChecked: false,
    label: "Menulis Artikel Blog tentang Teknologi Terbaru",
    date: new Date(2025, 5, 30),
  },
  {
    id: "8",
    isChecked: true,
    label: "Membeli Perlengkapan Kantor Baru",
    date: new Date(2024, 9, 1),
  },
];

export default TodoList;