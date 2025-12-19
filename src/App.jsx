
import React from 'react'
import { Route, Routes } from 'react-router'
import Index from './components/Index'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Leaderboard from './components/Leaderboard'
import Profile from './components/Profile'
import Popup from './components/Popup'
import QuizPage from './components/QuizPage'
import UpdateDetails from './components/UpdateDetails'
import ChangePassword from './components/changePassword'
import ChangeProfileImage from './components/ChangeProfileImage'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/about'element={<About />}/>
      <Route path='/contact'element={<Contact />}/>
      <Route path='/leaderboard'element={<Leaderboard />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/popup' element={<Popup />}/>
      <Route path='/quiz' element={<QuizPage />}/>
      <Route path='/updateDetails' element={<UpdateDetails />}/>
      <Route path='/changePassword' element={<ChangePassword />}/>
      <Route path='/updateImage' element={<ChangeProfileImage  />}/>
      

    </Routes>
    
    
    </>
  )
}

export default App