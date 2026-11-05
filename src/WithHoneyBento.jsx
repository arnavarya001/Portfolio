import React from 'react';
import { ArrowUpRight, BrainCircuit, Code2, Cpu, Flame, GraduationCap, Layers, Sparkles, Terminal } from 'lucide-react';
import TiltCard from './TiltCard.jsx';

const BENTO_ITEMS = [
  {
    id: 'velocity',
    kicker: 'ENGINEERING VELOCITY // 01',
    title: 'Move fast, build right.',
    desc: 'From initial sketch to deployed full-stack application in days. Rapid prototyping without sacrificing database integrity or security policies.',
    tag: 'RAPID SHIP',
    icon: Flame,
    featured: true,
  },
  {
    id: 'ai-first',
    kicker: 'INTELLIGENCE // 02',
    title: 'AI-First Systems',
    desc: 'LangChain, vector retrieval (RAG), and generative LLM pipelines integrated directly into product features.',
    tag: 'RAG & AGENTS',
    icon: BrainCircuit,
    featured: false,
  },
  {
    id: 'academics',
    kicker: 'FOUNDATION // 03',
    title: 'B.Tech CSE (2025—2029)',
    desc: 'Mirai School of Technology. Data structures, algorithms, operating systems & software engineering.',
    tag: 'COMPUTER SCIENCE',
    icon: GraduationCap,
    featured: false,
  },
  {
    id: 'problem-solving',
    kicker: 'PROBLEM SOLVING // 04',
    title: '100+ Algorithmic Solutions',
    desc: 'Active practice on LeetCode & Codeforces. Competitive programming in C++ STL with optimal time complexity.',
    tag: 'C++ & ALGORITHMS',
    icon: Terminal,
    featured: false,
  },
];

const MANIFESTO_RULES = [
  {
    num: '01',
    rule: "IF YOU CAN'T BE ORIGINAL, BE BETTER THAN ORIGINAL.",
    caption: 'Great software borrows patterns and refines them into extraordinary experiences.',
  },
  {
    num: '02',
    rule: 'IT’S NOT CREATIVE UNLESS IT SOLVES A REAL PROBLEM.',
    caption: 'Flashy design without utility is vanity. True innovation creates measurable value.',
  },
  {
    num: '03',
    rule: 'UNDERSTAND THE PROBLEM, KEEP THE UI CLEAR, BUILD WITH CARE.',
    caption: 'Low cognitive load for the user, high technical rigor under the hood.',
  },
  {
    num: '04',
    rule: 'GREATNESS IS GOOD COMPOUNDED OVER TIME.',
    caption: 'Consistent daily commits, constant curiosity, and continuous production deployments.',
  },
];

export default function WithHoneyBento() {
  return (
    <div className="honey-bento-section">
      {/* 4-Card Bento Grid */}
      <div className="honey-bento-grid">
        {BENTO_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <TiltCard
              key={item.id}
              className={`honey-bento-card ${item.featured ? 'honey-bento-card-featured' : ''}`}
              maxTilt={4}
              spotlightColor="rgba(255, 76, 36, 0.12)"
            >
              <div className="honey-card-inner">
                <div className="honey-card-top">
                  <span className="honey-kicker">{item.kicker}</span>
                  <div className="honey-icon-pill">
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="honey-card-footer">
                  <span className="honey-tag-pill">{item.tag}</span>
                  <span className="honey-arrow-circle">
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* WithHoney Iconic Engineering Manifesto */}
      <div className="honey-manifesto-wrap">
        <div className="honey-manifesto-header">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> THE ENGINEERING MANIFESTO
          </span>
          <h3>Standards I hold myself to.</h3>
        </div>
        <div className="honey-manifesto-grid">
          {MANIFESTO_RULES.map((item) => (
            <div className="honey-manifesto-card" key={item.num}>
              <div className="honey-manifesto-num">{item.num}</div>
              <h4>{item.rule}</h4>
              <p>{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

