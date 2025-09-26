import { Route, Routes } from "react-router-dom"

import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"

const App = () => {

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Routes>
        <Route path="/" element={"Home"} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
