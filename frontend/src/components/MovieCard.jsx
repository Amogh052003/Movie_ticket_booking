import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', width: '250px', padding: '10px' }}>
      <img src={movie.poster} alt={movie.title} style={{ width: '100%', borderRadius: '4px' }} />
      <h3>{movie.title}</h3>
      <p><strong>Language:</strong> {movie.language}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <Link to={`/book/${movie.id}`}>
        <button style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Book Now
        </button>
      </Link>
    </div>
  );
}

export default MovieCard;

