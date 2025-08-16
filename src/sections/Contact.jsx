import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FiMail, FiInstagram, FiYoutube, FiLinkedin, FiFacebook, FiSend
} from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, msg: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ sending: false, ok: false, msg: "Please fill all fields." });
      return;
    }
    try {
      setStatus({ sending: true, ok: null, msg: "" });
      const res = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      if (res.status === 200) {
        setStatus({ sending: false, ok: true, msg: "Message sent. Thank you!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("EmailJS returned non-200");
      }
    } catch (err) {
      console.error(err);
      setStatus({
        sending: false,
        ok: false,
        msg: "Could not send. Please try again or email me directly.",
      });
    }
  };

  return (
    <section className="contact">
      <div className="contact-inner">
        {/* Title */}
        <header className="contact-header">
          <h2><span>Contact Me</span></h2>
          <p className="contact-sub">I’ll get back to you as soon as I can.</p>
        </header>

        {/* Form */}
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={onChange}
            required
            aria-label="Your name"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={onChange}
            required
            aria-label="Your email"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={form.message}
            onChange={onChange}
            required
            aria-label="Your message"
          />
          <button className="send" type="submit" disabled={status.sending}>
            <FiSend /> {status.sending ? "Sending…" : "Send"}
          </button>
          {status.ok === true && <p className="flash ok">{status.msg}</p>}
          {status.ok === false && <p className="flash err">{status.msg}</p>}
        </form>

        {/* Email + Socials */}
        <div className="contact-meta">
          <a className="contact-email" href="mailto:letscreatewithritik@gmail.com">
            <FiMail aria-hidden />
            <span>letscreatewithritik@gmail.com</span>
          </a>

          <nav className="contact-socials" aria-label="Social links">
            <a href="https://instagram.com/bagaichaofritik" target="_blank" rel="noreferrer" className="ig">
              <FiInstagram /><span>Instagram</span>
            </a>
            <a href="https://www.youtube.com/@Ritikpanta" target="_blank" rel="noreferrer" className="yt">
              <FiYoutube /><span>YouTube</span>
            </a>
            <a href="https://www.linkedin.com/in/ritikpanta/" target="_blank" rel="noreferrer" className="li">
              <FiLinkedin /><span>LinkedIn</span>
            </a>
            <a href="https://www.facebook.com/Ritikpantaa/" target="_blank" rel="noreferrer" className="fb">
              <FiFacebook /><span>Facebook</span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
