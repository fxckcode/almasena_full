import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/Auth/SignUp"
import UserContext, { UserProvider } from "./context/UserContext"
import SignIn from "./pages/Auth/SignIn"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/auth/signin" Component={SignIn}/>
        <Route path="/auth/signup" Component={SignUp} />
        <Route path="/home" Component={Home} />
      </Routes>
    </>
    // <UserProvider>
        
    // </UserProvider>
  )
}

export default App
