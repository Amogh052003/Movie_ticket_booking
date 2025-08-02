// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function BookTicket() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState(null);
//   const [name, setName] = useState('');
//   const [tickets, setTickets] = useState(1);

//   useEffect(() => {
//     axios.get(`http://localhost:8000/movies/${id}`)
//       .then(res => setMovie(res.data))
//       .catch(err => console.error(err));
//   }, [id]);

//   const handleBooking = () => {
//     axios.post('http://localhost:8000/bookings', {
//       movie_id: id,
//       name,
//       tickets: Number(tickets)
//     })
//     .then(() => {
//       alert('Booking successful!');
//       navigate('/'); 
//     })
//     .catch(err => alert('Booking failed'));
//   };

//   if (!movie) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h2>Booking for: {movie.title}</h2>
//       <div>
//         <label>Name: </label>
//         <input value={name} onChange={e => setName(e.target.value)} />
//       </div>
//       <div>
//         <label>Tickets: </label>
//         <input type="number" min="1" value={tickets} onChange={e => setTickets(e.target.value)} />
//       </div>
//       <button onClick={handleBooking}>Confirm Booking</button>
//     </div>
//   );
// }

// export default BookTicket;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookTicket = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userName, setUserName] = useState('');
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const booking = {
        movie_id: parseInt(id),
        user_name: userName,
        seats: parseInt(seats)
      };

      const response = await axios.post('http://localhost:8000/bookings', booking);
      setMessage(response.data.message);
      setUserName('');
      setSeats(1);
    } catch (err) {
      console.error('Booking failed:', err);
      setMessage('Booking failed');
    }
  };

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book Tickets for: {movie.title}</h2>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Language:</strong> {movie.language}</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div>
          <label>Your Name:</label><br />
          <input
            type="text"
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
            style={{ padding: '0.5rem', width: '300px' }}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Number of Seats:</label><br />
          <input
            type="number"
            value={seats}
            required
            min="1"
            max="10"
            onChange={(e) => setSeats(e.target.value)}
            style={{ padding: '0.5rem', width: '100px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '1.5rem', padding: '0.7rem 1.5rem' }}>
          Confirm Booking
        </button>
      </form>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
  );
};

export default BookTicket;
