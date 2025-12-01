import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const developers = [
    {
      id: 1,
      name: 'Alex Morgan',
      role: 'Full Stack Developer',
      image: '👨‍💻',
      bio: 'Passionate about sustainable technology and creating solutions that bridge the gap between tech and environmental conservation.',
      skills: ['React', 'Node.js', 'MongoDB', 'UI/UX'],
      github: 'https://github.com/alex-morgan',
      linkedin: 'https://linkedin.com/in/alex-morgan'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'UI/UX Designer & Frontend Lead',
      image: '👩‍🎨',
      bio: 'Focused on creating intuitive and beautiful interfaces that make sustainable living accessible to everyone.',
      skills: ['React', 'Figma', 'CSS3', 'Design Systems'],
      github: 'https://github.com/sarah-chen',
      linkedin: 'https://linkedin.com/in/sarah-chen'
    },
    {
      id: 3,
      name: 'David Okoro',
      role: 'Backend Engineer',
      image: '👨‍🔧',
      bio: 'Specializes in scalable server architecture and database optimization for environmental applications.',
      skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
      github: 'https://github.com/david-okoro',
      linkedin: 'https://linkedin.com/in/david-okoro'
    },
    {
      id: 4,
      name: 'Maria Rodriguez',
      role: 'Environmental Analyst',
      image: '👩‍🔬',
      bio: 'Ensures all environmental impact calculations and data are scientifically accurate and meaningful.',
      skills: ['Data Analysis', 'Sustainability', 'Research', 'Reporting'],
      github: 'https://github.com/maria-rodriguez',
      linkedin: 'https://linkedin.com/in/maria-rodriguez'
    }
  ];

  const milestones = [
    { year: '2023', title: 'Project Inception', description: 'Conceptualized the idea of digital waste management' },
    { year: '2024 Q1', title: 'First Prototype', description: 'Developed the initial version of EcoWaste' },
    { year: '2024 Q2', title: 'Beta Launch', description: 'Released to first 100 users for testing' },
    { year: '2024 Q3', title: 'Community Growth', description: 'Reached 10,000+ active users' },
    { year: '2024 Q4', title: 'Features Expansion', description: 'Added advanced analytics and community features' },
  ];

  const values = [
    {
      icon: '🌱',
      title: 'Sustainability First',
      description: 'Every feature is designed with environmental impact in mind'
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Built by and for the eco-conscious community'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Leveraging technology for real environmental solutions'
    },
    {
      icon: '🔓',
      title: 'Accessibility',
      description: 'Making sustainable living easy for everyone'
    },
    {
      icon: '📊',
      title: 'Transparency',
      description: 'Clear impact tracking and honest reporting'
    },
    {
      icon: '🌍',
      title: 'Global Impact',
      description: 'Thinking globally while acting locally'
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
          About EcoWaste
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '800px', margin: '0 auto 2rem' }}>
          We're on a mission to revolutionize waste management through technology, education, and community engagement.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="card" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Our Story</h2>
            <p style={{ lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
              EcoWaste was born from a simple observation: while technology has transformed nearly every aspect of our lives, 
              waste management remained largely unchanged. We saw an opportunity to apply modern technology to one of 
              humanity's oldest problems.
            </p>
            <p style={{ lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
              What started as a small project among environmentally-conscious developers has grown into a platform 
              serving thousands of users worldwide. We believe that by making waste management smart, accessible, 
              and engaging, we can create meaningful environmental change.
            </p>
            <Link to="/contact" className="cta-button" style={{ display: 'inline-block' }}>
              Join Our Mission
            </Link>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #2ecc71, #27ae60)', 
            padding: '2rem', 
            borderRadius: '15px',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>♻️</div>
            <h3 style={{ color: 'white' }}>120+ Tons</h3>
            <p>Waste diverted from landfills</p>
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: 'white' }}>50,000+</h3>
              <p>Active Users Worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          <div className="card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3>Our Mission</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
              To empower individuals and communities with intelligent tools and knowledge that make sustainable 
              waste management simple, effective, and rewarding. We aim to reduce global waste through technology 
              that inspires action and fosters environmental responsibility.
            </p>
          </div>
          
          <div className="card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔭</div>
            <h3>Our Vision</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
              A world where waste is viewed not as garbage, but as a resource. We envision communities where 
              zero-waste living is the norm, recycling is effortless, and every individual understands their 
              impact on our planet.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Core Values</h2>
        <div className="card-grid">
          {values.map((value, index) => (
            <div key={index} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{value.icon}</div>
              <h3>{value.title}</h3>
              <p style={{ color: 'var(--text-light)' }}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Meet the Team</h2>
        <div className="card-grid">
          {developers.map(dev => (
            <div key={dev.id} className="card">
              <div style={{ 
                fontSize: '4rem', 
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                {dev.image}
              </div>
              <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{dev.name}</h3>
              <p style={{ 
                textAlign: 'center', 
                color: 'var(--primary-color)', 
                fontWeight: '500',
                marginBottom: '1rem'
              }}>
                {dev.role}
              </p>
              <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                {dev.bio}
              </p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  {dev.skills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: 'var(--light-color)',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        color: 'var(--text-dark)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <a 
                  href={dev.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#333',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>GitHub</span>
                </a>
                <a 
                  href={dev.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#0077b5',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Journey</h2>
        <div className="card" style={{ position: 'relative' }}>
          <div style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '2rem', 
            bottom: '2rem', 
            width: '3px', 
            background: 'var(--primary-color)',
            transform: 'translateX(-50%)',
            zIndex: 1
          }}></div>
          
          {milestones.map((milestone, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: index < milestones.length - 1 ? '3rem' : '0',
                position: 'relative',
                zIndex: 2
              }}
            >
              <div style={{ 
                flex: '0 0 50%', 
                textAlign: index % 2 === 0 ? 'right' : 'left',
                padding: index % 2 === 0 ? '0 3rem 0 0' : '0 0 0 3rem'
              }}>
                <div style={{ 
                  display: 'inline-block',
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '10px',
                  boxShadow: 'var(--shadow)',
                  maxWidth: '400px'
                }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                    {milestone.year}
                  </h3>
                  <h4 style={{ marginBottom: '0.5rem' }}>{milestone.title}</h4>
                  <p style={{ color: 'var(--text-light)', margin: 0 }}>
                    {milestone.description}
                  </p>
                </div>
              </div>
              
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--primary-color)',
                border: '4px solid white',
                boxShadow: '0 0 0 3px var(--primary-color)'
              }}></div>
              
              <div style={{ flex: '0 0 50%' }}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Technology We Use</h2>
        <div className="card">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚛️</div>
              <h4>React</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Frontend Framework</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <h4>Node.js</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Backend Runtime</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗄️</div>
              <h4>MongoDB</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Database</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h4>Chart.js</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Data Visualization</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h4>Express</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Web Framework</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="card" style={{ 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Want to Join Our Mission?</h2>
        <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
          We're always looking for passionate developers, designers, and environmental enthusiasts to help us grow.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="cta-button" style={{ background: 'white', color: '#667eea' }}>
            Contact Us
          </Link>
          <a 
            href="https://github.com/yourusername/ecowaste" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button"
            style={{ background: '#333', color: 'white' }}
          >
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
