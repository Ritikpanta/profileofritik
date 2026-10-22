// src/data/work.js
// Every piece of work on the site lives here. Edit titles and descriptions freely.
// Media paths point into /public/media (optimised copies made from the originals).

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

/* ---------------------------------------------------------------- films */

export const films = [
  {
    id: "narujeka-nindra",
    title: "Narujeka Nindra",
    titleNe: "नारुजेका निन्द्रा",
    ...video("narujeka-nindra", "16/9"),
    tags: ["Animation", "Writing"],
    desc: "An animated piece built from my own drawings, with the words on screen in Nepali. It starts in colour and slowly turns grey.",
    featured: true,
  },
  {
    id: "rock-heads",
    title: "Rock Heads",
    ...video("rock-heads", "16/9"),
    client: "ChitraKatha Production",
    tags: ["Event film"],
    desc: "Highlight film from the Rock Heads concert, filmed and edited by our team at ChitraKatha.",
  },
  {
    id: "hawaijahaz-on-set",
    title: "Hawaijahaz Ma Sararara",
    ...video("hawaijahaz-on-set", "16/9"),
    client: "Ashok Bhusal",
    tags: ["Music video", "On set"],
    desc: "A short cut from the shoot of Hawaijahaz Ma Sararara, the music video we made with Ashok Bhusal.",
  },
  {
    id: "photo-bhetnuparni",
    title: "Photo Bhetnuparni",
    ...video("photo-bhetnuparni", "16/9"),
    tags: ["Short film"],
    desc: "Sketchbook pages and night footage from around the city, held together by Nepali lines on screen.",
  },
  {
    id: "gaine-series",
    title: "Gaine Series",
    ...video("gaine-series", "16/9"),
    tags: ["Series", "Sketchbook"],
    desc: "A black and white piece from my sketchbook: drawings, handwritten Nepali and a few words to camera.",
  },
  {
    id: "behind-the-camera",
    title: "Behind the Camera",
    ...video("behind-the-camera", "16/9"),
    client: "ChitraKatha Production",
    tags: ["Crew film"],
    desc: "Our crew at work during a live show, narrated in Nepali.",
  },
  {
    id: "junkiri",
    earlier: true,
    title: "Junkiri: A Conversation",
    ...youtube("Fy-wzPsT4EI", "hqdefault"),
    tags: ["Short film"],
    desc: "A short film I wrote, directed and acted in. Two characters talk about life, home and memories. I learned a lot making it, and it's one of the projects I'm proudest of.",
  },
  {
    id: "thakan",
    earlier: true,
    title: "Tired – Thakan",
    ...youtube("k8PAisotcoY"),
    tags: ["Short film"],
    desc: "After moving to Australia and redoing something I didn't love, I felt I needed a long rest. I wrote Bishram (Rest) in my early days here, and Thakan is its prequel.",
  },
  {
    id: "phool",
    earlier: true,
    title: "Phool",
    ...youtube("9ff56VwL3YU", "hqdefault"),
    tags: ["Short film"],
    desc: "Phool is a love story I've been writing for a while, eight chapters so far. This video is just a glimpse of it. Without a full team it's hard to shoot the whole story yet.",
  },
  {
    id: "silent-ink",
    earlier: true,
    title: "Silent Ink: Pen",
    ...youtube("zNnoLCIZzkw", "hqdefault"),
    tags: ["Short film"],
    desc: "A short story I wrote and directed about a lover's obsession with a girl who has no idea how he feels. It ends in tragedy. It was the start of my directing journey and a turning point for my filmmaking.",
  },
  {
    id: "two",
    earlier: true,
    title: "Two",
    ...youtube("zVwb1i1Xliw"),
    tags: ["Short film"],
    desc: "We all carry two perspectives, yet somehow we pick one side. I put two versions of myself on screen, then edited and graded it in DaVinci Resolve.",
  },
  {
    id: "salala",
    earlier: true,
    title: "Salala",
    ...youtube("ykYyFdg0uXk"),
    tags: ["Music video"],
    desc: "My first music video as director. I directed, edited and graded it, and made most of the posters and marketing material too. Made by my media company with good friends, an experience of a lifetime.",
  },
  {
    id: "naadhan",
    earlier: true,
    title: "Naadhan",
    ...video("naadhan", "16/9"),
    tags: ["Edit"],
    desc: "I was cutting an intro for one of my projects, and when I laid the song Naadhan Parinde over it, the footage took on a different, beautiful meaning.",
  },
];

