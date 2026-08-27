'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
];

const heroStack = ['Python', 'Django', 'React', 'Next.js', 'PostgreSQL'];
const filters = ['All', 'Full-stack', 'Backend'] as const;
type ProjectFilter = (typeof filters)[number];

type Project = {
  title: string;
  label: string;
  description: string;
  image?: string;
  imageAlt?: string;
  repo: string;
  demo?: string;
  technologies: string[];
  categories: Exclude<ProjectFilter, 'All'>[];
  accent: string;
  featured?: boolean;
  contain?: boolean;
  visual?: 'api';
};

const projects: Project[] = [
  {
    title: 'EstateFlow',
    label: 'Real estate platform',
    description:
      'A full-stack property and transaction workspace pairing a Django REST backend with a focused React dashboard.',
    image: '/assets/estate.webp',
    imageAlt: 'EstateFlow real estate platform artwork',
    repo: 'https://github.com/Demo-23home/DRF-React-RealStateManagement',
    technologies: ['Django REST', 'React', 'Celery', 'Redis'],
    categories: ['Full-stack'],
    accent: 'cobalt',
    featured: true,
  },
  {
    title: 'Jobs Portal',
    label: 'Hiring platform',
    description:
      'A DRF and Next.js job platform with role-based flows, applications, résumé uploads, and location-aware search.',
    image: '/assets/jobs_portal.webp',
    imageAlt: 'Jobs Portal project artwork',
    repo: 'https://github.com/Demo-23home/DRF_NEXT_Jobs-portal',
    technologies: ['Next.js', 'DRF', 'PostGIS', 'Docker'],
    categories: ['Full-stack'],
    accent: 'lime',
    featured: true,
  },
  {
    title: 'Recipe API',
    label: 'Test-driven API',
    description:
      'A production-minded recipe service shaped through test-driven development, containerization, and automated delivery.',
    repo: 'https://github.com/Demo-23home/Recipe-API',
    demo: 'https://recipe-api-git-prod-zeyad-salamas-projects.vercel.app/',
    technologies: ['Django REST', 'PostgreSQL', 'Docker', 'CI/CD'],
    categories: ['Backend'],
    accent: 'amber',
    visual: 'api',
  },
  {
    title: 'InstantLink',
    label: 'Real-time social app',
    description:
      'A real-time connection experience using Django Channels and WebSockets, built around fast, secure interactions.',
    image: '/assets/project-1.png',
    imageAlt: 'InstantLink project artwork',
    repo: 'https://github.com/Demo-23home/InstantLink',
    technologies: ['Django Channels', 'WebSockets', 'JWT', 'Redis'],
    categories: ['Full-stack'],
    accent: 'violet',
  },
  {
    title: 'Rahal API',
    label: 'Travel product backend',
    description:
      'An API-first travel project created with the Depresso team, centered on clear domain structure and collaboration.',
    image: '/assets/Rahal.png',
    imageAlt: 'Rahal mobile travel product screens',
    repo: 'https://github.com/Depresso-Team/Ra7al_API.git',
    technologies: ['Python', 'Django', 'REST API', 'PostgreSQL'],
    categories: ['Backend'],
    accent: 'coral',
    contain: true,
  },
  {
    title: 'Fei API',
    label: 'Modular web API',
    description:
      'A Django REST project presented through a polished interface concept, with maintainability at its core.',
    image: '/assets/fei.png',
    imageAlt: 'Fei application interface collage',
    repo: 'https://github.com/Demo-23home/FeiAPI',
    technologies: ['Django', 'DRF', 'Authentication', 'REST'],
    categories: ['Backend'],
    accent: 'rose',
    contain: true,
  },
];

const experience = [
  {
    period: 'Feb — Aug 2025',
    role: 'Freelance Backend Developer',
    company: 'Negm Feed',
    description:
      'Delivered backend features with an emphasis on secure data flows, maintainable services, and dependable releases.',
    tag: 'Freelance',
  },
  {
    period: 'Jul — Sep 2023',
    role: 'Backend Developer Intern',
    company: 'Information Technology Institute',
    description:
      'Deepened practical Django and API engineering skills through product-focused backend work.',
    tag: 'Internship',
  },
  {
    period: 'Aug 2022 — Feb 2023',
    role: 'System Administrator',
    company: 'New Horizons',
    description:
      'Supported systems and operations, building the infrastructure mindset that now shapes my development work.',
    tag: 'Operations',
  },
  {
    period: 'Aug — Oct 2022',
    role: 'Backend Developer Intern',
    company: 'Mansoura University',
    description:
      'Built an early foundation in backend development, databases, and collaborative software delivery.',
    tag: 'Internship',
  },
];

