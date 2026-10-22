// src/data/work.js
// Every piece of work on the site lives here. Titles and notes are written in
// my own voice, so change anything that doesn't sound like me.
// Media lives in /public/media (web-ready copies made from the originals).

const video = (slug, ratio) => ({
  kind: "video",
  src: `/media/video/${slug}.mp4`,
  loop: `/media/loops/${slug}.mp4`,
  cover: `/media/covers/${slug}.webp`,
  ratio,
});

const youtube = (id, coverSize = "maxresdefault") => ({
  kind: "youtube",
  embed: `https://www.youtube.com/embed/${id}`,
  cover: `https://img.youtube.com/vi/${id}/${coverSize}.jpg`,
  ratio: "16/9",
});

const poster = (slug, w, h) => ({
  kind: "image",
  src: `/media/posters/${slug}.webp`,
  thumb: `/media/posters/${slug}-sm.webp`,
  w,
  h,
});

const photo = (slug, w, h) => ({
  kind: "image",
  src: `/media/photos/${slug}.webp`,
  thumb: `/media/photos/${slug}-sm.webp`,
  w,
  h,
});

const sketch = (slug, w, h) => ({
  kind: "image",
  src: `/media/sketch/${slug}.webp`,
  thumb: `/media/sketch/${slug}-sm.webp`,
  w,
  h,
});

const frames = (slug) => [1, 2, 3].map((i) => `/media/frames/${slug}-${i}.webp`);

/* ===================================================== my own work (चित्र) */

export const films = [
  {
    id: "narujeka-nindra",
    title: "Narujeka Nindra",
    titleNe: "नारुजेका निन्द्रा",
    ...video("narujeka-nindra", "16/9"),
    frames: frames("narujeka-nindra"),
    tags: ["animation", "drawn by hand"],
    desc: "Built from my own drawings, with the words on screen in Nepali. It starts in colour and slowly drains to grey.",
  },
  {
    id: "photo-bhetnuparni",
    title: "Photo Bhetnuparni",
    ...video("photo-bhetnuparni", "16/9"),
    frames: frames("photo-bhetnuparni"),
    tags: ["short film"],
    desc: "Sketchbook pages and night footage from around the city, held together by Nepali lines on screen.",
  },
  {
    id: "gaine-series",
    title: "Gaine Series",
    ...video("gaine-series", "16/9"),
    frames: frames("gaine-series"),
    tags: ["series", "sketchbook"],
    desc: "Black and white, straight from the sketchbook: drawings, handwritten Nepali and a few words to camera.",
  },
  {
    id: "batti-putali",
    title: "Batti Putali",
    ...video("batti-putali", "9/16"),
    frames: frames("batti-putali"),
    tags: ["music", "visual"],
    desc: "A lantern-lit visual for Batti Putali, a song I've been working on.",
  },
  {
    id: "sketchbook",
    title: "A page a day",
    ...video("sketchbook", "9/16"),
    frames: frames("sketchbook"),
    tags: ["sketchbook", "reel"],
    desc: "Drawing on location, ink first and red marker after.",
  },
  {
    id: "naadhan",
    title: "Naadhan",
    ...video("naadhan", "16/9"),
    frames: frames("naadhan"),
    tags: ["edit"],
    desc: "I was cutting an intro for one of my projects. When I laid the song Naadhan Parinde over it, the footage meant something else entirely.",
  },
];

// older shorts that live on YouTube
export const earlierFilms = [
  {
    id: "junkiri",
    title: "Junkiri: A Conversation",
    ...youtube("Fy-wzPsT4EI", "hqdefault"),
    tags: ["short film"],
    desc: "Wrote it, directed it, acted in it. Two people talk about life, home and memories. I learned a lot making this one, and I'm proud of it.",
  },
  {
    id: "thakan",
    title: "Tired - Thakan",
    ...youtube("k8PAisotcoY"),
    tags: ["short film"],
    desc: "After moving to Australia and redoing something I didn't love, I needed a long rest. I wrote Bishram (Rest) in my early days here, and Thakan is the prequel.",
  },
  {
    id: "phool",
    title: "Phool",
    ...youtube("9ff56VwL3YU", "hqdefault"),
    tags: ["short film"],
    desc: "A love story I've been writing for a while, eight chapters so far. This is only a glimpse. Without a full team it's hard to shoot the whole thing yet.",
  },
  {
    id: "silent-ink",
    title: "Silent Ink: Pen",
    ...youtube("zNnoLCIZzkw", "hqdefault"),
    tags: ["short film"],
    desc: "A lover's obsession with a girl who has no idea how he feels. It ends badly. This was where directing started for me.",
  },
  {
    id: "two",
    title: "Two",
    ...youtube("zVwb1i1Xliw"),
    tags: ["short film"],
    desc: "Two sides of me on one screen. Shot alone, edited and graded in DaVinci Resolve.",
  },
  {
    id: "salala",
    title: "Salala",
    ...youtube("ykYyFdg0uXk"),
    tags: ["music video"],
    desc: "My first music video as director. Directed, edited, graded, and most of the posters too. Made with good friends.",
  },
];

