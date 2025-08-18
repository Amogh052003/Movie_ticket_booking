import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ticket-booking-app-service.azurewebsites.net";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/movies`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
      });
  }, [API_BASE_URL]);

  return (
    <div className="home-container">
      <h1 className="home-title">🎬 Now Showing</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies available right now.</p>
        )}
      </div>
    </div>
  );
};

export default Home;


