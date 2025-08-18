import { useNavigate } from 'react-router-dom';
import React from 'react';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const cardStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const cardHoverStyle = {
    backgroundColor: '#374151'
  };

  const imageStyle = {
    width: '160px',
    height: '224px',
    objectFit: 'cover'
  };

  const contentStyle = {
    padding: '24px',
    flex: 1
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'white',
    textDecoration: 'none'
  };

  const descriptionStyle = {
    color: '#d1d5db',
    marginTop: '8px',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 3
  };

  const buttonContainerStyle = {
    paddingRight: '24px'
  };

  const buttonStyle = {
    backgroundColor: '#dc2626',
    color: 'white',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '9999px',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div
      style={cardStyle}
      onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
      onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={movie.poster_url || 'https://via.placeholder.com/150'}
        alt={movie.title}
        style={imageStyle}
      />
      <div style={contentStyle}>
        <h2 style={titleStyle}>{movie.title}</h2>
        <p style={descriptionStyle}>{movie.description}</p>
      </div>
      <div style={buttonContainerStyle}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/book/${movie.id}`);
          }}
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
