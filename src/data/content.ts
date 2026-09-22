/**
 * Single source of truth for the site.
 * Edit this file to change the portfolio — you should never need to open a component.
 */

/**
 * Career start. Nothing computes from this any more — the hero copy states the
 * duration in prose — so if you edit that sentence, check it against this date.
 */
export const START_DATE = new Date('2025-06-01')

export const profile = {
  name: 'Aman Singh',
  handle: 'amanzing01',
  role: 'Full-Stack Engineer',
  location: 'Pune, India',
  available: true,
  availableLabel: 'Open to full-stack / backend roles',
  email: 'amanzing2001@gmail.com',
  phone: '+91 70384 85490',
  links: {
    github: 'https://github.com/Amanzing01',
    linkedin: 'https://linkedin.com/in/amanzing2001',
    resume: '/Aman-Singh-Resume.pdf',
  },
  // Duotone (indigo-cast monochrome). For plain black and white, point this at
  // '/portrait-bw.jpg' instead — scripts/portrait.mjs generates both, plus square
  // crops if a small avatar is ever needed again.
  photoTall: '/portrait.jpg', // 4:5, the about-section portrait
} as const

export const hero = {
  name: 'Aman Singh',
  role: 'Full-stack developer',
  headline: 'Aman Singh',
  // The pill of media trails the sentence. Swap the clip by replacing the file
  // in /public/video — see `media` below.
  statement: 'I build software people log into every day.',
  subhead: 'Full-stack developer working end to end — React and Next.js on the front, Node, NestJS and PostgreSQL behind it.',
  body: "I'm a developer in Pune with a year and a half of production experience. I've shipped three live products, written a few hundred API endpoints, and learned most of what I know by breaking things in staging first.",
  marquee: [
    'TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'PostgreSQL', 'Prisma',
    'Redis', 'Docker', 'Tailwind CSS', 'REST APIs', 'pgvector', 'BullMQ', 'Jest',
    'Express.js', 'MongoDB', 'Git', 'Vertex AI',
  ],
  // The friendly framing for the product list — "live in production" read like a
  // status page, not like a person talking.
  liveTitle: 'Three of these are out there right now',
  liveNote: 'Real teams log into them on a Monday morning.',
  ticker: [
    { id: 'acai', name: 'Acai HIRE', note: 'recruiters use it daily', href: 'https://tryacai.app/products/hire' },
    { id: 'teamcast', name: 'TeamCast', note: '60+ companies hiring on it', href: 'https://teamcast.ai' },
    { id: 'vettly', name: 'Vettly', note: 'HR teams, MENA and India', href: 'https://vettly.ai' },
  ],
} as const

/**
 * Decorative motion. Self-hosted in /public/video rather than hot-linked, so the
 * site does not depend on someone else's CDN staying put.
 * Replace any of these with your own footage by dropping in a file of the same name.
 */
export const media = {
  heroPill: '/video/hero.mp4',
  workPill: '/video/featured.mp4',
  toolkitPill: '/video/toolkit.mp4',
  about: '/video/about.mp4',
} as const

export const proof = [
  { value: '3', label: 'products people use daily' },
  { value: '60+', label: 'companies hiring on them' },
  { value: '48+', label: 'REST endpoints shipped' },
  { value: '30%', label: 'faster API responses' },
] as const

export type CaseStudy = {
  id: string
  index: string
  name: string
  tagline: string
  summary: string
  href?: string
  hrefLabel?: string
  year: string
  stack: string[]
  problem: string
  built: { title: string; detail: string }[]
  impact: { value: string; label: string }[]
  diagram?: 'auth-pipeline' | 'meetbot'
}

