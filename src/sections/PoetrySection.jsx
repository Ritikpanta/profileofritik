import PoetryCard from "../components/PoetryCard";
import { poems } from "../data/poems";

export default function PoetrySection() {
  return (
    <section className="poetry-section" id="poetry">
      <div className="section-head">
        <h2>Poetries</h2>
        <a className="see-all" href="/#poetry">See all →</a>
      </div>

      <div className="poetry-grid">
        {poems.map((p) => <PoetryCard key={p.id} poem={p} />)}
      </div>
    </section>
  );
}
