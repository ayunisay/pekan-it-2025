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
import TodoList from "./pages/todo/TodoList";
import TodoDetail from "./pages/todo/TodoDetail";
import AddTodo from "./pages/todo/AddTodo";
import useGetUser from "./hooks/useGetUser";
import { Skeleton } from "./components/ui/skeleton";
import PrivateChatPage from "./pages/chat/PrivateChatPage";
import GroupChatPage from "./pages/chat/GroupChatPage";
import BaseToaster from "./components/systems/BaseToaster";

function App() {
  const location = useLocation();
  const pathCheck =
    location.pathname === "/profile" || location.pathname === "/friend";
  const { user, loading, error } = useGetUser();

  return (
    <>
      {/* {error}  //soon (Blm dipikirin)*/}
      {loading ? <Skeleton /> : ""}
      <div
        className={`${
          pathCheck
            ? "bg-[linear-gradient(to_bottom,_theme(colors.primary)_20%,_#5a7ba8_40%,_theme(colors.tertiary)_60%,_theme(colors.tertiary)_100%)]"
            : "bg-tertiary"
        } min-h-screen flex flex-col`}
      >
        <Navbar user={user} />
        <BaseToaster />
        <Routes>
          <Route index element={<Dashboard />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/todo" element={<TodoList />} />
          <Route path="/todo/detail" element={<TodoDetail />} />
          <Route path="/todo/post" element={<AddTodo />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />

          <Route path="/find" element={<FindFriend />} />
          <Route path="/grade" element={<Grade />} />
          <Route path="/private-chat" element={<PrivateChatPage />} />
          <Route path="/group-chat" element={<GroupChatPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
