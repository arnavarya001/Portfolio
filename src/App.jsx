import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { scoredProjects, allProjectsWithScores } from './PortfolioProjects.jsx';
import { ProjectPage, slugify } from './ProjectPage.jsx';
import PortraitFlyThrough from './PortraitFlyThrough.jsx';
import FilmGrain from './FilmGrain.jsx';
import KineticMarquee from './KineticMarquee.jsx';
import TiltCard from './TiltCard.jsx';
import WithHoneyBento from './WithHoneyBento.jsx';
import EngineeringProcess from './EngineeringProcess.jsx';
import AboutProfile from './AboutProfile.jsx';
import TechStack from './TechStack.jsx';
import { Picker, Warp, HoverRows, Rules, Archive, SignBar, Wordmark, CornerBadge } from './Refs.jsx';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  BrainCircuit,
  Check,
  ChefHat,
  Code2,
  CodeXml,
  Copy,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Loader2,
  Menu,
  Moon,
  Sun,
  Terminal,
  X,
} from 'lucide-react';

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Work', 'projects'],
  ['Toolkit', 'skills'],
  ['Profiles', 'profiles'],
  ['Contact', 'contact'],
];

const pickerItems = [
  { t: 'Learning by building', d: "I'm pursuing a B.Tech in Computer Science Engineering (Artificial Intelligence & Machine Learning) at Mirai School of Technology, while learning by building and staying curious about what technology can make possible." },
  { t: 'Full stack + AI', d: "I'm especially interested in full stack development and AI: how solid systems and thoughtful interfaces can turn a promising idea into something people can use." },
  { t: 'Build with care', d: 'My approach is simple: understand the problem, keep the experience clear, and build with care. I enjoy exploring a question from the first sketch through the code that brings it to life.' },
];

const roles = ['Full Stack Developer', 'AI Enthusiast', 'Creative Problem Solver'];

const skills = [
  {
    title: 'Languages',
    number: '01',
    icon: CodeXml,
    items: ['C++', 'C', 'Python', 'JavaScript', 'Kotlin', 'STL'],
  },
  {
    title: 'Frontend',
    number: '02',
    icon: Code2,
    items: ['HTML5', 'CSS3', 'React.js', 'Tailwind CSS', 'EJS', 'Responsive UI design'],
  },
  {
    title: 'Backend',
    number: '03',
    icon: Terminal,
    items: ['Node.js', 'Express.js', 'REST APIs', 'RESTful routing', 'CRUD operations', 'JWT'],
  },
  {
    title: 'Database',
    number: '04',
    icon: Layers3,
    items: ['MongoDB', 'Schema design', 'Database connectivity'],
  },
  {
    title: 'Data & AI',
    number: '05',
    icon: BrainCircuit,
    items: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'LangChain', 'RAG', 'Prompt Engineering', 'Vector Databases'],
  },
  {
    title: 'Tools',
    number: '06',
    icon: Layers3,
    items: ['Git', 'GitHub', 'VS Code'],
  },
];

const profiles = [
  {
    name: 'GitHub',
    handle: '@arnavarya001',
    description: 'Projects, experiments and the code behind them.',
    href: 'https://github.com/arnavarya001',
    Icon: Github,
  },
  {
    name: 'LeetCode',
    handle: 'arnav_arya',
    description: 'A place to practice patterns and sharpen problem solving.',
    href: 'https://leetcode.com/u/arnav_arya/',
    Icon: CodeXml,
  },
  {
    name: 'CodeChef',
    handle: 'rag_bees_16',
    description: 'Contests, division stars, and competitive algorithmic challenges.',
    href: 'https://www.codechef.com/users/rag_bees_16',
    Icon: ChefHat,
  },
  {
    name: 'HackerRank',
    handle: 'singharnav5577',
    description: 'Problem solving badges, domains, and skill certifications.',
    href: 'https://www.hackerrank.com/profile/singharnav5577',
    Icon: Award,
  },
  {
    name: 'Codeforces',
    handle: 'arnav_arya1',
    description: 'Competitive programming rounds and rating practice.',
    href: 'https://codeforces.com/profile/arnav_arya1',
    Icon: Terminal,
  },
];

const CONTACT_EMAIL = 'arnavarya2004@gmail.com';

