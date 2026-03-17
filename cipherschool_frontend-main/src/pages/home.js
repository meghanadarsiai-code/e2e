import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../utils/api";
import { getUser, isAuthenticated } from "../utils/auth";
import CourseCard from "../cards/CourseCard";
import "./home.css";

const slideOne = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop";
const slideTwo = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop";
const slideThree = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop";
const slideFour = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
const historyImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop";
const platformJourneyImage = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop";
const ratingsImage = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop";

function Home() {
  const navigate = useNavigate();
  const courses = [
  { id: 1, name: "DSA", description: "Data Structures & Algorithms" },
  { id: 2, name: "Web Development", description: "HTML, CSS, JS, React" },
  { id: 3, name: "Data Science", description: "Python, ML Basics" },
];
  const [stats, setStats] = useState({
    courses: 0,
    tests: 0,
    assignments: 0,
  });

  const user = useMemo(() => getUser(), []);

  const learningTracks = [
    {
      title: "DSA and Competitive Coding",
      subtitle: "Arrays, trees, graphs, dynamic programming",
      duration: "10-12 weeks",
      level: "Beginner to Advanced",
      image: slideThree,
    },
    {
      title: "Full Stack Web Development",
      subtitle: "React, Node.js, APIs, deployment",
      duration: "12-14 weeks",
      level: "Intermediate",
      image: slideFour,
    },
    {
      title: "Aptitude and Interview Prep",
      subtitle: "Mock tests, timed rounds, revision plans",
      duration: "6-8 weeks",
      level: "All Levels",
      image: slideTwo,
    },
  ];

  const platformFeatures = [
    "Role-based dashboards for students and admins",
    "Course, test, and assignment management",
    "Profile progress with personalized study planner",
    "AI study assistant with saved chat history",
    "Certificate generation for completed milestones",
    "Live sync so user updates reflect in admin panel",
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Choose your track",
      text: "Select a path based on your current level and goals.",
    },
    {
      step: "02",
      title: "Learn and practice",
      text: "Study course modules and solve daily assignments.",
    },
    {
      step: "03",
      title: "Take assessments",
      text: "Attempt topic tests and monitor your scores over time.",
    },
    {
      step: "04",
      title: "Track outcomes",
      text: "Use dashboard analytics and certificates to show progress.",
    },
  ];

  const faqs = [
    {
      q: "Is this platform useful for beginners?",
      a: "Yes. Learning paths start from fundamentals and grow step-by-step into advanced topics.",
    },
    {
      q: "Can admins fully manage content?",
      a: "Yes. Admins can create, edit, and delete courses, tests, and assignments from the dashboard.",
    },
    {
      q: "How do students monitor preparation?",
      a: "Students get a dashboard with latest test performance, enrolled courses, and a personal study planner.",
    },
    {
      q: "Are achievements downloadable?",
      a: "Yes. Certificates can be generated and downloaded directly from the certificate section.",
    },
  ];

  const aiVisualReferences = [
    {
      title: "Smart Learning Workspace",
      prompt: "futuristic coding classroom with students, warm colorful lighting, digital dashboards, cinematic",
      image:
        "https://image.pollinations.ai/prompt/futuristic%20coding%20classroom%20with%20students%2C%20warm%20colorful%20lighting%2C%20digital%20dashboards%2C%20cinematic",
    },
    {
      title: "AI Mentor Concept",
      prompt: "friendly ai mentor helping developer at desk, vibrant gradients, modern illustration style",
      image:
        "https://image.pollinations.ai/prompt/friendly%20ai%20mentor%20helping%20developer%20at%20desk%2C%20vibrant%20gradients%2C%20modern%20illustration%20style",
    },
    {
      title: "Interview Prep Arena",
      prompt: "competitive programming arena with neon UI panels, high detail, colorful",
      image:
        "https://image.pollinations.ai/prompt/competitive%20programming%20arena%20with%20neon%20UI%20panels%2C%20high%20detail%2C%20colorful",
    },
  ];


  useEffect(() => {
    const loadStats = async () => {
      try {
        const [coursesRes, testsRes, assignmentsRes] = await Promise.all([
          apiService.courses.list(),
          apiService.tests.list(),
          apiService.assignments.list(),
        ]);
        setStats({
          courses: coursesRes.data.length,
          tests: testsRes.data.length,
          assignments: assignmentsRes.data.length,
        });
      } catch (error) {
        setStats({ courses: 0, tests: 0, assignments: 0 });
      }
    };

    loadStats();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">Competitive Learning for Developers</p>
          <h1>
            Build skills, solve problems, and track progress like a coding
            platform.
          </h1>
          <p className="hero-subtitle">
            CipherSchools now includes role-based access, managed content,
            assessments, assignments, and AI-assisted study workflows.
          </p>
          <div className="hero-actions">
            <button className="gfg-btn-primary" onClick={() => navigate("/")}>
  Explore Courses
</button>
            <button className="btn btn-outline-dark" onClick={() => navigate("/tests")}>
              Take Tests
            </button>
          </div>
        </div>
        <div className="hero-grid">
          <div className="hero-image-card">
            <img src={slideOne} alt="Learning path" />
            <span>Daily coding practice</span>
          </div>
          <div className="hero-card">
            <h3>{stats.courses}</h3>
            <p>Published Courses</p>
          </div>
          <div className="hero-card">
            <h3>{stats.tests}</h3>
            <p>Active Tests</p>
          </div>
          <div className="hero-card">
            <h3>{stats.assignments}</h3>
            <p>Practice Problems</p>
          </div>
          <div
            className="hero-card"
            style={{ cursor: "pointer" }}
            onClick={() => isAuthenticated() ? navigate(user?.role === "admin" ? "/admin-dashboard" : "/dashboard") : null}
          >
            <h3>{isAuthenticated() ? "Live" : "Guest"}</h3>
            <p>{isAuthenticated() ? (user?.role === "admin" ? "Admin Dash" : "Student View") : "Explore Mode"}</p>
          </div>
        </div>
      </section>

      <section className="home-showcase">
        <article className="showcase-card">
          <img src={historyImage} alt="Platform overview" />
          <div>
            <h4>Roadmaps with Real Progress</h4>
            <p>From beginner to advanced, follow structured learning tracks and monitor outcomes.</p>
          </div>
        </article>
        <article className="showcase-card">
          <img src={slideTwo} alt="Online coding" />
          <div>
            <h4>Assess, Improve, Repeat</h4>
            <p>Practice tests and assignments are integrated so growth is continuous and measurable.</p>
          </div>
        </article>
      </section>
      <section className="feature-strip">
        <article>
          <h4>Role-Based Platform</h4>
          <p>Admins can create and remove courses, tests, and assignments.</p>
        </article>
        <article>
          <h4>AI Study Assistant</h4>
          <p>Use chat history and contextual responses from the backend.</p>
        </article>
        <article>
          <h4>Certificates</h4>
          <p>Generate downloadable completion certificates directly in app.</p>
        </article>
      </section>

      <section className="trust-band">
        <div className="trust-text">
          <h3>Built for serious learning outcomes</h3>
          <p>
            Practice consistency, structured roadmaps, and guided assessments in one place.
          </p>
        </div>
        <img src={ratingsImage} alt="User ratings" />
      </section>

      <section className="tracks-section">
        <div className="section-header">
          <p className="section-tag">Learning Paths</p>
          <h3>Choose a roadmap that matches your career goal</h3>
        </div>
        <div className="tracks-grid">
          {learningTracks.map((track) => (
            <article className="track-card" key={track.title}>
              <img src={track.image} alt={track.title} />
              <div className="track-content">
                <h4>{track.title}</h4>
                <p>{track.subtitle}</p>
                <div className="track-meta">
                  <span>{track.duration}</span>
                  <span>{track.level}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-gallery-section">
        <div className="section-header">
          <p className="section-tag">AI Visual References</p>
          <h3>Design inspirations generated for this learning experience</h3>
        </div>
        <div className="ai-gallery-grid">
          {aiVisualReferences.map((item) => (
            <article className="ai-gallery-card" key={item.title}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = slideFour;
                }}
              />
              <div>
                <h4>{item.title}</h4>
                <p>{item.prompt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="value-section">
        <article className="value-panel value-panel-large">
          <img src={platformJourneyImage} alt="Platform journey" />
          <div>
            <p className="section-tag">Why This Platform</p>
            <h3>Everything required to learn, practice, and prove your growth</h3>
            <p>
              Instead of jumping across multiple tools, use one integrated workflow for theory,
              coding practice, tests, assignment tracking, and certification.
            </p>
            <button
              className="gfg-btn-primary"
              onClick={() => isAuthenticated() ? navigate(user?.role === "admin" ? "/admin-dashboard" : "/dashboard") : navigate("/home")}
            >
              Go to Dashboard
            </button>
          </div>
        </article>
        <article className="value-panel">
          <img src={slideOne} alt="Learning dashboard" />
          <h4>Student-first experience</h4>
          <p>Personal planning, progress visibility, and focused preparation paths.</p>
        </article>
      </section>

      <section className="process-section">
        <div className="section-header">
          <p className="section-tag">How It Works</p>
          <h3>A practical cycle to improve every week</h3>
        </div>
        <div className="process-grid">
          {howItWorks.map((item) => (
            <article className="process-card" key={item.step}>
              <span>{item.step}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="highlights-section">
        <div className="section-header">
          <p className="section-tag">Platform Highlights</p>
          <h3>Useful capabilities for students and admins</h3>
        </div>
        <ul className="highlights-list">
          {platformFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="faq-section">
        <div className="section-header">
          <p className="section-tag">FAQ</p>
          <h3>Common questions</h3>
        </div>
        <div className="faq-grid">
          {faqs.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <h3>Start your preparation journey today</h3>
        <p>
          Explore courses, attempt tests, complete assignments, and build a strong portfolio of outcomes.
        </p>
        <div className="hero-actions">
          <button className="gfg-btn-primary" onClick={() => navigate("/courses")}>Browse Courses</button>
          <button className="btn btn-outline-dark" onClick={() => navigate("/tests")}>Explore Tests</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
