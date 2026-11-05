import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Cpu, Database, Flame, Layers, Rocket, ShieldCheck } from 'lucide-react';
import TiltCard from './TiltCard.jsx';

const PHASES = [
  {
    number: '01',
    code: 'PHASE // 01',
    title: 'Discovery & Constraints',
    tagline: 'Deconstructing the problem before writing the first line of code.',
    icon: Flame,
    metric: '100% Intentional',
    deliverables: [
      'Problem definition & user requirements',
      'Architecture blueprint & tech stack selection',
      'API endpoint specifications & wireframe maps',
    ],
    details:
      'Great software begins with clarity. I examine edge cases, user pain points, and system requirements to choose the most reliable tools for the job.',
  },
  {
    number: '02',
    code: 'PHASE // 02',
    title: 'Architecture & Schemas',
    tagline: 'Designing resilient database schemas and REST API contracts.',
    icon: Database,
    metric: 'Zero Tech Debt',
    deliverables: [
      'MongoDB schemas, indexes & relations',
      'JWT authentication & role-based middleware',
      'Vector database configuration for embeddings',
    ],
    details:
      'Backend models and data contracts are crafted to handle real-world scenarios. Security, role authorization, and validation are built-in from day one.',
  },
  {
    number: '03',
    code: 'PHASE // 03',
    title: 'The Build & AI Integration',
    tagline: 'Full-stack engineering with modern React 19 and AI pipelines.',
    icon: Cpu,
    metric: '<100ms Latency',
    deliverables: [
      'Modular React 19 UI with fluid Framer Motion',
      'LangChain & RAG retrieval pipelines',
      'Express 5 REST endpoints & data aggregation',
    ],
    details:
      'Execution at speed. Combining modern frontend interfaces with scalable backend controllers, plus intelligent LLM prompts and vector search capabilities.',
  },
  {
    number: '04',
    code: 'PHASE // 04',
    title: 'Polish, Test & Deploy',
    tagline: 'Audit scoring, performance optimization and cloud delivery.',
    icon: Rocket,
    metric: '99.9% Uptime',
    deliverables: [
      'Lighthouse 95+ performance & accessibility audits',
      'Vercel & cloud CI/CD automated deployments',
      'Clear documentation, READMEs & codebase hygiene',
    ],
    details:
      'Code only matters if it performs reliably in production. Every release is audited for responsiveness, security policies, and delightful micro-interactions.',
  },
];

export default function EngineeringProcess() {
  const [activePhase, setActivePhase] = useState(0);
  const current = PHASES[activePhase];
  const Icon = current.icon;

  return (
    <section className="section-wrap section-space process-section" id="process" aria-labelledby="process-title">
      <div className="section-heading">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> (OUR PROCESS IS AS EASY AS 1… 2… 3… 4…)
        </span>
        <div className="heading-row">
          <h2 id="process-title">
            Engineering with <em>velocity & intent.</em>
          </h2>
          <p>
            Inspired by high-velocity product studios: a structured 4-phase framework from raw concept to deployed, resilient software.
          </p>
        </div>
      </div>

      {/* Phase Navigation Tabs */}
      <div className="process-nav-tabs">
        {PHASES.map((phase, idx) => (
          <button
            key={phase.number}
            type="button"
            className={`process-tab-btn ${activePhase === idx ? 'is-active' : ''}`}
            onClick={() => setActivePhase(idx)}
          >
            <span className="process-tab-num">{phase.number}</span>
            <span className="process-tab-name">{phase.title}</span>
            <span className="process-tab-indicator" />
          </button>
        ))}
      </div>

      {/* Interactive Phase Showcase Card */}
      <TiltCard className="process-display-card" maxTilt={3} spotlightColor="rgba(255, 76, 36, 0.12)">
        <div className="process-card-header">
          <div className="process-card-left">
            <span className="process-card-code">{current.code}</span>
            <h3>{current.title}</h3>
            <p className="process-card-tagline">{current.tagline}</p>
          </div>
          <div className="process-card-metric">
            <div className="process-metric-pill">
              <Icon size={18} strokeWidth={1.8} />
              <span>{current.metric}</span>
            </div>
          </div>
        </div>

        <p className="process-card-desc">{current.details}</p>

        <div className="process-deliverables-wrap">
          <span className="process-deliverables-title">CORE DELIVERABLES & MILESTONES</span>
          <div className="process-deliverables-list">
            {current.deliverables.map((item, index) => (
              <div className="process-deliverable-item" key={index}>
                <CheckCircle2 size={16} className="text-acid" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="process-card-footer">
          <div className="process-stepper">
            <span>STEP {activePhase + 1} OF 4</span>
            <div className="process-stepper-dots">
              {PHASES.map((_, i) => (
                <i
                  key={i}
                  className={i === activePhase ? 'active' : i < activePhase ? 'completed' : ''}
                  onClick={() => setActivePhase(i)}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="process-next-btn"
            onClick={() => setActivePhase((prev) => (prev + 1) % PHASES.length)}
          >
            <span>{activePhase === PHASES.length - 1 ? 'Back to start' : 'Next phase'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </TiltCard>
    </section>
  );
}

