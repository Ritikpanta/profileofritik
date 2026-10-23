// src/components/Music.jsx
// Phool Harmonica, offered to visitors when they arrive. Nothing plays until
// someone says yes (browsers won't allow it anyway), and the song steps aside
// whenever a film with its own sound is opened.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export const SONG = {
  title: "Phool Harmonica",
  src: "/media/audio/phool-harmonica.mp3",
};

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
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState(read);

  const el = () => {
    if (!audio.current) {
      const a = new Audio();
      a.src = SONG.src;
      a.loop = true;
      a.preload = "none";
      a.volume = 0;
      a.addEventListener("play", () => setPlaying(true));
      a.addEventListener("pause", () => setPlaying(false));
      audio.current = a;
    }
    return audio.current;
  };

  // gentle fades, so the song never starts or stops with a jolt
  const fadeTo = (target, ms, done) => {
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
  };

  const play = useCallback(() => {
    const a = el();
    a.play()
      .then(() => fadeTo(VOLUME, 1600))
      .catch(() => {});
  }, []);

  const pause = useCallback(() => {
    const a = audio.current;
    if (!a || a.paused) return;
    fadeTo(0, 450, () => a.pause());
  }, []);

  const toggle = useCallback(() => {
    const a = audio.current;
    if (!a || a.paused) play();
    else pause();
  }, [play, pause]);

  const choose = useCallback(
    (v) => {
      setAnswer(v);
      if (v === "no") write("no");
      if (v === "yes") play();
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
    <MusicCtx.Provider value={{ playing, play, pause, toggle, answer, choose }}>
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

  return (
    <aside
      className={`listen${thanks ? " is-thanks" : ""}${atTop ? "" : " is-away"}`}
      aria-label="Music for the visit"
      aria-hidden={atTop ? undefined : true}
    >
      {thanks ? (
        <p className="listen-q" role="status">
          Playing <em>{SONG.title}</em>. You can pause it here.
        </p>
      ) : (
        <>
          <p className="listen-q">Want some music while you look around?</p>
          <p className="listen-sub">
            It’s <em>{SONG.title}</em>, I made it.
          </p>
          <div className="listen-actions">
            <button
              type="button"
              className="listen-yes"
              tabIndex={atTop ? undefined : -1}
              onClick={() => {
                music.choose("yes");
                setThanks(true);
              }}
            >
              <span aria-hidden="true">▶</span> play
            </button>
            <button type="button" className="listen-no" tabIndex={atTop ? undefined : -1} onClick={() => music.choose("no")}>
              no thanks
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

// The small player that stays in the top bar.
export function MusicButton() {
  const music = useMusic();
  if (!music) return null;
  return (
    <button
      type="button"
      className={`music-btn${music.playing ? " is-playing" : ""}`}
      onClick={music.toggle}
      aria-pressed={music.playing}
      aria-label={music.playing ? `Pause ${SONG.title}` : `Play ${SONG.title}`}
    >
      <Disc spinning={music.playing} />
      <span className="music-btn-text">
        <span className="music-btn-title">{SONG.title}</span>
        <span className="music-btn-state">{music.playing ? "pause" : "play"}</span>
      </span>
      <span className="music-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