function Reveal({ children, className = '', delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reduceMotion ? 0 : 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, accent, description, id }) {
  return (
    <div className="section-heading" id={id}>
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <div className="heading-row">
        <h2>{title} <em>{accent}</em></h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href="#home" aria-label="Arnav Arya, home">
      <span className="brand-mark">aa<span>.</span></span>
      <span className="brand-name">Arnav Arya<span>Developer · AI enthusiast</span></span>
    </a>
  );
}

function Header({ activeSection, menuOpen, setMenuOpen, theme, toggleTheme }) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <nav className="nav-shell" aria-label="Main navigation">
        <Brand />
        <div id="mobile-navigation" className={`nav-links${menuOpen ? ' is-open' : ''}`}>
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
          </button>
          <a className="nav-resume" href="/resume.pdf" download>
            <span>Resume</span><ArrowDown size={14} strokeWidth={1.8} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero({ reduceMotion }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 3200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined;
    let frame;
    const move = (event) => {
      const hero = heroRef.current;
      if (!hero) return;
      const bounds = hero.getBoundingClientRect();
      if (event.clientY < bounds.top || event.clientY > bounds.bottom) {
        hero.style.setProperty('--parallax-x', '0px');
        hero.style.setProperty('--parallax-y', '0px');
        return;
      }
      const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
      const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--parallax-x', `${-x * 8}px`);
        hero.style.setProperty('--parallax-y', `${-y * 8}px`);
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
    };
  }, [reduceMotion]);

  return (
    <section ref={heroRef} className="hero section-wrap" id="home" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <Reveal className="hero-copy-inner" delay={0.08}>
          <div className="hero-kicker"><span className="status-pip" /> Curious mind. Intentional builder.</div>
          <h1 id="hero-title">
            Hi, I&apos;m<br />
            <span className="hero-name">Arnav Arya<span className="hero-period">.</span></span>
          </h1>
          <div className="role-line">
            <span className="role-prefix">I work as a</span>
            <span className="role-ticker" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35 }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="sr-only">Full Stack Developer, AI Enthusiast, and Creative Problem Solver</span>
          </div>
          <p className="hero-intro">
            I love building meaningful digital experiences, exploring artificial intelligence, and turning creative ideas into real-world products.
          </p>
          <div className="hero-actions">
            <a className="button button-primary magnetic" href="#projects" data-magnetic>
              Explore my work <ArrowDown size={15} />
            </a>
            <a className="button button-quiet magnetic" href="#contact" data-magnetic>
              Let&apos;s connect <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-block"><span>APPROACH</span><strong>Learning by building</strong></div>
            <div className="hero-meta-block"><span>FOCUSING ON</span><strong>Full stack + AI</strong></div>
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-art-wrap" delay={0.18}>
        <div className="hero-art" role="img" aria-label="Abstract animated Arnav Arya monogram artwork">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-orbit orbit-three" />
          <div className="art-crosshair crosshair-one" />
          <div className="art-crosshair crosshair-two" />
          <div className="art-core">
            <div className="art-core-glow" />
            <span>AA</span>
            <i className="core-spark core-spark-one" />
            <i className="core-spark core-spark-two" />
            <i className="core-spark core-spark-three" />
          </div>
          <div className="art-label art-label-top"><span>COMPUTER SCIENCE</span><span>2025—29</span></div>
          <div className="art-label art-label-bottom"><span>IDEA</span><span className="art-label-line" /><span>INTERFACE</span><span className="art-label-line" /><span>IMPACT</span></div>
          <div className="art-side-note">A little curiosity<br />goes a long way.</div>
          <div className="art-coordinates">A / 001</div>
        </div>
        <div className="hero-image-caption"><span>01 / A WORK IN PROGRESS</span><span>SCROLL TO EXPLORE <ArrowDown size={13} /></span></div>
      </Reveal>
      <a className="scroll-cue" href="#about" aria-label="Scroll to About section"><span />SCROLL TO DISCOVER</a>
    </section>
  );
}

