import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './home';
import Contact from './pages/contact';
import LearnMore from './pages/learnMore';
import FAQ  from './components/faq';

const App = () => {
  return (
    
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/learnmore' element={<LearnMore />} />
          <Route path='/faq' element={<FAQ />} />
        </Routes>
  )
}
export default App