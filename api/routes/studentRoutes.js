const express = require('express');
const router = express.Router();
const { viewAvailability, bookTimeSlot } = require('../controllers/studentController');

router.get('/availability/:instructorId', viewAvailability);

router.post('/book', bookTimeSlot);

module.exports = router;
