import { useNavigate, useParams } from "react-router-dom";
import { poems } from "../data/poems";
import PoetryModal from "../components/PoetryModal";

export default function PoetryModalRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const poem = poems.find((p) => p.id === id);

  if (!poem) { navigate(-1); return null; }

  return <PoetryModal poem={poem} onClose={() => navigate(-1)} />;
}
