import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { MyButton } from '../../components/Button';

const AddTodo = () => {
  const [taskType, setTaskType] = useState('Pribadi');
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedColor, setSelectedColor] = useState('#5CE3B1');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const colors = [
    '#5CE3B1', // cyan
    '#16243B', // dark
    '#DDB742', // Yellow
    '#385484', // dongker
    '#00FFFF'  // sage
  ];

  return (
  <>

    <div className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-4">
    <h1 className="text-white text-2xl font-semibold text-center mb-6">
      New Task
    </h1>
      <div className="max-w-lg bg-[#4E7B97] backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
        <div className="space-y-6">
          {/* Task Type Toggle */}
          <div className="flex bg-slate-600/50 rounded-2xl p-1 gap-1">
            <button
              onClick={() => setTaskType('Pribadi')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                taskType === 'Pribadi'
                  ? 'bg-amber-400 text-slate-800 shadow-lg'
                  : 'text-white hover:bg-slate-500/50'
              }`}
            >
              Pribadi
            </button>
            <button
              onClick={() => setTaskType('Group')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                taskType === 'Group'
                  ? 'bg-amber-400 text-slate-800 shadow-lg'
                  : 'text-white hover:bg-slate-500/50'
              }`}
            >
              Group
            </button>
          </div>

          {/* Task Input */}
          <div>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="masukkan task"
              className="w-full bg-slate-300/90 text-slate-700 placeholder-slate-500 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300"
            />
          </div>

          {/* Deadline Input */}
          <div className="relative">
            <div
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full bg-slate-300/90 text-slate-500 rounded-2xl px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-300 transition-all duration-300"
            >
              <span>{deadline || 'masukkan deadline'}</span>
              <ChevronDown className="w-5 h-5" />
            </div>
            {showDatePicker && (
              <input
                type="date"
                value={deadline}
                onChange={(e) => {
                  setDeadline(e.target.value);
                  setShowDatePicker(false);
                }}
                className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl px-4 py-3 shadow-lg z-10"
              />
            )}
          </div>

          {/* Color and Member Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <h3 className="text-white font-medium mb-3">Color</h3>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-lg transition-all duration-300 ${
                      selectedColor === color
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-500 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-3">Member</h3>
              <MyButton 
              text="Add Member"
              icon={Plus}
              variant='accent'
              />
            </div>
          </div>

          <MyButton 
          text="Create Task"
          className='w-full'
          variant='accent'
          />
        </div>
      </div>
    </div>
  </>
  );
};

export default AddTodo;