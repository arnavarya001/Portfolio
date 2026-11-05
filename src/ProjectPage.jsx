import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ExternalLink,
  Github,
  X,
  Layers3,
  Terminal,
  Database,
  Cpu,
  Globe,
  ShieldCheck,
  Award,
  Sparkles,
  CodeXml,
  Maximize2,
  Minimize2,
  Server,
  HardDrive,
  Flame,
  Layout,
  Info,
  AlertCircle,
  FileCode2,
  Laptop
} from 'lucide-react';

export const slugify = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const scoreCriteria = [
  ['architecture', 'Architecture & code quality', 15],
  ['backend', 'Backend & API', 15],
  ['data', 'Data management', 10],
  ['features', 'Features & business logic', 15],
  ['security', 'Authentication & security', 10],
  ['ui', 'Frontend & UI/UX', 10],
  ['usefulness', 'Problem solving & usefulness', 10],
  ['validation', 'Validation & error handling', 5],
  ['deployment', 'Deployment & functionality', 5],
  ['maintainability', 'Maintainability & scale', 5],
];

function ScoreBar({ value, max }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="pp-score-track" aria-label={`${value} out of ${max}`}>
      <motion.div
        className="pp-score-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function getLayerInfo(layerKey) {
  const k = layerKey.toLowerCase();
  if (k.includes('front') || k.includes('ui') || k.includes('client')) {
    return {
      title: 'Frontend & UI Architecture',
      icon: Layout,
      color: '#ff6b4a',
    };
  }
  if (k.includes('back') || k.includes('server') || k.includes('api')) {
    return {
      title: 'Backend & API Services',
      icon: Server,
      color: '#ff9248',
    };
  }
  if (k.includes('data') || k.includes('db') || k.includes('storage')) {
    return {
      title: 'Database & Data Layer',
      icon: Database,
      color: '#4ecdc4',
    };
  }
  if (k.includes('arch') || k.includes('system') || k.includes('design')) {
    return {
      title: 'System & Component Architecture',
      icon: Cpu,
      color: '#a78bfa',
    };
  }
  if (k.includes('deliver') || k.includes('deploy') || k.includes('host') || k.includes('cloud')) {
    return {
      title: 'Deployment & Cloud Delivery',
      icon: Globe,
      color: '#38bdf8',
    };
  }
  return {
    title: layerKey.charAt(0).toUpperCase() + layerKey.slice(1),
    icon: Layers3,
    color: '#ff4c24',
  };
}