export const work: CaseStudy[] = [
  {
    id: 'acai-hire',
    index: '01',
    name: 'Acai HIRE',
    tagline: 'Multi-tenant applicant tracking system',
    summary:
      'An ATS I architected end to end. Seven modules, twenty-eight endpoints, and an auth pipeline that checks six things before your request is allowed near a database.',
    href: 'https://tryacai.app/products/hire',
    hrefLabel: 'tryacai.app',
    year: '2025 — now',
    stack: ['NestJS 11', 'Next.js 16', 'React 19', 'Prisma 7', 'PostgreSQL', 'Redis', 'pgvector', 'Vertex AI', 'Docker'],
    problem:
      'Acai is an enterprise SaaS suite, and hiring was the missing module. It had to sit behind the same reverse-proxy gateway as everything else, trust the same external SSO, and keep every tenant’s candidate data strictly walled off from every other tenant’s — while still being fast enough that a recruiter never notices the walls are there.',
    built: [
      {
        title: 'A six-layer authorization pipeline',
        detail:
          'Every request walks the same path: rate limit, RS256 JWT verified against the external SSO’s JWKS endpoint, tenant resolution, license check, then permission and feature gating. Nothing reaches a controller until all six agree. Seven roles, permission-based rather than role-based, so adding a role never means touching route code.',
      },
      {
        title: 'A recruiter assistant that can actually do things',
        detail:
          'Wired the app into a central MCP gateway for tool-calling and RAG, so recruiters can ask questions in plain language and get real answers off live applicant data — streamed over SSE, with PII masking in front of the model so candidate details never leave the boundary.',
      },
      {
        title: 'Resume and JD parsing that survives real files',
        detail:
          'Text extraction from PDF and DOCX feeding LLM-based structured extraction, then embeddings into pgvector so "find me someone like this person" is a similarity query instead of a keyword search.',
      },
      {
        title: 'Offer letters and a notification hub',
        detail:
          'Automated offer generation via DOCX-to-PDF through Gotenberg, and an event-driven notification system with a 100+ event catalogue routed through one hub — which is how the notification volume came down instead of up.',
      },
    ],
    impact: [
      { value: '7', label: 'modules' },
      { value: '28+', label: 'REST endpoints' },
      { value: '~40%', label: 'fewer notifications' },
      { value: '6', label: 'auth layers' },
    ],
    diagram: 'auth-pipeline',
  },
  {
    id: 'teamcast',
    index: '02',
    name: 'TeamCast',
    tagline: 'AI-powered hiring platform',
    summary:
      'A recruitment platform automating hiring end to end for 60+ client organisations and over 2,000 candidates. I built features across the stack and hardened the parts that touch other people’s data.',
    href: 'https://teamcast.ai',
    hrefLabel: 'teamcast.ai',
    year: '2025',
    stack: ['NestJS', 'Next.js', 'React', 'PostgreSQL', 'OAuth 2.0', 'Jest', 'Swagger', 'Docker', 'CI/CD'],
    problem:
      'Recruiters were losing hours to copy-paste — the same candidate retyped into a job board, an ATS, and a spreadsheet. TeamCast had to pull those systems together without becoming a place where one client could ever see another client’s pipeline.',
    built: [
      {
        title: 'Tenant-isolated API security',
        detail:
          'OAuth 2.0 and JWT with role-based access control, scoped so that tenant isolation is enforced at the data layer rather than hoped for at the UI layer.',
      },
      {
        title: 'Integrations that removed the retyping',
        detail:
          'Connected third-party providers and external ATS / job-board platforms over REST so candidate data flows in once and stays in sync, instead of being manually re-entered at every step.',
      },
      {
        title: 'Services built to be debugged at 2am',
        detail:
          'Modular microservice-style services with structured error handling, request validation, Jest unit tests and OpenAPI/Swagger docs — so when something breaks, the error tells you where.',
      },
      {
        title: 'The frontend too',
        detail:
          'Reusable React components across client- and server-rendered pages, wired to the same APIs, including accessibility fixes that should have been there from the start.',
      },
    ],
    impact: [
      { value: '60+', label: 'client orgs' },
      { value: '2,000+', label: 'candidates' },
      { value: '20+', label: 'endpoints' },
    ],
  },
  {
    id: 'vettly',
    index: '03',
    name: 'Vettly',
    tagline: 'HRMS platform — backend services',
    summary:
      'One of the HRMS platforms in the HumanCloud suite. I built backend services on the same NestJS + Prisma + PostgreSQL foundation, and the AI modules that sit on top of them.',
    href: 'https://vettly.ai',
    hrefLabel: 'vettly.ai',
    year: '2025',
    stack: ['NestJS', 'Node.js', 'Prisma', 'PostgreSQL', 'Vertex AI', 'pgvector', 'BullMQ'],
    problem:
      'Large-scale HR platforms accumulate slow queries the way a garage accumulates boxes. The work here was shipping production endpoints across distributed modules, then making the slow parts stop being slow.',
    built: [
      {
        title: 'AI modules on shared infrastructure',
        detail:
          'Resume parsing, an AI interviewer, and a recommendation engine built on Vertex AI (Gemini Flash plus text-embedding models) with pgvector doing semantic candidate matching underneath.',
      },
      {
        title: 'Multilingual, both directions',
        detail:
          'RTL and LTR support for a MENA-region deployment — locale-aware rendering and genuinely bidirectional layout, which is a lot more than swapping a text-align.',
      },
      {
        title: 'Made the queries stop being slow',
        detail:
          'Profiled the hot paths, added the indexes that were missing and the caching that should have existed, and cut API response time by roughly 30%.',
      },
    ],
    impact: [
      { value: '~30%', label: 'faster API responses' },
      { value: '20+', label: 'production endpoints' },
    ],
  },
  {
    id: 'meetbot',
    index: '04',
    name: 'MeetBot AI',
    tagline: 'A bot that sits in your meetings so you don’t have to remember them',
    summary:
      'A side project that joins your Google Meet calls from the calendar invite, records them, transcribes them locally, and emails you what was decided.',
    year: '2025',
    stack: ['Next.js', 'Node.js', 'Puppeteer', 'FFmpeg', 'Whisper', 'Gemini Flash', 'PostgreSQL', 'BullMQ', 'Redis'],
    problem:
      'I kept leaving meetings without a clear record of what anyone agreed to. The commercial tools all wanted the audio on their servers, which is a hard sell for a call about hiring.',
    built: [
      {
        title: 'A bot that shows up on its own',
        detail:
          'Google Calendar webhooks schedule a session; headless Chromium driven by Puppeteer joins the call at the right moment and captures live audio through FFmpeg.',
      },
      {
        title: 'Transcription that stays on my machine',
        detail:
          'Self-hosted OpenAI Whisper does the speech-to-text, so the raw audio never goes to a third party.',
      },
      {
        title: 'An async pipeline, because joining a call is slow',
        detail:
          'BullMQ over Redis handles scheduling, recording and processing as independent jobs — a failed transcription retries without re-joining the meeting.',
      },
      {
        title: 'Summaries worth reading',
        detail:
          'Gemini Flash turns the transcript into an overview, action items, key decisions and sentiment, delivered by email and to a Next.js dashboard.',
      },
    ],
    impact: [
      { value: '100%', label: 'audio stays self-hosted' },
      { value: '4', label: 'stage async pipeline' },
    ],
    diagram: 'meetbot',
  },
]

