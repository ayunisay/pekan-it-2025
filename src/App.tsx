import { Route, Routes } from "react-router"
import { Dashboard } from "./pages/Dashboard"
import Auth from "./pages/auth/Auth"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import Profile from "./pages/profile/Profile"
import PomodoroTimer from "./pages/pomodoro/Pomodoro"
import Navbar from "./components/Navbar"

function App() {
  return (
  <>
      <Navbar />
      <Routes>
        <Route index element={<Dashboard />}/>
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
      </Routes>
    </>
  )
}

export default App