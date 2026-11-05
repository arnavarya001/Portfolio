import React from 'react';

export default function FilmGrain() {
  return (
    <div className="analog-film-grain" aria-hidden="true">
      <svg className="film-grain-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}

