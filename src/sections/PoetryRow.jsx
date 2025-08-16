import PoetryMiniCard from "../components/PoetryMiniCard.jsx";

export default function PoetryRow({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="poetries" className="section">
      <header className="section-head">
        <h2>Poetries</h2>
        <a className="see-all" href="#poetries">See all →</a>
      </header>

      <div className="poetry-row">
        {items.map((p) => (
          <div key={p.id} className="snap">
            <PoetryMiniCard poem={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
