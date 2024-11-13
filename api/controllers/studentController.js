const db = require('../db'); 
const { FieldValue } = require('firebase-admin/firestore');

// View availability for a given instructor
exports.viewAvailability = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const snapshot = await db.collection('availability').where('instructor', '==', instructorId).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No availability found' });
    }

    const availability = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch availability' });
    console.error(error);
  }
};

// Book a time slot for a student
exports.bookTimeSlot = async (req, res) => {
  try {
    const { student, instructor, date, timeSlot } = req.body;
    const dateFormatted = new Date(date);

    // Check for existing booking
    const existingBookingSnapshot = await db.collection('bookings')
      .where('instructor', '==', instructor)
      .where('date', '==', dateFormatted)
      .where('timeSlot', '==', timeSlot)
      .get();

    if (!existingBookingSnapshot.empty) {
      return res.status(400).json({ error: 'Time slot already booked' });
    }

    // Create a new booking
    const newBooking = {
      student,
      instructor,
      date: dateFormatted,
      timeSlot,
      createdAt: FieldValue.serverTimestamp()
    };

    const bookingRef = await db.collection('bookings').add(newBooking);
    res.status(201).json({ message: 'Booking confirmed', id: bookingRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book time slot' });
    console.error(error);
  }
};
