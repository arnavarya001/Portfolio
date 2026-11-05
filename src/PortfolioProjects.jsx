import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import TiltCard from './TiltCard.jsx';
import {
  ArrowDownWideNarrow,
  ArrowUpRight,
  Check,
  ChevronDown,
  ExternalLink,
  Github,
  Layers3,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import portfolioProjects from './projects.json';
import cvProjects from './cvProjects.json';

const scoreCriteria = [
  ['architecture', 'Architecture & code quality', 15],
  ['backend', 'Backend & API', 15],
  ['database', 'Data management', 10],
  ['features', 'Features & business logic', 15],
  ['security', 'Authentication & security', 10],
  ['ui', 'Frontend & UI/UX', 10],
  ['usefulness', 'Problem solving & usefulness', 10],
  ['validation', 'Validation & error handling', 5],
  ['deployment', 'Deployment & functionality', 5],
  ['maintainability', 'Maintainability & scale', 5],
];

const tierFor = (score) => (score >= 85 ? 'S' : score >= 70 ? 'A' : score >= 50 ? 'B' : 'C');
export const scoredProjects = portfolioProjects
  .map((project) => ({
    ...project,
    score: Object.values(project.scoreBreakdown).reduce((total, value) => total + value, 0),
  }))
  .map((project) => ({ ...project, tier: tierFor(project.score) }))
  .sort((a, b) => b.score - a.score || a.sourceNumber - b.sourceNumber);

export const allProjectsWithScores = [
  ...scoredProjects,
  ...cvProjects.map((project) => ({ ...project, isCvEntry: true })),
];

const tiers = ['S', 'A', 'B', 'C'];
const focusAreas = [
  'Full Stack', 'Frontend', 'Backend', 'AI / ML', 'API Integration', 'Tools & Utilities', 'Games',
];
const difficultyRank = { Advanced: 0, Intermediate: 1, Beginner: 2, Unverified: 3 };
const uniqueTechnologies = [...new Set(scoredProjects.flatMap(({ technologies }) => technologies))]
  .filter((technology) => technology !== 'Not verified')
  .sort((a, b) => a.localeCompare(b));

function ProjectPreview({ project, large = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const preview = project.preview || {};

  return (
    <div className={`portfolio-preview${large ? ' portfolio-preview-large' : ''}`}>
      {preview.image && !imageFailed ? (
        <img
          className="portfolio-preview-image"
          src={preview.image}
          alt={`${project.title}: ${preview.imageLabel || 'repository artwork'}`}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="portfolio-preview-frame">
          <div className="portfolio-preview-topline">
            <span className="portfolio-preview-brand"><i />{preview.brand || project.title}</span>
            <span className="portfolio-preview-window"><i /><i /><i /></span>
          </div>
          <div className="portfolio-preview-content">
            <span className="portfolio-preview-kicker">PROJECT INTERFACE · PREVIEW</span>
            <h4>{preview.headline || project.tagline}</h4>
            <div className="portfolio-preview-rows">
              {(preview.rows || project.features.slice(0, 3)).slice(0, large ? 3 : 2).map((row, index) => (
                <div className="portfolio-preview-row" key={`${row}-${index}`}>
                  <span className="portfolio-preview-row-icon">{String(index + 1).padStart(2, '0')}</span>
                  <span>{row}</span>
                  <ArrowUpRight size={12} />
                </div>
              ))}
            </div>
            <div className="portfolio-preview-chips">
              {(preview.chips || project.technologies.slice(0, 3)).slice(0, 3).map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </div>
        </div>
      )}
      <span className="portfolio-preview-caption">
        {preview.image && !imageFailed ? (preview.imageLabel || 'Repository artwork') : project.isCvEntry ? 'CV-based concept preview' : 'Source-derived interface preview'}
      </span>
    </div>
  );
}

function ScoreBreakdown({ project }) {
  return (
    <div className="project-score-list">
      {scoreCriteria.map(([key, label, max]) => (
        <div className="project-score-line" key={key}>
          <span>{label}</span>
          <div className="project-score-track" aria-label={`${project.scoreBreakdown[key]} out of ${max}`}>
            <i style={{ width: `${(project.scoreBreakdown[key] / max) * 100}%` }} />
          </div>
          <b>{project.scoreBreakdown[key]}<small>/{max}</small></b>
        </div>
      ))}
      <div className="project-score-total"><span>Overall score</span><strong>{project.score}<small> / 100</small></strong></div>
    </div>
  );
}

export function ProjectDetails({ project, onClose }) {
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-modal-backdrop"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <motion.section
        className="project-modal"
        role="dialog" aria-modal="true" aria-labelledby="project-detail-title"
        initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }} transition={{ duration: 0.24 }}
      >
        <div className="project-modal-header">
          <span className="eyebrow"><span className="eyebrow-dot" /> {project.isCvEntry ? 'CV PROJECT · SOURCE REVIEW PENDING' : `PROJECT REVIEW · ${String(project.sourceNumber).padStart(2, '0')}`}</span>
          <button className="project-modal-close" ref={closeRef} type="button" onClick={onClose} aria-label="Close project details"><X size={19} /></button>
        </div>
        <div className="project-detail-hero">
          <div>
            <div className="project-detail-badges">{project.score != null && <span className={`project-tier tier-${project.tier.toLowerCase()}`}>{project.tier}-Tier · {project.score}</span>}{project.isCvEntry && <span className="project-cv-status">CV-listed · source review pending</span>}<span className="project-difficulty">{project.difficulty}</span>{project.provisional && <span className="project-provisional">Provisional score</span>}</div>
            <h2 id="project-detail-title">{project.title}</h2>
            <p className="project-detail-tagline">{project.tagline}</p>
          </div>
          <div className="project-modal-actions">
            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer"><Github size={15} /> Source <ArrowUpRight size={13} /></a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Live demo <ArrowUpRight size={13} /></a>}
            {project.isCvEntry && <span className="project-links-unavailable">Source and demo links not supplied</span>}
          </div>
        </div>

        {project.liveUrl ? <div className="project-detail-preview">
          <div className="project-detail-section-heading"><span>LIVE DEPLOYMENT</span><a href={project.liveUrl} target="_blank" rel="noreferrer">Open in a new tab <ArrowUpRight size={13} /></a></div>
          <div className="project-live-frame-wrap">
            <iframe src={project.liveUrl} title={`Live preview of ${project.title}`} loading="lazy" sandbox="allow-scripts allow-forms" referrerPolicy="no-referrer" />
            <span>Live preview. Some deployments may block embedding or require sign-in.</span>
          </div>
        </div> : project.isCvEntry && <div className="project-detail-preview">
          <div className="project-detail-section-heading"><span>CV-BASED CONCEPT PREVIEW</span><span>Illustrative, not a captured product screen</span></div>
          <ProjectPreview project={project} large />
        </div>}

        <div className="project-detail-grid">
          <div className="project-detail-main">
            <section className="project-detail-section"><span className="project-detail-label">OVERVIEW</span><p>{project.overview}</p></section>
            <section className="project-detail-section"><span className="project-detail-label">PROBLEM & APPROACH</span><p>{project.problem}</p></section>
            <section className="project-detail-section"><span className="project-detail-label">IMPLEMENTED FEATURES</span><ul className="project-feature-list">{project.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul></section>
            <section className="project-detail-section"><span className="project-detail-label">ENGINEERING NOTES</span>{project.reviewNotes.map((note) => <p className="project-review-note" key={note}>{note}</p>)}</section>
            <section className="project-detail-section"><span className="project-detail-label">AUDIT STATUS</span><p>{project.verification}</p></section>
          </div>
          <aside className="project-detail-aside">
            <div className="project-detail-panel"><span className="project-detail-label">TECHNICAL ARCHITECTURE</span>{Object.entries(project.technology).map(([layer, value]) => <div className="project-architecture-row" key={layer}><b>{layer}</b><p>{value}</p></div>)}</div>
            <div className="project-detail-panel"><span className="project-detail-label">{project.isCvEntry ? 'CV-LISTED STACK' : 'CONFIRMED STACK'}</span><div className="project-tech-badges">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>
            {project.scoreBreakdown ? <div className="project-detail-panel"><span className="project-detail-label">QUALITY SCORE</span><ScoreBreakdown project={project} /></div> : <div className="project-detail-panel"><span className="project-detail-label">SOURCE EVIDENCE</span><p className="project-links-unavailable">CV description only; repository and demo not provided.</p></div>}
          </aside>
        </div>
      </motion.section>
    </motion.div>
  );
}

function ProjectCard({ project, index, featured, onDetails, reduceMotion }) {
  const card = (
    <TiltCard maxTilt={4} spotlightColor="rgba(255, 76, 36, 0.12)">
      <article className={`portfolio-project-card${featured ? ' portfolio-project-featured' : ''}`}>
        <button className="portfolio-project-open" type="button" onClick={() => onDetails(project)} aria-label={`View details for ${project.title}`}>
          <ProjectPreview project={project} large={featured} />
          <span className="sr-only">Open project details</span>
        </button>
        <div className="portfolio-project-content">
          <div className="portfolio-project-topline">{project.isCvEntry ? <span className="project-cv-status">CV-LISTED</span> : <span className="portfolio-project-rank">RANK {String(index + 1).padStart(2, '0')}</span>}{project.isCvEntry ? <span className="project-difficulty">Source review pending</span> : <span className={`project-tier tier-${project.tier.toLowerCase()}`}>{project.tier}-TIER</span>}</div>
          <h3>{project.title}</h3>
          <p className="portfolio-project-tagline">{project.tagline}</p>
          <p className="portfolio-project-summary">{project.summary}</p>
          <div className="portfolio-project-metadata">{project.score != null ? <span className="portfolio-project-score"><b>{project.score}</b> / 100</span> : <span className="portfolio-project-score">Not ranked with the reviewed 21</span>}{!project.isCvEntry && <span className="project-difficulty">{project.difficulty}</span>}</div>
          <div className="portfolio-project-tech">{project.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}{project.technologies.length > 5 && <span>+{project.technologies.length - 5}</span>}</div>
          <div className="portfolio-project-actions">
            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><Github size={14} />GitHub<ArrowUpRight size={12} /></a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><ExternalLink size={14} />Live demo<ArrowUpRight size={12} /></a>}
            <button type="button" onClick={() => onDetails(project)}>Details <ArrowUpRight size={13} /></button>
          </div>
        </div>
      </article>
    </TiltCard>
  );

  return (
    <motion.div
      className="portfolio-project-motion"
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.34, delay: Math.min(index % 4, 3) * 0.045 }}
    >{card}</motion.div>
  );
}

