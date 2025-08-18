import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ticket-booking-app-service-d5djc9ccaxd3ana0.centralindia-01.azurewebsites.net";
const API_BASE_URL = "https://ticket-booking-app-service.azurewebsites.net"
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(() => alert('Movie not found.'));
  }, [id]);

  if (!movie) {
    return (
      <p style={{ color: 'white', padding: '24px' }}>Loading...</p>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '40px',
        padding: '40px',
        minHeight: '100vh',
        backgroundColor: 'linear-gradient(to bottom right, #1a1a1a, #000)',
        color: 'white',
        fontFamily: 'sans-serif'
      }}
    >
      <img
        src={movie.poster_url}
        alt={movie.title}
        style={{
          width: '300px',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>{movie.title}</h1>
        <p>{movie.description}</p>
        <p><strong>Language:</strong> {movie.language || "N/A"}</p>
        <p><strong>Duration:</strong> {movie.duration || "N/A"}</p>
        <p><strong>Rating:</strong> ⭐ {movie.rating || "N/A"}</p>
        <button
          onClick={() => navigate(`/book/${movie.id}`)}
          style={{
            marginTop: '24px',
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            width: 'fit-content'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
