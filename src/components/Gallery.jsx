export default function Gallery() {
  const items = [
    { id: "one", src: "/portrait2.png", title: "Portrait" },
    { id: "two", src: "/Coffee.png", title: "Coffee" },
  ];
  return (
    <section id="work" className="gallery">
      {items.map((it) => (
        <figure key={it.id}>
          <img src={it.src} alt={it.title} />
          <figcaption>{it.title}</figcaption>
        </figure>
      ))}
    </section>
  );
}
