// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Ritik Panta. Made in Sydney with{" "}
        <span lang="ne">चित्रकथा</span>.
      </p>
      <p className="footer-links">
        <Link to="/work">Full archive</Link>
        <a href="#top">Back to top</a>
      </p>
    </footer>
  );
}
