import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"
import { Toaster } from "react-hot-toast"
import DefaultLayout from "./layout/DefaultLayout"
import Logout from "./pages/Auth/Logout"

function App() {

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/auth/signin" Component={SignIn}/>
        <Route path="/auth/signup" Component={SignUp} />
        <Route path="/logout" Component={Logout} />
        <Route element={<DefaultLayout />}>
          <Route path="/home" Component={Home} />
        </Route>
      </Routes>
    </>
  )
}

export default App
