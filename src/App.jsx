// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import { MusicProvider } from "./components/Music.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";
import Home from "./pages/Home.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import PoetryModalRoute from "./routes/PoetryModalRoute.jsx";

export default function App() {
  return (
    <MusicProvider>
      <a className="skip-link" href="#main">Skip to the work</a>
      <Nav />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<AllProjects />} />
        <Route path="/poetry/:id" element={<PoetryModalRoute />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </MusicProvider>
  );
}