export const sketches = [
  { id: "sketch-coffee", title: "Honey, hurry up", ...sketch("sketch-coffee", 1080, 1920), desc: "Ink and red marker." },
  { id: "sketch-nepali", title: "A page with words", ...sketch("sketch-nepali", 1094, 1080), desc: "From the Gaine series notebook. Drawing on one side, Nepali on the other." },
  { id: "sketch-boat", title: "Boats and scooters", ...sketch("sketch-boat", 1080, 1920), desc: "Boats and a scooter. Ink and red marker." },
  { id: "sketch-blossom", title: "Blossom", ...sketch("sketch-blossom", 1920, 1080), desc: "Red ink, from the Photo Bhetnuparni notebook." },
  { id: "sketch-figures", title: "People in the park", ...sketch("sketch-figures", 1080, 1920), desc: "Quick figures, done on the grass." },
  { id: "sketch-portrait", title: "Portrait and notes", ...sketch("sketch-portrait", 1095, 1080), desc: "Gaine series." },
  { id: "sketch-sunny", title: "Very sunny", ...sketch("sketch-sunny", 1080, 1920), desc: "Trees, a bike, a hot day." },
  { id: "narujeka-nindra-artwork", title: "Narujeka Nindra, a drawing", ...poster("narujeka-nindra-artwork", 1920, 1080), desc: "One of the drawings the animation is built from." },
  { id: "sketch-redpen", title: "Red pen", ...sketch("sketch-redpen", 1920, 1080), desc: "Notebook page, Photo Bhetnuparni." },
];

export const posters = [
  { id: "narujeka-nindra-poster", title: "Narujeka Nindra", ...poster("narujeka-nindra-poster", 767, 1350), desc: "Drawn by hand and lettered in Nepali." },
  { id: "maya-ko-aasha", title: "Maya ko Aasha", ...poster("maya-ko-aasha", 767, 1350), desc: "Cover art for Maya ko Aasha, one of my songs." },
  { id: "eh-phool", title: "Eh Phool", ...poster("eh-phool", 2056, 2376), desc: "Collage for Eh Phool, a song I'm writing." },
  { id: "phool", title: "Phool", ...poster("phool", 1080, 1350), desc: "Phool is close to me. When I write, I picture an ideal character like her. The full short film is written, eight chapters. One day." },
  { id: "kathakar", title: "Kathakar", ...poster("kathakar", 1080, 1450), desc: "A poster for a poetic film I called Kathakar. That's me, and the map is Nepal." },
  { id: "averse", title: "aVerse", ...poster("averse", 767, 1350), desc: "A second poster for Narujeka Nindra, in red." },
  { id: "pain", title: "Pain", ...poster("pain", 1080, 1350), desc: "The paradox of Phool. Same eyes, different theme, and suddenly they speak of pain." },
  { id: "thakan-poster", title: "Tired - Thakan", ...poster("thakan", 1080, 1350), desc: "Poster for Thakan." },
  { id: "escaping-reality", title: "Escaping Reality", ...poster("escaping-reality", 1080, 1350), desc: "Concept series from ChitraKatha. I play someone who wants out." },
  { id: "main-character", title: "You are your main character", ...poster("main-character", 1080, 1350), desc: "Featuring my friend Sushil. Everyone around you is shaped by your own judgement, so live it fully." },
  { id: "music-escape", title: "Music is my escape", ...poster("music-escape", 1080, 1350), desc: "How I feel when I play: somewhere else, very far away. Sushil again." },
  { id: "blood-bath", title: "Blood Bath", ...poster("blood-bath", 1080, 1350), desc: "I held a knife, took some pictures, and did the rest in Photoshop." },
  { id: "red", title: "Red", ...poster("red", 1080, 1350), desc: "From my movie poster collection. Red, with a detective tone." },
  { id: "two-poster", title: "Two", ...poster("two", 1080, 1350), desc: "Thumbnail for Two." },
  { id: "blackpath", title: "Murderer of the Blackpath", ...poster("blackpath", 1080, 1350), desc: "Wide-eyed, trying to look scary. This happened." },
  { id: "boy-with-a-guitar", title: "Boy with a Guitar", ...poster("boy-with-a-guitar", 3240, 4050), desc: "It's a ukulele. Irony." },
  { id: "manchild", title: "Manchild", ...poster("manchild", 1080, 1350), desc: "An early one, about a psychopath who turns up to solve a mystery." },
  { id: "narujeka-nindra-title", title: "Narujeka Nindra lettering", ...poster("narujeka-nindra-title", 1080, 1080), desc: "Hand lettering for the title." },
  { id: "design-thumbnail", title: "I can talk about my design", ...poster("design-thumbnail", 1600, 900), desc: "Thumbnail for a video about my design work." },
];

