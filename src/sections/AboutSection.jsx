// src/sections/AboutSection.jsx
const crafts = [
  {
    k: "Film & direction",
    v: "I’m a writer first. My writing needed pictures, and that’s how filmmaking came into my life. Now I write, direct and edit, for my own stories and for clients, in DaVinci Resolve and After Effects.",
  },
  {
    k: "Graphic design",
    v: "Posters and key art for my own projects and for others. I’m a founding member of Chautari and I’ve made most of its event graphics, plus freelance work.",
  },
  {
    k: "Music",
    v: "Guitar, flute, harmonica and songwriting. I sing a little too, even if the vocals aren’t singer-perfect.",
  },
  {
    k: "Programming",
    v: "Part of my studies, and another way to make things. I’m learning web development and machine learning.",
  },
];

const path = [
  {
    year: "2020",
    title: "Finished school",
    v: "Lots of memories, strong at science and maths, and the year I started exploring design.",
  },
  {
    year: "2022",
    title: "+2 in Computer Science",
    v: "Covid hit and I studied mostly from my room. I picked up the guitar, designed a lot, and finished with over 85%.",
  },
  {
    year: "2023",
    title: "Australia",
    v: "Studying IT while building ChitraKatha Production and working on film and design projects. A boy with a dream.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="about-grid">
        <figure className="about-portrait">
          <img src="/media/misc/about-portrait.webp" alt="Ritik Panta, arms crossed, outdoors" loading="lazy" width="2552" height="3829" />
          <figcaption lang="ne">नेपालबाट, सिड्नीमा</figcaption>
        </figure>

        <div className="about-copy">
          <h2 id="about-title" className="section-title">About me</h2>
          <p className="about-lede">
            I’m from Nepal and now live in Sydney. I love to capture and create things, and
            I found designing, writing, filmmaking and coding to be the ways I do that. I run
            ChitraKatha Production, where we make music videos, event films and content for
            brands. I also play music.
          </p>

          <dl className="crafts">
            {crafts.map(({ k, v }) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="path-title">So far</h3>
          <ol className="path">
            {path.map((p) => (
              <li key={p.year}>
                <span className="path-year">{p.year}</span>
                <span className="path-head">{p.title}</span>
                <span className="path-text">{p.v}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
