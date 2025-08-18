import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookTicket from './pages/BookTicket';
import MovieDetails from './pages/MovieDetails';
import Ticket from './pages/Ticket'; // import Ticket page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/book/:id" element={<BookTicket />} />
      <Route path="/ticket/:bookingId" element={<Ticket />} /> {/* ✅ Added */}
    </Routes>
  );
}

export default App;
