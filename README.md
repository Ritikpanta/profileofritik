# profileofritik

Portfolio site for Ritik Panta, built with React, Vite and three.js.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build in dist/
```

The contact form uses EmailJS. Put your keys in a `.env` file:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## How the page is laid out

The page reads like a notebook. The top half is my own work, the bottom half is work for others.

- Landing: a torn hole in the page with the film loop (three.js) and the cut-out portrait.
- चित्र, my own work: films, sketchbook, posters, photographs (a contact sheet) and Nepali poems.
- काम, work for others: one block per client (APIC with A Minute with the Dean, Ashok Bhusal, Unique Wholefood, Drive2Everest, Kirtan Saanjh, ChitraKatha, and the early Chautari jobs).
- म, about me, then चिठी, the contact letter.

## Where things live

- `src/data/work.js` - every piece of work, with titles and notes. Edit text here.
  - `films` - my own films. The first one is the big one at the top, with three storyboard frames.
  - `earlierFilms` - the older YouTube films.
  - `sketches`, `posters`, `photos` - images. Set `pick: true` on a photo to circle it on the contact sheet.
  - `clientWork` - one entry per client, with `groups` of items (the Dean series is a group inside APIC).
  - `reelFrames` - the pictures printed on the 3D film loop.
- `src/data/poems.js` - the poems.
- `src/components/HeroScene.jsx` - the 3D film loop on the landing page.
- `src/lib/hand.js` and `src/components/Hand.jsx` - the hand-drawn bits: pen circles, strike-throughs, arrows, torn edges and tape. Every mark is seeded, so it looks the same on every visit.
- `src/sections/` - one file per part of the page.
- `public/media/` - web-ready copies of the work:
  - `posters/`, `photos/`, `sketch/` - WebP images, `name.webp` (large) and `name-sm.webp` (thumbnail)
  - `frames/` - storyboard stills, `film-1.webp` to `film-3.webp`
  - `video/` - 720p MP4s that play in the viewer
  - `loops/` - 6-second muted previews that play on hover
  - `covers/` - still frames used before a video plays
  - `misc/` - the hero cut-out, paper and film grain, about portrait, poem covers

The old folders (`public/project`, `public/photography`, `public/hero`, `public/poetry`, `public/Tiktokvid`) hold the original full-size files. The site no longer loads them, so they can be removed once you're happy.

## Adding new work

1. Export the media into the right `public/media` folder. These ffmpeg commands match what's already there:

   ```bash
   # full video (use scale=-2:1280 for vertical)
   ffmpeg -i in.mp4 -vf "scale=1280:-2,format=yuv420p" -c:v libx264 -preset slow -crf 26 -c:a aac -b:a 112k -movflags +faststart public/media/video/my-film.mp4
   # hover loop (6 seconds starting at 0:10, no sound; use scale=-2:720 for vertical)
   ffmpeg -ss 10 -i in.mp4 -t 6 -vf "scale=640:-2,format=yuv420p" -c:v libx264 -crf 27 -an -movflags +faststart public/media/loops/my-film.mp4
   # cover frame
   ffmpeg -ss 11 -i in.mp4 -frames:v 1 -vf "scale=1280:-2" public/media/covers/my-film.webp
   ```

2. Add an entry to the matching list in `src/data/work.js`, for example:

   ```js
   { id: "my-film", title: "My Film", ...video("my-film", "16/9"), tags: ["short film"], desc: "One or two lines about it." },
   ```

   If it goes first in `films`, it becomes the big one at the top. Give it `frames: frames("my-film")` and put three stills in `public/media/frames/` for the storyboard.

The site uses client-side routing, so the host needs to send unknown paths to `index.html` (Vercel and Netlify do this with a rewrite rule).