/* ---------------------------------------------------- a minute with the dean */

export const deanSeries = {
  title: "A Minute with the Dean",
  client: "Asia Pacific International College",
  intro:
    "A short video series I make for Asia Pacific International College (APIC). Each episode, the Dean answers one student question in about a minute, filmed on campus and cut vertical for social.",
  episodes: [
    {
      id: "dean-week-11",
      title: "Episode 11",
      ...video("dean-week-11", "9/16"),
      client: "APIC",
      desc: "One student question, answered in about a minute.",
    },
    {
      id: "dean-week-26",
      title: "Episode 26",
      ...video("dean-week-26", "9/16"),
      client: "APIC",
      desc: "What a supportive learning environment looks like, and where to go for extra help.",
    },
    {
      id: "dean-week-27",
      title: "Episode 27",
      ...video("dean-week-27", "9/16"),
      client: "APIC",
      desc: "Studies, career opportunities and industry, in a minute.",
    },
    {
      id: "ask-the-dean",
      title: "Ask the Dean",
      ...video("ask-the-dean", "1/1"),
      client: "APIC",
      desc: "Opener for the question-and-answer format: you ask, we answer.",
    },
  ],
  stills: [
    {
      id: "dean-episode-26",
      title: "Episode 26 artwork",
      ...poster("dean-episode-26", 1080, 1350),
      client: "APIC",
      desc: "Feed artwork for episode 26: what makes a supportive learning environment?",
    },
    {
      id: "dean-episode-26-story",
      title: "Episode 26 story cover",
      ...poster("dean-episode-26-story", 1080, 1920),
      client: "APIC",
      desc: "The vertical version of the episode 26 artwork for Stories and Reels.",
    },
    {
      id: "dean-portrait",
      title: "On set with the Dean",
      ...photo("dean-portrait", 4000, 6000),
      client: "APIC",
      desc: "Portrait from the episode 22 shoot.",
    },
  ],
};

/* -------------------------------------------------------------- reels */

export const reels = [
  {
    id: "unique-wholefood-crows-nest",
    title: "Crows Nest Festival",
    ...video("unique-wholefood-crows-nest", "9/16"),
    client: "Unique Wholefood",
    desc: "A 30-second highlight from Unique Wholefood's stall at the Crows Nest festival.",
  },
  {
    id: "drive2everest",
    title: "Thinking of driving?",
    ...video("drive2everest", "9/16"),
    client: "Drive2Everest",
    desc: "Promo for Drive2Everest's driving lessons and test preparation classes.",
  },
  {
    id: "kirtan-saanjh",
    title: "Kirtan Saanjh",
    ...video("kirtan-saanjh", "9/16"),
    client: "Kirtan Saanjh",
    desc: "Event reel from Kirtan Saanjh, where ChitraKatha was the media partner.",
  },
  {
    id: "apic-student-voices",
    title: "Student voices",
    ...video("apic-student-voices", "9/16"),
    client: "APIC",
    desc: "Students on what studying at APIC has been like for them.",
  },
  {
    id: "unique-wholefood-festival",
    title: "A day at the festival",
    ...video("unique-wholefood-festival", "9/16"),
    client: "Unique Wholefood",
    desc: "A host-led walk around the same festival day, made for Instagram.",
  },
  {
    id: "apic-study-abroad",
    title: "Study abroad",
    ...video("apic-study-abroad", "9/16"),
    client: "APIC",
    desc: "Explainer for APIC's study abroad program.",
  },
  {
    id: "apic-snack-chat-play",
    title: "Snack, Chat & Play",
    ...video("apic-snack-chat-play", "9/16"),
    client: "APIC",
    desc: "Recap of APIC's Snack, Chat & Play day with the student services team.",
  },
  {
    id: "apic-departure",
    title: "Campus community",
    ...video("apic-departure", "9/16"),
    client: "APIC",
    desc: "Students and staff on what makes the campus feel friendly.",
  },
  {
    id: "apic-visas",
    title: "Visa changes",
    ...video("apic-visas", "9/16"),
    client: "APIC",
    desc: "An update for students on recent visa changes and the support that's available.",
  },
  {
    id: "sketchbook",
    title: "Sketchbook",
    ...video("sketchbook", "9/16"),
    client: "Personal",
    desc: "Drawing on location in my sketchbook.",
  },
  {
    id: "batti-putali",
    title: "Batti Putali",
    ...video("batti-putali", "9/16"),
    client: "Personal",
    desc: "A lantern-lit visual for Batti Putali, a song I've been working on.",
  },
];

