import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './home';
import Contact from './pages/contact';
import LearnMore from './pages/learnMore';
import FAQItem  from './components/faq';
import Features from './components/Features';
import Process from './pages/process'

const App = () => {
  return (
    
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/learnmore' element={<LearnMore />} />
          <Route path='/faq' element={<FAQItem />} />
          <Route path='/features' element={<Features />} />
          <Route path='/process' element={<Process />}   />
        </Routes>
  )
}
export default App