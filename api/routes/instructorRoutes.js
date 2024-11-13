const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { setAvailability, updateAvailability, getUpcomingBookings, fetchAvailability } = require('../controllers/instructorController');

router.get("/availability/:instructorId", protect,fetchAvailability);

router.post('/availability', protect, setAvailability);
router.put('/availability/:instructorId', protect, updateAvailability);
router.get('/bookings', protect, getUpcomingBookings);

module.exports = router;