function IframePreview({ url, title }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`pp-frame-wrap${expanded ? ' pp-frame-expanded' : ''}`}>
      <div className="pp-frame-toolbar">
        <div className="pp-frame-dots">
          <span className="pp-dot pp-dot-red" />
          <span className="pp-dot pp-dot-yellow" />
          <span className="pp-dot pp-dot-green" />
        </div>
        <div className="pp-frame-url-box">
          <span className="pp-frame-url-lock">🔒</span>
          <span className="pp-frame-url">{url}</span>
        </div>
        <div className="pp-frame-actions">
          <button
            type="button"
            className="pp-frame-btn"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? 'Collapse preview' : 'Expand preview'}
          >
            {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{expanded ? 'Collapse' : 'Expand'}</span>
          </button>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="pp-frame-btn pp-frame-btn-external"
          >
            <ExternalLink size={14} />
            <span>Open in tab</span>
          </a>
        </div>
      </div>
      <div className="pp-frame-body">
        <iframe
          src={url}
          title={`Live preview of ${title}`}
          loading="lazy"
          sandbox="allow-scripts allow-forms allow-same-origin"
          referrerPolicy="no-referrer"
        />
        <div className="pp-frame-notice">
          <Info size={13} />
          <span>
            Interactive preview · If the app blocks embedding or requires third-party cookies, use <strong>Open in tab</strong>.
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProjectPage({ project, onBack }) {
  const topRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${project.title} — Arnav Arya`;
    return () => {
      document.title = 'Arnav Arya — Developer & AI Enthusiast';
    };
  }, [project]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack]);

  const tierColor = { S: '#ffd700', A: '#7ee787', B: '#58a6ff', C: '#d2a8ff' };
  const tc = tierColor[project.tier] || '#ffd700';

  const technologyEntries = Object.entries(project.technology || {});
  const techStack = project.technologies || [];

  return (
    <motion.div
      className="pp-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      ref={topRef}
    >
      {/* ── Top Floating Navigation Bar ───────────────────────────────── */}
      <header className="pp-topbar">
        <div className="pp-topbar-inner">
          <button type="button" className="pp-back" onClick={onBack} aria-label="Back to projects">
            <ArrowLeft size={16} />
            <span className="pp-back-text">Back to Work</span>
            <kbd className="pp-kbd">ESC</kbd>
          </button>

          <div className="pp-topbar-title" title={project.title}>
            <span className="pp-topbar-crumb">Projects</span>
            <span className="pp-topbar-slash">/</span>
            <span className="pp-topbar-name">{project.title}</span>
          </div>

          <div className="pp-topbar-actions">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="pp-action-link"
              >
                <Github size={15} />
                <span>Source Code</span>
                <ArrowUpRight size={13} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="pp-action-link pp-action-primary"
              >
                <ExternalLink size={15} />
                <span>Live Demo</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Container ────────────────────────────────────────────── */}
      <main className="pp-container">

        {/* ── Hero Section ────────────────────────────────────────────── */}
        <section className="pp-hero">
          <div className="pp-hero-content">
            {/* Badges Bar */}
            <div className="pp-badges">
              {project.isCvEntry ? (
                <span className="pp-badge pp-badge-cv">
                  <FileCode2 size={13} /> CV-Listed Project · Source Pending
                </span>
              ) : (
                <>
                  <span
                    className="pp-badge pp-badge-tier"
                    style={{ '--tc': tc, borderColor: `${tc}55`, color: tc }}
                  >
                    <Award size={13} />
                    {project.tier}-Tier
                  </span>
                  <span className="pp-badge pp-badge-score">
                    <Sparkles size={13} />
                    {project.score} / 100 Score
                  </span>
                </>
              )}
              {project.difficulty && (
                <span className="pp-badge pp-badge-diff">
                  <Flame size={13} />
                  {project.difficulty}
                </span>
              )}
              {(project.categories || []).map((cat) => (
                <span key={cat} className="pp-badge pp-badge-cat">
                  {cat}
                </span>
              ))}
              {project.provisional && (
                <span className="pp-badge pp-badge-prov">Provisional Evaluation</span>
              )}
            </div>

            {/* Giant Title */}
            <motion.h1
              className="pp-title"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {project.title}
            </motion.h1>

            {/* Tagline / Subtitle */}
            <motion.p
              className="pp-tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {project.tagline}
            </motion.p>

            {/* Quick Hero Actions */}
            <motion.div
              className="pp-hero-buttons"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pp-hero-btn pp-hero-btn-primary"
                >
                  <ExternalLink size={16} />
                  <span>Launch Live Deployment</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pp-hero-btn pp-hero-btn-secondary"
                >
                  <Github size={16} />
                  <span>Explore Repository</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Hero Image Showcase */}
          {project.preview?.image && (
            <motion.div
              className="pp-hero-visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pp-mockup-frame">
                <div className="pp-mockup-bar">
                  <div className="pp-mockup-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="pp-mockup-label">
                    {project.preview.brand || project.title}
                  </span>
                </div>
                <div className="pp-mockup-body">
                  <img
                    src={project.preview.image}
                    alt={`${project.title} preview`}
                    className="pp-mockup-img"
                  />
                  {project.preview.imageLabel && (
                    <div className="pp-mockup-caption">
                      {project.preview.imageLabel}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* ── TECHNICAL ARCHITECTURE (PROMINENT LARGE SHOWCASE) ───────── */}
        {technologyEntries.length > 0 && (
          <section className="pp-showcase-section pp-arch-showcase">
            <div className="pp-section-header">
              <div className="pp-section-badge">
                <Cpu size={14} />
                <span>SYSTEM DESIGN &amp; ENGINEERING</span>
              </div>
              <h2 className="pp-section-title">Technical Architecture</h2>
              <p className="pp-section-sub">
                Comprehensive architectural layers, component responsibilities, and system design choices.
              </p>
            </div>

            <div className="pp-arch-grid">
              {technologyEntries.map(([layerKey, desc], idx) => {
                const info = getLayerInfo(layerKey);
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={layerKey}
                    className="pp-arch-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <div className="pp-arch-card-top">
                      <div
                        className="pp-arch-icon-box"
                        style={{ color: info.color, borderColor: `${info.color}33`, background: `${info.color}14` }}
                      >
                        <IconComponent size={22} />
                      </div>
                      <div className="pp-arch-meta">
                        <span className="pp-arch-layer-tag">{layerKey.toUpperCase()}</span>
                        <h3 className="pp-arch-layer-name">{info.title}</h3>
                      </div>
                    </div>
                    <div className="pp-arch-card-body">
                      <p className="pp-arch-desc">{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── CONFIRMED STACK & TOOLS (PROMINENT LARGE SHOWCASE) ──────── */}
        {techStack.length > 0 && (
          <section className="pp-showcase-section pp-stack-showcase">
            <div className="pp-section-header">
              <div className="pp-section-badge">
                <CodeXml size={14} />
                <span>TECHNOLOGY FOUNDATION</span>
              </div>
              <h2 className="pp-section-title">
                {project.isCvEntry ? 'CV-Listed Technologies' : 'Confirmed Tech Stack'}
              </h2>
              <p className="pp-section-sub">
                Libraries, frameworks, databases, and tooling deployed across this codebase.
              </p>
            </div>

            <div className="pp-stack-pills-wrap">
              {techStack.map((tech, idx) => (
                <motion.div
                  key={tech}
                  className="pp-stack-pill"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.15 } }}
                >
                  <span className="pp-stack-pill-dot" />
                  <span className="pp-stack-pill-name">{tech}</span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── EDITORIAL CONTENT & DETAILS ─────────────────────────────── */}
        <div className="pp-editorial-layout">

          {/* LEFT: In-depth narrative & notes */}
          <div className="pp-editorial-col-left">

            {/* Overview */}
            {project.overview && (
              <section className="pp-card-block">
                <div className="pp-card-head">
                  <span className="pp-card-eyebrow">
                    <Info size={13} /> PROJECT SCOPE
                  </span>
                  <h3 className="pp-card-title">Overview</h3>
                </div>
                <p className="pp-prose-large">{project.overview}</p>
              </section>
            )}

            {/* Problem & Approach */}
            {project.problem && (
              <section className="pp-card-block">
                <div className="pp-card-head">
                  <span className="pp-card-eyebrow">
                    <AlertCircle size={13} /> PROBLEM &amp; APPROACH
                  </span>
                  <h3 className="pp-card-title">The Problem &amp; Engineering Solution</h3>
                </div>
                <p className="pp-prose-large">{project.problem}</p>
              </section>
            )}

            {/* Engineering Notes */}
            {project.reviewNotes?.length > 0 && (
              <section className="pp-card-block pp-card-notes">
                <div className="pp-card-head">
                  <span className="pp-card-eyebrow">
                    <Terminal size={13} /> CODE AUDIT &amp; OBSERVATIONS
                  </span>
                  <h3 className="pp-card-title">Engineering Notes</h3>
                </div>
                <div className="pp-notes-list">
                  {project.reviewNotes.map((note, i) => (
                    <div key={i} className="pp-note-item">
                      <span className="pp-note-bar" />
                      <p className="pp-note-text">{note}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Audit Status */}
            {project.verification && (
              <section className="pp-card-block pp-card-audit">
                <div className="pp-card-head">
                  <span className="pp-card-eyebrow">
                    <ShieldCheck size={13} /> VERIFICATION AUDIT
                  </span>
                  <h3 className="pp-card-title">Audit Status</h3>
                </div>
                <p className="pp-prose-large pp-prose-audit">{project.verification}</p>
              </section>
            )}
          </div>

          {/* RIGHT: Features & Quality Breakdown */}
          <div className="pp-editorial-col-right">

            {/* Implemented Features */}
            {project.features?.length > 0 && (
              <section className="pp-card-block">
                <div className="pp-card-head">
                  <span className="pp-card-eyebrow">
                    <Check size={13} /> FUNCTIONAL CAPABILITIES
                  </span>
                  <h3 className="pp-card-title">Implemented Features</h3>
                </div>
                <div className="pp-features-grid">
                  {project.features.map((feat, idx) => (
                    <motion.div
                      key={idx}
                      className="pp-feature-item"
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                    >
                      <span className="pp-feature-icon">
                        <Check size={14} />
                      </span>
                      <span className="pp-feature-label">{feat}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Quality Score Breakdown */}
            {project.scoreBreakdown ? (
              <section className="pp-card-block pp-card-quality">
                <div className="pp-card-head">
                  <span className="pp-card-eyebrow">
                    <Award size={13} /> AUDIT EVALUATION
                  </span>
                  <h3 className="pp-card-title">Quality Score Breakdown</h3>
                </div>

                <div className="pp-score-banner">
                  <div className="pp-score-big">
                    <span className="pp-score-number">{project.score}</span>
                    <span className="pp-score-total-max">/ 100</span>
                  </div>
                  <div className="pp-score-verdict">
                    <span
                      className="pp-score-tier-badge"
                      style={{ color: tc, borderColor: `${tc}55`, background: `${tc}15` }}
                    >
                      {project.tier}-Tier Grade
                    </span>
                    <p className="pp-score-summary">
                      Calculated across 10 independent engineering criteria including code quality, security, and architecture.
                    </p>
                  </div>
                </div>

                <div className="pp-scores-list">
                  {scoreCriteria.map(([key, label, max]) => {
                    const val =
                      project.scoreBreakdown[key] ??
                      (key === 'data' ? project.scoreBreakdown['database'] : undefined) ??
                      0;
                    return (
                      <div key={key} className="pp-score-row">
                        <div className="pp-score-label-wrap">
                          <span className="pp-score-name">{label}</span>
                          <span className="pp-score-val">
                            <strong>{val}</strong>
                            <small>/{max}</small>
                          </span>
                        </div>
                        <ScoreBar value={val} max={max} />
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : (
              <section className="pp-card-block">
                <div className="pp-card-head">
                  <span className="pp-card-eyebrow">
                    <FileCode2 size={13} /> SOURCE EVIDENCE
                  </span>
                  <h3 className="pp-card-title">CV-Listed Project</h3>
                </div>
                <p className="pp-prose-large">
                  This entry is transcribed from the professional curriculum vitae. Source code and live deployment endpoints have not yet been linked for automated static audit.
                </p>
              </section>
            )}
          </div>
        </div>

        {/* ── LIVE INTERACTIVE EMBED (IF AVAILABLE) ───────────────────── */}
        {project.liveUrl && (
          <section className="pp-showcase-section pp-embed-showcase">
            <div className="pp-section-header">
              <div className="pp-section-badge">
                <Laptop size={14} />
                <span>INTERACTIVE SANDBOX</span>
              </div>
              <h2 className="pp-section-title">Live Deployment</h2>
              <p className="pp-section-sub">
                Live sandbox embed running the production deployment.
              </p>
            </div>
            <IframePreview url={project.liveUrl} title={project.title} />
          </section>
        )}

        {/* ── BOTTOM RETURN BAR ───────────────────────────────────────── */}
        <section className="pp-footer-nav">
          <button type="button" className="pp-back pp-back-lg" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>Back to All Work</span>
          </button>

          <div className="pp-footer-links">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="pp-action-link"
              >
                <Github size={15} />
                <span>GitHub Repo</span>
                <ArrowUpRight size={13} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="pp-action-link pp-action-primary"
              >
                <ExternalLink size={15} />
                <span>Live Site</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </section>

      </main>
    </motion.div>
  );
}
