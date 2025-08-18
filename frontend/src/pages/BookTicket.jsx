import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // ✅ added useNavigate
import axios from 'axios';

const API_BASE_URL = "https://ticket-booking-app-service.azurewebsites.net"; // backend base URL

const BookTickets = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // ✅ initialize navigate

  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userName, setUserName] = useState('');
  const [bookedSeats, setBookedSeats] = useState([]);
  const totalSeats = 20;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error("Error fetching movie:", err));

    axios.get(`${API_BASE_URL}/bookings/${id}`)
      .then(res => setBookedSeats(res.data)) 
      .catch(() => setBookedSeats([]));
  }, [id]);

  const handleSeatToggle = (seat) => {
    if (bookedSeats.includes(seat)) return; 
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    if (!userName.trim() || selectedSeats.length === 0) {
      alert("Enter your name and select at least one seat.");
      return;
    }

    const data = {
      movie_id: parseInt(id, 10),
      user_name: userName.trim(),
      seats: selectedSeats
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/bookings/`, data);
      
      // ✅ redirect to ticket page with bookingId (from backend response)
      const bookingId = res.data?.id || Date.now(); // fallback: timestamp if backend doesn’t return id
      navigate(`/ticket/${bookingId}`);
      
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

  const renderSeats = () => {
    return Array.from({ length: totalSeats }, (_, i) => {
      const seat = `S${i + 1}`;
      const isBooked = bookedSeats.includes(seat);
      const isSelected = selectedSeats.includes(seat);

      return (
        <label
          key={seat}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}
        >
          <input
            type="checkbox"
            value={seat}
            checked={isSelected}
            disabled={isBooked}
            onChange={() => handleSeatToggle(seat)}
          />
          <span style={{ color: isBooked ? '#f87171' : 'white' }}>{seat}</span>
        </label>
      );
    });
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #1a1a1a, #000)',
      color: 'white',
      padding: '24px',
      minHeight: '100vh'
    }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        marginBottom: '16px'
      }}>
        Book Tickets for {movie?.title}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {renderSeats()}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Your Name:</label>
        <input
          style={{
            color: 'black',
            padding: '8px 12px',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '300px'
          }}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <button
        onClick={handleBooking}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookTickets;
