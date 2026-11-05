import React, { useEffect, useRef } from 'react';
import { allProjectsWithScores } from './PortfolioProjects.jsx';

const CW = 72;
const CH = 125;
const F = 900;
const GAP = 700;
const NC = allProjectsWithScores.length || 24;
const HERO = 900;
const ZT = 700 + (NC - 1) * GAP + 900;
const TOTAL = HERO * 0.35 + ZT;

const PALETTE = [215, 225, 245, 260, 275, 290, 180, 200, 50, 130, 350];

const CARDS_DATA = [
  { n: 'RepoRead AI Extension', cat: 'Manifest V3 · 1-Click README', targetId: 'projects' },
  { n: 'Helpdesk Ticket System', cat: 'Full Stack · MERN', targetId: 'projects' },
  { n: 'Mocktail Menu', cat: 'Frontend · API Integration', targetId: 'projects' },
  { n: 'Vehicle Management', cat: 'Full Stack · Fleet Portal', targetId: 'projects' },
  { n: 'QuickQR Generator', cat: 'Frontend · Canvas Utility', targetId: 'projects' },
  { n: 'Cloudgram Storage', cat: 'Full Stack · Telegram Cloud', targetId: 'projects' },
  { n: 'Lab Asset Tracker', cat: 'Full Stack · Inventory Flow', targetId: 'projects' },
  { n: 'Resume Builder Pro', cat: 'Web App · Interactive Builder', targetId: 'projects' },
  { n: 'Smart Parking System', cat: 'Full Stack · Real-time IoT', targetId: 'projects' },
  { n: 'Neural Nexus Suite', cat: 'Collaboration · Web Platform', targetId: 'projects' },
  { n: 'LangChain & RAG', cat: 'AI Engineering · Vector Search', targetId: 'skills' },
  { n: 'Node & Express 5', cat: 'Backend · REST API Engine', targetId: 'skills' },
  { n: 'MongoDB Database', cat: 'Database · Schema Architecture', targetId: 'skills' },
  { n: 'C++ Algorithmic Core', cat: 'Competitive Programming · STL', targetId: 'skills' },
  { n: 'LeetCode Problem Solving', cat: 'Data Structures · Practice', targetId: 'profiles' },
  { n: 'Codeforces Arena', cat: 'Algorithms · Contests', targetId: 'profiles' },
  { n: 'Prompt Engineering', cat: 'AI Systems · LLM Pipelines', targetId: 'skills' },
  { n: 'React 19 & Framer', cat: 'Frontend · Dynamic Interfaces', targetId: 'skills' },
  { n: 'Tailwind CSS Engine', cat: 'UI Engineering · Design Systems', targetId: 'skills' },
  { n: 'JWT & Role Auth', cat: 'Security · Access Control', targetId: 'skills' },
  { n: 'Mirai School of Tech', cat: 'B.Tech CSE (AI & ML) · 2029', targetId: 'experience' },
  { n: 'Git & Deployment', cat: 'DevOps · Vercel Pipelines', targetId: 'skills' },
  { n: 'Interactive Canvas 3D', cat: 'Creative Tech · Mathematical UI', targetId: 'about' },
  { n: 'Curious Mind & Builder', cat: 'Philosophy · Intentional Craft', targetId: 'about' },
  { n: 'Arnav Arya Portfolio', cat: 'Full Portfolio Experience', targetId: 'home' },
];