export const stackGroups = [
  {
    title: 'What I reach for first',
    items: ['TypeScript', 'NestJS', 'Next.js', 'React', 'PostgreSQL', 'Prisma'],
  },
  {
    title: 'Data & search',
    items: ['PostgreSQL', 'pgvector', 'Redis', 'MongoDB', 'BullMQ'],
  },
  {
    title: 'AI in production',
    items: ['Vertex AI', 'Gemini Flash', 'text-embedding-005', 'RAG', 'MCP', 'Whisper'],
  },
  {
    title: 'How it ships',
    items: ['Docker', 'GitHub Actions', 'Jest', 'Swagger / OpenAPI', 'Postman', 'Git'],
  },
  {
    title: 'Also know',
    items: ['JavaScript', 'C++', 'Java', 'Python', 'SQL', 'Tailwind CSS', 'Express.js'],
  },
  {
    title: 'Concepts I actually apply',
    items: ['Multi-tenant architecture', 'RBAC', 'JWT / OAuth 2.0', 'REST API design', 'Agile / Scrum'],
  },
] as const

export const timeline = [
  {
    id: 'humancloud',
    org: 'HumanCloud Technologies',
    role: 'Full-Stack Developer',
    period: 'Jun 2025 — Present',
    place: 'Pune',
    current: true,
    body:
      'Building the Acai product suite and the in-house AI hiring platform. Architected the HIRE ATS from an empty repo, shipped backend services across TeamCast, Vettly and Pebl, and spend a fair amount of time in code review arguing about error handling.',
  },
  {
    id: 'drdo',
    org: 'DRDO — HEMRL, Defence Electronics Lab',
    role: 'Internship Trainee',
    period: 'Dec 2024 — Apr 2025',
    place: 'Pune',
    current: false,
    body:
      'Built a remote-controlled surveillance rover, end to end: Arduino firmware with IR and UV sensors and PWM motor control, a live camera feed, and a Flutter app that drove it over Bluetooth and WiFi. Five months at a Government of India defence R&D facility, and the first time my code could physically drive into a wall.',
  },
  {
    id: 'infosys',
    org: 'Infosys',
    role: 'Project Intern',
    period: 'Oct 2024 — Dec 2024',
    place: 'Pune',
    current: false,
    body:
      'HealthCheck Pro — a full-stack health monitoring system in React, Node, Express and MongoDB. JWT auth, dashboard analytics, assessment modules. A 25-person Agile team; I owned three modules from requirement to deploy inside an eight-week sprint cycle.',
  },
  {
    id: 'degree',
    org: 'ISBM College of Engineering, Pune (SPPU)',
    role: 'B.E. Computer Engineering',
    period: 'Dec 2021 — May 2025',
    place: 'Pune',
    current: false,
    body: 'CGPA 8.7 / 10. Placement Cell member, NSS student coordinator.',
  },
] as const

