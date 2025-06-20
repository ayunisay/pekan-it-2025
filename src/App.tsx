import { Route, Routes } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import Auth from "./pages/auth/Auth";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Chat from "./pages/chat/ChatPage";
// import Profile from "./pages/profile/Profile";
import PomodoroTimer from "./pages/pomodoro/Pomodoro";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="bg-tertiary min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/pomodoro" element={<PomodoroTimer />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
