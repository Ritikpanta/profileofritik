// src/routes/PoetryModalRoute.jsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { poems } from "../data/poems.js";
import PoetryReader from "../components/PoetryReader.jsx";
import Home from "../pages/Home.jsx";

export default function PoetryModalRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const poem = poems.find((p) => p.id === id);

  useEffect(() => {
    if (!poem) navigate("/", { replace: true });
  }, [poem, navigate]);

  return (
    <>
      <Home />
      {poem && <PoetryReader poem={poem} onClose={() => navigate("/#poems")} />}
    </>
  );
}
