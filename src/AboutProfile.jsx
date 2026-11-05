import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const ROLES = ['Full Stack Developer', 'Software Engineer', 'AI / ML Engineer'];

export default function AboutProfile({ projectCount = 0 }) {
  const reduce = useReducedMotion();
  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section className="ab" id="about" aria-labelledby="about-t">
      <div className="rf-mono ab-top">
        <span>[ ABOUT ]</span>
        <span>ARNAV ARYA · DELHI, INDIA</span>
      </div>

      <div className="ab-grid">
        <motion.figure
          className="ab-photo"
          initial={reduce ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <motion.img
            src="/arnav.jpg"
            alt="Portrait of Arnav Arya"
            width="1000"
            height="1333"
            decoding="async"
            initial={reduce ? false : { scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          <span className="ab-live rf-mono"><i aria-hidden="true" /> OPEN TO ROLES</span>
          <figcaption className="ab-cap rf-mono">
            <b>ARNAV ARYA</b>
            <span><MapPin size={12} aria-hidden="true" /> DELHI, IN</span>
          </figcaption>
        </motion.figure>

        <div className="ab-body">
          <motion.p className="rf-mono ab-kicker" {...rise(0)}>FULL STACK DEVELOPER &amp; AI ENTHUSIAST</motion.p>
          <motion.h2 id="about-t" className="ab-name" {...rise(0.08)}>Arnav<br />Arya</motion.h2>
          <motion.p className="ab-lead" {...rise(0.16)}>
            I&apos;m a computer science student who learns by building. I like taking an idea from a first sketch all the way to
            working code, with solid backends, clear interfaces and a little AI where it genuinely helps.
          </motion.p>

          <motion.dl className="ab-facts" {...rise(0.22)}>
            <div className="ab-row">
              <dt className="rf-mono">Based in</dt>
              <dd><MapPin size={16} aria-hidden="true" /> Delhi, India</dd>
            </div>
            <div className="ab-row">
              <dt className="rf-mono">Status</dt>
              <dd>
                <span className="ab-status"><i aria-hidden="true" /> Open to roles</span>
                <span className="ab-chips">
                  {ROLES.map((r) => <span key={r}>{r}</span>)}
                </span>
              </dd>
            </div>
            <div className="ab-row">
              <dt className="rf-mono">Education</dt>
              <dd>B.Tech, Computer Science Engineering (Artificial Intelligence &amp; Machine Learning) <em>Mirai School of Technology · 2025 — 2029</em></dd>
            </div>
            <div className="ab-row">
              <dt className="rf-mono">Focus</dt>
              <dd>Full stack web · AI &amp; RAG workflows · Data structures &amp; algorithms</dd>
            </div>
            {projectCount > 0 && (
              <div className="ab-row">
                <dt className="rf-mono">Built so far</dt>
                <dd>{projectCount} projects, from MERN apps to Android</dd>
              </div>
            )}
          </motion.dl>

          <motion.div className="ab-cta" {...rise(0.3)}>
            <a className="ab-btn ab-btn-solid" href="#contact">Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="ab-btn" href="/resume.pdf" download>Résumé <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="ab-btn ab-btn-ico" href="https://github.com/arnavarya001" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
            <a className="ab-btn ab-btn-ico" href="https://www.linkedin.com/in/arnav-arya-9516b5306/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
