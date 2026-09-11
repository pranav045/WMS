import React from "react";

const AboutUs = () => {
  /* ------------------ SVG ICONS (for values & story) ------------------ */
  const SVG = {
    sustainability: (
      <svg width="70" height="70" viewBox="0 0 64 64">
        <path d="M32 50 C10 40 14 16 32 12 C50 16 54 40 32 50Z" fill="#27ae60" />
        <rect x="28" y="50" width="8" height="12" fill="#145a32" />
      </svg>
    ),
    community: (
      <svg width="70" height="70" viewBox="0 0 64 64">
        <circle cx="20" cy="24" r="10" fill="#27ae60" />
        <circle cx="44" cy="24" r="10" fill="#27ae60" />
        <rect x="14" y="34" width="36" height="16" rx="8" fill="#145a32" />
      </svg>
    ),
    innovation: (
      <svg width="70" height="70" viewBox="0 0 64 64">
        <circle cx="32" cy="24" r="12" fill="#27ae60" />
        <rect x="26" y="36" width="12" height="14" fill="#145a32" />
      </svg>
    ),
    recycling: (
      <svg width="120" height="120" viewBox="0 0 64 64">
        <path d="M22 14 L10 32 L22 32 Z" fill="#27ae60" />
        <path d="M42 14 L54 32 L42 32 Z" fill="#27ae60" />
        <path d="M16 40 L32 52 L48 40 L32 28 Z" fill="#145a32" />
      </svg>
    ),
  };

  const developers = [
    {
      id: 1,
      name: "Anurag Yadav",
      role: "Full Stack Developer",
      image: (
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQGWtL4PhVweNw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727811759758?e=1766620800&v=beta&t=nJ-R1o1fr8g6C3VaHF9mrrYBBiPfdFdGfJSMXKNoLu4"
          alt="Anurag Yadav"
          style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
        />
      ),
      bio: "Passionate about building sustainable technology solutions that make a difference.",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/anurag-yv",
      linkedin: "https://www.linkedin.com/in/anurag-yv/",
    },
    {
      id: 2,
      name: "Gomit Saha",
      role: "UI/UX Designer",
      image: (
        <img
          src="https://avatars.githubusercontent.com/u/203422227?v=4"
          alt="Gomit Saha"
          style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
        />
      ),
      bio: "Creates intuitive and beautiful interfaces that enhance user experience.",
      skills: ["Figma", "React", "Tailwind", "UI/UX"],
      github: "https://github.com/Gomit-Dev",
      linkedin: "https://www.linkedin.com/in/gomit-saha/",
    },
    {
      id: 3,
      name: "Pranav Giara",
      role: "Frontend Developer",
      image: (
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQH83B80tL76dA/profile-displayphoto-crop_800_800/B56ZqCQBIxI8AM-/0/1763121830771?e=1766620800&v=beta&t=a8FB31ZBVApnN4IS_sDqPDwYgnwovDweNu2649JXieo"
          alt="Pranav Giara"
          style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
        />
      ),
      bio: "Specializes in scalable server architecture and efficient data management.",
      skills: ["React", "Node.js", "MongoDB", "CSS3"],
      github: "https://github.com/pranav045",
      linkedin: "https://www.linkedin.com/in/pranav-gaira/",
    },
  ];

  const values = [
    { icon: SVG.sustainability, title: "Sustainability First", description: "Every feature is designed with minimal environmental impact in mind" },
    { icon: SVG.community, title: "Community Driven", description: "Built by and for the eco-conscious community worldwide" },
    { icon: SVG.innovation, title: "Innovation", description: "Leveraging technology to solve real environmental challenges" },
  ];

  const techStack = [
    { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
    { name: "MongoDB", logo: "https://webimages.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" },
    { name: "Express", logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" },
    { name: "Chart.js", logo: "https://www.chartjs.org/media/logo-title.svg" },
  ];

  return (
    <div className="about-page">
      <style jsx>{`
        /* All your beautiful styles */
        .about-page { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .hero-section { text-align: center; padding: 4rem 1rem; background: linear-gradient(135deg, #f0f9f4 0%, #e6f7ed 100%); border-radius: 20px; margin: 2rem 0 4rem; position: relative; overflow: hidden; }
        .hero-section::before { content: ''; position: absolute; top: -50%; right: -10%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(39,174,96,0.1) 0%, transparent 70%); }
        .hero-title { font-size: 3.5rem; color: #145a32; margin-bottom: 1rem; font-weight: 700; }
        .hero-subtitle { font-size: 1.25rem; color: #666; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6; }
        .section-title { text-align: center; font-size: 2.5rem; color: #145a32; margin-bottom: 3rem; font-weight: 600; }
        .story-section { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; margin-bottom: 6rem; padding: 2rem; }
        @media (max-width: 768px) { .story-section { grid-template-columns: 1fr; } }
        .mission-card { background: white; padding: 3rem; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); position: relative; }
        .mission-card::before { content: ''; position: absolute; top: 0; left: 0; width: 5px; height: 100%; background: linear-gradient(to bottom, #27ae60, #145a32); border-radius: 5px 0 0 5px; }
        .mission-statement { font-size: 1.5rem; color: #145a32; font-style: italic; margin: 2rem 0; padding: 1.5rem; background: #f8fdf9; border-left: 4px solid #27ae60; border-radius: 8px; }
        .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 3rem 0; }
        .value-card { text-align: center; padding: 2rem; background: white; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); transition: all 0.3s; }
        .value-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); background: linear-gradient(135deg, #f0f9f4 0%, #e6f7ed 100%); }
        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 3rem 0; }
        .team-card { background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; padding: 2rem; transition: transform 0.3s; }
        .team-card:hover { transform: translateY(-10px); }
        .team-image { margin-bottom: 1.51rem; }
        .team-name { font-size: 1.5rem; color: #145a32; margin: 0.5rem 0; font-weight: 600; }
        .team-role { color: #27ae60; margin-bottom: 1rem; font-weight: 500; }
        .team-bio { color: #666; line-height: 1.51; margin-bottom: 1.5rem; }
        .skills-container { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1rem; }
        .skill-tag { padding: 0.4rem 1rem; background: #e8f9f0; color: #27ae60; border-radius: 20px; font-size: 0.85rem; }
        .social-links a img { transition: transform 0.3s; }
        .social-links a:hover img { transform: scale(1.2); }
        .tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 2rem; justify-items: center; }
        .tech-card { text-align: center; padding: 1.5rem; background: white; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); transition: all 0.3s; width: 120px; }
        .tech-card:hover { transform: scale(1.1); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .tech-logo { width: 60px; height: 60px; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; }
        .tech-logo img { max-width: 100%; max-height: 100%; object-fit: contain; }
        @media (max-width: 768px) { .hero-title { font-size: 2.5rem; } .section-title { font-size: 2rem; } }
        @media (max-width: 480px) { .hero-title { font-size: 2rem; } .team-grid, .values-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* HERO */}
      <section className="hero-section">
        <h1 className="hero-title">About EcoWaste</h1>
        <p className="hero-subtitle">
          We're transforming waste management through technology, making sustainability 
          accessible, engaging, and rewarding for everyone.
        </p>
      </section>

      {/* STORY */}
      <section className="story-section">
        <div style={{ textAlign: "center" }}>{SVG.recycling}</div>
        <div className="mission-card">
          <h2 style={{ color: "#145a32", marginBottom: "1.5rem", fontSize: "2rem" }}>Our Journey</h2>
          <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "1.5rem" }}>
            Frustrated by the complexity of sustainable living, our team set out to create a solution that makes environmental responsibility simple and rewarding...
          </p>
          <div className="mission-statement">
            "Turn waste management into something people actually want to participate in."
          </div>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            Through intuitive design, powerful analytics, and community engagement, EcoWaste empowers individuals and businesses to make sustainable choices.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section>
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-description">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
{/* MEET THE TEAM — REAL PREMIUM ICONS (NO SVG) */}
{/* TEAM — CLEAN & PERFECT */}
<section>
  <h2 className="section-title">Meet Our Team</h2>
  <div className="team-grid">
    {developers.map((dev) => (
      <div key={dev.id} className="team-card">
        {/* IMAGE + SOCIAL ICONS BELOW IT */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div className="team-image">{dev.image}</div>

          {/* SMALLER ICONS RIGHT BELOW PHOTO */}
         {/* SMALLER BUT SHARPER ICONS RIGHT BELOW PHOTO */}
<div style={{ marginTop: "6px", display: "flex", gap: "12px", justifyContent: "center" }}>
  <a href={dev.github} target="_blank" rel="noopener noreferrer">
    <img
      src="https://img.icons8.com/ios-filled/64/github.png"
      alt="GitHub"
      style={{
        width: "21px",
        height: "21px",
        transition: "all 0.25s ease",
        filter: "drop-shadow(0 0 1px rgba(0,0,0,0.2))",
        marginTop:"-11px"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
    />
  </a>

  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
    <img
      src="https://img.icons8.com/color/64/linkedin.png"
      alt="LinkedIn"
      style={{
        width: "21px",
        height: "21px",
        transition: "all 0.25s ease",
        filter: "drop-shadow(0 0 1px rgba(0,0,0,0.2))",
        marginTop:"-11px"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
    />
  </a>
</div>

        </div>

        <h3 className="team-name">{dev.name}</h3>
        <p className="team-role">{dev.role}</p>
        <p className="team-bio">{dev.bio}</p>

        <div className="skills-container">
          {dev.skills.map((s, i) => (
            <span key={i} className="skill-tag">{s}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
            

      {/* TECH STACK */}
      <section style={{ marginBottom: 20 }}>
        <h2 className="section-title">Technology Stack</h2>
        <div className="tech-grid">
          {techStack.map((tech, i) => (
            <div key={i} className="tech-card">
              <div className="tech-logo">
                <img src={tech.logo} alt={tech.name} />
              </div>
              <p style={{ color: "#145a32", fontWeight: "600" }}>{tech.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;