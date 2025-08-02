import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookTicket from './pages/BookTicket';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookTicket />} />
    </Routes>
  );
}
export default App;