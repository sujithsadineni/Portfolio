import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { contact } from "../../data/content";
import "./Contact.scss";

const SERVICE_ID = "service_gx6r4el";
const TEMPLATE_ID = "template_ffdcgvb";
const PUBLIC_KEY = "XxxOqOMQnWaRE2d0H";

const empty = { name: "", email: "", subject: "", message: "" };

const Contact: React.FC = () => {
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);
  const busy = useRef(false); // blocks a 2nd submit before React re-renders the disabled button

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setSending(true);
    setStatus(null);

    const payload = {
      ...form,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY)
      .then(() => {
        setStatus({ type: "success", message: contact.success });
        setForm(empty);
      })
      .catch(() => {
        setStatus({ type: "error", message: contact.error });
      })
      .finally(() => {
        busy.current = false;
        setSending(false);
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <>
      <section id="contact" className="contact-section">
        <h2>{contact.heading}</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            {contact.fields.name}
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            {contact.fields.email}
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            {contact.fields.subject}
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            {contact.fields.message}
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" disabled={sending} aria-busy={sending}>
            {sending ? contact.sending : contact.send}
          </button>
        </form>
      </section>
      {/* live region stays mounted so screen readers announce the message when it appears */}
      <div role="status" aria-live="polite">
        {status && (
          <div className={`custom-alert ${status.type}`}>{status.message}</div>
        )}
      </div>
    </>
  );
};

export default Contact;
