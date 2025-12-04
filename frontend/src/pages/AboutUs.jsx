import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  /* ------------------ ILLUSTRATOR SVG ICONS ------------------ */

  const SVG = {
    developer: (
      <svg width="70" height="70" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" fill="#e8f9f0" stroke="#27ae60" strokeWidth="3" />
        <circle cx="32" cy="24" r="10" fill="#27ae60" />
        <rect x="18" y="36" width="28" height="16" rx="6" fill="#27ae60" />
      </svg>
    ),
    designer: (
      <svg width="70" height="70" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" fill="#eaf0ff" stroke="#667eea" strokeWidth="3" />
        <path d="M20 42 L44 22" stroke="#667eea" strokeWidth="4" />
        <circle cx="20" cy="42" r="6" fill="#667eea" />
        <circle cx="44" cy="22" r="6" fill="#667eea" />
      </svg>
    ),
    backend: (
      <svg width="70" height="70" viewBox="0 0 64 64">
        <rect x="8" y="12" width="48" height="40" rx="6" fill="#e8f9f0" stroke="#27ae60" strokeWidth="3" />
        <rect x="16" y="20" width="32" height="10" fill="#27ae60" />
        <rect x="16" y="34" width="20" height="6" fill="#27ae60" />
      </svg>
    ),

    sustainability: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <path d="M32 50 C10 40 14 16 32 12 C50 16 54 40 32 50Z" fill="#27ae60" />
        <rect x="28" y="50" width="8" height="12" fill="#145a32" />
      </svg>
    ),

    community: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <circle cx="20" cy="24" r="10" fill="#27ae60" />
        <circle cx="44" cy="24" r="10" fill="#27ae60" />
        <rect x="14" y="34" width="36" height="16" rx="8" fill="#145a32" />
      </svg>
    ),

    innovation: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <circle cx="32" cy="24" r="12" fill="#27ae60" />
        <rect x="26" y="36" width="12" height="14" fill="#145a32" />
      </svg>
    ),

    access: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <rect x="14" y="24" width="36" height="26" rx="4" fill="#27ae60" />
        <circle cx="26" cy="37" r="5" fill="white" />
      </svg>
    ),

    transparency: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <rect x="10" y="18" width="44" height="28" stroke="#27ae60" strokeWidth="3" fill="none" />
        <rect x="18" y="28" width="10" height="12" fill="#27ae60" />
        <rect x="32" y="32" width="10" height="8" fill="#27ae60" />
      </svg>
    ),

    global: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="26" stroke="#27ae60" strokeWidth="3" fill="#e8f9f0" />
        <path d="M20 32 H44 M32 20 V44" stroke="#27ae60" strokeWidth="3" />
      </svg>
    ),

    recycling: (
      <svg width="70" height="70" viewBox="0 0 64 64">
        <path d="M22 14 L10 32 L22 32 Z" fill="#27ae60" />
        <path d="M42 14 L54 32 L42 32 Z" fill="#27ae60" />
        <path d="M16 40 L32 52 L48 40 L32 28 Z" fill="#145a32" />
      </svg>
    ),

    react: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="6" fill="#27ae60" />
        <ellipse cx="32" cy="32" rx="22" ry="10" stroke="#27ae60" strokeWidth="3" fill="none" />
        <ellipse cx="32" cy="32" rx="22" ry="10" stroke="#27ae60" strokeWidth="3" fill="none" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="22" ry="10" stroke="#27ae60" strokeWidth="3" fill="none" transform="rotate(120 32 32)" />
      </svg>
    ),

    node: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <polygon points="32,6 54,18 54,46 32,58 10,46 10,18" fill="#27ae60" />
      </svg>
    ),

    mongodb: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <path d="M32 6 C46 20 46 40 32 58 C18 40 18 20 32 6Z" fill="#27ae60" />
      </svg>
    ),

    chart: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <rect x="12" y="32" width="8" height="20" fill="#27ae60" />
        <rect x="28" y="24" width="8" height="28" fill="#27ae60" />
        <rect x="44" y="16" width="8" height="36" fill="#27ae60" />
      </svg>
    ),

    express: (
      <svg width="60" height="60" viewBox="0 0 64 64">
        <line x1="10" y1="32" x2="54" y2="32" stroke="#27ae60" strokeWidth="6" />
      </svg>
    ),
  };

  const developers = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "Full Stack Developer",
      image: SVG.developer,
      bio: "Passionate about sustainable technology.",
      skills: ["React", "Node.js", "MongoDB", "UI/UX"],
      github: "https://github.com/alex-morgan",
      linkedin: "https://linkedin.com/in/alex-morgan",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "UI/UX Designer & Frontend Lead",
      image: SVG.designer,
      bio: "Focused on intuitive and beautiful interfaces.",
      skills: ["React", "Figma", "CSS3", "Design Systems"],
      github: "https://github.com/sarah-chen",
      linkedin: "https://linkedin.com/in/sarah-chen",
    },
    {
      id: 3,
      name: "David Okoro",
      role: "Backend Engineer",
      image: SVG.backend,
      bio: "Specializes in scalable server architecture.",
      skills: ["Node.js", "Express", "MongoDB", "AWS"],
      github: "https://github.com/david-okoro",
      linkedin: "https://linkedin.com/in/david-okoro",
    },
  ];

  const values = [
    { icon: SVG.sustainability, title: "Sustainability First", description: "Designed with environmental impact in mind" },
    { icon: SVG.community, title: "Community Driven", description: "Built for the eco-conscious community" },
    { icon: SVG.innovation, title: "Innovation", description: "Technology solving real environmental issues" },
    { icon: SVG.access, title: "Accessibility", description: "Making sustainable living easy" },
    { icon: SVG.transparency, title: "Transparency", description: "Clear impact tracking" },
    { icon: SVG.global, title: "Global Impact", description: "Act locally, think globally" },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <style>{`
        .journey-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media(max-width:768px){
          .journey-grid { grid-template-columns:1fr; }
        }
        .team-grid {
          display:flex;
          justify-content:center;
          flex-wrap:wrap;
          gap:2rem;
        }
        .team-card{
          width:300px;
          text-align:center;
        }
        .skill-tag{
          padding:0.3rem 0.8rem;
          background:#e8f9f0;
          border-radius:20px;
          margin:2px;
          font-size:0.8rem;
        }
      `}</style>

      {/* PAGE TITLE */}
      <section style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "3.5rem", color: "var(--primary-color)" }}>About EcoWaste</h1>
      </section>

      {/* OUR STORY */}
      <section className="card" style={{ marginBottom: "3rem" }}>
        <div className="journey-grid">
          <div style={{ textAlign: "center" }}>{SVG.recycling}</div>
          <div>
            <h2>Our Story</h2>
            <p style={{ color: "var(--text-light)", textAlign: "left" }}>
              We wanted to change that. Not with lectures… but with technology that makes sustainability easy,
              understandable, and rewarding. What started as a passion project between a few environmentally-driven
              developers has now evolved into a platform helping thousands reduce waste, track impact, and build
              eco-friendly habits.
            </p>
            <strong style={{ color: "var(--text-light)", textAlign: "left" }}>
              Our mission is simple: 
            </strong>
            <p style={{ color: "var(--text-light)", textAlign: "left" }}>
              "Turn waste management into something people actually want to participate in."
              Through powerful analytics, gamification, and intuitive UI, EcoWaste empowers users to make small
              choices that create big change.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ textAlign: "center" }}>Our Core Values</h2>
        <div className="team-grid">
          {values.map((v, i) => (
            <div key={i} className="card" style={{ width: "250px", textAlign: "center" }}>
              <div>{v.icon}</div>
              <h3>{v.title}</h3>
              <p style={{ color: "var(--text-light)" }}>{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ textAlign: "center" }}>Meet the Team</h2>
        <div className="team-grid">
          {developers.map((dev) => (
            <div key={dev.id} className="card team-card">
              <div>{dev.image}</div>
              <h3>{dev.name}</h3>
              <p style={{ color: "var(--primary-color)" }}>{dev.role}</p>
              <p style={{ color: "var(--text-light)" }}>{dev.bio}</p>
              <div>
                {dev.skills.map((s, i) => (
                  <span className="skill-tag" key={i}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section style={{ marginBottom: "4rem" }}>
      <h2 style={{ textAlign: "center" }}>Technology We Use</h2>

      <div className="team-grid">

        {/* React */}
        <div className="card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            width="60"
            height="60"
            alt="React"
          />
          <p>React</p>
        </div>

        {/* Node.js */}
        <div className="card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
            width="60"
            height="60"
            alt="Node.js"
          />
          <p>Node.js</p>
        </div>

        {/* MongoDB (WORKING official CDN) */}
        <div className="card">
          <img
            src="https://webimages.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png"
            width="60"
            height="60"
            alt="MongoDB"
            style={{ objectFit: "contain" }}
          />
          <p>MongoDB</p>
        </div>

        {/* Chart.js */}
        <div className="card">
          <img
            src="https://www.chartjs.org/media/logo-title.svg"
            width="60"
            height="60"
            alt="Chart.js"
          />
          <p>Chart.js</p>
        </div>

        {/* Express */}
        <div className="card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
            width="60"
            height="60"
            alt="Express"
            style={{ objectFit: "contain" }}
          />
          <p>Express</p>
        </div>

      </div>
    </section>
    </div>
  );
};

export default AboutUs;
