import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ss = (x) => { const c = clamp(x, 0, 1); return c * c * (3 - 2 * c); };

/* ── With Honey · scroll-driven red band that moves between statements ───── */
export function Picker({ items }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (p) => setActive(clamp(Math.floor(p * items.length * 0.999), 0, items.length - 1)));
  return (
    <section className="rf-picker" id="about-story" ref={ref} style={{ height: `${items.length * 120}vh` }} aria-label="About">
      <div className="rf-pin">
        <span className="rf-mono rf-tag">[ ABOUT ] · SCROLL</span>
        {items.map((it, k) => (
          <div className={`rf-pick${k === active ? ' on' : ''}`} key={it.t}>
            <span className="rf-pick-n">0{k + 1}</span>
            <h2>{it.t}</h2>
            <hr />
            <p className="rf-mono">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── With Honey · starfield that tips into warp speed with scroll ────────── */
export function Warp({ before, after }) {
  const ref = useRef(null);
  const cv = useRef(null);
  const prog = useRef(0);
  const live = useRef(false);
  const reduce = useReducedMotion();
  const [late, setLate] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => { prog.current = v; setLate(v > 0.52); });

  useEffect(() => {
    const canvas = cv.current;
    const ctx = canvas.getContext('2d');
    const stars = Array.from({ length: 420 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }));
    let W; let H; let id;
    const size = () => { W = canvas.width = canvas.clientWidth; H = canvas.height = canvas.clientHeight; };
    size();
    window.addEventListener('resize', size);
    const io = new IntersectionObserver(([e]) => { live.current = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    const loop = () => {
      id = requestAnimationFrame(loop);
      if (!live.current) return;
      const w = reduce ? 0 : ss((prog.current - 0.4) / 0.25);
      const v = reduce ? 0 : 0.0012 + w * 0.045;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = '#fff';
      const k = Math.max(W, H) * 0.5;
      for (const s of stars) {
        const zPrev = s.z;
        s.z -= v;
        if (s.z <= 0.02) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 1; continue; }
        const x = W / 2 + (s.x / s.z) * k * 0.25;
        const y = H / 2 + (s.y / s.z) * k * 0.25;
        ctx.globalAlpha = clamp(1 - s.z, 0.12, 1);
        ctx.lineWidth = 1 + (1 - s.z) * 1.4;
        ctx.beginPath();
        ctx.moveTo(W / 2 + (s.x / zPrev) * k * 0.25, H / 2 + (s.y / zPrev) * k * 0.25);
        ctx.lineTo(x, y);
        if (w === 0) ctx.lineTo(x + 0.6, y + 0.6);
        ctx.stroke();
      }
    };
    loop();
    return () => { cancelAnimationFrame(id); io.disconnect(); window.removeEventListener('resize', size); };
  }, [reduce]);

  return (
    <section className="rf-warp" ref={ref} aria-label={`${before} to ${after}`}>
      <div className="rf-pin rf-warp-pin">
        <canvas ref={cv} className="rf-warp-cv" aria-hidden="true" />
        <h2 className={`rf-warp-t${late ? ' after' : ''}`}>{late ? after : before}</h2>
      </div>
    </section>
  );
}

/* ── Stefano BG · hover-flood rows + tilted thumbnail chasing the cursor ─── */
function Float({ state }) {
  const box = useRef(null);
  useEffect(() => {
    let id; const p = { x: 0, y: 0, tx: 0, ty: 0, r: 0 };
    const move = (e) => { p.tx = e.clientX; p.ty = e.clientY; };
    window.addEventListener('pointermove', move, { passive: true });
    const tick = () => {
      const vx = p.tx - p.x;
      p.x += vx * 0.14; p.y += (p.ty - p.y) * 0.14;
      p.r += (clamp(vx * 0.25, -14, 14) - p.r) * 0.12;
      if (box.current) box.current.style.transform = `translate3d(${p.x}px,${p.y}px,0) translate(-50%,-50%) rotate(${p.r}deg)`;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(id); window.removeEventListener('pointermove', move); };
  }, []);
  return (
    <div ref={box} className={`rf-float${state.on ? ' on' : ''}`} aria-hidden="true">
      {state.img && <img src={state.img} alt="" />}
      <svg className="rf-badge" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="34" />
        <defs><path id="rf-circ" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" /></defs>
        <text><textPath href="#rf-circ">{`${state.label} • ${state.label} • ${state.label} • `}</textPath></text>
        <text className="mid" x="60" y="64" textAnchor="middle">{state.label}</text>
      </svg>
    </div>
  );
}

export function HoverRows({ id, title, count, items, color = '#e0214f', aside }) {
  const [st, setSt] = useState({ on: false, img: '', label: 'OPEN' });
  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  return (
    <section className="rf-rows" id={id} style={{ '--c': color }} aria-labelledby={`${id}-t`}>
      <header className="rf-rows-head">
        <h2 id={`${id}-t`}>{title}<sup>({count})</sup></h2>
        {aside}
      </header>
      <ul className="rf-list" onMouseLeave={() => setSt((s) => ({ ...s, on: false }))}>
        {items.map((it, i) => {
          const Tag = it.href ? 'a' : 'button';
          const props = it.href ? { href: it.href, target: '_blank', rel: 'noreferrer' } : { type: 'button', onClick: it.onClick };
          return (
            <li key={it.title}>
              <Tag className="rf-row" {...props}
                onMouseEnter={() => fine && setSt({ on: true, img: it.img, label: it.href ? 'VISIT' : 'OPEN' })}>
                <span className="rf-row-i">{String(i + 1).padStart(2, '0')}</span>
                <span className="rf-row-t" style={{ fontSize: `max(20px, min(5.4vw, ${(88 / it.title.length).toFixed(2)}vw))` }}>{it.title}</span>
                <span className="rf-row-c">{it.meta}</span>
                <ArrowUpRight className="rf-row-a" size={22} />
              </Tag>
            </li>
          );
        })}
      </ul>
      {fine && <Float state={st} />}
    </section>
  );
}

/* ── With Honey · mono numbered list that lights up line by line ─────────── */
function RuleLine({ n, k, v, progress, range, id }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.li style={{ opacity }} id={id} className="rf-rule">
      <span>{String(n).padStart(3, '0')}<i>.</i></span> <b>{k}</b>{v ? <em> — {v}</em> : null}<i>.</i>
    </motion.li>
  );
}

export function Rules({ lines }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  return (
    <section className="rf-rules" id="skills" aria-labelledby="skills-t">
      <div className="rf-mono rf-rules-top"><span>[ TOOLKIT ]</span><span id="skills-t">THINGS I WORK WITH</span></div>
      <div className="rf-rules-panel">
        <ol ref={ref}>
          {lines.map((l, i) => (
            <RuleLine key={l.k} n={i + 1} k={l.k} v={l.v} id={l.id} progress={scrollYProgress}
              range={[i / lines.length, Math.min(1, (i + 1.4) / lines.length)]} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── SEBG · cream "All work" grid, alternating 3-up and 2-up rows ────────── */
export function Archive({ projects, onSelect }) {
  const sizes = []; let left = projects.length; let flip = false;
  while (left > 0) { const n = Math.min(flip ? 2 : 3, left); sizes.push(n); left -= n; flip = !flip; }
  let cursor = 0;
  return (
    <section className="rf-archive" id="archive" aria-labelledby="archive-t">
      <div className="rf-archive-head"><h2 id="archive-t">All work</h2><span className="rf-mono">{projects.length} projects</span></div>
      <div className="rf-grid">
        {sizes.map((n, r) => {
          const row = projects.slice(cursor, cursor + n); cursor += n;
          return (
            <div className="rf-grid-row" key={r} style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
              {row.map((p) => (
                <motion.button type="button" className="rf-tile" key={p.title} onClick={() => onSelect(p)}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="rf-tile-img">
                    {p.preview?.image ? <img src={p.preview.image} alt="" loading="lazy" /> : <span className="rf-tile-art">{p.title}</span>}
                  </span>
                  <span className="rf-tile-cap"><b>{p.title}</b><i>{p.tier ? `${p.tier}-tier · ${p.score}` : 'CV project'}</i></span>
                </motion.button>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── With Honey · "WHERE DO I SIGN?" bar + giant cropped wordmark ────────── */
export function SignBar({ left, right }) {
  return (
    <div className="rf-sign">
      <div className="rf-sign-l">{left}</div>
      <a className="rf-sign-r" href="#contact">{right} <span aria-hidden="true">↗↗↗</span></a>
    </div>
  );
}

export function Wordmark({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['6vw', '-4vw']);
  return (
    <div className="rf-wordmark" ref={ref} aria-hidden="true">
      <motion.span style={{ x }}>{text}</motion.span>
    </div>
  );
}

/* ── SEBG · circular corner badge that appears after the intro ───────────── */
export function CornerBadge() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.9);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <a href="#home" className={`rf-corner${show ? ' on' : ''}`} aria-label="Back to top" tabIndex={show ? 0 : -1}>
      <span>AA</span>
    </a>
  );
}