export default function PortfolioProjects({
  selectedProject: externalSelectedProject,
  onSelectProject: externalOnSelectProject,
} = {}) {
  const reduceMotion = useReducedMotion();
  const [tierFilter, setTierFilter] = useState('All');
  const [focusFilter, setFocusFilter] = useState('All');
  const [technologyFilter, setTechnologyFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('highest');
  const [internalSelectedProject, setInternalSelectedProject] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const selectedProject = externalSelectedProject !== undefined ? externalSelectedProject : internalSelectedProject;
  const setSelectedProject = externalOnSelectProject || setInternalSelectedProject;
  const closeSelectedProject = useCallback(() => setSelectedProject(null), [setSelectedProject]);

  const tierCounts = useMemo(() => Object.fromEntries(tiers.map((tier) => [tier, scoredProjects.filter((project) => project.tier === tier).length])), []);
  const visibleProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return scoredProjects
      .filter((project) => tierFilter === 'All' || project.tier === tierFilter)
      .filter((project) => focusFilter === 'All' || project.categories.includes(focusFilter))
      .filter((project) => technologyFilter === 'All' || project.technologies.includes(technologyFilter))
      .filter((project) => !query || `${project.title} ${project.tagline} ${project.summary} ${project.technologies.join(' ')}`.toLowerCase().includes(query))
      .sort((a, b) => sortOrder === 'highest' ? (b.score - a.score || a.sourceNumber - b.sourceNumber) : (a.score - b.score || a.sourceNumber - b.sourceNumber));
  }, [tierFilter, focusFilter, technologyFilter, search, sortOrder]);

  const isDefaultView = tierFilter === 'All' && focusFilter === 'All' && technologyFilter === 'All' && !search.trim() && sortOrder === 'highest';
  const featured = isDefaultView ? visibleProjects.slice(0, 4) : [];
  const remaining = isDefaultView ? visibleProjects.slice(4) : visibleProjects;
  const activeFilters = [tierFilter !== 'All', focusFilter !== 'All', technologyFilter !== 'All', !!search.trim()].filter(Boolean).length;

  return (
    <section className="section-wrap section-space portfolio-projects-section" id="projects" aria-labelledby="projects-title">
      <div className="portfolio-project-heading">
        <div>
          <span className="eyebrow"><span className="eyebrow-dot" /> SELECTED WORKS · 03</span>
          <h2 className="section-title" id="projects-title">Building Ideas Into <span>Reality.</span></h2>
          <p className="section-description">From complex full-stack platforms to creative experiments, here's a collection of things I've built.</p>
        </div>
        <a className="portfolio-audit-link" href="/PROJECT_AUDIT.md" target="_blank" rel="noreferrer"><Layers3 size={15} /> Read the complete audit <ArrowUpRight size={13} /></a>
      </div>

      <div className="portfolio-project-stats" aria-label="Portfolio project summary">
        <div className="portfolio-stat-total"><strong>21</strong><span>PROJECTS REVIEWED</span></div>
        <div className="portfolio-tier-summary" aria-label={`${tierCounts.S} S tier, ${tierCounts.A} A tier, ${tierCounts.B} B tier, ${tierCounts.C} C tier`}>
          {tiers.map((tier) => <span className={`portfolio-tier-count tier-${tier.toLowerCase()}`} key={tier}><b>{tierCounts[tier]}</b> {tier}-TIER</span>)}
        </div>
        <div className="portfolio-stat-categories"><span>7</span><small>FOCUS AREAS</small></div>
        <div className="portfolio-stat-featured"><span>04</span><small>FEATURED PROJECTS</small></div>
      </div>

      <div className="portfolio-filter-panel">
        <div className="portfolio-filter-top">
          <div className="portfolio-filter-title"><SlidersHorizontal size={16} /><span>Explore projects</span><small>{visibleProjects.length} shown</small></div>
          <div className="portfolio-filter-tools">
            <label className="portfolio-search"><Search size={15} /><span className="sr-only">Search projects</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects or stack" /></label>
            <label className="portfolio-select"><ArrowDownWideNarrow size={14} /><span className="sr-only">Sort projects</span><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="highest">Highest score</option><option value="lowest">Lowest score</option></select><ChevronDown size={13} /></label>
            <button className="portfolio-mobile-filter-toggle" type="button" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}>Filters{activeFilters > 0 && <i>{activeFilters}</i>}<ChevronDown size={14} /></button>
          </div>
        </div>
        <div className={`portfolio-filter-groups${filtersOpen ? ' portfolio-filter-groups-open' : ''}`}>
          <div className="portfolio-filter-row"><span className="portfolio-filter-label">TIER</span><div className="portfolio-filter-options"><button type="button" className={tierFilter === 'All' ? 'active' : ''} onClick={() => setTierFilter('All')}>All projects <span>21</span></button>{tiers.map((tier) => <button type="button" key={tier} className={`${tierFilter === tier ? 'active' : ''} tier-filter-${tier.toLowerCase()}`} onClick={() => setTierFilter(tier)}>{tier}-Tier <span>{tierCounts[tier]}</span></button>)}</div></div>
          <div className="portfolio-filter-row"><span className="portfolio-filter-label">FOCUS</span><div className="portfolio-filter-options portfolio-focus-options"><button type="button" className={focusFilter === 'All' ? 'active' : ''} onClick={() => setFocusFilter('All')}>All areas</button>{focusAreas.map((area) => <button type="button" key={area} className={focusFilter === area ? 'active' : ''} onClick={() => setFocusFilter(area)}>{area}</button>)}</div></div>
          <div className="portfolio-filter-row"><label className="portfolio-filter-label" htmlFor="project-technology">TECH STACK</label><div className="portfolio-select portfolio-technology-select"><select id="project-technology" value={technologyFilter} onChange={(event) => setTechnologyFilter(event.target.value)}><option value="All">All technologies</option>{uniqueTechnologies.map((technology) => <option value={technology} key={technology}>{technology}</option>)}</select><ChevronDown size={13} /></div><button className="portfolio-reset-filters" type="button" onClick={() => { setTierFilter('All'); setFocusFilter('All'); setTechnologyFilter('All'); setSearch(''); setSortOrder('highest'); }}>Reset filters</button></div>
        </div>
      </div>

      {featured.length > 0 && <div className="portfolio-featured-grid" aria-label="Highest ranked projects">{featured.map((project, index) => <ProjectCard key={project.sourceNumber} project={project} index={index} featured onDetails={setSelectedProject} reduceMotion={reduceMotion} />)}</div>}
      {remaining.length > 0 && <div className="portfolio-project-grid" aria-label="All projects ranked by score">{remaining.map((project) => <ProjectCard key={project.sourceNumber} project={project} index={visibleProjects.indexOf(project)} onDetails={setSelectedProject} reduceMotion={reduceMotion} />)}</div>}
      {visibleProjects.length === 0 && <div className="portfolio-empty-state"><span>No projects match those filters.</span><button type="button" onClick={() => { setTierFilter('All'); setFocusFilter('All'); setTechnologyFilter('All'); setSearch(''); }}>Clear filters <X size={13} /></button></div>}
      <p className="portfolio-scoring-note">Scores are a source review, not a measure of authorship. Repository 09 is provisional because its GitHub URL currently returns 404. Deployed demos were opened; gated or data-changing workflows are identified in each project review.</p>

      <div className="portfolio-cv-projects">
        <div className="portfolio-cv-heading">
          <div><span className="eyebrow"><span className="eyebrow-dot" /> ADDITIONAL WORK · CV-LISTED</span><h3>More Projects From My CV</h3><p>These projects are described in my CV. Their source links were not included, so they are presented separately from the 21 source-reviewed projects.</p></div>
          <span className="project-cv-status">3 PROJECTS · REVIEW PENDING</span>
        </div>
        <div className="portfolio-project-grid" aria-label="Additional projects listed in the CV">{cvProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} onDetails={setSelectedProject} reduceMotion={reduceMotion} />)}</div>
      </div>

      {externalSelectedProject === undefined && (
        <AnimatePresence>{selectedProject && <ProjectDetails project={selectedProject} onClose={closeSelectedProject} />}</AnimatePresence>
      )}
    </section>
  );
}
