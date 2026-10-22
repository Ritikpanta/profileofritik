// src/sections/Contact.jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiMail, FiInstagram, FiYoutube, FiLinkedin, FiFacebook } from "react-icons/fi";

const EMAIL = "letscreatewithritik@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ sending: false, ok: false, msg: "Add your name, email and a message, then send again." });
      return;
    }
    try {
      setStatus({ sending: true, ok: null, msg: "" });
      const res = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      if (res.status !== 200) throw new Error("EmailJS returned non-200");
      setStatus({ sending: false, ok: true, msg: "Message sent. I’ll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        sending: false,
        ok: false,
        msg: `The message didn’t go through. Try again, or email ${EMAIL} directly.`,
      });
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact-grid">
        <div className="contact-copy">
          <h2 id="contact-title" className="contact-title">Got a story? Let’s make it.</h2>
          <p className="contact-lede">
            Films, music videos, posters, or just an idea you want to talk through. Write to me
            and I’ll reply as soon as I can.
          </p>

          <a className="contact-email" href={`mailto:${EMAIL}`}>
            <FiMail aria-hidden="true" />
            <span>{EMAIL}</span>
          </a>

          <ul className="socials" aria-label="Social links">
            <li><a href="https://instagram.com/bagaichaofritik" target="_blank" rel="noreferrer"><FiInstagram aria-hidden="true" />Instagram</a></li>
            <li><a href="https://www.youtube.com/@Ritikpanta" target="_blank" rel="noreferrer"><FiYoutube aria-hidden="true" />YouTube</a></li>
            <li><a href="https://www.linkedin.com/in/ritikpanta/" target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" />LinkedIn</a></li>
            <li><a href="https://www.facebook.com/Ritikpantaa/" target="_blank" rel="noreferrer"><FiFacebook aria-hidden="true" />Facebook</a></li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <label>
            <span>Your name</span>
            <input name="name" type="text" autoComplete="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            <span>Your email</span>
            <input name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" value={form.message} onChange={onChange} required />
          </label>
          <button className="btn btn-solid" type="submit" disabled={status.sending}>
            {status.sending ? "Sending…" : "Send message"}
          </button>
          <p className={`flash${status.ok === true ? " ok" : status.ok === false ? " err" : ""}`} role="status" aria-live="polite">
            {status.msg}
          </p>
        </form>
      </div>
    </section>
  );
}
