import React from 'react';
const EducationalResources = () => {
  const resources = [
    {
      id: 1,
      title: "The Complete Guide to Recycling Guide",
      type: "Guide",
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
      description: "Practical tips and strategies for adopting a zero-waste lifestyle.",
      type:"Tutorial",
      duration: "15 mins",
      level: "Intermediate",
      icon: "Lightning",
      link: "https://onetreeplanted.org/blogs/stories/how-to-reduce-waste?srsltid=AfmBOorq7P75koU-9EjZiaEYuwWALXmNYN5u502t5vzX2Qt06TuNMJY0",
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
      link: "https://tipa-corp.com/sustainable-packaging/",
      image: "data:image/jpeg;base64,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",
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
      link: "https://profession.americangeosciences.org/society/intersections/faq/how-does-recycling-save-energy/",
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80"
    },
    {
      id: 2,
      title: "The Future of Smart Bins",
      excerpt: "How IoT technology is revolutionizing waste collection and management.",
      readTime: "7 min",
      category: "Technology",
      link: "https://www.smartsortai.com/the-future-of-waste-management-smart-bins-and-the-circular-economy/",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80"
    },
    {
      id: 3,
      title: "Community Recycling Success Stories",
      excerpt: "Inspiring stories from communities that transformed their waste management.",
      readTime: "6 min",
      category: "Community",
      link: "https://solgaard.co/blogs/stories/recycling-success-stories-communities-making-a-difference?srsltid=AfmBOorxHt3ErnMiY-Xsnijde7giZS83h7AzEPBqFeGcDdckJMfNn1Nm",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
    },
    {
      id: 4,
      title: "Benefits of Upcycling",
      excerpt: "Explore creative ways to give new life to old materials and reduce landfill waste.",
      readTime: "4 min",
      category: "Creativity",
      link: "https://dwijproducts.com/blogs/dwijblogs/why-is-upcycling-better-than-recycling-a-look-at-the-benefits-of-upcycled-products?srsltid=AfmBOordpburUHn_TfP3qJS96tsj_Y6VujGzOhdB_V4glwqa5kWuDR9G",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
    },
    {
      id: 5,
      title: "Global Waste Trends 2025",
      excerpt: "Key insights into worldwide waste generation and management challenges.",
      readTime: "8 min",
      category: "Global",
      link: "https://www.scrapeco.in/the-future-of-waste-management-trends-to-watch-in-2025/",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80"
    },
    {
      id: 6,
      title: "Recycling Myths Busted",
      excerpt: "Common myths about recycling debunked with science-backed evidence.",
      readTime: "5 min",
      category: "Myths",
      link: "https://www.dssmith.com/media/our-stories/2021/3/recycling-myths-busted",
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
      color: '#333',
      maxWidth: '1200px',
      margin: '0 auto'
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