import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  // Dummy movie details (replace with actual API logic if needed)
  const movie = {
    id,
    title: "Inception",
    description:
      "A skilled thief is given a chance at redemption if he can successfully perform inception — planting an idea in someone's subconscious.",
    poster:
      "https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    genre: "Sci-Fi, Thriller",
    releaseDate: "2010-07-16",
    rating: "8.8",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "#fff",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "1000px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            width: "300px",
            objectFit: "cover",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        />
        <div style={{ padding: "2rem", flex: 1 }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            {movie.title}
          </h1>
          <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
            Directed by <strong>{movie.director}</strong>
          </p>
          <p style={{ marginBottom: "1rem" }}>{movie.description}</p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Cast:</strong> {movie.cast.join(", ")}
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Rating:</strong> ⭐ {movie.rating}/10
          </p>
          <button
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#ff416c",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 0 10px #ff416c80",
              transition: "0.3s",
            }}
            onClick={() => alert("Ticket booking coming soon!")}
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
