import { FC, useState } from "react";
import "./Home.css";

const HomePage: FC = () => {
  const [titleFont, setTitleFont] = useState("font-space-grotesk");

  const fonts = [
    { key: "font-space-grotesk", label: "Space Grotesk (Modern)" },
    { key: "font-outfit", label: "Outfit (Clean)" },
    { key: "font-poppins", label: "Poppins (Friendly)" },
    { key: "font-playfair", label: "Playfair Display (Elegant)" },
    { key: "font-jetbrains", label: "JetBrains Mono (Tech)" },
  ];

  return (
    <div className="home-page">
      {/* Font Selector - Development */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'var(--bg-secondary)',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        fontSize: '0.85rem'
      }}>
        <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Font:</div>
        {fonts.map(font => (
          <button
            key={font.key}
            onClick={() => setTitleFont(font.key)}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem',
              marginBottom: '0.25rem',
              background: titleFont === font.key ? 'var(--accent-primary)' : 'transparent',
              color: titleFont === font.key ? '#fff' : 'var(--text-primary)',
              border: `1px solid ${titleFont === font.key ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            {font.label}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className={`hero-title ${titleFont}`}>Danni Tao</h1>
            <p className="hero-subtitle">Full-Stack Developer crafting elegant solutions</p>
            <p className="hero-description">
              I build performant, accessible web applications with modern technologies and thoughtful design. Specialized in React, TypeScript, and scalable architectures.
            </p>
          </div>
        </div>

        {/* Gradient Accent Line */}
        <div className="accent-line"></div>

        {/* Featured Projects */}
        <section className="projects-section">
          <h2 className="section-title">Featured Work</h2>
          <div className="projects-grid">
            <a href="/watched" className="project-card">
              <div className="project-inner">
                <h3>Watched Archive</h3>
                <p>Movie & show tracker with Supabase integration. Search, filter, and manage your content library.</p>
                <span className="project-tag">React • TypeScript • Supabase</span>
              </div>
              <div className="project-arrow">→</div>
            </a>

            <a href="/coffee" className="project-card">
              <div className="project-inner">
                <h3>Coffee Wheel</h3>
                <p>Interactive spin wheel for random selections. Fun decision-making tool with smooth animations.</p>
                <span className="project-tag">React • CSS • Interactive</span>
              </div>
              <div className="project-arrow">→</div>
            </a>

            <a href="/content-tracker" className="project-card">
              <div className="project-inner">
                <h3>Content Tracker</h3>
                <p>Organize and track media consumption. Built with modern web technologies and clean UI.</p>
                <span className="project-tag">React • Data • Tracking</span>
              </div>
              <div className="project-arrow">→</div>
            </a>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <span className="skill-category">Frontend</span>
              <p>React, TypeScript, JavaScript, CSS3, Responsive Design</p>
            </div>
            <div className="skill-card">
              <span className="skill-category">Tools</span>
              <p>Vite, Git, GitHub, npm, VS Code, Webpack</p>
            </div>
            <div className="skill-card">
              <span className="skill-category">Backend</span>
              <p>Node.js, Express, REST APIs, PostgreSQL, Supabase</p>
            </div>
            <div className="skill-card">
              <span className="skill-category">Design</span>
              <p>UI/UX, Accessibility, Performance, Dark Mode, Theming</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Let's create something together</h2>
          <div className="cta-buttons">
            <a href="https://github.com/dannitao" target="_blank" rel="noopener noreferrer" className="cta-btn primary">
              View on GitHub
            </a>
            <a href="mailto:contact@example.com" className="cta-btn secondary">
              Get in Touch
            </a>
          </div>
        </section>
      </section>
    </div>
  );
};

export default HomePage;
