import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // if using React Router
import axios from "axios";
import "./Ticket.css";

const Ticket = () => {
  const { bookingId } = useParams(); // e.g., /ticket/:bookingId
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://ticket-booking-app-service.azurewebsites.net";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/bookings/${bookingId}`)
      .then((res) => {
        setTicket(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch booking:", err);
        setLoading(false);
      });
  }, [API_BASE_URL, bookingId]);

  if (loading) return <p>Loading ticket...</p>;
  if (!ticket) return <p>Booking not found.</p>;

  return (
    <div className="ticket-container">
      <h1 className="ticket-title">🎟 Your Ticket</h1>
      <div className="ticket-card">
        <h2>{ticket.movie_name}</h2>
        <p><strong>Showtime:</strong> {ticket.showtime}</p>
        <p><strong>Seats:</strong> {ticket.seats.join(", ")}</p>
        <p><strong>Booking ID:</strong> {ticket.id}</p>
      </div>
    </div>
  );
};

export default Ticket;
