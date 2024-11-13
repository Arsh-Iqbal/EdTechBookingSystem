// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import InstructorDashboard from './components/InstructorDashboard';
import StudentDashboard from './components/StudentDashboard';
import Signup from './pages/SignUp';


const App = () => {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard/>} />
        <Route path="/student/dashboard/" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;