import React, { useEffect, useState } from "react";
import TodoDisplay from "../../components/todo/TodoDisplay";
import { MyButton } from "../../components/Button";
import TodoTile from "../../components/todo/TodoTile";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { getTodoByUser, updateTodo } from "../../providers/TodoProvider";
import type { TodoType } from "../../types/todo";
import type { UserType } from "../../types/user";

type TodoListProps = {
  user: UserType | null;
};

const TodoList: React.FC<TodoListProps> = ({ user }) => {
  const navigate = useNavigate()
  const [todos, setTodos] = useState<TodoType[]>([])
  useEffect(() => {
    const fetchTodo = async () => {
      if(user == null){
        return console.log("Kosong");
      }
      try{
        const data = await getTodoByUser(user.id);
        setTodos(data);

      } catch (e: any) {
        console.log(`Error fetch todo: ${e}`)
      }
    }
    fetchTodo()
  }, [user])

  const handleChecklist = async (updatedTodo: TodoType) => {
    try {
      const data = {
        ...updatedTodo,
        userId: user!.id
      };
      const updated = await updateTodo(updatedTodo.id, data);

      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );

      console.log(updated);
    } catch (e) {
      console.log(e);
    }
  };

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
            onClick={() => navigate('/todo/post')}
          />
        </div>

        <div className="mb-8 sm:mb-12 flex flex-row">
          <TodoDisplay todos={todos}/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Task Section */}
          <div className="rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                Tasks for Today
              </h2>
              <div className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {(todos ?? []).filter(todo => !todo.isChecked).length} pending
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {todos.length > 0 ? (
                todos.map((item) => (
                  <TodoTile
                    todo={item}
                    onChange={(checked) => handleChecklist({ ...item, isChecked: checked })}
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
                {todos.filter(item => item.isChecked).length} completed
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {/* {todos.length > 0 ? ( //sorting pake tanggal
                todos
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((item) => (
                    <TodoTile
                      key={`calendar-${item.id}`}
                      isChecked={item.isChecked}
                      label={item.label}
                      date={item.dead}
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
              )} */}
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-grey-accent rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
                {todos.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Total Tasks
              </div>
            </div>
            
            <div className="bg-grey-accent rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
                {todos.filter(item => item.isChecked).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Completed
              </div>
            </div>
            
            <div className="bg-grey-accent rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">
                {todos.filter(item => !item.isChecked).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Pending
              </div>
            </div>
            
            <div className="bg-grey-accent rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">
                {todos.length > 0 ? Math.round((todos.filter(item => item.isChecked).length / todos.length) * 100) : 0}%
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

export default TodoList;