// Tech-stack data shared by <TechStack /> and scripts/fetch-tech-logos.mjs
export const DEV = (slug, v = 'original') => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${slug}/${slug}-${v}.svg`;
export const SI = (slug, hex = 'ffffff') => `https://cdn.simpleicons.org/${slug}/${hex}`;

/* Every skill from the résumé tech-stack, plus what the portfolio already lists. */
export const GROUPS = [
  {
    title: 'Languages',
    tech: [
      { n: 'C++', s: [DEV('cplusplus')] },
      { n: 'Python', s: [DEV('python')] },
      { n: 'JavaScript', s: [DEV('javascript')] },
      { n: 'Kotlin', s: [DEV('kotlin')] },
    ],
    concepts: ['STL', 'Data structures & algorithms'],
  },
  {
    title: 'Frontend',
    tech: [
      { n: 'HTML5', s: [DEV('html5')] },
      { n: 'CSS3', s: [DEV('css3')] },
      { n: 'React', s: [DEV('react')] },
      { n: 'Tailwind CSS', s: [DEV('tailwindcss')] },
      { n: 'EJS', s: [SI('ejs', 'B4CA65')] },
    ],
    concepts: ['Responsive UI design'],
  },
  {
    title: 'Backend & Database',
    tech: [
      { n: 'Node.js', s: [DEV('nodejs')] },
      { n: 'Express.js', s: [SI('express')] },
      { n: 'MongoDB', s: [DEV('mongodb')] },
    ],
    concepts: ['RESTful routing', 'CRUD operations', 'Schema design', 'Database connectivity', 'JWT auth'],
  },
  {
    title: 'Data & Python',
    tech: [
      { n: 'NumPy', s: [DEV('numpy')] },
      { n: 'Pandas', s: [SI('pandas')] },
      { n: 'Matplotlib', s: [DEV('matplotlib')] },
      { n: 'Seaborn', s: [DEV('seaborn')] },
    ],
    concepts: [],
  },
  {
    title: 'AI',
    tech: [
      { n: 'LangChain', s: [SI('langchain')] },
    ],
    concepts: ['RAG workflows', 'Prompt engineering', 'Vector databases'],
  },
  {
    title: 'Tools',
    tech: [
      { n: 'Git', s: [DEV('git')] },
      { n: 'GitHub', s: [SI('github')] },
      { n: 'VS Code', s: [DEV('vscode')] },
    ],
    concepts: [],
  },
];


export const fileName = (name) => name.toLowerCase().replace(/\+/g, 'p').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
