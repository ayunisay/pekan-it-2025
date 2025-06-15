import { Route, Routes } from "react-router"
import { Dashboard } from "./pages/Dashboard"
import Auth from "./pages/auth/Auth"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Dashboard />}/>
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App