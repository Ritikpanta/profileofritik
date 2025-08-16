import { useEffect, useState } from "react";

export default function Hero() {
  // the words you want to cycle through

  
  const words = [".STUDENT", ".MUSICIAN", ".CREATOR"];

  const [w, setW] = useState(0);        // which word
  const [len, setLen] = useState(0);    // how many letters are visible
  const [del, setDel] = useState(false); // deleting?

  useEffect(() => {
    // typing speed
    const TYPE = 400;
    const ERASE = 150;
    const HOLD = 900;

    // finished typing current word
    if (!del && len === words[w].length) {
      const t = setTimeout(() => setDel(true), HOLD);
      return () => clearTimeout(t);
    }
    // finished deleting — go to next word
    if (del && len === 0) {
      setDel(false);
      setW((w + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setLen((n) => n + (del ? -1 : 1));
    }, del ? ERASE : TYPE);

    return () => clearTimeout(t);
  }, [len, del, w]);

  return (
    <section className="hero-landing">
      <div className="hero-inner">
        {/* LEFT: text */}
        <div className="hero-copy">
          <h1 className="brand-typing">
            <span className="type">{words[w].slice(0, len)}</span>
          </h1>

          <p className="intro-line">
            Namaskar, I’m <span className="accent">RITIK PANTA</span>.
          </p>
          <p className="intro-line np">
            नमस्कार, म <span className="accent">ऋतिक पन्त</span>
          </p>
        </div>

        {/* RIGHT: your photo only */}
        <div className="hero-photo">
          <img src="../public/hero/BG.png" alt="Ritik" />
        </div>
      </div>
    </section>
  );
}
