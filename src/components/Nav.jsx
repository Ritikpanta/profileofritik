// src/components/Nav.jsx
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
    <nav className="nav">
      {onHome ? (
        <>
          <a href="#about">ABOUT ME</a>
          <a href="#works">WORKS</a>
          <a href="#poetries">POETRIES</a>
          <a href="#contact">CONTACTS</a>
        </>
      ) : (
        <>
          <Link to={{ pathname: "/", hash: "#about" }}>ABOUT ME</Link>
          <Link to={{ pathname: "/", hash: "#works" }}>WORKS</Link>
          <Link to={{ pathname: "/", hash: "#poetries" }}>POETRIES</Link>
          <Link to={{ pathname: "/", hash: "#contact" }}>CONTACTS</Link>
        </>
      )}
    </nav>
  );
}