function About() {
  return (
    <section className="section-wrap section-space" id="about" aria-labelledby="about-title">
      <SectionHeading eyebrow="A LITTLE ABOUT ME · 01" title="Curiosity is the" accent="first commit." id="about-title" />
      <div className="about-grid">
        <Reveal className="about-lead">
          <div className="about-monogram" aria-hidden="true"><span>A</span><span>A</span><i /></div>
          <p className="about-pull">A curious builder drawn to <em>useful ideas</em> and the details that make them feel human.</p>
          <div className="about-caption"><span>ARNAV ARYA</span><span>CS STUDENT · BUILDER</span></div>
        </Reveal>
        <Reveal className="about-copy" delay={0.12}>
          <p className="copy-large">I&apos;m pursuing a B.Tech in Computer Science Engineering (Artificial Intelligence &amp; Machine Learning) at Mirai School of Technology, while learning by building and staying curious about what technology can make possible.</p>
          <p>I&apos;m especially interested in full stack development and AI: how solid systems and thoughtful interfaces can turn a promising idea into something people can use.</p>
          <p>My approach is simple: understand the problem, keep the experience clear, and build with care. I enjoy exploring a question from the first sketch through the code that brings it to life.</p>
          <a href="#skills" className="text-link">A few things I work with <ArrowRight size={15} /></a>
        </Reveal>
      </div>

      {/* WithHoney-Style Bento Grid & Manifesto */}
      <Reveal delay={0.14}>
        <WithHoneyBento />
      </Reveal>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-wrap section-space" id="skills" aria-labelledby="skills-title">
      <SectionHeading
        eyebrow="TOOLS OF THE TRADE · 02"
        title="A growing" accent="toolkit."
        description="Technologies I use, explore and keep learning. No scores, just a steady curiosity for how things work."
        id="skills-title"
      />
      <div className="skills-grid">
        {skills.map(({ title, number, icon: Icon, items }, index) => (
          <Reveal delay={(index % 3) * 0.07} key={title}>
            <TiltCard maxTilt={5}>
              <div className="skill-card" style={{ height: '100%' }}>
                <div className="skill-card-top"><span className="skill-number">{number} / 05</span><Icon size={20} strokeWidth={1.45} /></div>
                <h3>{title}</h3>
                <div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="skill-card-line" />
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects({ selectedProject, onSelectProject }) {
  return (
    <PortfolioProjects
      selectedProject={selectedProject}
      onSelectProject={onSelectProject}
    />
  );
}

function Experience() {
  return (
    <section className="section-wrap section-space journey-section" id="experience" aria-labelledby="experience-title">
      <SectionHeading eyebrow="LEARNING IN MOTION · 04" title="A journey in" accent="progress."
        description="Learning, building and staying open to what comes next."
        id="experience-title"
      />
      <div className="journey-grid">
        <Reveal>
          <TiltCard maxTilt={5}>
            <div className="education-card" style={{ height: '100%' }}>
              <div className="journey-card-top"><span className="eyebrow"><span className="eyebrow-dot" /> EDUCATION</span><span className="current-badge"><i /> IN PROGRESS</span></div>
              <div className="education-icon"><GraduationCap size={24} strokeWidth={1.4} /></div>
              <div className="education-date">2025 — 2029</div>
              <h3>B.Tech, Computer Science Engineering (Artificial Intelligence &amp; Machine Learning)</h3>
              <p>Mirai School of Technology</p>
              <div className="education-foot"><span>UNDERGRADUATE STUDIES</span><span>01</span></div>
            </div>
          </TiltCard>
        </Reveal>
        <Reveal delay={0.1}>
          <TiltCard maxTilt={5}>
            <div className="experience-placeholder" style={{ height: '100%' }}>
              <span className="eyebrow"><span className="eyebrow-dot" /> EXPERIENCE</span>
              <div className="placeholder-mark" aria-hidden="true"><span>+</span></div>
              <h3>Room for what&apos;s next.</h3>
              <p>Internships, hackathons, workshops and practical experiences will find a place here as they take shape.</p>
              <a href="#contact" className="text-link">Start a conversation <ArrowRight size={15} /></a>
              <span className="placeholder-coordinate">OPEN TO THE NEXT IDEA</span>
            </div>
          </TiltCard>
        </Reveal>
      </div>
      <div className="achievements-row">
        <div className="achievement-intro"><span className="eyebrow"><span className="eyebrow-dot" /> MILESTONES</span><h3>Good things<br />are in the making.</h3><p>A home for future certifications, competitions, workshops and academic milestones.</p></div>
        <div className="achievement-placeholders">
          {[
            ['CERTIFICATION', 'Credential and issuer'],
            ['COMPETITION', 'Event and participation'],
            ['WORKSHOP', 'Topic and organizer'],
          ].map(([kind, prompt], index) => (
            <div className="achievement-item" key={kind}><span className="achievement-number">0{index + 1}</span><div><span>{kind}</span><strong>{prompt}</strong></div><span className="achievement-add">+</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Profiles() {
  return (
    <section className="section-wrap section-space profiles-section" id="profiles" aria-labelledby="profiles-title">
      <SectionHeading eyebrow="AROUND THE WEB · 05" title="Where I" accent="practice."
        description="Coding profiles and professional links, all in one place."
        id="profiles-title"
      />
      <div className="profiles-grid">
        {profiles.map(({ name, handle, description, href, Icon }, index) => (
          <Reveal delay={index * 0.08} key={name}>
            <TiltCard maxTilt={5}>
              <div className="profile-card" style={{ height: '100%' }}>
                <div className="profile-top"><span className="profile-icon"><Icon size={20} strokeWidth={1.6} /></span><ArrowUpRight className="profile-external" size={16} /></div>
                <h3>{name}</h3><span className="profile-handle">{handle}</span><p>{description}</p>
                <a href={href} target="_blank" rel="noreferrer" aria-label={`Visit Arnav Arya's ${name} profile`}><span>Visit profile</span><ArrowRight size={15} /></a>
              </div>
            </TiltCard>
          </Reveal>
        ))}
        <Reveal delay={0.24}>
          <TiltCard maxTilt={5}>
            <div className="profile-linkedin" style={{ height: '100%' }}>
              <div><span className="profile-icon"><Linkedin size={20} strokeWidth={1.6} /></span><span className="linkedin-label">LET&apos;S CONNECT</span></div>
              <h3>LinkedIn</h3><p>For professional updates and conversations.</p>
              <a href="https://www.linkedin.com/in/arnav-arya-9516b5306/" target="_blank" rel="noreferrer">Connect with me <ArrowUpRight size={15} /></a>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2400);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const values = Object.fromEntries(new FormData(form).entries());
    if (!CONTACT_EMAIL.trim()) {
      setFormStatus('The form is ready, but message delivery is not connected yet. You can reach me on LinkedIn in the meantime.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('Sending your message directly to Gmail...');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          _subject: `[Portfolio] ${values.subject} — from ${values.name}`,
          message: values.message,
          _replyto: values.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setFormStatus('Message delivered directly to my Gmail! Thank you for reaching out.');
        form.reset();
      } else if (data.message && data.message.toLowerCase().includes('activate')) {
        setFormStatus('Message sent! FormSubmit sent a 1-time activation link to arnavarya2004@gmail.com — click confirm in your inbox to complete activation.');
        form.reset();
      } else {
        throw new Error(data.message || 'Direct transmission error');
      }
    } catch {
      // Fallback: If network or browser shields interrupt direct submission, open mail client
      const subject = encodeURIComponent(values.subject);
      const body = encodeURIComponent(`From: ${values.name} (${values.email})\n\n${values.message}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setFormStatus('Opening your email client to send your message directly to arnavarya2004@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-wrap contact-wrap">
        <div className="contact-topline"><span><span className="eyebrow-dot" /> OPEN A CONVERSATION</span><span>06 / LET&apos;S MAKE IT REAL</span></div>
        <div className="contact-grid">
          <Reveal className="contact-copy">
            <h2 id="contact-title">Have an ambitious idea?<br /><em>Let&apos;s build.</em></h2>
            <p>Have a project, a challenge, or an engineering role to explore? I&apos;d love to connect and build something extraordinary.</p>
            <div className="contact-links">
              <a href="https://www.linkedin.com/in/arnav-arya-9516b5306/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a>
              <a href="https://github.com/arnavarya001" target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a>
            </div>

            {/* Quick Copy Card (WithHoney Vermilion Accent) */}
            <div className="quick-copy-card" onClick={handleCopyEmail}>
              <div className="quick-copy-left">
                <span className="quick-copy-label">DIRECT INBOX // CLICK TO COPY</span>
                <span className="quick-copy-email">{CONTACT_EMAIL}</span>
              </div>
              <div className="quick-copy-btn">
                {emailCopied ? (
                  <>
                    <Check size={14} className="text-acid" />
                    <span>Copied! ✦</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal className="contact-form-wrap" delay={0.12}>
            <div className="form-heading"><span>01 / YOUR MESSAGE</span><span>ALL FIELDS REQUIRED</span></div>
            <form className="contact-form" onSubmit={handleSubmit} onChange={() => setFormStatus('')}>
              <label><span>Your name</span><input name="name" autoComplete="name" placeholder="Name" required maxLength="100" /></label>
              <label><span>Email address</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength="254" /></label>
              <label><span>Subject</span><input name="subject" placeholder="What are we building together?" required maxLength="160" /></label>
              <label><span>Message</span><textarea name="message" placeholder="Tell me about your idea, project scope, or opportunity..." rows="4" required maxLength="4000" /></label>
              <button
                className="button button-primary form-submit magnetic"
                data-magnetic
                type="submit"
                disabled={isSubmitting}
                style={isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : undefined}
              >
                {isSubmitting ? (
                  <>Sending... <Loader2 size={16} className="spin" /></>
                ) : (
                  <>Send note <ArrowUpRight size={16} /></>
                )}
              </button>
              <p className="form-status" role="status" aria-live="polite">{formStatus}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer({ backToTop }) {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-inner">
        <Brand footer />
        <span className="footer-note">Built with curiosity, one detail at a time.</span>
        <div className="footer-right"><span>© {new Date().getFullYear()} ARNAV ARYA</span>{backToTop && <a href="#home" className="back-to-top" aria-label="Back to top"><ArrowUp size={16} /></a>}</div>
      </div>
    </footer>
  );
}

function NotFound() {
  return (
    <main className="not-found section-wrap">
      <span className="eyebrow"><span className="eyebrow-dot" /> 404 · WRONG TURN</span>
      <h1>This page<br /><em>isn't here.</em></h1>
      <p>The link may have changed. Let's get you back to the portfolio.</p>
      <a className="button button-primary" href="/">Back home <ArrowRight size={15} /></a>
    </main>
  );
}

const mapProjectToRow = (p, onSelect) => ({
  title: p.title,
  meta: (p.categories || p.preview?.chips || p.technologies || []).slice(0, 2).join(' / '),
  img: p.preview?.image,
  onClick: () => onSelect(p),
});
const ruleLines = [
  ...skills.map((g) => ({ k: g.title, v: g.items.join(' · ') })),
  { k: 'Education', v: 'B.Tech, Computer Science Engineering (Artificial Intelligence & Machine Learning) · Mirai School of Technology · 2025—2029', id: 'experience' },
];
const profileRows = [
  ...profiles.map((p) => ({ title: p.name, meta: p.handle, href: p.href, img: '' })),
  { title: 'LinkedIn', meta: 'Arnav Arya', href: 'https://www.linkedin.com/in/arnav-arya-9516b5306/', img: '' },
];

// ── Build slug → project map ───────────────────────────────────────────────
const projectSlugMap = new Map(
  allProjectsWithScores.map((p) => [slugify(p.title), p])
);

// ── Hash-based routing helpers ────────────────────────────────────────────
function getProjectFromHash() {
  const hash = window.location.hash; // e.g. #project/bookmyshow-clone
  const m = hash.match(/^#project\/(.+)$/);
  if (!m) return null;
  return projectSlugMap.get(m[1]) || null;
}

// Store scroll position in sessionStorage so it survives hash changes
const SCROLL_KEY = 'portfolio-scroll-y';

function openProjectPage(project) {
  // Save current scroll before navigating away
  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
  window.location.hash = `project/${slugify(project.title)}`;
}

function closeProjectPage() {
  // Use history.back() so the browser restores scroll automatically via the
  // history entry, but also read our saved value as a fallback.
  const savedY = Number(sessionStorage.getItem(SCROLL_KEY) || '0');
  sessionStorage.removeItem(SCROLL_KEY);

  // Clear hash without pushing a new history entry
  history.replaceState(null, '', window.location.pathname + window.location.search);
  // Restore scroll
  requestAnimationFrame(() => {
    window.scrollTo({ top: savedY, behavior: 'instant' });
  });
}

function App() {
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [backToTop, setBackToTop] = useState(false);
  const [currentProject, setCurrentProject] = useState(() => getProjectFromHash());
  const [projectFilter, setProjectFilter] = useState('all');

  // Listen to hash changes (browser back/forward)
  useEffect(() => {
    const onHash = () => {
      const proj = getProjectFromHash();
      setCurrentProject(proj);
      // If navigating back to home via browser back button, restore scroll
      if (!proj) {
        const savedY = Number(sessionStorage.getItem(SCROLL_KEY) || '0');
        sessionStorage.removeItem(SCROLL_KEY);
        requestAnimationFrame(() => {
          window.scrollTo({ top: savedY, behavior: 'instant' });
        });
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleSelectProject = useCallback((p) => { openProjectPage(p); }, []);
  const handleCloseProject = useCallback(() => { closeProjectPage(); setCurrentProject(null); }, []);

  const allProjectItems = useMemo(
    () => allProjectsWithScores.map((p) => mapProjectToRow(p, handleSelectProject)),
    [handleSelectProject]
  );

  const selectedProjectItems = useMemo(
    () => scoredProjects.slice(0, 7).map((p) => mapProjectToRow(p, handleSelectProject)),
    [handleSelectProject]
  );

  const currentProjectItems = projectFilter === 'selected' ? selectedProjectItems : allProjectItems;
  const currentProjectTitle = projectFilter === 'selected' ? 'Selected work' : 'All work';

  // ── Theme (dark / light) ──────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('portfolio-theme') : null;
    if (stored) return stored;
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const sectionIds = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-28% 0px -60% 0px', threshold: [0, 0.1, 0.3, 0.6] });
    sectionIds.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
      setBackToTop(window.scrollY > 650);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const buttons = [...document.querySelectorAll('[data-magnetic]')];
    const cleanup = [];
    buttons.forEach((button) => {
      const onMove = (event) => {
        const bounds = button.getBoundingClientRect();
        const dx = (event.clientX - bounds.left - bounds.width / 2) * 0.08;
        const dy = (event.clientY - bounds.top - bounds.height / 2) * 0.08;
        button.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      };
      const reset = () => { button.style.transform = ''; };
      button.addEventListener('pointermove', onMove);
      button.addEventListener('pointerleave', reset);
      cleanup.push(() => {
        button.removeEventListener('pointermove', onMove);
        button.removeEventListener('pointerleave', reset);
      });
    });
    return () => cleanup.forEach((fn) => fn());
  }, [reduceMotion]);

  const path = window.location.pathname;
  const isHomePath = path === '/' || path.endsWith('/index.html');
  if (!isHomePath) return <NotFound />;

  // ── If a project is selected via hash, render full-page view ──────────
  if (currentProject) {
    return (
      <>
        <div className="scroll-progress" aria-hidden="true" />
        <FilmGrain />
        <AnimatePresence mode="wait">
          <ProjectPage
            key={slugify(currentProject.title)}
            project={currentProject}
            onBack={handleCloseProject}
          />
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <FilmGrain />
      <PortraitFlyThrough
        reduceMotion={reduceMotion}
        onSelectProject={handleSelectProject}
      />
      <KineticMarquee type="tech" direction="left" />
      <Header
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main id="main">
        <AboutProfile projectCount={allProjectsWithScores.length} />
        <Picker items={pickerItems} />
        <Warp before="Idea // Interface" after="Impact" />
        <div id="archive" style={{ position: 'relative', top: '-100px' }} />
        <HoverRows
          id="projects"
          title={currentProjectTitle}
          count={String(currentProjectItems.length).padStart(2, '0')}
          items={currentProjectItems}
          aside={
            <div className="rf-tabs" role="tablist" aria-label="Project filter">
              <button
                type="button"
                role="tab"
                aria-selected={projectFilter === 'all'}
                className={`rf-tab${projectFilter === 'all' ? ' active' : ''}`}
                onClick={() => setProjectFilter('all')}
              >
                All work <sup>({allProjectItems.length})</sup>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={projectFilter === 'selected'}
                className={`rf-tab${projectFilter === 'selected' ? ' active' : ''}`}
                onClick={() => setProjectFilter('selected')}
              >
                Selected work <sup>({String(selectedProjectItems.length).padStart(2, '0')})</sup>
              </button>
            </div>
          }
        />
        <Rules lines={ruleLines} />
        <TechStack />
        <HoverRows
          id="profiles"
          title="Where I practice"
          count={String(profileRows.length).padStart(2, '0')}
          color="#ef3e3e"
          items={profileRows}
        />
        <SignBar left="Got a project?" right="Say hello" />
        <Contact />
        <Wordmark text="arnav" />
      </main>
      <CornerBadge />
      <Footer backToTop={backToTop} />
    </>
  );
}

export default App;
