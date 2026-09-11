import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  // State to trigger count-up when section is visible
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // Simple intersection observer to detect when stats enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated counter component
  const AnimatedCounter = ({ end, suffix = "", duration = 2.5 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        setCount(Math.floor(end * percentage));

        if (percentage < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
      <>
        {count}
        {suffix}
      </>
    );
  };

  return (
    <div className="w-full" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smart Waste Management Solutions</h1>
          <p>
            Join thousands of eco-conscious individuals and communities in
            transforming waste management through technology, education, and
            sustainable practices.
          </p>
          {user ? (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/register" className="btn btn-primary" 
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 15px white")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>
              Start Your Eco Journey
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="card-grid">
          <div
            className="card"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 15px green")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div className="card-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "60px" }}
              >
                bar_chart
              </span>
            </div>
            <h3>Waste Tracking</h3>
            <p>
              Monitor your waste production patterns and get insights to reduce
              your environmental footprint.
            </p>
          </div>

          <div
            className="card"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 15px green")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div className="card-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "60px" }}
              >
                recycling
              </span>
            </div>
            <h3>Smart Recycling</h3>
            <p>
              Learn proper recycling techniques and find the best ways to
              dispose of different materials.
            </p>
          </div>

          <div
            className="card"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 15px green")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div className="card-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "60px" }}
              >
                calendar_month
              </span>
            </div>
            <h3>Collection Schedule</h3>
            <p>
              Never miss collection days with smart notifications and optimized
              pickup schedules.
            </p>
          </div>

          <div
            className="card"
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 15px green")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div className="card-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "60px" }}
              >
                globe
              </span>
            </div>
            <h3>Community Impact</h3>
            <p>
              Join a growing community committed to sustainable waste management
              practices.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - NOW DYNAMIC */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>
              {isVisible ? <AnimatedCounter end={50000} suffix="K+" /> : "0K+"}
            </h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <h3>
              {isVisible ? <AnimatedCounter end={120} suffix="T" /> : "0T"}
            </h3>
            <p>Waste Recycled</p>
          </div>
          <div className="stat-item">
            <h3>
              {isVisible ? <AnimatedCounter end={45} suffix="%" /> : "0%"}
            </h3>
            <p>Reduction in Landfill</p>
          </div>
          <div className="stat-item">
            <h3>
              {isVisible ? <AnimatedCounter end={200} suffix="+" /> : "0+"}
            </h3>
            <p>Communities</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-4">
        <div className="container">
          <div className="text-center">
            <h2 className="page-title">Ready to Make a Difference?</h2>
            <p className="mb-3">
              Start your journey towards sustainable waste management today.
              Together, we can create a cleaner, greener planet.
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {user ? (
                <>
                  <Link to="/tracker" className="btn btn-primary">
                    Track Your Waste
                  </Link>
                  <Link
                    to="/education"
                    className="btn"
                    style={{
                      background: "var(--secondary-color)",
                      color: "white",
                    }}
                  >
                    Learn More
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary">
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="btn"
                    style={{
                      background: "var(--secondary-color)",
                      color: "white",
                    }}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;