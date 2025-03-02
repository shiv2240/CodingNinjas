import React from 'react'
import { useState, useEffect } from 'react';
import {  Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './home';

import Dashboard from './pages/Dashboard';
import MyProfile from './pages/myProfile';
import LearnMore from './pages/learnmorePage';
import Process from './pages/process';
import Loading from './components/loading';
import ProtectedRoute from './utils/ProtectedRoute';

import Contact from './pages/contact';
import FAQItem  from './components/faq';
import Features1 from './components/features1';

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return < Loading />; 
  }  

  return (
    
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/profile' element={<MyProfile/>}/>

          <Route path='/process' element={<Process/>} />

          <Route path='/dashboard' element={
            // <ProtectedRoute>
              <Dashboard/>
            // </ProtectedRoute>
            }/>

          <Route path='/contact' element={<Contact />} />
          <Route path='/learnmore' element={<LearnMore />} />
          <Route path='/faq' element={<FAQItem />} />
          <Route path='/features' element={<Features1 />} />

        </Routes>
  )
}
export default App