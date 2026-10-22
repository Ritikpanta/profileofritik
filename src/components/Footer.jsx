// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Ritik Panta. Drawn, shot, written and coded in Sydney.
      </p>
      <p className="footer-links">
        <a href="#top">back to the top</a>
      </p>
    </footer>
  );
}
