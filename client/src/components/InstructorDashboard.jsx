// src/components/InstructorDashboard.js
import React, { useEffect, useState } from 'react';
import Availability from './Availability';
import axios from 'axios';

const InstructorDashboard = () => {

  
  const instructorId = "8sLOvOM5EcviFkkQPDy2";

  if (!instructorId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Availability instructorId={instructorId} />
    </div>
  );
};

export default InstructorDashboard;