export const sideProjects = [
  {
    name: 'Online Web-Dev Compiler',
    year: '2024',
    body:
      'A CodePen-style in-browser compiler for HTML, CSS and JS with live preview, session storage and snippet saving over an Express API.',
    stack: ['React', 'Tailwind', 'Node.js', 'Express'],
  },
  {
    name: 'HealthCheck Pro',
    year: '2024',
    body:
      'Full-stack health monitoring MVP built at Infosys — JWT auth, dashboard analytics, Nodemailer notifications, Redux Toolkit state.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
  },
  {
    name: 'Surveillance Rover',
    year: '2025',
    body:
      'Arduino-based recon rover with sensor telemetry and a live camera feed, driven in real time from a Flutter app. Built at DRDO.',
    stack: ['Arduino', 'Flutter', 'C++', 'Bluetooth / WiFi'],
  },
] as const

export const about = {
  title: 'How I got here',
  paragraphs: [
    'I started out on an Arduino rover at a DRDO defence lab, wiring IR sensors and writing the Flutter app that drove it around. Somewhere between that and now I got very interested in the boring parts — why the query is slow, why the notification fired twice, who is actually allowed to see this row.',
    'That’s mostly what I do now. React and Next.js on the surface, Node, NestJS and Postgres underneath. I like owning a feature the whole way — schema, API, UI, and the deploy — because that is when you actually understand how it behaves.',
    'These days a lot of my work has AI somewhere in the pipeline, but the job is still the same one it has always been: model the data properly, keep the API honest, and make the interface get out of the way.',
    'Currently in Pune and open to new work. If your team is building something that has to hold up under real users, that is the kind of problem I want.',
  ],
} as const

export const contact = {
  title: 'Let’s build something',
  body:
    'I’m open to full-stack and backend roles, and I’m happy to talk through a project before either of us commits to anything. Email is the fastest way to reach me — I reply to everything.',
} as const