export const photos = [
  { id: "werri-1", title: "Werri Beach", ...photo("werri-1", 4000, 6000), desc: "Looking down over the bay.", pick: true },
  { id: "lovelies-4", title: "Lovelies", ...photo("lovelies-4", 6000, 4000), desc: "Friends at the lookout." },
  { id: "extra-1", title: "Street light", ...photo("extra-1", 4000, 6000), desc: "A street lamp burning through the trees.", pick: true },
  { id: "werri-2", title: "Wind", ...photo("werri-2", 4000, 6000), desc: "Hair, wind and the ocean behind." },
  { id: "girl-on-the-shore", title: "Girl on the shore", ...photo("girl-on-the-shore", 1080, 1350), desc: "The frame and the sun glare felt like a dream. Shared with her permission." },
  { id: "lovelies-1", title: "Laughing", ...photo("lovelies-1", 4000, 6000), desc: "A candid between takes." },
  { id: "extra-3", title: "By the water", ...photo("extra-3", 1080, 1350), desc: "Sitting on the rocks, watching the sea.", pick: true },
  { id: "werri-3", title: "Jump", ...photo("werri-3", 4000, 6000), desc: "On the bench above the sea." },
  { id: "oh-my-companion", title: "Oh my companion", ...photo("oh-my-companion", 1080, 1350), desc: "I had a dog as a friend when I was ten. I had to ask for this one." },
  { id: "lovelies-3", title: "Hair in the wind", ...photo("lovelies-3", 4000, 6000), desc: "Caught mid-turn at the lookout." },
  { id: "extra-2", title: "Road to another land", ...photo("extra-2", 4320, 5400), desc: "Tripod at a distance, light from a gate, me acting mysterious." },
  { id: "werri-4", title: "Three on a bench", ...photo("werri-4", 6000, 4000), desc: "Friends looking out to sea." },
  { id: "dear-old-days", title: "Dear old days", ...photo("dear-old-days", 1080, 1350), desc: "An old couple in the park, arms around each other. I hope my old days look like this.", pick: true },
  { id: "lovelies-2", title: "Afternoon light", ...photo("lovelies-2", 6000, 4000), desc: "Golden hour in the bush." },
  { id: "extra-4", title: "Last light", ...photo("extra-4", 1080, 1920), desc: "A silhouette against the sunset." },
  { id: "dear-arthur", title: "Dear Arthur", ...photo("dear-arthur", 4000, 6000), desc: "It seemed to be saying something to me." },
  { id: "lovelies-5", title: "Profile", ...photo("lovelies-5", 6000, 4000), desc: "Side portrait above the valley." },
  { id: "young-memories", title: "Young memories", ...photo("young-memories", 1080, 1350), desc: "My dad worked overseas when I was little, so moments like this get to me." },
];

/* =============================================== work for others (काम) */