const PORTRAIT_DATA =
  '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AAAAAAAAAADo+92zV9n5/+nrsMv8//z29PP3+fj59fv89/n5+fz49fL09/j5+fn8+/v9///////+/vj0/P///////7EAAAAAAAAAAAAAAADr+tWsWNH3/+nmoNv7//vy8vT2+vj79/v9+fn39/r69/Tx9vr8/v3+/fz+///////+/Pb2///8+fz///0AAAAAAAAAAAAAAADw98+lW9P3/+rglOL5//zv7O/z9/b8+Pr++vz6+Pn89/Xv8fb6/Pv8+/3//////v/9+vb3//359vr////AAAAAAAAAAAAAAAD0986cYtL1//LUjuf7//nu6+3x8vf5+/v8/Pz7+fv99vXz7vL4+/v7+/z9/v///f79+fb9//n29Pn///z3AAAAAAAAAAAAAAD39c+Xa9fy/vXKi+r6/fbs5unw8vP4+Pz8/Pz7/P7+9fHz7PL3+vv6+/v9///9+/z8+Pb//vfz7/f///n//wAAAAAAAAAAANL1+NONc9jy+Pm2mOn6+/Lq5unv7/T29/v6/Pz6+v3++O3v7fH3+vr5+/v9///9+/z++vf//Pbw7fj///n7/wAAAAAAAAAAAM/199eJfNzz7/WQoez5+PHo5ejt7/X09/n5+/38+fz89+vu8fD2+vn6+fv8/v79/P3++vz/+fHp6vj///X4/AAAAAAAAAAAAMjz992Efdv27eqdpez59/Dm5Ofv7/Xz9ff3+/389f399+3q8fH0+Pr6+vv9/v38/f39+/3/9PDl6fn///H49voAAAAAAAAAAL/y9+CAfNj48eKZvev59+/j4Oju8PP09vj4+/v89f3/+ezr8PP09vn5+vr+/fv8/P37+//+8uzh6fr//u/47/gAAAAAAAAAALHp9uF+eNH49eGEzOz3+O3f3+fs7/H09ff2+fv9+Pv/+u3o7fL09fr69vn9/Pv8/v77/f398OTc6vv/++746PAAAAAAAAAAxqnk9+aAdcv399xw0+/39+7g3Oft8PHz8vb3+fr9+fz++u/q6u/z9Pj4+Pr8/Pz8+vz9/vz87N7c6fz+9u356ev/AAAAAAAAuaHb+OmKacD199Bq1e/z9Ozk3ufs7/Hz9PP2+fr6+v/++PHr6e3y9Pb4+Pj6/P379/n7/vz36dTb7P757+z85+f7AAAAAAAAuJnW+eyZXazy97Zy2+rx7+fe2uPr7vHz9PX19vf6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+e/n4+bf4+fn6uPr6+Pu8vHx9/WgnazTcMTSkku74+7z+wAAw8jGsaWyyNTZztfl6fP4/WUsn7e5xsXFy8/Y4uzx8vv////9+PDq5ePg5eXh5eDk6+Xs9vHx9PegnbTDlM+7W3TP5O70/AAAwdHOtayxzNje0Nvq6/L4/oAjnbi3wsPEx8zY4evv8vf8///++fPu7OXh4ejj4t/j6eTs+fXy9fejn768uceOTKTV5fD2+/8AvtfYt621x9jf1Nvn6vD3+6UYn7W4vsS/w8rZ5Ojr8/b7/v/9++/v7+Tg3uLj4N3j4ODm9/j19veon8S70LVnbL7Y5fH5/P8AwNrjwKixwtbi19/o6e/1+cwTnbS4wcTBvsfW4Ojs8PX8/v/+/vPt7Ojk4uPm4tzf4d3h8vf49vewocnFx55ancnV4PD4/f8AwN7p0rCtxdff3OHq7vD1++oanrO6vsHLvsfY4Obr7vP4/P/+/vPt7Ozo5uPf4dzd4dzf6vb59viups7DvXdxtszR3O31+/4Av+Lq3LywvtXc1Nzl6u7y+vlBm7e8u7/MwsbS3+Lp7fP3/P//+/Xy7Ovr6ubh4Nzc2tve5fT5+fmwrMu0r2CKw9DS3fD5+/0AvuHu4cm1vs/c1NTd4urr9vZhmLm5vMDNyMvP3d/o7fL2+v3///bx6ubp7enk4djd3dnc4e329/m4sqywjmClzcbI3/D6/f4AvOLu5M+7xdXg1tff4+vt9vJzkru+uMTMy8rR2eDn7PH2+fz+//jy7Obo6uTi39jd3OHc3Ofz9vjBsYGwbW+83MG33vH8/v//u+Dx6Na/w9nq197m6/D0+PR/irjBt8LLzczQ197l7fD3+fr+//z07Obo6ufg39jZ2d/j2uDv9fvDk4GeZpDK2r6h1/H7/v7/v+Hx7N/GutLp1tPh5+/0+vqbfrS/vMHJz8/O1d3j6vD2+fr8//337ubo6unh3tfW2Nvf4d7p8vnVgJmHdqrT3LGoz/T8/v7/wOLx7eDPuc3k2s/e4ujx9vjDcbK+vcHHztXS0dnk6O70+vv9//v37+rp6+ng39fV19jb3+Hl7vfhcJSCj7fV1aWv0/L5+/3/vd/z7eHTvsvf3tbe5Oft8/bYb7K2uMDIz9bTz9jk6O71+fz+//v28Ovq6ebl4NjY19nZ3eDi7PXeUZCOnrzWxpO42PP4+fr8vdnz8uPQy8ze4tjf5uju9PjfarCtsr7JztfVz9bf5uzy+Pv8/vz38e3u6+jm4drX1tjb3uLi6PDbb5WZpcDQrYq83vL39fj5utPw9+rQx8zk4+Po6+rw9Pnma62oqrfFztnU0dPX3+bv9vr8/f348u/t6+fm4NzX1Njc3ePi5ervk5ehqsTCmonB4fL28vf4ANPr+e7Uxb/Y4+bv7+/z9/vfbK2knq3Bztrc09HP1+Dq9Pn8+/z49/Lx6+jm4d3X09Xc4OLj5OrwhnGcr821ipnQ5PD19fn4ANLu+fPgy7nK19Xn6/Dz+PnWbrGimay+ytjc1dLQy93o9Pr9/Pz49vTx7Ofn4dzY0tTa4OPk5urwnEuatMWmd7DX5+/09/n4AM7w+vjs38PKzsvc4unx9/jlfa2nk6W7ydXb29TUw9fk8fj7/Pv5+fby7unn5d7Y0dHZ4OPj5+vutkqcubiGgL/e6/D09/jtAMHs+vry6tXNz8ba3+To8PPykK+hjaG2y9fb2tTYwsrb7vf7+/z6+vj18Ovn5eDa09LZ3uLl5+vsykqktqxsjM/j7vDz9/fmAMDd9/338OTX1Mfb4+bq7/HxoKyhgJu0ytPa3NTYw8bI6PX6+fv6+/z39O7q5d/a1tPX3+Hn6ezu3z6hsJJkntnq7+7z9fTlAADG7Pf99+3i18na5ert7+/wqq+ce5euydLU19PQubms2/L5+Pv59/r5+PLs5+HY09LY3Nzj5evu6TuLrnJmvN7t8O7z9PPsAADB0ev3/fbp3MrW5evr7vHvrK+Ydpety9bSy8bKu7Oexe73+fr59vb4+vbv6ePY0tHW2Nre4ujt6VKEkGSIz+Lv8vDw8vTtAADHutbs9/305s3R3+vu8/Tvr62Md5OmxdjWzcTJv7KUs+T0+Pn3+PP09/r17ebd1NLY2tne4ejt6G56cWOt1uXu8O/t8/X6AAC7u7fS6vT99NnP3Oft8/Xyr6F7dZGjxNzh2MnBuLCQqdbz9/j39/by+Pv58unh2dbc4OPh4Obr6H9cZ3XH3eft7u3s8fT6AAC7qrGzzePu9OfS0N7l7vHvrZBob42fxN3k3s2+s6aJodDr9/f29fTz9fr79u3k4Nvf5uTk4+Xo54VOY5zT3+nu8e3p8fT7AAC+oKansr7V4+zq29ff5e/up3pbZ4WdwN7o59nArJqBncvl8vT28vLx9Pf7+fDn4Nvg5uLc3ODj45EvZcDZ4+vw8urp7/H7AAC+npOVmJ+ous3i7vLz8fLx38NhXXiVu9fk6uPPqY6BmMbf7vX28e/v8fX4+vPo4Nrd5+bc1tre3Iwaic3e5+zt6uTk6vD5AAC0nop+g4aNlKLC3uXp7fDx8e6KTGWNu9Pe5+fQrIaBlb3a6vT28u7p7PL2+vfr4dnb5OLX09na0Wggr9Tf5OXf5OTi5+38AACvnZaTlZidpq+52OXc4uXr8vKYPViPwdTd4+DHp3yBl7nX5fH18u7q6vD0+Pjv5Nnb5eLXzNPTukZZx9nf39vd6ejm5+wAAAAAq6Spq7K8xMXO2OLZ3OXs8/WxNVWUxNTa3tW6nXmBmbfR4O/z8u3p6ezx9Pbx6NvY5Ojf1dPQjU2d0Nze3eXr7Oro6OwAAAAAtri+v8DEy83V1dnb2ubs8PPQPFekx9Pa1cWvk3aClrrN4Ozz8e7n5urv8fT17N/c5e3p2dTCb6zD19ve5uvt6+np6vAAAAAAv8XCur/GycrQ0djf2N7j6vHebliuzdLVx7SpiHiHl7vN3Ofx8e/o5uft8PP18Obg4uzs4tiriNbK2N3k6Ofr6+bl6e4AAAAAvczAs7q+xsnT2dzd3trf5u/kp2u51dLKuaaggnuInrzL2eTu8vDr5+Xp7/D08u3m4Obr5deL1LvN3ubp6ebq6ODh7LcAAAAAAMzKu77Cxs/Y3N/i5OPf6O3oxZHJ1Ma9sKiegISLmbvL1uHr8fDw6ujm7e/08+7p5OPo5suV5L3T3d7e4uPq49vg6wAAAAAAAMXY08/U19rb3uHh4unm6OjkyrbJvcHHt62geYyGmrvJ09vm7vDv7Ojk6+7x9PHs6ufl473mxcja3tTU3OLn3dXi8wAAAAAAAADV3+Dj4uPg3d/e4uvg3uTewMHAztDWva2ffpOAm73LztTg6ezq7ejk6u3v8vPu7ezn4dL/r83g4NnU1t7j1tXl+QAAAAAAAADC2N/k5OLc29vf5OjY1djlsMbGzc3Pw6+chJZ3msHKys7Z4+fm7enj6uzs8PHv7e3m3f/prcjY29jd3d3az9zs8gAAAAAAAAAAucjY3drX3N7Y097Y0d3pysa8wsjFwLSejZd/pcTGyMrS2uHg5+jm5+rr6+rr7eng+//GtMjN0NPd4NnO1+Pt7wAA';

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function sm(x) {
  const c = clamp(x, 0, 1);
  return c * c * (3 - 2 * c);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function PortraitFlyThrough({ reduceMotion = false, onSelectProject }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cardsRef = useRef([]);
  const preloadedImagesRef = useRef([]);
  const sigRef = useRef(null);
  const topRef = useRef(null);
  const bioRef = useRef(null);
  const titleRef = useRef(null);
  const goBtnRef = useRef(null);
  const skipBtnRef = useRef(null);
  const cntRef = useRef(null);
  const rtRef = useRef(null);
  const chipRef = useRef(null);
  const numRef = useRef(null);
  const ttlRef = useRef(null);
  const catRef = useRef(null);
  const worksRef = useRef(null);

  // Keep state in refs for 60fps render loop
  const stateRef = useRef({
    target: 0,
    pos: 0,
    dragY: null,
    mx: -9999,
    my: -9999,
    curIdx: -1,
    hitCard: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const raw = atob(PORTRAIT_DATA);
    const cells = [];
    for (let j = 0; j < CH; j++) {
      for (let i = 0; i < CW; i++) {
        const v = raw.charCodeAt(j * CW + i);
        if (v) cells.push({ i, j, v: v / 255 });
      }
    }

    // Preload image elements for all projects
    const images = allProjectsWithScores.map((proj) => {
      const img = new Image();
      if (proj.preview && proj.preview.image) {
        img.src = proj.preview.image;
      }
      return img;
    });
    preloadedImagesRef.current = images;

    const cards = [];
    for (let n = 0; n < NC; n++) {
      const proj = allProjectsWithScores[n] || {
        title: `Project ${n + 1}`,
        tagline: 'Full Stack Engineering',
        technologies: ['React', 'Node.js', 'MongoDB'],
      };
      cards.push({
        n: proj.title,
        cat: proj.tagline || (proj.technologies || []).slice(0, 3).join(' · '),
        project: proj,
        img: images[n],
        targetId: 'projects',
        z: 700 + n * GAP,
        x: (Math.random() - 0.5) * 360,
        y: (Math.random() - 0.5) * 160,
        w: 640,
        h: 360,
        hue: PALETTE[n % PALETTE.length],
      });
    }
    cardsRef.current = cards;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let CX = W / 2;
    let CY = H / 2;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const particles = [];
    const stars = [];

    cells.forEach((c) => {
      const h = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const r = Math.random();
      const vv = c.v;
      particles.push({
        hx: 0,
        hy: 0,
        px: Math.random() * W,
        py: Math.random() * H,
        vx: 0,
        vy: 0,
        v: vv,
        c,
        r,
        d: Math.random() * 0.9,
        sx: (Math.random() - 0.5) * 2400,
        sy: (Math.random() - 0.5) * 1500,
        sz: Math.random() * ZT,
        big: 7 + Math.pow(Math.random(), 3) * 44,
        hc: `hsl(${h},${vv > 0.75 ? 20 + r * 30 : 55 + r * 35}%,${18 + vv * 70}%)`,
        sc: `hsl(${h},${25 + Math.random() * 60}%,${45 + Math.random() * 50}%)`,
        cs: 1,
      });
    });

    for (let k = 0; k < 260; k++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.25,
        s: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.5 + 0.1,
      });
    }

    // Stream particles: particles from all over the window continuously flowing into the portrait
    const STREAM_COUNT = 450;
    const streamParticles = [];
    for (let k = 0; k < STREAM_COUNT; k++) {
      const h = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const r = Math.random();
      streamParticles.push({
        targetRelX: (Math.random() - 0.5) * 0.9,
        targetRelY: (Math.random() - 0.5) * 0.9,
        ang: Math.random() * Math.PI * 2,
        distFactor: 0.55 + Math.pow(Math.random(), 0.7) * 1.85,
        speed: 0.045 + Math.random() * 0.08,
        phase: Math.random(),
        swirlSeed: Math.random() * 40,
        swirlFreq: 0.7 + Math.random() * 0.7,
        size: 1.2 + Math.pow(Math.random(), 2.4) * 3.4,
        color: `hsl(${h},${55 + r * 35}%,${50 + r * 40}%)`,
        glow: Math.random() > 0.65,
      });
    }

    function flow(x, y, t) {
      return [
        Math.sin(y * 0.035 + t * 0.35) + 0.6 * Math.sin((x + y) * 0.025 - t * 0.27),
        Math.cos(x * 0.035 - t * 0.31) + 0.6 * Math.cos((x - y) * 0.025 + t * 0.23),
      ];
    }

    let curOx = 0;
    let curOy = 0;
    let curPw = 0;
    let curPh = 0;

    function layout() {
      W = window.innerWidth;
      H = window.innerHeight;
      CX = W / 2;
      CY = H / 2;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const ph = H * 0.84;
      const cs = ph / CH;
      const pw = cs * CW;
      const ox = W * (W < 768 ? 0.5 : 0.54) - pw / 2;
      const oy = H * 0.1;

      curOx = ox;
      curOy = oy;
      curPw = pw;
      curPh = ph;

      particles.forEach((p) => {
        p.hx = ox + p.c.i * cs + cs / 2;
        p.hy = oy + p.c.j * cs + cs / 2;
        p.cs = cs;
        if (reduceMotion) {
          p.px = p.hx;
          p.py = p.hy;
        }
      });
    }

    layout();
    window.addEventListener('resize', layout);

    // Initial signature draw animation
    let drawn = true;
    const sigTimer = setTimeout(() => {
      if (sigRef.current) sigRef.current.classList.add('draw');
    }, 450);

    const t0 = performance.now();
    let last = t0;
    let animId;

    function frame(t) {
      const el = (t - t0) / 1000;
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      const s = stateRef.current;
      s.pos += (s.target - s.pos) * (reduceMotion ? 1 : Math.min(1, dt * 6));

      const m = sm(s.pos / HERO);
      const cz = Math.max(0, s.pos - HERO * 0.35);

      const fo = clamp(1 - m * 2.5, 0, 1);
      const ui = clamp((m - 0.4) * 2.5, 0, 1);

      if (bioRef.current) bioRef.current.style.opacity = fo;
      if (goBtnRef.current) {
        goBtnRef.current.style.opacity = fo;
        goBtnRef.current.style.pointerEvents = fo < 0.25 ? 'none' : 'auto';
      }
      if (skipBtnRef.current) {
        skipBtnRef.current.style.opacity = fo;
        skipBtnRef.current.style.pointerEvents = fo < 0.25 ? 'none' : 'auto';
      }
      if (sigRef.current) sigRef.current.style.opacity = fo;
      if (titleRef.current) {
        titleRef.current.style.opacity = fo;
        titleRef.current.style.transform = `scale(${(1 + m * 1.2).toFixed(3)})`;
      }

      if (cntRef.current) cntRef.current.style.opacity = ui;
      if (rtRef.current) {
        rtRef.current.style.opacity = ui;
        rtRef.current.style.pointerEvents = ui < 0.25 ? 'none' : 'auto';
      }

      if (m > 0.5 && drawn) {
        sigRef.current?.classList.remove('draw');
        drawn = false;
      }
      if (m < 0.05 && !drawn) {
        sigRef.current?.classList.add('draw');
        drawn = true;
      }

      ctx.clearRect(0, 0, W, H);

      // Ambient background stars
      for (let q = 0; q < stars.length; q++) {
        const st = stars[q];
        st.x += st.vx;
        st.y += st.vy;
        if (st.y < -5) { st.y = H + 5; st.x = Math.random() * W; }
        if (st.x < -5) st.x = W + 5;
        if (st.x > W + 5) st.x = -5;
        ctx.fillStyle = `rgba(255,255,255,${(st.a * (0.6 + 0.4 * Math.sin(el * 1.5 + q))).toFixed(2)})`;
        ctx.fillRect(st.x, st.y, st.s, st.s);
      }

      // Cosmic streaming particles flowing in from all over the window into the picture
      if (fo > 0.01 && !reduceMotion) {
        const pcx = curOx + curPw / 2;
        const pcy = curOy + curPh * 0.48;
        const maxRadius = Math.max(W, H) * 0.88;

        for (let k = 0; k < streamParticles.length; k++) {
          const sp = streamParticles[k];
          const u = (el * sp.speed + sp.phase) % 1;
          const out = Math.pow(1 - u, 1.55);

          const targetX = pcx + sp.targetRelX * curPw;
          const targetY = pcy + sp.targetRelY * curPh;

          const dist0 = maxRadius * sp.distFactor;
          const dirX = Math.cos(sp.ang);
          const dirY = Math.sin(sp.ang);

          const sw = flow(targetX * 0.02, targetY * 0.02, el * sp.swirlFreq + sp.swirlSeed);
          const swirlAmp = out * dist0 * 0.28;

          let px = targetX + dirX * (out * dist0) + sw[0] * swirlAmp;
          let py = targetY + dirY * (out * dist0) + sw[1] * swirlAmp;

          // Mouse deflection
          if (m < 0.25) {
            const dx = px - s.mx;
            const dy = py - s.my;
            const d2 = dx * dx + dy * dy;
            const mouseR = Math.max(90, W * 0.08);
            if (d2 < mouseR * mouseR) {
              const f = (1 - d2 / (mouseR * mouseR)) * 36;
              const l = Math.sqrt(d2) + 0.1;
              px += (dx / l) * f;
              py += (dy / l) * f;
            }
          }

          const fadeIn = Math.min(1, u / 0.16);
          const fadeOut = Math.min(1, (1 - u) / 0.14);
          const alpha = fadeIn * fadeOut * fo * 0.95;

          if (alpha <= 0.02) continue;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = sp.color;
          const radius = sp.size * (0.8 + 0.3 * Math.sin(el * 2.5 + sp.swirlSeed));

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();

          if (sp.glow && alpha > 0.45) {
            ctx.globalAlpha = alpha * 0.3;
            ctx.beginPath();
            ctx.arc(px, py, radius * 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      // Portrait particles
      const R = Math.max(70, W * 0.06);
      const R2 = R * R;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (el > p.d * 0.8) {
          let ax = (p.hx - p.px) * 0.045;
          let ay = (p.hy - p.py) * 0.045;
          if (m < 0.15) {
            const dx = p.px - s.mx;
            const dy = p.py - s.my;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              const f = (1 - d2 / R2) * 3.2;
              const l = Math.sqrt(d2) + 0.01;
              ax += (dx / l) * f;
              ay += (dy / l) * f;
            }
          }
          p.vx = (p.vx + ax) * 0.82;
          p.vy = (p.vy + ay) * 0.82;
          p.px += p.vx;
          p.py += p.vy;
        }

        const mi = sm(m * 1.5 - p.r * 0.5);
        const z = p.sz * mi;
        const d = F + z - cz;
        if (d < 90 || z - cz > 5200) continue;

        const scale = F / d;
        const X = CX + lerp(p.px - CX, p.sx, mi) * scale;
        const Y = CY + lerp(p.py - CY, p.sy, mi) * scale;
        const sz = lerp(p.cs * (0.35 + 0.6 * p.v), p.big, mi) * scale;
        if (X < -sz || X > W + sz || Y < -sz || Y > H + sz) continue;

        const a = lerp(1, clamp((d - 90) / 250, 0, 1) * clamp((5200 - (z - cz)) / 1800, 0, 1), mi);
        ctx.globalAlpha = a;
        ctx.fillStyle = mi < 0.5 ? p.hc : p.sc;
        ctx.fillRect(X - sz / 2, Y - sz / 2, sz, sz * (mi > 0.5 ? 0.7 : 1));
      }
      ctx.globalAlpha = 1;

      // Active card index
      let idx = NC - 1;
      let hit = null;
      for (let n = 0; n < NC; n++) {
        if (cards[n].z + 150 > cz) {
          idx = n;
          break;
        }
      }

      // Render 3D Cards
      if (m > 0.2) {
        for (let n2 = Math.min(NC - 1, idx + 6); n2 >= Math.max(0, idx - 1); n2--) {
          const c = cards[n2];
          const zz = c.z - cz;
          const dd = F + zz;
          if (dd < 90 || zz > 4800) continue;

          const sc = F / dd;
          const w = c.w * sc;
          const h = c.h * sc;
          const x = CX + c.x * sc - w / 2;
          const y = CY + c.y * sc - h / 2;

          const cardAlpha = clamp((dd - 90) / 270, 0, 1) * clamp((4800 - zz) / 1500, 0, 1) * clamp(m * 3, 0, 1);
          if (cardAlpha <= 0.01) continue;

          ctx.save();
          ctx.globalAlpha = cardAlpha;

          // Glowing aura around active card
          if (n2 === idx) {
            ctx.shadowColor = 'rgba(0, 240, 255, 0.75)';
            ctx.shadowBlur = Math.min(50, 36 * sc);
          }

          // Card rounded clipping path
          const cr = Math.max(6, 16 * sc);
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(x, y, w, h, cr);
          else ctx.rect(x, y, w, h);
          ctx.clip();

          // Render preloaded project banner image!
          if (c.img && c.img.complete && c.img.naturalWidth > 0) {
            ctx.drawImage(c.img, x, y, w, h);
            // Subtle glass specular sheen
            const sheen = ctx.createLinearGradient(x, y, x + w, y + h);
            sheen.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
            sheen.addColorStop(0.35, 'rgba(255, 255, 255, 0.0)');
            sheen.addColorStop(0.7, 'rgba(0, 0, 0, 0.0)');
            sheen.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
            ctx.fillStyle = sheen;
            ctx.fillRect(x, y, w, h);
          } else {
            // High-tech fallback gradient
            const grad = ctx.createLinearGradient(x, y, x + w, y + h);
            grad.addColorStop(0, '#091322');
            grad.addColorStop(1, '#050a12');
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, w, h);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `800 ${Math.max(10, Math.round(36 * sc))}px "Inter", sans-serif`;
            ctx.fillText(c.n, x + w / 2, y + h / 2);
          }

          ctx.restore();

          // Neon stroke border around card
          ctx.save();
          ctx.globalAlpha = cardAlpha;
          ctx.lineWidth = Math.max(1.5, (n2 === idx ? 3.5 : 1.6) * sc);
          ctx.strokeStyle = n2 === idx ? 'rgba(0, 240, 255, 0.95)' : 'rgba(255, 255, 255, 0.22)';
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(x, y, w, h, cr);
          else ctx.rect(x, y, w, h);
          ctx.stroke();
          ctx.restore();

          if (n2 === idx) {
            hit = { x, y, w, h, name: c.n, cat: c.cat, project: c.project, targetId: c.targetId };
          }
        }
      }
      ctx.globalAlpha = 1;

      s.hitCard = hit;

      // Update HUD elements
      if (idx !== s.curIdx) {
        s.curIdx = idx;
        if (numRef.current) numRef.current.textContent = `00${idx + 1}`.slice(-3);
        if (ttlRef.current) ttlRef.current.textContent = cards[idx].n;
        if (catRef.current) catRef.current.textContent = cards[idx].cat;
        if (worksRef.current) worksRef.current.textContent = `${idx + 1} of ${NC} works`;
      }

      // Update chip tooltip on card hover
      const chip = chipRef.current;
      if (chip) {
        if (hit && ui > 0.6 && s.mx > hit.x && s.mx < hit.x + hit.w && s.my > hit.y && s.my < hit.y + hit.h) {
          chip.textContent = `${hit.name} · Click to open project details ✦`;
          chip.style.display = 'block';
          chip.style.left = `${s.mx + 14}px`;
          chip.style.top = `${s.my + 14}px`;
          canvas.style.cursor = 'pointer';
        } else {
          chip.style.display = 'none';
          canvas.style.cursor = 'default';
        }
      }

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    // Event listeners
    const container = containerRef.current;

    const handlePointerMove = (e) => {
      const rect = container?.getBoundingClientRect();
      if (!rect) return;
      const s = stateRef.current;
      s.mx = e.clientX - rect.left;
      s.my = e.clientY - rect.top;
      if (s.dragY !== null) {
        s.target = clamp(s.target - (e.clientY - s.dragY) * 3, 0, TOTAL);
        s.dragY = e.clientY;
      }
    };

    const handlePointerDown = (e) => {
      // If clicking interactive buttons or links, let them handle it
      if (e.target.closest('.flythrough-pill, .flythrough-nav a')) return;

      const s = stateRef.current;
      // If clicking directly on the active 3D card
      if (s.hitCard && s.pos > HERO * 0.35) {
        const rect = container?.getBoundingClientRect();
        if (rect) {
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;
          const h = s.hitCard;
          if (clickX >= h.x && clickX <= h.x + h.w && clickY >= h.y && clickY <= h.y + h.h) {
            if (onSelectProject && h.project) {
              onSelectProject(h.project);
              return;
            }
            const dest = document.getElementById(h.targetId || 'projects');
            if (dest) dest.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
      }

      s.dragY = e.clientY;
    };

    const handleClick = (e) => {
      if (e.target.closest('.flythrough-pill, .flythrough-nav a')) return;
      const s = stateRef.current;
      if (s.hitCard && s.pos > HERO * 0.35) {
        const rect = container?.getBoundingClientRect();
        if (rect) {
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;
          const h = s.hitCard;
          if (clickX >= h.x && clickX <= h.x + h.w && clickY >= h.y && clickY <= h.y + h.h) {
            if (onSelectProject && h.project) {
              onSelectProject(h.project);
            }
          }
        }
      }
    };

    const handlePointerUp = () => {
      stateRef.current.dragY = null;
    };

    const handlePointerLeave = () => {
      const s = stateRef.current;
      s.mx = -9999;
      s.my = -9999;
      s.dragY = null;
      if (chipRef.current) chipRef.current.style.display = 'none';
    };

    const handleWheel = (e) => {
      // If at top of the page, intercept wheel for 3D flythrough until completion
      if (window.scrollY === 0) {
        const s = stateRef.current;
        if (e.deltaY > 0 && s.target < TOTAL - 100) {
          e.preventDefault();
          s.target = clamp(s.target + e.deltaY * 2.2, 0, TOTAL);
        } else if (e.deltaY < 0 && s.target > 0) {
          e.preventDefault();
          s.target = clamp(s.target + e.deltaY * 2.2, 0, TOTAL);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (window.scrollY < 200) {
        const s = stateRef.current;
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          s.target = clamp(s.target + (s.target < HERO ? HERO : GAP), 0, TOTAL);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          s.target = clamp(s.target - GAP, 0, TOTAL);
        } else if (e.key === 'Home' || e.key === 'Escape') {
          s.target = 0;
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container?.addEventListener('pointerdown', handlePointerDown);
    container?.addEventListener('click', handleClick);
    container?.addEventListener('pointerleave', handlePointerLeave);
    container?.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(sigTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', layout);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container?.removeEventListener('pointerdown', handlePointerDown);
      container?.removeEventListener('click', handleClick);
      container?.removeEventListener('pointerleave', handlePointerLeave);
      container?.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [reduceMotion]);

  const handleFlyClick = () => {
    stateRef.current.target = HERO * 1.2;
  };

  const handleResetClick = () => {
    stateRef.current.target = 0;
  };

  const handleScrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={containerRef} className="flythrough-hero" aria-label="Arnav Arya 3D fly-through introduction">
      <canvas ref={canvasRef} className="flythrough-canvas" />

      {/* Signature drawing overlay */}
      <svg ref={sigRef} className="flythrough-sig" viewBox="0 0 1000 650" preserveAspectRatio="none">
        <path pathLength="1" d="M273 190 C277 250 275 330 270 380 C268 440 266 520 267 545" style={{ transitionDelay: '0s' }} />
        <path pathLength="1" d="M0 495 C100 440 200 395 273 361 C340 330 400 305 470 285 C560 262 650 225 723 208" style={{ transitionDelay: '0.3s' }} />
        <path pathLength="1" d="M545 218 C520 195 560 170 600 178 C640 186 648 215 652 225 C662 262 676 318 692 336 C714 350 725 322 765 262 C800 212 826 192 850 188 C880 184 905 205 915 200 L955 142" style={{ transitionDelay: '0.7s' }} />
      </svg>

      {/* Top editorial header */}
      <div ref={topRef} className="flythrough-top">
        <div className="flythrough-logo"></div>
        <div>
          <b>Currently:</b>Full Stack Developer & AI Enthusiast
        </div>
        <div>
          <b>Based in:</b>Delhi, India · Open to roles
        </div>
        <div className="flythrough-nav">
          <a href="#about" onClick={handleScrollTo('about')}>About</a>
          <a href="#skills" onClick={handleScrollTo('skills')}>Skills</a>
          <a href="#projects" onClick={handleScrollTo('projects')}>Projects</a>
          <a href="#experience" onClick={handleScrollTo('experience')}>Experience</a>
          <a href="#contact" onClick={handleScrollTo('contact')}>Contact</a>
          <a href="/resume.pdf" download className="flythrough-nav-resume">Resume ↗</a>
        </div>
      </div>

      {/* Hero Bio */}
      <p ref={bioRef} className="flythrough-bio">
        Curious mind. Intentional builder. Crafting digital products with modern code & artificial intelligence. Scroll or drag to fly through projects.
      </p>

      {/* Hero CTA Buttons */}
      <div className="flythrough-actions">
        <button ref={goBtnRef} id="flythrough-go" className="flythrough-pill flythrough-pill-primary" type="button" onClick={handleFlyClick}>
          Explore 3D Work &darr;
        </button>
        <a ref={skipBtnRef} href="#about" className="flythrough-pill flythrough-pill-subtle" onClick={handleScrollTo('about')}>
          Enter Full Portfolio &darr;
        </a>
      </div>

      {/* Active 3D Work HUD (Bottom Left) */}
      <div
        ref={cntRef}
        className="flythrough-cnt"
        onClick={() => {
          const s = stateRef.current;
          if (s.curIdx >= 0 && cardsRef.current[s.curIdx]?.project && onSelectProject) {
            onSelectProject(cardsRef.current[s.curIdx].project);
          }
        }}
        style={{ cursor: 'pointer' }}
        title="Click to view full project description"
      >
        <i ref={numRef} id="flythrough-num">001</i>
        <span>
          <i ref={ttlRef} id="flythrough-ttl">Helpdesk Ticket System</i>
          <small ref={catRef} id="flythrough-cat">Full Stack · MERN</small>
        </span>
      </div>

      {/* Active 3D Work HUD Controls (Bottom Right) */}
      <div ref={rtRef} className="flythrough-rt">
        <span ref={worksRef} id="flythrough-works">1 of 24 works</span>
        <button id="flythrough-home" className="flythrough-pill" type="button" onClick={handleResetClick}>
          &#8634; Back to start
        </button>
        <a href="#projects" className="flythrough-pill" onClick={handleScrollTo('projects')}>
          View in Portfolio &darr;
        </a>
      </div>

      {/* Hover tooltip chip */}
      <div ref={chipRef} id="flythrough-chip" className="flythrough-chip" />

      {/* Large Instrument Serif Title */}
      <h1 ref={titleRef} className="flythrough-title">
        Arnav Arya
      </h1>
    </section>
  );
}

