import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"
import { Toaster } from "react-hot-toast"
import DefaultLayout from "./layout/DefaultLayout"
import Logout from "./pages/Auth/Logout"
import ProtectedRoute from "./utils/ProtectedRoute"
import { UserProvider } from "./context/UserContext"
import LogEntry from "./pages/LogEntry"
import Exits from "./pages/Exits"
import Redirect from "./pages/Redirect"


function App() {

  return (
    <>
      <Toaster />
      <UserProvider>
        <Routes>
          <Route path="/auth/signin" Component={SignIn} />
          <Route path="/auth/signup" Component={SignUp} />
          <Route path="/logout" Component={Logout} />
          <Route element={<DefaultLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" Component={Home} />
              <Route path="/registro/:id" Component={LogEntry} />
              <Route path="/exits" Component={Exits} />
              <Route path="/" Component={Redirect} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
