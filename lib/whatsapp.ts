import { BUSINESS } from "./site";

/** Digits only — for wa.me links */
export const WHATSAPP_NUMBER = BUSINESS.phone.replace(/\D/g, "");

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  const url = buildWhatsAppUrl(message);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) {
    window.location.href = url;
  }
}

export type ContactReservationForm = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
};

export function formatContactReservationMessage(form: ContactReservationForm) {
  const lines = [
    "Hello Fernway by Stories,",
    "",
    "I would like to reserve a table.",
    "",
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Date: ${form.date}`,
    `Time: ${form.time}`,
    `Guests: ${form.guests}`,
  ];

  if (form.message.trim()) {
    lines.push(`Special requests: ${form.message.trim()}`);
  }

  return lines.join("\n");
}

export type EventEnquiryFormData = {
  name: string;
  contact: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
};

export function formatEventEnquiryMessage(form: EventEnquiryFormData) {
  const lines = [
    "Hello Fernway by Stories,",
    "",
    "I would like to submit an event enquiry.",
    "",
    `Name: ${form.name}`,
    `Contact: ${form.contact}`,
    `Event type: ${form.eventType}`,
  ];

  if (form.date) lines.push(`Preferred date: ${form.date}`);
  if (form.guests) lines.push(`Number of guests: ${form.guests}`);
  if (form.message.trim()) lines.push(`Message: ${form.message.trim()}`);

  return lines.join("\n");
}

/** Quick reserve — used by site-wide Reserve CTAs (no form) */
export const QUICK_RESERVE_MESSAGE = [
  "Hello Fernway by Stories,",
  "",
  "I would like to reserve a table.",
].join("\n");

export const reserveTableWhatsAppUrl = buildWhatsAppUrl(QUICK_RESERVE_MESSAGE);
