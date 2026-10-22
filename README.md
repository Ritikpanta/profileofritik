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

## Where things live

- `src/data/work.js` - every film, reel, Dean series episode, poster and photo, with titles and descriptions. Edit text here.
- `src/data/poems.js` - the poems.
- `src/components/HeroScene.jsx` - the 3D film strip on the landing page. The posters on the strip come from `reelFrames` in `work.js`.
- `public/media/` - web-ready copies of the work:
  - `posters/` and `photos/` - WebP images, `name.webp` (large) and `name-sm.webp` (thumbnail)
  - `video/` - 720p MP4s that play in the viewer
  - `loops/` - 6-second muted previews that play on hover
  - `covers/` - still frames used before a video plays
  - `misc/` - hero cut-out, about portrait, poem covers

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
   { id: "my-film", title: "My Film", ...video("my-film", "16/9"), tags: ["Short film"], desc: "One or two lines about it." },
   ```

The site uses client-side routing, so the host needs to send unknown paths to `index.html` (Vercel and Netlify do this with a rewrite rule).
