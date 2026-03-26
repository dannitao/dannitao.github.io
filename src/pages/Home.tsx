import { FC } from "react";
import "./Home.css";

const HomePage: FC = () => {
  return (
    <div className="home-page">
      {/* Main Hero Section - Full Viewport */}
      <section className="hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            <p className="hero-eyebrow">Full-Stack Developer</p>
            <h1 className="hero-title">
              Crafting <span className="gradient-text">digital experiences</span> that matter
            </h1>
            <p className="hero-subtitle">
              I build performant, accessible web applications with clean code and thoughtful design.
            </p>
          </div>

          {/* Skills inline */}
          <div className="hero-section">
            <h3 className="subheading">Technologies</h3>
            <div className="inline-skills">
              <div className="skill-item">
                <span className="skill-label">Frontend</span>
                <span className="skill-value">React, TypeScript</span>
              </div>
              <div className="skill-item">
                <span className="skill-label">Tools</span>
                <span className="skill-value">Vite, Git, GitHub Actions</span>
              </div>
              <div className="skill-item">
                <span className="skill-label">Design</span>
                <span className="skill-value">UI/UX, CSS, Performance</span>
              </div>
            </div>
          </div>

          {/* Featured Projects inline */}
          <div className="hero-section">
            <h3 className="subheading">Featured Work</h3>
            <div className="quick-projects">
              <a href="/watched" className="project-link">
                <span className="project-name">Watched Archive</span>
                <span className="project-arrow">→</span>
              </a>
              <a href="/coffee" className="project-link">
                <span className="project-name">Coffee Wheel</span>
                <span className="project-arrow">→</span>
              </a>
              <a href="/tracker" className="project-link">
                <span className="project-name">Content Tracker</span>
                <span className="project-arrow">→</span>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="hero-cta">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="cta-primary">
              View on GitHub
            </a>
            <a href="mailto:contact@example.com" className="cta-secondary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
