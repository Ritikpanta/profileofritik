// keep paths absolute from /public
export const poems = [
  {
    id: "words",                 // unique
  category: "poetry",
  title: "BAATO",
  author: "Ritik Panta",   // optional
  thumbnail: "/poetry/poetrycover.png", // lives under /public/poetry (lowercase, no spaces)
  excerpt: "हासी हराए...",
  poem: `हासी हराए
म एक मरेको शरीर बाट सास फेर्दै छु 
मेरा हाडले हिड्ने ताकत गुमाईसके 
म बाटो छेउ 
त्यो बलेको बत्ति हेर्दै 
सोचमा डुब्दै छु 
त्यो पारिको संसारमा 
म हिड्न सक्छु होला?
.`, // full text
  link: "/poetry/words"        // optional (used by modal route)
  },
  {
    id: "silent-shores",
    title: "Silent Shores",
    thumbnail: "/poetry/silent-shores.jpg",
    tags: ["Poetry"],
    excerpt: "Waves speak in hush tones at dusk...",
    body: `Waves speak in hush tones at dusk,
the tide stitching light to sand.
I keep a pocket full of salt
for the days I forget the sea.`
  },
  {
    id: "city-lights",
    title: "City Lights",
    thumbnail: "/poetry/city-lights.jpg",
    tags: ["Poetry"],
    excerpt: "Neon spills across wet roads...",
    body: `Neon spills across wet roads,
and all our dreams wear raincoats.
Somewhere a window laughs open,
and the night lets us in.`
  }
];
