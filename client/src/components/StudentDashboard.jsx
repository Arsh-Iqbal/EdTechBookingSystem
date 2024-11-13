// src/components/StudentDashboard.js
import React from 'react';
import Booking from './Booking';
import { useParams } from 'react-router-dom';

const StudentDashboard = () => {
  
  const studentId = "QOBpWXEN41KsD8ZFlkOP"; 
  const instructorId = "8sLOvOM5EcviFkkQPDy2"; 
  
  return (
    <div>
      <Booking studentId={studentId} instructorId={instructorId} />
    </div>
  );
};

export default StudentDashboard;