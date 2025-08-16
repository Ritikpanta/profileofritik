// src/App.jsx
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";
import Home from "./pages/Home.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import PoetryModalRoute from "./routes/PoetryModalRoute.jsx";

export default function App() {
  useEffect(() => {
    // Only log in development builds
    if (import.meta.env.DEV) {
      const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const pub = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const mask = (v) => (v ? `${String(v).slice(0, 4)}••••${String(v).slice(-4)}` : "undefined");
      console.log("[EmailJS] service:", mask(service));
      console.log("[EmailJS] template:", mask(template));
      console.log("[EmailJS] public:", mask(pub));
    }
  }, []);

  return (
    <>
      <Nav />
      <ScrollToHash />

      {/* main routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<AllProjects />} />
        <Route path="/poetry/:id" element={<PoetryModalRoute />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
