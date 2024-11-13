const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const instructorRoutes = require('./routes/instructorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

const db = require('./db');



app.use('/api/auth', authRoutes)
app.use('/api/instructors', instructorRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});