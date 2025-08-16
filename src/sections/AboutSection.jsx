// src/sections/AboutSection.jsx
export default function AboutSection() {
  const skills = [
    {
      k: "Graphics Designing",
      v: "So Someone who has different startups and also a founding member of Chautari, I love making posters and graphics for my own projects and for others. I also do some freelance work.",
    },
    {
      k: "Programming",
      v: "Part of my studies;I love to create something and programming is a way to do that in a different way. I am learning ML and Web dev at the moment."
    },
    {
      k: "Videography",
      v: "I am a writer, i literally take a notebook everywhere I go and I felt my writing need visual justice thats when Videography came into my life. Now I create commercial videos as well. I edit in Davinci Resolve and After Effets."
    },
    {
      k: "Photography",
      v: "A hobby of capturing moments, I love to take photos of nature and people. I use my Sony zv e-10 & 35mm 1.8f lens most of the time."
    },
    {
      k: "Music",
      v: "Guitar, Songwriting, flute, harmonica and many more:) I write and sing a little—even if the vocals aren’t ‘singer’ perfect."
    }
  ];

 const education = [
  {
    k: "2020 — Graduation from School",
    v: "Completed school with alot of memories and lil knowledge about social studies but was an expert at science & mathematics around that time. I also started exploring design."
  },
  {
    k: "2022 — Graduation in C.S. major at +2",
    v: "This was time when Covid hit, I almost completed my High School studying inside my room. I explored lots of designing and Started playing guitar as well. I scored more than 85% in my high school with Comp Sci Major."
  },
  {
    k: "2022 — Basic Web Class",
    v: "A lil before AI started to boom, I was fasinated about the idea of creating something just with lines of codes. I did alot of studies through online and did some basic web dev class as well."
  },
  {
    k: "2023 — current",
    v: "Currently studying in Australia, I am doing my IT. I am also working on different videography and design projects. A boy with a dream:)."
  }
];


  const bio =
    "Hi, I'm Ritik panta. I am from Nepal, currently studying in Australia. I love to capture and create things, and I found designing, coding, writing, videomaking to be those way to do that. I also play music:)";

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
            <ul className="about-list">
              {education.map(({ k, v }) => (
                <li key={k}>
                  <strong>{k}</strong> — {v}
                </li>
              ))}
            </ul>
          </div>

      </div>
    </div>
  );
}
