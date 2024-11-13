const db = require('../db'); 
const { FieldValue } = require('firebase-admin/firestore');

// Fetch availability for a given instructor
exports.fetchAvailability = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;
    const availabilityResults = await db.collection('availability').where('instructor', '==', instructorId).get();

    if (availabilityResults.empty) {
      return res.status(404).json({ message: 'No availability found' });
    }

    const availability = availabilityResults.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get availability' });
  }
};

// Set new availability for an instructor
exports.setAvailability = async (req, res) => {
  try {
    const { instructor, date, timeSlots } = req.body;
    const newAvailability = {
      instructor,
      date: new Date(date), 
      timeSlots,
      createdAt: FieldValue.serverTimestamp()
    };

    const addData = await db.collection('availability').add(newAvailability);
    console.log('New availability set:', addData.id);

    res.status(201).json({ message: 'Availability set successfully', id: addData.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set availability' });
    console.error(error);
  }
};

// Update existing availability for an instructor
exports.updateAvailability = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const updatedData = req.body;

    const getData = db.collection('availability').doc(instructorId);
    const getDoc = await getData.get();
    
    if (!getDoc.exists) {
      return res.status(404).json({ message: 'Availability not found' });
    }
    
    await getData.update(updatedData);
    console.log("update 1");
    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update availability' });
    console.error(error);
  }
};

// Get upcoming bookings for an instructor
exports.getUpcomingBookings = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const getData = await db.collection('bookings').where('instructor', '==', instructorId).get();

    if (getData.empty) {
      return res.status(404).json({ message: 'No upcoming bookings found' });
    }

    const bookings = getData.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bookings' });
    console.error(error);
  }
};