/* ------------------------------------------------------------- posters */

export const posters = [
  { id: "hawaijahaz-poster", title: "Hawaijahaz Ma Sararara", ...poster("hawaijahaz-poster", 1080, 1350), client: "Ashok Bhusal", desc: "Teaser poster for the Hawaijahaz Ma Sararara music video." },
  { id: "narujeka-nindra-poster", title: "Narujeka Nindra", ...poster("narujeka-nindra-poster", 767, 1350), desc: "Poster for Narujeka Nindra, drawn by hand and lettered in Nepali." },
  { id: "sano-chari-poster", title: "Sano Chari: Artist Visuals", ...poster("sano-chari-poster", 1080, 1350), client: "ChitraKatha Production", desc: "Release poster for the Sano Chari artist visuals." },
  { id: "maya-ko-aasha", title: "Maya ko Aasha", ...poster("maya-ko-aasha", 767, 1350), desc: "Cover art for Maya ko Aasha, one of my songs." },
  { id: "hawaijahaz-cover", title: "Hawaijahaz cover art", ...poster("hawaijahaz-cover", 1080, 1080), client: "Ashok Bhusal", desc: "Streaming cover for the single, shot with the red car from the music video." },
  { id: "averse", title: "aVerse", ...poster("averse", 767, 1350), desc: "A second poster for Narujeka Nindra, in red." },
  { id: "sano-chari-attention", title: "Sano Chari: Attention", ...poster("sano-chari-attention", 3508, 4961), client: "ChitraKatha Production", desc: "Campaign poster for Sano Chari, our social film with two original songs, with a QR code to the theme song." },
  { id: "eh-phool", title: "Eh Phool", ...poster("eh-phool", 2056, 2376), desc: "Collage artwork for Eh Phool, a song I'm writing." },
  { id: "phool", title: "Phool", ...poster("phool", 1080, 1350), desc: "Phool is close to me. When I write, I dream of an ideal character like her, imaginary of course. I've written a full eight-chapter short film and hope to do it justice on screen one day." },
  { id: "narujeka-nindra-artwork", title: "Narujeka Nindra artwork", ...poster("narujeka-nindra-artwork", 1920, 1080), desc: "One of the drawings the Narujeka Nindra animation is built from." },
  { id: "thakan", title: "Tired – Thakan", ...poster("thakan", 1080, 1350), desc: "Poster for Thakan. Redoing something I didn't enjoy after moving to Australia was tiring, and this is about needing a long rest." },
  { id: "kathakar", title: "Kathakar", ...poster("kathakar", 1080, 1450), desc: "A poster for a poetic film I called Kathakar. That's me on it, and the map is of Nepal." },
  { id: "sano-chari-thumb", title: "Sano Chari thumbnail", ...poster("sano-chari-thumb", 1600, 900), client: "ChitraKatha Production", desc: "YouTube thumbnail for the Sano Chari artist visuals." },
  { id: "escaping-reality", title: "Escaping Reality", ...poster("escaping-reality", 1080, 1350), client: "ChitraKatha Production", desc: "A concept poster series from ChitraKatha. I play a character who wants to break free." },
  { id: "two", title: "Two", ...poster("two", 1080, 1350), desc: "Thumbnail for Two, a short film I made on my own with two sides of me on screen." },
  { id: "main-character", title: "You are your main character", ...poster("main-character", 1080, 1350), desc: "A concept poster featuring my friend Sushil. Everyone around you is shaped by your own judgement, so you're the main character. Live it fully." },
  { id: "music-escape", title: "Music is my escape", ...poster("music-escape", 1080, 1350), desc: "A concept poster about how I feel when I play: transported somewhere far away. Featuring my friend Sushil." },
  { id: "hawaijahaz-title", title: "Hawaijahaz title", ...poster("hawaijahaz-title", 1080, 1080), client: "Ashok Bhusal", desc: "Title treatment for Hawaijahaz Ma Sararara." },
  { id: "pain", title: "Pain", ...poster("pain", 1080, 1350), desc: "The paradox of Phool. The same eyes that light up on the Phool cover speak of pain once the theme changes. There's pain in happiness too." },
  { id: "blood-bath", title: "Blood Bath", ...poster("blood-bath", 1080, 1350), desc: "A mystery movie poster. I shot myself holding a knife and did the rest in Photoshop." },
  { id: "red", title: "Red", ...poster("red", 1080, 1350), desc: "From my movie poster collection, in red with a detective tone." },
  { id: "narujeka-nindra-title", title: "Narujeka Nindra lettering", ...poster("narujeka-nindra-title", 1080, 1080), desc: "Hand lettering for the Narujeka Nindra title." },
  { id: "blackpath", title: "Murderer of the Blackpath", ...poster("blackpath", 1080, 1350), desc: "From my movie poster collection. I shot myself wide-eyed trying to look scary and ended up with this." },
  { id: "boy-with-a-guitar", title: "Boy with a Guitar", ...poster("boy-with-a-guitar", 3240, 4050), desc: "A practice movie poster. I shot myself playing a ukulele and called it Boy with a Guitar. Irony." },
  { id: "manchild", title: "Manchild", ...poster("manchild", 1080, 1350), desc: "One of my early movie posters, about a psychopath who turns up to solve a mystery." },
  { id: "design-thumbnail", title: "I can talk about my design", ...poster("design-thumbnail", 1600, 900), desc: "Thumbnail for a video about my design work." },
  { id: "chess-carnival", title: "Chess Carnival", ...poster("chess-carnival", 3061, 3827), client: "Chautari", desc: "Chess Carnival was an online chess event my team at Chautari organised to promote the game in Nepal. Free entry and a 25k prize pool, the first event of its kind in the country." },
  { id: "talent-mela", title: "Talent Mela", ...poster("talent-mela", 2480, 3508), client: "Chautari", desc: "Brochure for Talent Mela, an event I hosted for my startup Chautari on our Discord server, with a 20,000 rupee prize to help talented people in Nepal follow their passion." },
  { id: "host", title: "Host of the Show", ...poster("host", 3508, 4961), desc: "That's me on the poster, and I hosted the event too." },
  { id: "dream-team", title: "Dream Team", ...poster("dream-team", 4109, 3008), desc: "Team announcement poster for my friends' futsal team." },
  { id: "coffee", title: "Nepal Coffee", ...poster("coffee", 2480, 3508), client: "RR Company", desc: "A marketing poster for the coffee RR Company makes. From my early days of learning, and I was happy with how it turned out." },
  { id: "utensils", title: "Utensils on Sale", ...poster("utensils", 3674, 4540), desc: "A sale showcase from my early Photoshop days, experimenting with ways to make the products stand out." },
  { id: "certificate", title: "Certificate of Appreciation", ...poster("certificate", 3507, 2481), desc: "The certificate I received for an event I hosted. Ironically, I designed it myself." },
];

