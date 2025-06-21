import { Route, Routes, useLocation } from "react-router"
import { Dashboard } from "./pages/Dashboard"
import Auth from "./pages/auth/Auth"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import Profile from "./pages/profile/Profile"
import PomodoroTimer from "./pages/pomodoro/Pomodoro"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import FindFriend from "./pages/FindFriend"

function App() {
  const location = useLocation();
  const pathCheck = location.pathname === '/profile' || location.pathname === '/friend';
  
  return (
  <>
    <div
      className={`${
        pathCheck
          ? 'bg-[linear-gradient(to_bottom,_theme(colors.primary)_20%,_#5a7ba8_40%,_theme(colors.tertiary)_60%,_theme(colors.tertiary)_100%)]'
          : 'bg-tertiary'
      } min-h-screen flex flex-col`}
    >
      <Navbar />
      <Routes>
        <Route index element={<Dashboard />}/>
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/friend" element={<FindFriend />} />
      </Routes>
      <Footer />
    </div>
  </>
  )
}

export default App