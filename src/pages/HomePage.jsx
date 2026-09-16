import { useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";

function HomePage() {
  const [showSkills, setShowSkills] = useState(true);
  const skills = ["HTML", "CSS", "JavaScript", "React", "Vite", "GitHub"];

  return (
    <>
      <Hero name="Pratham Hingu" title="Student & Frontend Developer" />

      <div className="container home-stack">
        <About />

        <div className="section-toggle">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowSkills((previous) => !previous)}
          >
            {showSkills ? "Hide Skills" : "Show Skills"}
          </button>
        </div>

        {showSkills && <Skills skillList={skills} />}
      </div>
    </>
  );
}

export default HomePage;