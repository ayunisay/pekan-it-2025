import React from "react";

type TodoTileProps = {
  id: string;
  label: string;
  date?: Date;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
};

const TodoTile: React.FC<TodoTileProps> = ({
  id,
  label,
  date,
  isChecked,
  onChange
}) => {
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <>
      <div className="bg-grey-accent rounded-lg sm:rounded-xl shadow-md w-full h-12 sm:h-14 md:h-16 lg:h-[4.5rem] flex items-center overflow-hidden">
        <div className="w-1 sm:w-1.5 md:w-2 lg:w-2.5 h-full bg-secondary rounded-l-lg sm:rounded-l-xl flex-shrink-0" />
        <div className="flex justify-between items-center w-full min-w-0 px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4">
          <span className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-medium truncate pr-3 sm:pr-4 flex-1">{label}</span>
          
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-shrink-0">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-thin text-primary font-helvetica whitespace-nowrap">
              {date && date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            
            <input
              type="checkbox"
              id={id}
              checked={isChecked}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoTile;
