import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

function Home() {
    const movies = [
    {
      id: 1,
      title: "Oppenheimer",
      poster: "https://image.tmdb.org/t/p/w500/bKzYxSxz6uDwFpHvMZgXlIItKZt.jpg",
      language: "English",
      genre: "Drama",
    },
    {
      id: 2,
      title: "RRR",
      poster: "https://image.tmdb.org/t/p/w500/npW9vGCVZdpU0zH2eCmz8aCtXyB.jpg",
      language: "Telugu",
      genre: "Action",
    },
    {
      id: 3,
      title: "Inception",
      poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
      language: "English",
      genre: "Sci-Fi",
    },
  ];

  // useEffect(() => {
  //   axios.get('http://localhost:8000/movies')
  //     .then(res => setMovies(res.data))
  //     .catch(err => console.error(err));
  // }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1> Movie Ticket Booking System</h1>
      <Link to="/my-bookings">My Bookings</Link> {/* Placeholder for future */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
