import React from 'react';
const EducationalResources = () => {
  const resources = [
    {
      id: 1,
      title: "The Complete Guide to Recycling Guide",
      type: "PDF Guide",
      description: "Comprehensive guide covering all aspects of recycling and waste management.",
      duration: "15 min read",
      level: "Beginner",
      icon: "Book",
      link: "https://www.epa.gov/recycle/recycling-basics",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFLGnQyGovfCTHWdFnAElNaK8R4MUslKhmHQ&s",
      topics: ["Basics", "Sorting", "Benefits"]
    },
    {
      id: 2,
      title: "Plastic Pollution Solutions",
      type: "Video Series",
      description: "Learn about innovative solutions to combat plastic pollution worldwide.",
      duration: "45 min",
      level: "Intermediate",
      icon: "Video Camera",
      link: "https://www.youtube.com/watch?v=RS7IzU2VJIQ",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
      topics: ["Oceans", "Innovations", "Policy"]
    },
    {
      id: 3,
      title: "Composting at Home",
      type: "Tutorial",
      description: "Step-by-step guide to starting your own compost system at home.",
      duration: "20 min",
      level: "Beginner",
      icon: "Seedling",
      link: "https://www.nrdc.org/stories/composting-101",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Ulv-jAg-dXGhb5vLml6H_0Rg2fPGQDeLwQ&s",
      topics: ["Setup", "Maintenance", "Troubleshooting"]
    },
    {
      id: 4,
      title: "Circular Economy Principles",
      type: "E-book",
      description: "Understanding how circular economy can transform waste management.",
      duration: "30 min read",
      level: "Advanced",
      icon: "Recycle",
      link: "https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
      topics: ["Principles", "Case Studies", "Implementation"]
    },
    {
      id: 5,
      title: "Zero Waste Lifestyle",
      type: "Video Course",
      description: "Practical tips and strategies for adopting a zero-waste lifestyle.",
      duration: "2 hours",
      level: "Intermediate",
      icon: "Lightning",
      link: "https://www.youtube.com/watch?v=1qR8M5e9oNk",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      topics: ["Daily Habits", "Shopping", "Kitchen"]
    },
    {
      id: 6,
      title: "Sustainable Packaging",
      type: "Case Studies",
      description: "Real-world examples of sustainable packaging solutions.",
      duration: "25 min read",
      level: "Intermediate",
      icon: "Package",
      link: "https://www.sustainablepackaging.org/case-studies/",
      image: "https://images.unsplash.com/photo-1581092160607-9c3e0103b9c2?w=800&q=80",
      topics: ["Brands", "Materials", "Trends"]
    },
  ];

  const articles = [
    {
      id: 1,
      title: "How Recycling Saves Energy",
      excerpt: "Discover the significant energy savings achieved through proper recycling practices.",
      readTime: "5 min",
      category: "Energy",
      link: "https://www.energy.gov/energysaver/articles/recycling-basics",
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80"
    },
    {
      id: 2,
      title: "The Future of Smart Bins",
      excerpt: "How IoT technology is revolutionizing waste collection and management.",
      readTime: "7 min",
      category: "Technology",
      link: "https://www.wastemanaged.co.uk/our-news/technology/smart-bins-the-future-of-waste-management/",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80"
    },
    {
      id: 3,
      title: "Community Recycling Success Stories",
      excerpt: "Inspiring stories from communities that transformed their waste management.",
      readTime: "6 min",
      category: "Community",
      link: "https://www.recyclingtoday.com/article/community-recycling-success-stories/",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
    },
    {
      id: 4,
      title: "Benefits of Upcycling",
      excerpt: "Explore creative ways to give new life to old materials and reduce landfill waste.",
      readTime: "4 min",
      category: "Creativity",
      link: "https://www.goingzerowaste.com/blog/benefits-of-upcycling",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
    },
    {
      id: 5,
      title: "Global Waste Trends 2024",
      excerpt: "Key insights into worldwide waste generation and management challenges.",
      readTime: "8 min",
      category: "Global",
      link: "https://www.worldbank.org/en/news/immersive-story/2018/09/20/what-a-waste",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80"
    },
    {
      id: 6,
      title: "Recycling Myths Busted",
      excerpt: "Common myths about recycling debunked with science-backed evidence.",
      readTime: "5 min",
      category: "Myths",
      link: "https://www.nationalgeographic.com/environment/article/recycling-myths-plastic",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80"
    }
  ];

  const simpleSteps = [
    {
      id: 1,
      number: "01",
      title: "Identify Your Waste",
      description: "Learn to distinguish between recyclable and non-recyclable materials.",
      icon: "🔍",
      color: "#8B5CF6"
    },
    {
      id: 2,
      number: "02",
      title: "Proper Sorting",
      description: "Separate materials into correct categories: paper, plastic, glass, metal.",
      icon: "🗂️",
      color: "#10B981"
    },
    {
      id: 3,
      number: "03",
      title: "Clean & Dry",
      description: "Rinse containers to remove food residue before recycling.",
      icon: "💧",
      color: "#3B82F6"
    },
    {
      id: 4,
      number: "04",
      title: "Check Local Rules",
      description: "Review your municipality's specific recycling guidelines.",
      icon: "📋",
      color: "#F59E0B"
    },
    {
      id: 5,
      number: "05",
      title: "Reduce & Reuse First",
      description: "Minimize waste generation before considering recycling.",
      icon: "♻️",
      color: "#EF4444"
    },
    {
      id: 6,
      number: "06",
      title: "Dispose Responsibly",
      description: "Use designated bins and facilities for hazardous waste.",
      icon: "✅",
      color: "#06B6D4"
    }
  ];

  const visualGlossary = [
    {
      id: 1,
      term: "E-Waste",
      definition: "Discarded electronic devices like phones, computers, and batteries.",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&q=80",
      color: "#8B5CF6"
    },
    {
      id: 2,
      term: "Biodegradable",
      definition: "Materials that decompose naturally through biological processes.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",
      color: "#10B981"
    },
    {
      id: 3,
      term: "Landfill",
      definition: "Designated sites for waste disposal through burial.",
      image: "https://images.unsplash.com/photo-1570804439979-801c4c6cae94?w=400&q=80",
      color: "#F59E0B"
    },
    {
      id: 4,
      term: "Upcycling",
      definition: "Creative reuse of waste materials into higher-value products.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80",
      color: "#3B82F6"
    },
    {
      id: 5,
      term: "Microplastics",
      definition: "Tiny plastic particles harmful to ecosystems and wildlife.",
      image: "https://images.unsplash.com/photo-1559825498-0d1c9b9f8b2d?w=400&q=80",
      color: "#EF4444"
    },
    {
      id: 6,
      term: "Compost",
      definition: "Organic matter decomposed into nutrient-rich soil conditioner.",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc0af?w=400&q=80",
      color: "#06B6D4"
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '1rem',
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      lineHeight: 1.5,
      color: '#333'
    }}>
      <style jsx global>{`
        :root {
          --primary-color: #10b981;
          --secondary-color: #3b82f6;
          --text-light: #6b7280;
          --border-color: #e5e7eb;
          --shadow-light: 0 2px 4px -1px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.06);
          --shadow-hover: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        }
        .resource-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
        .article-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
        .glossary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .card-hover { transition: all 0.2s ease; }
        .card-hover:hover { transform: translateY(-2px); }
        .btn-primary { background: var(--primary-color); color: white; border: none; border-radius: 6px; padding: 0.375rem 0.75rem; font-weight: 500; font-size: 0.8rem; cursor: pointer; transition: all 0.2s ease; box-shadow: var(--shadow-light); }
        .btn-primary:hover { background: #059669; box-shadow: var(--shadow-hover); }
        .tag { padding: 0.1875rem 0.5rem; border-radius: 10px; font-size: 0.7rem; font-weight: 500; margin: 0 0.125rem 0.125rem 0; white-space: nowrap; }
        .tag-type { background: linear-gradient(135deg, #e1f5fe, #b3e5fc); color: #0277bd; }
        .tag-level { background: linear-gradient(135deg, #f3e5f5, #e1bee7); color: #7b1fa2; }
        .tag-topic { background: linear-gradient(135deg, #d1fae5, #a7f3d0); color: #065f46; font-size: 0.65rem; }
        .tag-category { background: linear-gradient(135deg, #e0f2fe, #b3e5fc); color: var(--secondary-color); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>

  

      {/* Quick Start Guides */}
      <section style={{ marginBottom: '2rem' }} className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0,
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Quick Start Guides</h2>
          <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Visual & Audio</span>
        </div>

        <div className="resource-grid">
          {resources.map((resource, index) => (
            <a
              key={resource.id}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                className="card-hover"
                style={{ 
                  borderRadius: '12px',
                  background: 'white',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-light)',
                  animationDelay: `${index * 0.03}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
                  <img src={resource.image} alt={resource.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.5rem', borderRadius: '16px', fontSize: '0.9rem', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                    {resource.icon}
                  </div>
                </div>

                <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.125rem', marginBottom: '0.5rem' }}>
                    <span className="tag tag-type">{resource.type}</span>
                    <span className="tag tag-level">{resource.level}</span>
                  </div>
                  <h3 style={{ margin: '0 0 0.375rem 0', fontSize: '1rem', fontWeight: 600, lineHeight: '1.2' }}>
                    {resource.title}
                  </h3>
                  <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem', fontSize: '0.8rem', lineHeight: '1.3', flex: 1 }}>
                    {resource.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>Time: {resource.duration}</span>
                    <div style={{ display: 'flex', gap: '0.125rem', flexWrap: 'wrap' }}>
                      {resource.topics.slice(0,2).map((t,i)=><span key={i} className="tag tag-topic">{t}</span>)}
                      {resource.topics.length>2 && <span className="tag tag-topic">+{resource.topics.length-2}</span>}
                    </div>
                  </div>
                  <button className="btn-primary">Explore →</button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Inspiring Reads */}
      <section style={{ marginBottom: '2rem' }} className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0,
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Inspiring Reads</h2>
          <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Short Stories</span>
        </div>

        <div className="article-grid">
          {articles.map((article, index) => (
            <a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                className="card-hover"
                style={{
                  display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'white',
                  borderRadius: '10px', cursor: 'pointer', boxShadow: 'var(--shadow-light)',
                  border: '1px solid var(--border-color)', animationDelay: `${index * 0.03}s`
                }}
              >
                <div style={{ position: 'relative', width: '100px', height: '70px', borderRadius: '6px', overflow: 'hidden' }}>
                  <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="tag tag-category" style={{ position: 'absolute', bottom: '0.125rem', right: '0.125rem', fontSize: '0.65rem', padding: '0.0625rem 0.25rem' }}>
                    {article.category}
                  </span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.375rem 0', fontSize: '0.9rem', fontWeight: 600, lineHeight: '1.2' }}>
                      {article.title}
                    </h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-light)', fontSize: '0.8rem', lineHeight: '1.3' }}>
                      {article.excerpt}
                    </p>
                  </div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                    Time: {article.readTime}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Easy Steps */}
      <section style={{ marginBottom: '2rem' }} className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0,
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Easy Steps</h2>
          <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Beginner Friendly</span>
        </div>

        <div className="steps-grid">
          {simpleSteps.map((step, index) => (
            <div
              key={step.id}
              className="card-hover"
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1rem',
                boxShadow: 'var(--shadow-light)',
                borderLeft: `4px solid ${step.color}`,
                animationDelay: `${index * 0.03}s`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '8px', 
                  background: step.color + '20',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 600, 
                      color: step.color,
                      background: step.color + '20',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '12px'
                    }}>
                      {step.number}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                      {step.title}
                    </h4>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    color: 'var(--text-light)', 
                    fontSize: '0.85rem',
                    lineHeight: 1.4
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default EducationalResources;