const skillGroups = [
  {
    number: '01',
    title: 'Backend',
    description: 'The systems behind the screen.',
    skills: [
      'Python',
      'Django',
      'Django REST Framework',
      'Django Channels',
      'PostgreSQL',
      'Celery',
      'Redis',
    ],
  },
  {
    number: '02',
    title: 'Frontend',
    description: 'The experience people remember.',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'HTML & CSS',
    ],
  },
  {
    number: '03',
    title: 'Platform',
    description: 'The path from commit to production.',
    skills: ['Docker', 'Git', 'CI/CD', 'Linux', 'Deployment', 'REST APIs'],
  },
];

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'All'
        ? projects
        : projects.filter((project) => project.categories.includes(activeFilter)),
    [activeFilter],
  );

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(progress));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('js-ready');
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeFilter]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('portfolio-theme', nextTheme);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <span className="scroll-progress" aria-hidden="true" />

        <a className="brand" href="#top" aria-label="Zeyad Salama — home" onClick={closeMenu}>
          <span className="brand-mark">ZS</span>
          <span className="brand-name">Zeyad Salama</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
          </button>
          <a className="header-cta" href="mailto:zeyadslama23@gmail.com">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
          <button
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </div>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Mobile navigation"
        >
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
          <a href="mailto:zeyadslama23@gmail.com" onClick={closeMenu}>
            <span>05</span>Contact
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />

          <div className="hero-copy" data-reveal>
            <p className="availability">
              <span aria-hidden="true" /> Open to software engineering opportunities
            </p>
            <h1 id="hero-title">Backend depth.<br />Frontend <em>polish.</em></h1>
            <p className="hero-intro">
              I&apos;m Zeyad, a software engineer who turns complex systems into fast,
              thoughtful web products—from resilient Django APIs to refined React
              and Next.js interfaces.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-secondary"
                href="/assets/Zeyad_Salama_Software_Engineer.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
            <ul className="hero-stack" aria-label="Core technologies">
              {heroStack.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </div>

          <div className="hero-visual" data-reveal aria-label="Portrait of Zeyad Salama">
            <div className="portrait-shell">
              <div className="portrait-grid" aria-hidden="true" />
              <div className="portrait-frame">
                <Image
                  src="/assets/Zeyad.jpg"
                  alt="Zeyad Salama"
                  fill
                  priority
                  sizes="(max-width: 900px) 85vw, 38vw"
                  className="portrait-image"
                />
              </div>
              <div className="floating-card floating-card-code">
                <span className="floating-icon" aria-hidden="true">{'{ }'}</span>
                <div><strong>Full-stack</strong><small>API to interface</small></div>
              </div>
              <div className="floating-card floating-card-projects">
                <strong>06</strong><small>selected builds</small>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Portfolio highlights" data-reveal>
          <p>Built for the whole product</p>
          <div className="proof-item"><strong>04</strong><span>professional roles</span></div>
          <div className="proof-item"><strong>06</strong><span>selected projects</span></div>
          <div className="proof-item"><strong>∞</strong><span>room to keep learning</span></div>
        </section>

        <div className="technology-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-content" key={copy}>
                <span>PYTHON</span><i>✦</i><span>DJANGO</span><i>✦</i>
                <span>REACT</span><i>✦</i><span>NEXT.JS</span><i>✦</i>
                <span>POSTGRESQL</span><i>✦</i><span>TYPESCRIPT</span><i>✦</i>
              </div>
            ))}
          </div>
        </div>

        <section className="about section-shell" id="about">
          <div className="section-heading about-heading" data-reveal>
            <p className="eyebrow"><span>01</span> About</p>
            <h2>I enjoy the invisible work—<em>and</em> the interface people remember.</h2>
          </div>
          <div className="about-grid">
            <div className="about-photo-wrap" data-reveal>
              <div className="about-photo">
                <Image
                  src="/assets/Zeyad1.jpg"
                  alt="Zeyad Salama speaking at an event"
                  fill
                  sizes="(max-width: 820px) 100vw, 42vw"
                  className="about-image"
                />
              </div>
              <p className="photo-note"><span>Think in systems.</span><strong>Ship with intent.</strong></p>
            </div>
            <div className="about-copy" data-reveal>
              <p className="about-lead">
                I&apos;m a backend-focused software engineer with a growing full-stack
                toolkit. My sweet spot is translating complex requirements into
                simple, dependable products.
              </p>
              <p>
                I work across API architecture, authentication, asynchronous jobs,
                databases, deployment, and the React interfaces that bring those
                systems to life. I care about clear code, measured decisions, and
                leaving every product easier to evolve.
              </p>
              <dl className="about-facts">
                <div><dt>Education</dt><dd>B.Sc. Computer & Information Sciences</dd></div>
                <div><dt>Focus</dt><dd>Software Engineering · Mansoura University</dd></div>
                <div><dt>Based in</dt><dd>Egypt · Open to remote collaboration</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="work section-shell" id="work">
          <div className="work-top" data-reveal>
            <div className="section-heading">
              <p className="eyebrow"><span>02</span> Selected work</p>
              <h2>Products with a strong <em>backbone.</em></h2>
            </div>
            <div className="project-filters" role="group" aria-label="Filter projects">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={activeFilter === filter ? 'is-active' : ''}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid" aria-live="polite">
            {filteredProjects.map((project, index) => (
              <article
                className={`project-card ${project.featured ? 'is-featured' : ''} accent-${project.accent}`}
                key={project.title}
                data-reveal
                style={{ '--delay': `${Math.min(index, 4) * 70}ms` } as CSSProperties}
              >
                <div className="project-media">
                  <span className="project-count">0{projects.indexOf(project) + 1}</span>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? ''}
                      fill
                      sizes={project.featured ? '(max-width: 820px) 100vw, 56vw' : '(max-width: 820px) 100vw, 38vw'}
                      className={`project-image ${project.contain ? 'is-contained' : ''}`}
                    />
                  ) : project.visual === 'api' ? (
                    <div className="api-visual" aria-label="Recipe API endpoint preview">
                      <p><span>POST</span> /api/recipes/</p>
                      <p><span>GET</span> /api/recipes/:id</p>
                      <p><span>PATCH</span> /api/recipes/:id</p>
                      <strong>{'{ REST }'}</strong>
                    </div>
                  ) : null}
                </div>
                <div className="project-body">
                  <p className="project-label">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-technologies" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                  <div className="project-links">
                    <a href={project.repo} target="_blank" rel="noreferrer">
                      GitHub <span aria-hidden="true">↗</span>
                    </a>
                    {project.demo ? (
                      <a href={project.demo} target="_blank" rel="noreferrer">
                        Live site <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-shell" id="experience">
          <div className="experience-intro" data-reveal>
            <div className="section-heading">
              <p className="eyebrow"><span>03</span> Experience</p>
              <h2>A path built through <em>practice.</em></h2>
            </div>
            <p>
              From systems support to backend delivery, each role sharpened how I
              think about reliable software and the people who use it.
            </p>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article
                className="timeline-item"
                key={`${item.company}-${item.period}`}
                data-reveal
                style={{ '--delay': `${index * 60}ms` } as CSSProperties}
              >
                <span className="timeline-marker" aria-hidden="true" />
                <time>{item.period}</time>
                <div className="timeline-main">
                  <p>{item.company}</p><h3>{item.role}</h3><span>{item.tag}</span>
                </div>
                <p className="timeline-description">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stack section-shell" id="stack">
          <div className="stack-header" data-reveal>
            <div className="section-heading">
              <p className="eyebrow"><span>04</span> Toolkit</p>
              <h2>Backend is home. Frontend makes it <em>whole.</em></h2>
            </div>
            <div className="orbit-mark" aria-hidden="true"><span>{'<ZS />'}</span></div>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article
                className="skill-card"
                key={group.title}
                data-reveal
                style={{ '--delay': `${index * 90}ms` } as CSSProperties}
              >
                <div className="skill-card-top"><span>{group.number}</span><p>{group.description}</p></div>
                <h3>{group.title}</h3>
                <ul>
                  {group.skills.map((skill) => <li key={skill}><span aria-hidden="true">+</span> {skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="principles" data-reveal>
            <article><span>01</span><h3>Architecture first</h3><p>Shape the data and boundaries before reaching for complexity.</p></article>
            <article><span>02</span><h3>Clarity in the UI</h3><p>Make the important action obvious and every interaction feel considered.</p></article>
            <article><span>03</span><h3>Ship, learn, refine</h3><p>Deliver dependable increments, then improve with real feedback.</p></article>
          </div>
        </section>

        <section className="contact section-shell" id="contact" data-reveal>
          <div className="contact-card">
            <div className="contact-orb" aria-hidden="true">↗</div>
            <p className="eyebrow light"><span>05</span> Let&apos;s connect</p>
            <h2>Have a system to build—or an idea to make <em>real?</em></h2>
            <p className="contact-intro">
              I&apos;m open to software engineering roles, ambitious products, and thoughtful collaborations.
            </p>
            <a className="contact-email" href="mailto:zeyadslama23@gmail.com">
              zeyadslama23@gmail.com <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-links">
              <a href="https://github.com/Demo-23home" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/demo-23home/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="tel:+201017595972">+20 101 759 5972</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">ZS</span><span className="brand-name">Zeyad Salama</span>
        </a>
        <p>Software engineer · Backend depth, frontend polish.</p>
        <p>© {new Date().getFullYear()} Zeyad Salama</p>
      </footer>
    </>
  );
}
