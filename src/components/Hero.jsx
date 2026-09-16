import { Link } from "react-router-dom";

function Hero({ name, title = "Web Developer" }) {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Hello, I’m</p>
          <h1>{name}</h1>
          <p className="lead">{title} crafting thoughtful web experiences.</p>
          <p>
            I enjoy turning ideas into polished interfaces with React, responsive
            design, and a strong focus on usability.
          </p>

          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              View Projects
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Let’s Connect
            </Link>
          </div>
        </div>

        <div className="hero-card hero-panel">
          <div className="hero-panel-body">
            <p className="eyebrow">Focus areas</p>
            <h3>React • UI Design • Accessibility</h3>
            <p>
              I’m building polished, user-friendly experiences and turning ideas
              into practical web solutions.
            </p>
          </div>
          <div className="hero-stats">
            <div>
              <strong>2+</strong>
              <span>Years learning</span>
            </div>
            <div>
              <strong>6+</strong>
              <span>Projects built</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Curious mindset</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
