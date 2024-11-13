import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Booking = ({ studentId, instructorId }) => {
  const [date, setDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [timeSlot, setTimeSlot] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/availability/${instructorId}`);
        const formattedSlots = response.data.map((slot) => {
          if (slot.date?._seconds) {
            return {
              ...slot,
              date: new Date(slot.date._seconds * 1000),
            };
          }
          return {
            ...slot,
            date: new Date(slot.date),
          };
        });
        setAvailableSlots(formattedSlots);
      } catch (error) {
        console.error('Failed to fetch availability');
        setErrorMessage('Failed to fetch availability');
      }
    };
    fetchAvailability();
  }, [instructorId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/students/book', {
        student: studentId,
        instructor: instructorId,
        date,
        timeSlot,
      });
      setSuccessMessage(response.data.message || 'Booking successful!');
      setDate('');
      setTimeSlot('');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to book time slot');
    } finally {
      setLoading(false);
    }
  };

  const filteredSlots = availableSlots.find((slot) => {
    if (slot.date instanceof Date && !isNaN(slot.date)) {
      return slot.date.toISOString().split('T')[0] === date;
    }
    return false;
  })?.timeSlots || [];

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Book a Time Slot</h2>
      
      <form onSubmit={handleBooking} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setTimeSlot('');
            }}
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Time Slot:</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            disabled={!filteredSlots.length}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              {filteredSlots.length ? 'Select a time slot' : 'No available slots'}
            </option>
            {filteredSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !timeSlot}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? 'Booking...' : 'Book'}
        </button>
      </form>

      {successMessage && <p className="mt-4 text-green-600 text-center">{successMessage}</p>}
      {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}
    </div>
  );
};

export default Booking;
