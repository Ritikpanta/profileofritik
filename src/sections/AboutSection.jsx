// src/sections/AboutSection.jsx
export default function AboutSection() {
  const skills = [
    {
      k: "Graphics Designing",
      v: "I’m on The Jam Circle’s executive team—designing posters and keeping the design work moving."
    },
    {
      k: "Programming",
      v: "Part of my studies; I like building small things with HTML/CSS/JS, C, and Python."
    },
    {
      k: "Videography",
      v: "Poetrical & short films—love being behind the camera and shaping stories in edit."
    },
    {
      k: "Photography",
      v: "A core habit now; it sharpens how I see and compose."
    },
    {
      k: "Music",
      v: "Guitar, harmonica, and flute; I write and sing a little—even if the vocals aren’t ‘singer’ perfect."
    }
  ];

  const education = [
    { year: "2020", text: "Graduation from school" },
    { year: "2022", text: "Graduation in C.S. major at +2" },
    { year: "2022", text: "Graduation from basic-web class" },
    { year: "2023–current", text: "Studying C.S. with AI major" },
  ];

  const bio =
    "Hi—I’m Ritik. I code and I create: posters, small sites, and short films shot with a curious eye. Lately I’m pouring energy into videography, photography and music while learning AI/ML so the tech side keeps up.";

  return (
    <div className="about">
      <h2 className="about-title">About Me</h2>

      <div className="about-grid">
        {/* Left: Skills */}
        <div className="about-card">
          <h3>Skills</h3>
          <ul className="about-list">
            {skills.map(({ k, v }) => (
              <li key={k}>
                <strong>{k}</strong> — {v}
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Photo + short bio (same column height) */}
        <div className="about-center">
          <div className="about-photo">
            <img src="/hero/portrait2.png" alt="Ritik" />
          </div>
          <p className="about-bio">{bio}</p>
        </div>

        {/* Right: Education as a tidy timeline */}
        <div className="about-card">
          <h3>Education</h3>
          <ol className="edu-timeline">
            {education.map((e, i) => (
              <li key={i}>
                <time>{e.year}</time>
                <span>{e.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
