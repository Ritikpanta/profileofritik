// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";
import Home from "./pages/Home.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import PoetryModalRoute from "./routes/PoetryModalRoute.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<AllProjects />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Overlay route for poetry modal */}
      <Routes>
        <Route path="/poetry/:id" element={<PoetryModalRoute />} />
      </Routes>
    </>
  );
}
