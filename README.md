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

The page reads like a notebook, and it leads with the films.

- Landing: a question at the very top offers visitors Phool Harmonica while they look around. Below it, the torn hole in the page with the film loop (three.js) and the cut-out portrait.
- The saying: right under the landing page, the one line the whole site is about ("Watch it today. Come back to it in twenty years. It should still feel like the first time."), in English and Nepali. It lives in `src/sections/Saying.jsx`.
- Films & stories: the films I wrote and directed, then "slice of life", the small personal pieces.
- Sketchbook & animation: the animated pieces, then pages from the notebook.
- भावना, I capture emotions: opens the dark side. Proposal, graduation and family films, with photographs from those shoots ("photography") on a shelf underneath. Lives in `src/sections/Emotions.jsx`.
- काम, commercial work: college marketing (APIC and A Minute with the Dean), ChitraKatha music videos, event coverage (Kritan Sajh, Rockheads) and brand work. Each client shows one set at a time, with tabs to switch, so the page stays calm.
- Posters, photographs (a contact sheet), Nepali poems (with the poetry film Prem ko Patra), about, and the contact letter.

## Where things live

- `src/data/work.js` - every piece of work, with titles and notes. Edit text here.
  - `films` - the films I wrote and directed. The first one is the big one at the top.
  - `sliceOfLife` - the small personal films under "slice of life".
  - `animationProjects`, `sketches`, `posters`, `photos` - set `pick: true` on a photo to circle it on the contact sheet.
  - `poemFilms` - poetry films, shown above the poem pages.
  - `emotionFilms` and `emotionStills` - the "I capture emotions" section. The first film is the big one.
  - `clientWork` - one entry per client. Each `group` becomes a tab (the Dean series is a group inside APIC). A client with no items is hidden.
  - `reel` - the films printed on the 3D film roll on the landing page, by id. Visitors can click a frame to play that film, so only use films with a local cover.
  - `directorReels` - the "behind the camera" row under the films.
- `src/data/poems.js` - the poems.
- `src/components/Music.jsx` - the music question and the small player in the top bar. The songs are listed in `SONGS` at the top of the file (Phool Harmonica and Grave of Lies), they play one after the other, and they pause by themselves while a film is playing.
- `src/components/HeroScene.jsx` - the 3D film loop on the landing page.
- `src/lib/hand.js` and `src/components/Hand.jsx` - the hand-drawn bits: pen circles, strike-throughs, arrows, torn edges and tape. Every mark is seeded, so it looks the same on every visit.
- `src/sections/` - one file per part of the page.
- `public/media/` - web-ready copies of the work:
  - `posters/`, `photos/`, `sketch/` - WebP images, `name.webp` (large) and `name-sm.webp` (thumbnail)
  - `frames/` - storyboard stills, `film-1.webp` to `film-3.webp`
  - `video/` - 720p MP4s that play in the viewer
  - `loops/` - 6-second muted previews that play on hover
  - `covers/` - still frames used before a video plays
  - `audio/` - the background song
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
   {
     "id": "my-film",
     "title": "My Film",
     "kind": "video",
     "src": "/media/video/my-film.mp4",
     "loop": "/media/loops/my-film.mp4",
     "cover": "/media/covers/my-film.webp",
     "ratio": "16/9",
     "tags": ["short film"],
     "desc": "One or two lines about it."
   },
   ```

   If it goes first in `films`, it becomes the big one at the top.

## Hosting

The site lives on GitHub Pages at bagaichaofritik.com. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site, leaves out the old full-size folders, copies `index.html` to `404.html` (so links like `/poetry/...` still open the app) and publishes it. It takes a couple of minutes; progress shows under the repo's Actions tab.

The domain's DNS is at GoDaddy: four A records for `@` pointing at GitHub (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a CNAME for `www` pointing at `ritikpanta.github.io`.
