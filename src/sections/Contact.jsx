// src/sections/Contact.jsx
// The contact form is a letter.
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { PartHead } from "../components/Heads.jsx";

const EMAIL = "letscreatewithritik@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ sending: false, ok: false, msg: "The letter needs a message, your name and an email to reply to." });
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
      setStatus({ sending: false, ok: true, msg: "Sent. I’ll write back soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ sending: false, ok: false, msg: `It didn’t send. Try again, or email ${EMAIL}.` });
    }
  };

  return (
    <section id="write" className="block write" aria-labelledby="write-title">
      <PartHead id="write-title" ne="चिठी" en="write to me" seed={181} />

      <div className="write-grid">
        <form className="letter" onSubmit={onSubmit} noValidate>
          <p className="letter-date" aria-hidden="true">Sydney, today</p>
          <p className="letter-dear">Dear Ritik,</p>
          <label className="letter-body">
            <span className="visually-hidden">Your message</span>
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={onChange}
              placeholder="I've got a film / a song / an idea..."
              required
            />
          </label>
          <p className="letter-yours">Yours,</p>
          <label className="letter-line">
            <span className="visually-hidden">Your name</span>
            <input name="name" type="text" autoComplete="name" value={form.name} onChange={onChange} placeholder="your name" required />
          </label>
          <label className="letter-line">
            <span className="letter-line-label">write back to</span>
            <input name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} placeholder="you@email.com" required />
          </label>
          <button className="stamp" type="submit" disabled={status.sending}>
            <span>{status.sending ? "sending…" : "send"}</span>
            <small lang="ne">पठाउनुहोस्</small>
          </button>
          <p className={`letter-flash${status.ok === true ? " ok" : status.ok === false ? " err" : ""}`} role="status" aria-live="polite">
            {status.msg}
          </p>
        </form>

        <div className="write-side">
          <p className="typed">Or skip the form:</p>
          <a className="write-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <ul className="write-links">
            <li><a href="https://instagram.com/bagaichaofritik" target="_blank" rel="noreferrer">instagram</a></li>
            <li><a href="https://www.youtube.com/@Ritikpanta" target="_blank" rel="noreferrer">youtube</a></li>
            <li><a href="https://www.linkedin.com/in/ritikpanta/" target="_blank" rel="noreferrer">linkedin</a></li>
            <li><a href="https://www.facebook.com/Ritikpantaa/" target="_blank" rel="noreferrer">facebook</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
