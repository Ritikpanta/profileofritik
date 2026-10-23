// src/components/Music.jsx
// My songs, offered to visitors when they arrive. Nothing plays until someone
// picks one (browsers won't allow it anyway). The songs play one after the
// other, and step aside whenever a film with its own sound is opened.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export const SONGS = [
  { id: "phool-harmonica", title: "Phool Harmonica", src: "/media/audio/phool-harmonica.mp3" },
  { id: "grave-of-lies", title: "Grave of Lies", from: "How Are You, Mister?", src: "/media/audio/grave-of-lies.mp3" },
];

const KEY = "ritik-music";
const VOLUME = 0.65;
const MusicCtx = createContext(null);

const read = () => {
  try {
    return window.localStorage.getItem(KEY) || "";
  } catch {
    return "";
  }
};
const write = (v) => {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* private window, nothing to remember */
  }
};

// Films with sound tell the song to wait while they play.
export const announceFilm = (playing) =>
  window.dispatchEvent(new CustomEvent(playing ? "ritik:film-start" : "ritik:film-stop"));

export function MusicProvider({ children }) {
  const audio = useRef(null);
  const ramp = useRef(0);
  const resume = useRef(false);
  const trackRef = useRef(0);
  const [track, setTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState(read);

  // gentle fades, so a song never starts or stops with a jolt
  const fadeTo = useCallback((target, ms, done) => {
    const a = audio.current;
    if (!a) return;
    cancelAnimationFrame(ramp.current);
    const from = a.volume;
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      try {
        a.volume = from + (target - from) * k;
      } catch {
        /* iOS keeps volume to itself */
      }
      if (k < 1) ramp.current = requestAnimationFrame(step);
      else done?.();
    };
    ramp.current = requestAnimationFrame(step);
  }, []);

  const start = useCallback(
    (i) => {
      const a = audio.current;
      if (!a) return;
      const song = SONGS[i];
      if (!a.src.endsWith(song.src)) {
        a.src = song.src;
        a.volume = 0;
      }
      trackRef.current = i;
      setTrack(i);
      a.play()
        .then(() => fadeTo(VOLUME, 1400))
        .catch(() => {});
    },
    [fadeTo]
  );

  const el = useCallback(() => {
    if (!audio.current) {
      const a = new Audio();
      a.preload = "none";
      a.volume = 0;
      a.addEventListener("play", () => setPlaying(true));
      a.addEventListener("pause", () => setPlaying(false));
      a.addEventListener("ended", () => start((trackRef.current + 1) % SONGS.length));
      audio.current = a;
    }
    return audio.current;
  }, [start]);

  const play = useCallback(
    (i = trackRef.current) => {
      el();
      const a = audio.current;
      if (i !== trackRef.current && !a.paused) {
        fadeTo(0, 350, () => start(i));
      } else {
        start(i);
      }
    },
    [el, fadeTo, start]
  );

  const pause = useCallback(() => {
    const a = audio.current;
    if (!a || a.paused) return;
    fadeTo(0, 450, () => a.pause());
  }, [fadeTo]);

  const toggle = useCallback(() => {
    const a = audio.current;
    if (!a || a.paused) play();
    else pause();
  }, [play, pause]);

  const next = useCallback(() => play((trackRef.current + 1) % SONGS.length), [play]);

  const choose = useCallback(
    (v, i = 0) => {
      setAnswer(v);
      if (v === "no") write("no");
      if (v === "yes") play(i);
    },
    [play]
  );

  useEffect(() => {
    const onStart = () => {
      const a = audio.current;
      if (a && !a.paused) {
        resume.current = true;
        pause();
      }
    };
    const onStop = () => {
      if (resume.current) {
        resume.current = false;
        play();
      }
    };
    window.addEventListener("ritik:film-start", onStart);
    window.addEventListener("ritik:film-stop", onStop);
    return () => {
      window.removeEventListener("ritik:film-start", onStart);
      window.removeEventListener("ritik:film-stop", onStop);
    };
  }, [play, pause]);

  useEffect(() => () => cancelAnimationFrame(ramp.current), []);

  return (
    <MusicCtx.Provider value={{ playing, play, pause, toggle, next, track, song: SONGS[track], answer, choose }}>
      {children}
    </MusicCtx.Provider>
  );
}

export const useMusic = () => useContext(MusicCtx);

function Disc({ spinning }) {
  return (
    <svg className={`disc${spinning ? " is-spinning" : ""}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="19" className="disc-vinyl" />
      <circle cx="20" cy="20" r="14.5" className="disc-groove" />
      <circle cx="20" cy="20" r="10.5" className="disc-groove" />
      <circle cx="20" cy="20" r="6.6" className="disc-label" />
      <circle cx="20" cy="20" r="1.4" className="disc-hole" />
    </svg>
  );
}

// A small note hanging under the player in the top corner. It only shows
// near the top of the page, so it never follows anyone down the site.
export function ListenPrompt() {
  const music = useMusic();
  const [gone, setGone] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!thanks) return;
    const t = setTimeout(() => setGone(true), 3600);
    return () => clearTimeout(t);
  }, [thanks]);

  if (!music || gone || music.answer === "no") return null;
  if (music.answer === "yes" && !thanks) return null;
  const tab = atTop ? undefined : -1;

  return (
    <aside
      className={`listen${thanks ? " is-thanks" : ""}${atTop ? "" : " is-away"}`}
      aria-label="Music for the visit"
      aria-hidden={atTop ? undefined : true}
    >
      {thanks ? (
        <p className="listen-q" role="status">
          Playing <em>{music.song.title}</em>. You can pause or skip it here.
        </p>
      ) : (
        <>
          <p className="listen-q">Want some music while you look around?</p>
          <p className="listen-sub">Both of these are mine. Pick one.</p>
          <ul className="listen-songs">
            {SONGS.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="listen-song"
                  tabIndex={tab}
                  onClick={() => {
                    music.choose("yes", i);
                    setThanks(true);
                  }}
                >
                  <span className="listen-song-play" aria-hidden="true">▶</span>
                  <span className="listen-song-title">{s.title}</span>
                  {s.from && <span className="listen-song-from">from {s.from}</span>}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="listen-no" tabIndex={tab} onClick={() => music.choose("no")}>
            no thanks
          </button>
        </>
      )}
    </aside>
  );
}

// The small player that stays in the top bar: play or pause, and skip to the other song.
export function MusicButton() {
  const music = useMusic();
  if (!music) return null;
  const { song } = music;
  return (
    <div className={`music-player${music.playing ? " is-playing" : ""}`}>
      <button
        type="button"
        className="music-btn"
        onClick={music.toggle}
        aria-pressed={music.playing}
        aria-label={music.playing ? `Pause ${song.title}` : `Play ${song.title}`}
      >
        <Disc spinning={music.playing} />
        <span className="music-btn-text">
          <span className="music-btn-title">{song.title}</span>
          <span className="music-btn-state">{music.playing ? "pause" : "play"}</span>
        </span>
        <span className="music-bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
      <button type="button" className="music-next" onClick={music.next} aria-label="Play the other song" title="Play the other song">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l8 6-8 6z" />
          <path d="M17 6v12" />
        </svg>
      </button>
    </div>
  );
}
