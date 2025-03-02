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
          <Route path='/learnMore' element={<LearnMore/>}/>
          <Route path='/process' element={<Process/>} />

          <Route path='/dashboard' element={
            // <ProtectedRoute>
              <Dashboard/>
            // </ProtectedRoute>
            }/>
        </Routes>
    
  )
}

export default App