export const clientWork = [
  {
    id: "apic",
    name: "Asia Pacific International College",
    short: "APIC",
    note: "Ongoing video and photo work for the college. The main thing is A Minute with the Dean, a short series where the Dean answers one student question at a time, filmed on campus and cut vertical.",
    groups: [
      {
        label: "A Minute with the Dean",
        items: [
          { id: "dean-week-11", title: "Episode 11", ...video("dean-week-11", "9/16"), desc: "One student question, answered in about a minute." },
          { id: "dean-week-26", title: "Episode 26", ...video("dean-week-26", "9/16"), desc: "What a supportive learning environment looks like, and where to go for extra help." },
          { id: "dean-week-27", title: "Episode 27", ...video("dean-week-27", "9/16"), desc: "Studies, career opportunities and industry, in a minute." },
          { id: "ask-the-dean", title: "Ask the Dean", ...video("ask-the-dean", "1/1"), desc: "Opener for the question-and-answer format." },
          { id: "dean-episode-26", title: "Episode 26 artwork", ...poster("dean-episode-26", 1080, 1350), desc: "Feed artwork for episode 26." },
          { id: "dean-portrait", title: "On set with the Dean", ...photo("dean-portrait", 4000, 6000), desc: "Portrait from the episode 22 shoot." },
        ],
      },
      {
        label: "Campus",
        items: [
          { id: "apic-student-voices", title: "Student voices", ...video("apic-student-voices", "9/16"), desc: "Students on what studying at APIC has been like." },
          { id: "apic-study-abroad", title: "Study abroad", ...video("apic-study-abroad", "9/16"), desc: "Explainer for the study abroad program." },
          { id: "apic-snack-chat-play", title: "Snack, Chat & Play", ...video("apic-snack-chat-play", "9/16"), desc: "Recap of a student services day." },
          { id: "apic-departure", title: "Campus community", ...video("apic-departure", "9/16"), desc: "Students and staff on what makes the place feel friendly." },
          { id: "apic-visas", title: "Visa changes", ...video("apic-visas", "9/16"), desc: "An update on visa changes and the support available." },
          { id: "orientation-1", title: "Orientation day", ...photo("orientation-1", 6000, 4000), desc: "New students at orientation in Sydney." },
          { id: "orientation-2", title: "Peace", ...photo("orientation-2", 6000, 4000), desc: "At the orientation stall." },
        ],
      },
    ],
  },
  {
    id: "ashok",
    name: "Ashok Bhusal",
    short: "Hawaijahaz Ma Sararara",
    note: "Music video for Ashok's single, plus the key art and stills from the shoot.",
    groups: [
      {
        items: [
          { id: "hawaijahaz-on-set", title: "On set", ...video("hawaijahaz-on-set", "16/9"), desc: "A short cut from the shoot." },
          { id: "hawaijahaz-poster", title: "Teaser poster", ...poster("hawaijahaz-poster", 1080, 1350), desc: "Teaser poster for the music video." },
          { id: "hawaijahaz-cover", title: "Single cover", ...poster("hawaijahaz-cover", 1080, 1080), desc: "Streaming cover, with the red car from the video." },
          { id: "hawaijahaz-title", title: "Title", ...poster("hawaijahaz-title", 1080, 1080), desc: "Title treatment." },
          { id: "hawaijahaz-red-car", title: "The red car", ...photo("hawaijahaz-red-car", 3876, 2584), desc: "Still from the shoot." },
          { id: "airport-1", title: "Departures", ...photo("airport-1", 6000, 4000), desc: "The airport scene." },
          { id: "hawaijahaz-portrait", title: "By the car", ...photo("hawaijahaz-portrait", 4000, 6000), desc: "Portrait from the shoot." },
        ],
      },
    ],
  },
  {
    id: "unique-wholefood",
    name: "Unique Wholefood",
    short: "Crows Nest Festival",
    note: "Festival coverage for their stall, cut two ways.",
    groups: [
      {
        items: [
          { id: "unique-wholefood-crows-nest", title: "30-second highlight", ...video("unique-wholefood-crows-nest", "9/16"), desc: "The stall at the Crows Nest festival." },
          { id: "unique-wholefood-festival", title: "A day at the festival", ...video("unique-wholefood-festival", "9/16"), desc: "A host-led walk around the same day." },
        ],
      },
    ],
  },
  {
    id: "drive2everest",
    name: "Drive2Everest",
    short: "Driving school",
    note: "A promo for their lessons and test preparation classes.",
    groups: [{ items: [{ id: "drive2everest", title: "Thinking of driving?", ...video("drive2everest", "9/16"), desc: "Promo." }] }],
  },
  {
    id: "kirtan",
    name: "Kirtan Saanjh",
    short: "An evening of kirtan",
    note: "ChitraKatha was the media partner for the night.",
    groups: [
      {
        items: [
          { id: "kirtan-saanjh", title: "Event reel", ...video("kirtan-saanjh", "9/16"), desc: "From the evening." },
          { id: "kirtan-saanjh-2", title: "On stage", ...photo("kirtan-saanjh-2", 2175, 3263), desc: "From the evening." },
          { id: "kirtan-saanjh-3", title: "The team", ...photo("kirtan-saanjh-3", 6000, 4000), desc: "Group photo, in black and white." },
          { id: "kirtan-saanjh-1", title: "Two friends", ...photo("kirtan-saanjh-1", 4000, 6000), desc: "Portrait." },
        ],
      },
    ],
  },
  {
    id: "chitrakatha",
    name: "ChitraKatha Production",
    short: "Our own shows and releases",
    note: "The studio I run. Concert films, our crew, and Sano Chari, our social film with two original songs.",
    groups: [
      {
        items: [
          { id: "rock-heads", title: "Rock Heads", ...video("rock-heads", "16/9"), desc: "Highlight film from the Rock Heads concert." },
          { id: "behind-the-camera", title: "Behind the camera", ...video("behind-the-camera", "16/9"), desc: "Our crew at work during a live show, narrated in Nepali." },
          { id: "sano-chari-poster", title: "Sano Chari", ...poster("sano-chari-poster", 1080, 1350), desc: "Release poster for the artist visuals." },
          { id: "sano-chari-attention", title: "Sano Chari: Attention", ...poster("sano-chari-attention", 3508, 4961), desc: "Campaign poster with a QR code to the theme song." },
          { id: "sano-chari-thumb", title: "Sano Chari thumbnail", ...poster("sano-chari-thumb", 1600, 900), desc: "YouTube thumbnail." },
        ],
      },
    ],
  },
  {
    id: "early",
    name: "Chautari, and early design jobs",
    short: "Where the design started",
    note: "Event posters for Chautari, the startup I helped found, and small jobs from my early Photoshop days.",
    groups: [
      {
        items: [
          { id: "chess-carnival", title: "Chess Carnival", ...poster("chess-carnival", 3061, 3827), desc: "Online chess event to promote the game in Nepal. Free entry, 25k prize pool, the first of its kind there." },
          { id: "talent-mela", title: "Talent Mela", ...poster("talent-mela", 2480, 3508), desc: "Hosted on our Discord, with a 20,000 rupee prize for people following their passion." },
          { id: "host", title: "Host of the Show", ...poster("host", 3508, 4961), desc: "That's me. I hosted it too." },
          { id: "dream-team", title: "Dream Team", ...poster("dream-team", 4109, 3008), desc: "Team announcement for my friends' futsal team." },
          { id: "coffee", title: "Nepal Coffee", ...poster("coffee", 2480, 3508), desc: "For RR Company's coffee. Early days, and I was happy with it." },
          { id: "utensils", title: "Utensils on Sale", ...poster("utensils", 3674, 4540), desc: "Early Photoshop experiments in making products stand out." },
          { id: "certificate", title: "Certificate of Appreciation", ...poster("certificate", 3507, 2481), desc: "Given to me for an event I hosted. I designed it myself, which is funny." },
        ],
      },
    ],
  },
];

// Frames on the 3D film strip: sketches and posters, mixed the way they are in the notebook.
export const reelFrames = [
  "/media/sketch/sketch-coffee-sm.webp",
  "/media/posters/narujeka-nindra-poster-sm.webp",
  "/media/posters/phool-sm.webp",
  "/media/sketch/sketch-nepali-sm.webp",
  "/media/posters/hawaijahaz-poster-sm.webp",
  "/media/posters/maya-ko-aasha-sm.webp",
  "/media/sketch/sketch-boat-sm.webp",
  "/media/posters/kathakar-sm.webp",
  "/media/posters/eh-phool-sm.webp",
  "/media/sketch/sketch-blossom-sm.webp",
  "/media/posters/blood-bath-sm.webp",
  "/media/posters/averse-sm.webp",
  "/media/sketch/sketch-figures-sm.webp",
  "/media/posters/sano-chari-poster-sm.webp",
  "/media/posters/escaping-reality-sm.webp",
  "/media/sketch/sketch-portrait-sm.webp",
  "/media/posters/red-sm.webp",
  "/media/posters/main-character-sm.webp",
];

export const recentClients = ["APIC", "Unique Wholefood", "Drive2Everest", "Kirtan Saanjh", "Ashok Bhusal"];
