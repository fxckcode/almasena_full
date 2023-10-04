import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"

function App() {

  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/home" Component={Home} />
    </Routes>
  )
}

export default App
