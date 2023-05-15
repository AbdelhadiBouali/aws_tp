
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import ProtectedRoutes from './Helpers/ProtectedRoutes'
import Game from './Pages/Game/Game'
import Profile from './Pages/Profile/Profile'
import Initial  from './Pages/Initial/Initial'

const RouterContainer = () => {



  return (
    <Routes>
        <Route path='/' element={<Initial/>} />
        <Route path="/game" element={
          <ProtectedRoutes component={Game} />
        } />
        <Route path="/profile" element={
          <ProtectedRoutes component={Profile} />
        } />

        {/* <ProtectedRoutes exact path="/home" component={Home} authed={isA} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default RouterContainer