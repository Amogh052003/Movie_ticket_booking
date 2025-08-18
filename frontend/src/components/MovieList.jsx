import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Failed to load movies:', err));
  }, []);

  return (
    <div className="movie-list">
      <h2>Now Showing</h2>
      <div className="grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.name} />
            <h3>{movie.name}</h3>
            <p>{movie.description}</p>
            <Link to={`/book/${movie.id}`}>
              <button>Book Tickets</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
