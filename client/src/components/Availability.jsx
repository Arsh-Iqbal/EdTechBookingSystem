import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Availability = ({ instructorId }) => {
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editTimeSlots, setEditTimeSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  

  
  const convertTimestampToDate = (timestamp) => {
    if (timestamp && timestamp._seconds) {
      return new Date(timestamp._seconds * 1000);
    }
    return new Date(timestamp);
  };

  //fetch boookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authorization token not found');

        const response = await axios.get('http://localhost:5000/api/instructors/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedBookings = response.data.map((booking) => ({
          ...booking,
          date: convertTimestampToDate(booking.date),
        }));

        setBookings(formattedBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setError('Failed to fetch bookings. Please try again.');
      }
    };

    fetchBookings();
  }, []);

  //fetch availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axios.get(`http://localhost:5000/api/instructors/availability/${instructorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedAvailability = response.data.map((slot) => ({
          ...slot,
          date: convertTimestampToDate(slot.date),
        }));

        setAvailability(formattedAvailability);
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      }
    };

    fetchAvailability();
  }, [instructorId]);


  //set availability
  const handleSetAvailability = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const response = await axios.post(
        'http://localhost:5000/api/instructors/availability',
        { instructor: instructorId, date: formattedDate, timeSlots: timeSlots.split(',') },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAvailability([...availability, response?.data?.newAvailability]);
      setDate('');
      setTimeSlots('');
    } catch (error) {
      console.error('Failed to set availability:', error);
    }
  };

  const handleEditClick = (slot) => {
    if (!slot || !slot.date) return;

    setEditMode(slot?.id);
    setEditDate(slot?.date.toISOString().split('T')[0]);
    setEditTimeSlots([...slot?.timeSlots]);
  };

  const handleTimeSlotChange = (index, newValue) => {
    setEditTimeSlots((prev) => {
      const updatedSlots = [...prev];
      updatedSlots[index] = newValue;
      return updatedSlots;
    });
  };

  //set update availability
  const handleUpdateAvailability = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const response = await axios.put(
        `http://localhost:5000/api/instructors/availability/${editMode}`,
        { date: editDate, timeSlots: editTimeSlots },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAvailability(
        availability.map((slot) => (slot?.id === editMode ? response?.data?.updatedAvailability : slot))
      );
      setEditMode(null);
      setEditDate('');
      setEditTimeSlots([]);
    } catch (error) {
      console.error('Failed to update availability:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md mt-8">

      {/* Availability set part.......... */}
      <h2 className="text-2xl font-semibold mb-4">Set Availability</h2>
      <form onSubmit={handleSetAvailability} className="space-y-4 mb-8">
        <div>
          <label className="block text-gray-700 mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Time Slots (comma separated):</label>
          <input
            type="text"
            placeholder="e.g., 10:00-11:00, 11:30-12:30"
            value={timeSlots}
            onChange={(e) => setTimeSlots(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Set Availability
        </button>
      </form>



    {/* show current availability .................*/}

      <h3 className="text-xl font-semibold mb-2">Current Availability</h3>
      <ul className="space-y-4">
        {availability?.map((slot) => (
          <li key={slot?.id} className="p-4 bg-gray-100 rounded-md shadow-sm flex justify-between items-center">
            <div >
              <p className="font-medium">
                {new Date(slot?.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}: 
                <span className="ml-2 text-gray-700">{slot?.timeSlots.join(', ')}</span>
              </p>
            </div>
            <button
              onClick={() => handleEditClick(slot)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

     {/* Update section................ */}

      {editMode && (
        <div className="mt-6 p-4 bg-gray-50 border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Edit Availability</h3>
          <form onSubmit={handleUpdateAvailability} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Date:</label>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {editTimeSlots.map((timeSlot, index) => (
              <div key={index}>
                <label className="block text-gray-700 mb-1">Time Slot {index + 1}:</label>
                <input
                  type="text"
                  value={timeSlot}
                  onChange={(e) => handleTimeSlotChange(index, e.target.value)}
                  required
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditMode(null)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
  
   {/* Booking show section........... */}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="border p-2">{new Date(booking?.date).toLocaleDateString()}</td>
                  <td className="border p-2">{booking?.timeSlot}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="border p-4 text-center text-gray-600">No upcoming bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Availability;
