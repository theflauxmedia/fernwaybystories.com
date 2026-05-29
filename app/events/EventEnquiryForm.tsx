"use client";

import { useState } from "react";
import { EVENT_ENQUIRY_TYPES } from "@/lib/events-data";
import { formatEventEnquiryMessage, openWhatsApp } from "@/lib/whatsapp";

export default function EventEnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    eventType: EVENT_ENQUIRY_TYPES[0],
    date: "",
    guests: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(formatEventEnquiryMessage(form));
  };

  return (
    <form onSubmit={handleSubmit} className="events-form">
      <div className="events-form-grid">
        <div className="events-form-field">
          <label htmlFor="event-name" className="events-form-label">
            Name *
          </label>
          <input
            id="event-name"
            name="name"
            required
            autoComplete="name"
            className="events-form-input"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="events-form-field">
          <label htmlFor="event-contact" className="events-form-label">
            Contact Number / Email *
          </label>
          <input
            id="event-contact"
            name="contact"
            required
            autoComplete="tel email"
            className="events-form-input"
            value={form.contact}
            onChange={handleChange}
          />
        </div>

        <div className="events-form-field">
          <label htmlFor="event-type" className="events-form-label">
            Event Type *
          </label>
          <select
            id="event-type"
            name="eventType"
            required
            className="events-form-input events-form-select"
            value={form.eventType}
            onChange={handleChange}
          >
            {EVENT_ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="events-form-field">
          <label htmlFor="event-date" className="events-form-label">
            Preferred Date
          </label>
          <input
            id="event-date"
            name="date"
            type="date"
            className="events-form-input"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="events-form-field events-form-field--guests">
          <label htmlFor="event-guests" className="events-form-label">
            Number of Guests
          </label>
          <input
            id="event-guests"
            name="guests"
            type="number"
            min={1}
            max={200}
            className="events-form-input"
            value={form.guests}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="events-form-field">
        <label htmlFor="event-message" className="events-form-label">
          Message
        </label>
        <textarea
          id="event-message"
          name="message"
          rows={4}
          className="events-form-input events-form-textarea"
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-gold events-form-submit">
        Submit Enquiry
      </button>
    </form>
  );
}
