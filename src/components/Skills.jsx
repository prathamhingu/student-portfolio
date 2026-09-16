function Skills({ skillList }) {
  return (
    <section className="card-section">
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2>Tools and technologies I’m growing with</h2>
      </div>

      <div className="skill-list">
        {skillList.map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;