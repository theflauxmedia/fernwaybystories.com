"use client";

import { useState } from "react";
import {
  formatContactReservationMessage,
  openWhatsApp,
} from "@/lib/whatsapp";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(formatContactReservationMessage(form));
  };

  const fields = [
    { name: "name", label: "Name *", type: "text", placeholder: "Your name", required: true },
    { name: "phone", label: "Phone *", type: "tel", placeholder: "+91 XXXXX XXXXX", required: true },
    { name: "date", label: "Date *", type: "date", placeholder: "", required: true },
    { name: "time", label: "Time *", type: "time", placeholder: "", required: true },
    { name: "guests", label: "Number of Guests *", type: "number", placeholder: "e.g. 4", required: true },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {fields.map(({ name, label, type, placeholder, required }) => (
          <div key={name} className={name === "guests" ? "sm:col-span-2 sm:max-w-xs" : ""}>
            <label className="block section-label mb-3" style={{ letterSpacing: "0.22em", color: "var(--text-muted)" }}>
              {label}
            </label>
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              required={required}
              className="field"
              placeholder={placeholder}
              min={name === "guests" ? 1 : undefined}
              max={name === "guests" ? 120 : undefined}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block section-label mb-3" style={{ letterSpacing: "0.22em", color: "var(--text-muted)" }}>
          Special Requests
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="field"
          rows={4}
          placeholder="Allergies, celebrations, seating preferences..."
          style={{ resize: "none" }}
        />
      </div>

      <button type="submit" className="btn-dark" style={{ alignSelf: "flex-start" }}>
        Confirm Reservation
      </button>
    </form>
  );
}
