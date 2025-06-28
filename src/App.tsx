import { Route, Routes, useLocation } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import Auth from "./pages/auth/Auth";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import PomodoroTimer from "./pages/pomodoro/Pomodoro";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FindFriend from "./pages/findFriend/FindFriend";
import Grade from "./pages/grade/Grade";
import ChatPage from "./pages/chat/ChatPage";
import TodoList from "./pages/todo/TodoList";
import TodoDetail from "./pages/todo/TodoDetail";
import AddTodo from "./pages/todo/AddTodo";
import useGetUser from "./hooks/useGetUser";
import { Skeleton } from "./components/ui/skeleton";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const pathCheck =
    location.pathname.startsWith("/profile") || location.pathname === "/friend";
  const { user, loading, error } = useGetUser();

    
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      if (!loading) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsAppReady(true);
      }
    };

    initializeApp();
  }, [loading]);

  if (!isAppReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-tertiary">
        <div className="text-center space-y-4">
          <div className="mt-6">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* {error}  //soon (Blm dipikirin)*/}
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <Skeleton className="w-[20rem] h-[4rem]" />
          </div>
        ) : (
          <div
            className={`${
              pathCheck
                ? "bg-[linear-gradient(to_bottom,_theme(colors.primary)_20%,_#5a7ba8_40%,_theme(colors.tertiary)_60%,_theme(colors.tertiary)_100%)]"
                : "bg-tertiary"
            } min-h-screen flex flex-col`}
          >
            <Navbar user={user} />
            <main className="flex-grow">
              <Routes>
                <Route index element={<Dashboard />} />

                <Route path="/auth" element={<Auth />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:username" element={<Profile />} />

                <Route path="/todo" element={<TodoList user={user} />} />
                <Route path="/todo/detail" element={<TodoDetail />} />
                <Route path="/todo/post" element={<AddTodo user={user} />} />
                <Route path="/pomodoro" element={<PomodoroTimer />} />

                <Route path="/friend" element={<FindFriend />} />
                <Route path="/grade" element={<Grade />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </main>
              <Footer />
            </div>
        )}
      </div>
    </>
  );
}

export default App;