/* -------------------------------------------------------------- photos */

export const photos = [
  { id: "hawaijahaz-red-car", title: "The red car", shoot: "Hawaijahaz shoot", ...photo("hawaijahaz-red-car", 3876, 2584), desc: "From the Hawaijahaz Ma Sararara shoot." },
  { id: "werri-1", title: "Werri Beach", shoot: "Werri Beach", ...photo("werri-1", 4000, 6000), desc: "Looking down over the bay." },
  { id: "kirtan-saanjh-2", title: "Kirtan Saanjh", shoot: "Kirtan Saanjh", ...photo("kirtan-saanjh-2", 2175, 3263), desc: "From the Kirtan Saanjh evening." },
  { id: "lovelies-4", title: "Lovelies", shoot: "Lovelies", ...photo("lovelies-4", 6000, 4000), desc: "Friends at the lookout." },
  { id: "hawaijahaz-portrait", title: "By the car", shoot: "Hawaijahaz shoot", ...photo("hawaijahaz-portrait", 4000, 6000), desc: "Portrait from the Hawaijahaz Ma Sararara shoot." },
  { id: "werri-2", title: "Wind", shoot: "Werri Beach", ...photo("werri-2", 4000, 6000), desc: "Hair, wind and the ocean behind." },
  { id: "airport-1", title: "Departures", shoot: "Hawaijahaz shoot", ...photo("airport-1", 6000, 4000), desc: "Airport scene from the music video shoot." },
  { id: "lovelies-1", title: "Laughing", shoot: "Lovelies", ...photo("lovelies-1", 4000, 6000), desc: "A candid between takes." },
  { id: "orientation-1", title: "Orientation day", shoot: "APIC orientation", ...photo("orientation-1", 6000, 4000), desc: "New students at APIC orientation in Sydney." },
  { id: "werri-3", title: "Jump", shoot: "Werri Beach", ...photo("werri-3", 4000, 6000), desc: "Standing on the bench above the sea." },
  { id: "kirtan-saanjh-3", title: "The night's team", shoot: "Kirtan Saanjh", ...photo("kirtan-saanjh-3", 6000, 4000), desc: "Group photo from Kirtan Saanjh, in black and white." },
  { id: "lovelies-3", title: "Hair in the wind", shoot: "Lovelies", ...photo("lovelies-3", 4000, 6000), desc: "Caught mid-turn at the lookout." },
  { id: "extra-1", title: "Street light", shoot: "Personal", ...photo("extra-1", 4000, 6000), desc: "A street lamp burning through the trees." },
  { id: "orientation-2", title: "Peace", shoot: "APIC orientation", ...photo("orientation-2", 6000, 4000), desc: "A happy moment at the orientation stall." },
  { id: "girl-on-the-shore", title: "Girl on the shore", shoot: "Personal", ...photo("girl-on-the-shore", 1080, 1350), desc: "The frame and the sun glare gave it a dreamy feel. I love walking along beaches, and one day I saw her sitting there and took the picture. Shared with her permission." },
  { id: "extra-3", title: "By the water", shoot: "Personal", ...photo("extra-3", 1080, 1350), desc: "Sitting on the rocks, watching the sea." },
  { id: "werri-4", title: "Three on a bench", shoot: "Werri Beach", ...photo("werri-4", 6000, 4000), desc: "Friends looking out to sea." },
  { id: "oh-my-companion", title: "Oh my companion", shoot: "Personal", ...photo("oh-my-companion", 1080, 1350), desc: "I was watching a dog and his owner play and couldn't stop myself from asking for a photo. I had a dog as a friend when I was ten, so this felt close." },
  { id: "lovelies-2", title: "Afternoon light", shoot: "Lovelies", ...photo("lovelies-2", 6000, 4000), desc: "Golden hour in the bush." },
  { id: "extra-2", title: "Road to another land", shoot: "Personal", ...photo("extra-2", 4320, 5400), desc: "I set my tripod at a distance, saw light coming from a gate, sat in front of it and acted mysterious. A way to another land." },
  { id: "dear-old-days", title: "Dear old days", shoot: "Personal", ...photo("dear-old-days", 1080, 1350), desc: "An old couple walking in the park, arms around each other's shoulders. I can only wish my old days look like this." },
  { id: "kirtan-saanjh-1", title: "Two friends", shoot: "Kirtan Saanjh", ...photo("kirtan-saanjh-1", 4000, 6000), desc: "Portrait from Kirtan Saanjh." },
  { id: "airport-2", title: "Walking out", shoot: "Hawaijahaz shoot", ...photo("airport-2", 4000, 6000), desc: "Rolling the suitcase through the terminal." },
  { id: "extra-4", title: "Last light", shoot: "Personal", ...photo("extra-4", 1080, 1920), desc: "A silhouette against the sunset." },
  { id: "dear-arthur", title: "Dear Arthur", shoot: "Personal", ...photo("dear-arthur", 4000, 6000), desc: "It was beautiful, and it seemed to be saying something to me." },
  { id: "lovelies-5", title: "Profile", shoot: "Lovelies", ...photo("lovelies-5", 6000, 4000), desc: "Side portrait above the valley." },
  { id: "young-memories", title: "Young memories", shoot: "Personal", ...photo("young-memories", 1080, 1350), desc: "I'm sure the boy will remember these moments. My dad had to work outside the country when I was little, so I cherish moments like this." },
  { id: "orientation-3", title: "First day", shoot: "APIC orientation", ...photo("orientation-3", 6000, 4000), desc: "Welcome stickers on the orientation table." },
];

// Frames shown on the 3D film strip in the hero (small poster images).
export const reelFrames = [
  "hawaijahaz-poster",
  "narujeka-nindra-poster",
  "phool",
  "sano-chari-poster",
  "kathakar",
  "maya-ko-aasha",
  "escaping-reality",
  "eh-phool",
  "blood-bath",
  "averse",
  "main-character",
  "red",
  "hawaijahaz-cover",
  "thakan",
  "music-escape",
  "pain",
  "blackpath",
  "two",
  "sano-chari-attention",
  "boy-with-a-guitar",
].map((slug) => `/media/posters/${slug}-sm.webp`);

export const clients = [
  "APIC",
  "Unique Wholefood",
  "Drive2Everest",
  "Kirtan Saanjh",
  "Ashok Bhusal",
];
