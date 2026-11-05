import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { GROUPS, fileName } from './techData.js';

function Logo({ name, sources }) {
  const [i, setI] = useState(0);
  if (i >= sources.length) {
    return <span className="ts-fallback" aria-hidden="true">{name.replace(/[^A-Za-z+]/g, '').slice(0, 2)}</span>;
  }
  return (
    <img
      src={sources[i]}
      alt=""
      width="44"
      height="44"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setI(i + 1)}
    />
  );
}

export default function TechStack() {
  const reduce = useReducedMotion();
  let count = 0;
  GROUPS.forEach((g) => { count += g.tech.length + g.concepts.length; });

  return (
    <section className="ts" id="tech-stack" aria-labelledby="ts-t">
      <div className="rf-mono ts-top">
        <span>[ TECH STACK ]</span>
        <span id="ts-t">EVERYTHING I&apos;VE LEARNED · {count}</span>
      </div>

      {GROUPS.map((g, gi) => (
        <div className="ts-group" key={g.title}>
          <div className="ts-label">
            <span className="rf-mono">{String(gi + 1).padStart(2, '0')}</span>
            <h3>{g.title}</h3>
          </div>
          <div className="ts-body">
            {g.tech.length > 0 && (
              <ul className="ts-grid">
                {g.tech.map((t, k) => (
                  <motion.li
                    className="ts-tile"
                    key={t.n}
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: k * 0.06 }}
                  >
                    <Logo name={t.n} sources={[`/tech/${fileName(t.n)}.svg`, ...t.s]} />
                    <span className="rf-mono">{t.n}</span>
                  </motion.li>
                ))}
              </ul>
            )}
            {g.concepts.length > 0 && (
              <ul className="ts-chips">
                {g.concepts.map((c) => <li key={c} className="rf-mono">{c}</li>)}
              </ul>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
