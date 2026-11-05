import React from 'react';

const TECH_ITEMS = [
  'FULL STACK ARCHITECTURE',
  'AI & RAG WORKFLOWS',
  'REACT 19',
  'NODE.JS & EXPRESS 5',
  'MONGODB',
  'C++ STL & ALGORITHMS',
  'VECTOR DATABASES',
  'TAILWIND CSS',
  'REST APIS & JWT',
  'LANGCHAIN PIPELINES',
  'SYSTEM DESIGN',
  'DOCKER & CI/CD',
];

const MANIFESTO_ITEMS = [
  '“LEARNING BY BUILDING”',
  '“CURIOSITY IS THE FIRST COMMIT”',
  '“HIGH CRAFT · HIGH VELOCITY”',
  '“IDEAS BECOME SYSTEMS THROUGH REPETITION”',
  '“INTENTIONAL INTERFACES, SOLID BACKENDS”',
  '“BUILD WHAT MATTERS, SHIP WHAT WORKS”',
];

export default function KineticMarquee({
  type = 'tech',
  direction = 'left',
  speed = 'normal',
  className = '',
}) {
  const items = type === 'manifesto' ? MANIFESTO_ITEMS : TECH_ITEMS;
  // Duplicate array 3 times for seamless 100% looping
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className={`kinetic-marquee-wrapper marquee-dir-${direction} marquee-speed-${speed} ${
        type === 'manifesto' ? 'marquee-manifesto' : 'marquee-tech'
      } ${className}`}
      aria-hidden="true"
    >
      <div className="kinetic-marquee-track">
        <div className="kinetic-marquee-group">
          {repeated.map((text, idx) => (
            <span className="kinetic-marquee-item" key={`${text}-${idx}`}>
              <span className="marquee-text">{text}</span>
              <span className="marquee-sep">✦</span>
            </span>
          ))}
        </div>
        <div className="kinetic-marquee-group" aria-hidden="true">
          {repeated.map((text, idx) => (
            <span className="kinetic-marquee-item" key={`dup-${text}-${idx}`}>
              <span className="marquee-text">{text}</span>
              <span className="marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

