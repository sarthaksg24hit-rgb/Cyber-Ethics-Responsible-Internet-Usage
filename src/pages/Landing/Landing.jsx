import { Link } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  Award,
  Scale,
  Fingerprint,
  Users,
  ShieldAlert,
  Lock,
  Copyright,
  ArrowRight,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react';
import './Landing.css';

const stats = [
  { value: '6', label: 'Modules' },
  { value: '40+', label: 'Quiz Questions' },
  { value: '~90', label: 'Minutes' },
  { value: 'Free', label: 'Certificate' },
];

const steps = [
  {
    icon: BookOpen,
    modifier: 'learn',
    label: 'Step 1',
    title: 'Learn',
    desc: 'Read concise notes and watch short videos on each topic',
  },
  {
    icon: Brain,
    modifier: 'quiz',
    label: 'Step 2',
    title: 'Quiz',
    desc: 'Test your understanding with interactive quizzes after each module',
  },
  {
    icon: Award,
    modifier: 'achieve',
    label: 'Step 3',
    title: 'Achieve',
    desc: 'Track your progress and earn recognition for your learning',
  },
];

const topics = [
  {
    icon: Scale,
    color: 'teal',
    title: 'Healthy Cyber Use',
    desc: 'Balance your digital and real-world life',
  },
  {
    icon: Fingerprint,
    color: 'purple',
    title: 'Digital Footprint',
    desc: 'Manage your online identity and reputation',
  },
  {
    icon: Users,
    color: 'blue',
    title: 'Cyber Relationships',
    desc: 'Navigate online interactions with respect',
  },
  {
    icon: ShieldAlert,
    color: 'pink',
    title: 'Cyberbullying',
    desc: 'Recognize and respond to online harassment',
  },
  {
    icon: Lock,
    color: 'orange',
    title: 'Privacy & Security',
    desc: 'Protect yourself from threats and scams',
  },
  {
    icon: Copyright,
    color: 'green',
    title: 'Ethics & Copyright',
    desc: 'Respect intellectual property online',
  },
];

export default function Landing() {
  const scrollToHowItWorks = (e) => {
    e.preventDefault();
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* ===== Hero ===== */}
      <section className="landing-hero">
        {/* Decorative floating shapes */}
        <div className="hero-decor" aria-hidden="true">
          <div className="hero-shape hero-shape--1" />
          <div className="hero-shape hero-shape--2" />
          <div className="hero-shape hero-shape--3" />
          <div className="hero-shape hero-shape--4" />
        </div>

        <div className="hero-content">
          <span className="hero-badge">
            <Sparkles size={16} />
            Interactive Learning Programme
          </span>

          <h1 className="hero-title">
            Master Cyber Ethics &amp;
            <br />
            <span className="gradient-text">Responsible Internet Usage</span>
          </h1>

          <p className="hero-subtitle">
            An interactive learning programme for college students. Build essential digital
            citizenship skills through engaging modules, real-world scenarios, and hands-on
            quizzes.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="btn-secondary" onClick={scrollToHowItWorks}>
              Learn More
              <ChevronRight size={18} />
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((s) => (
              <div className="hero-stat" key={s.label}>
                <div className="hero-stat__value">{s.value}</div>
                <div className="hero-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="landing-section how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-header__tag">Simple Process</span>
            <h2 className="section-header__title">How It Works</h2>
            <p className="section-header__subtitle">
              Three easy steps to build your cyber ethics knowledge
            </p>
          </div>

          <div className="steps-container">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div className="step-card" key={step.title}>
                  <div className={`step-icon step-icon--${step.modifier}`}>
                    <Icon size={28} />
                  </div>
                  <div className="step-number">{step.label}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Topics Preview ===== */}
      <section className="landing-section topics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-header__tag">Curriculum</span>
            <h2 className="section-header__title">What You'll Learn</h2>
            <p className="section-header__subtitle">
              Six comprehensive modules covering the most important aspects of cyber ethics
            </p>
          </div>

          <div className="topics-grid">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <div className="topic-card" key={topic.title}>
                  <div className={`topic-icon topic-icon--${topic.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="topic-card__title">{topic.title}</h3>
                  <p className="topic-card__desc">{topic.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="cta-section">
        <div className="cta-banner">
          <h2 className="cta-banner__title">
            Ready to become a responsible digital citizen?
          </h2>
          <p className="cta-banner__subtitle">
            Join thousands of students building essential cyber ethics skills.
          </p>
          <Link to="/signup" className="btn-primary">
            Start Learning Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-brand__logo">
              <Shield size={22} />
              CyberEthics
            </div>
            <p className="footer-brand__tagline">
              Building responsible digital citizens through interactive learning and real-world
              scenarios.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-column__title">Programme</h4>
            <ul className="footer-column__links">
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Modules</Link></li>
              <li><Link to="/">Certificate</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column__title">Resources</h4>
            <ul className="footer-column__links">
              <li><a href="#">Cyber Ethics Guidelines</a></li>
              <li><a href="#">Safety Tips</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column__title">Connect</h4>
            <ul className="footer-column__links">
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} CyberEthics. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
