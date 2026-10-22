// src/pages/AllProjects.jsx
// Old links pointed at /work?cat=...; send them to the right part of the home page.
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const MAP = {
  graphics: "posters",
  posters: "posters",
  videography: "films",
  films: "films",
  photography: "photos",
  photos: "photos",
  poetry: "poems",
  animation: "sketchbook",
  sketchbook: "sketchbook",
  commercial: "work",
  music: "music",
  events: "events",
  dean: "apic",
  reels: "work",
};

export default function AllProjects() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const cat = (params.get("cat") || "").toLowerCase();
    navigate({ pathname: "/", hash: `#${MAP[cat] || "art"}` }, { replace: true });
  }, [params, navigate]);
  return null;
}
