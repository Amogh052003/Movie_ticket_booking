import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie_details/${movie.id}`)}
      className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-xl overflow-hidden shadow-lg transition duration-300 cursor-pointer group"
    >
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="w-40 h-56 object-cover"
      />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-semibold group-hover:underline">{movie.title}</h2>
        <p className="text-gray-300 mt-2 line-clamp-3">{movie.description}</p>
      </div>
      <div className="pr-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/book/${movie.id}`);
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
