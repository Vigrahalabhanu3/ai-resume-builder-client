// ============================================
// LandingPage.jsx - Marketing Landing Page
// ============================================

import './index.css';
import { Link } from 'react-router-dom';
import TemplateCard from '../../components/TemplateCard';
import {
  HiDocumentText,
  HiChatBubbleLeftRight,
  HiSparkles,
  HiChartBar,
  HiShieldCheck,
  HiArrowDownTray,
  HiArrowRight,
  HiCheck,
} from 'react-icons/hi2';
import TEMPLATES from '../../constants/templates.js';

function LandingPage() {
  const features = [
    {
      icon: HiSparkles,
      title: 'AI Writing Agent',
      desc: 'Transforms your experience into powerful STAR-format bullet points with measurable impact.',
    },
    {
      icon: HiChatBubbleLeftRight,
      title: 'Chat Assistant',
      desc: 'Talk to your resume. Ask for rewrites, improvements, or entirely new sections conversationally.',
    },
    {
      icon: HiChartBar,
      title: 'ATS Scoring Engine',
      desc: '10-metric analysis ensures your resume passes automated tracking systems every time.',
    },
    {
      icon: HiShieldCheck,
      title: 'Multi-Agent System',
      desc: 'Four specialized AI agents collaborate to craft, review, and optimize your resume.',
    },
  ];

  const steps = [
    { number: '1', title: 'Choose a Template', desc: 'Pick from professionally designed templates optimized for ATS systems.' },
    { number: '2', title: 'Add Your Details', desc: 'Fill in your experience or let AI generate content from a job description.' },
    { number: '3', title: 'Download & Apply', desc: 'Export a polished, ATS-optimized PDF ready to land interviews.' },
  ];

  return (
    <div>
      {/* A. Navigation */}
      <nav className="landing-nav">
        <div className="flex-row items-center gap-sm">
          <div className="navbar-logo">
            <HiDocumentText />
          </div>
          <span className="navbar-title">AI Resume Builder</span>
        </div>
        <ul className="landing-nav-links hide-mobile">
          <li><a href="#features" className="landing-nav-link">Features</a></li>
          <li><a href="#how-it-works" className="landing-nav-link">How It Works</a></li>
          <li><a href="#templates" className="landing-nav-link">Templates</a></li>
        </ul>
        <div className="flex-row items-center gap-md">
          <Link to="/login" className="landing-nav-link">Login</Link>
          <Link to="/login" className="btn btn-primary-gradient btn-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* B. Hero */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1 className="heading-xl">
            Build resumes that <span className="landing-highlight">land interviews</span>
          </h1>
          <p className="text-body" style={{ marginTop: '16px', fontSize: '17px', color: '#6b7280', maxWidth: '520px' }}>
            Powered by a multi-agent AI system. Four specialized agents collaborate to write,
            optimize, and score your resume in real-time.
          </p>
          <div className="flex-row gap-md" style={{ marginTop: '28px' }}>
            <Link to="/login" className="btn btn-primary-gradient">
              Get Started <HiArrowRight />
            </Link>
            <a href="#features" className="btn btn-outline">
              See How It Works
            </a>
          </div>
          <div className="landing-stats">
            <div className="stat-card">
              <div className="stat-number">4</div>
              <div className="stat-label">AI Agents</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10</div>
              <div className="stat-label">ATS Metrics</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Pro Templates</div>
            </div>
          </div>
        </div>
        <div className="landing-hero-visual">
          <div className="landing-resume-mockup">
            <div className="mockup-line mockup-line-title" />
            <div className="mockup-line mockup-line-subtitle" />
            <div className="mockup-section-gap" />
            <div className="mockup-line mockup-line-text" />
            <div className="mockup-line mockup-line-text" />
            <div className="mockup-line mockup-line-short" />
            <div className="mockup-section-gap" />
            <div className="mockup-bullet">
              <div className="mockup-bullet-dot" />
              <div className="mockup-bullet-line" />
            </div>
            <div className="mockup-bullet">
              <div className="mockup-bullet-dot" />
              <div className="mockup-bullet-line" style={{ width: '80%' }} />
            </div>
            <div className="mockup-bullet">
              <div className="mockup-bullet-dot" />
              <div className="mockup-bullet-line" style={{ width: '65%' }} />
            </div>
            <div className="mockup-section-gap" />
            <div className="mockup-line mockup-line-text" />
            <div className="mockup-line mockup-line-short" />
          </div>
        </div>
      </section>

      {/* C. Trust Bar */}
      <div className="landing-trust-bar">
        Trusted by professionals targeting roles at{' '}
        <span className="trust-companies">Google, Amazon, Microsoft, Meta & more</span>
      </div>

      {/* D. Features */}
      <section id="features" className="landing-section">
        <h2 className="landing-section-title">AI-Powered Resume Intelligence</h2>
        <p className="landing-section-subtitle">
          Four specialized agents work together to craft the perfect resume for every job application.
        </p>
        <div className="grid-2">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="feature-card">
              <div className="feature-card-icon">
                <Icon />
              </div>
              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>{title}</h3>
              <p className="text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* E. How It Works */}
      <section id="how-it-works" className="landing-section" style={{ background: '#faf5ff' }}>
        <h2 className="landing-section-title">How It Works</h2>
        <p className="landing-section-subtitle">
          Three simple steps to a professional, ATS-optimized resume.
        </p>
        <div className="grid-3">
          {steps.map(({ number, title, desc }) => (
            <div key={number} className="step-card">
              <div className="step-number">{number}</div>
              <h3 className="heading-sm" style={{ marginBottom: '8px' }}>{title}</h3>
              <p className="text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* F. Template Showcase */}
      <section id="templates" className="landing-section">
        <h2 className="landing-section-title">Professional Templates</h2>
        <p className="landing-section-subtitle">
          Choose from beautifully designed templates, each optimized for ATS compatibility.
        </p>
        <div className="template-grid-3">
          {TEMPLATES.slice(0, 3).map((tmpl) => (
            <TemplateCard key={tmpl.id} template={tmpl} isActive={false} onSelect={() => {}} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link to="/login" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            Browse All Templates →
          </Link>
        </div>
      </section>

      {/* G. CTA Section */}
      <section className="landing-cta">
        <h2
          className="heading-xl"
          style={{ color: '#ffffff', marginBottom: '16px' }}
        >
          Ready to build your perfect resume?
        </h2>
        <p style={{ color: 'rgba(167, 139, 250, 0.8)', fontSize: '17px', maxWidth: '500px', margin: '0 auto' }}>
          Join thousands of professionals who landed their dream jobs with AI-powered resumes.
        </p>
        <div style={{ marginTop: '32px' }}>
          <Link to="/login" className="btn btn-primary-gradient" style={{ background: '#ffffff', color: '#7c3aed', padding: '14px 36px', fontSize: '16px' }}>
            Get Started <HiArrowRight />
          </Link>
        </div>
        <div className="landing-cta-badges">
          <span style={{ color: 'rgba(167, 139, 250, 0.7)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HiCheck /> No credit card required
          </span>
          <span style={{ color: 'rgba(167, 139, 250, 0.7)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HiCheck /> Free forever plan
          </span>
          <span style={{ color: 'rgba(167, 139, 250, 0.7)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HiCheck /> Export to PDF
          </span>
        </div>
      </section>

      {/* H. Footer */}
      <footer className="landing-footer">
        <div className="flex-row items-center gap-sm">
          <div className="navbar-logo" style={{ width: '28px', height: '28px', fontSize: '14px', borderRadius: '8px' }}>
            <HiDocumentText />
          </div>
          <span className="navbar-title" style={{ fontSize: '16px' }}>AI Resume Builder</span>
        </div>
        <div className="landing-footer-links">
          <a href="#features" className="landing-footer-link">Features</a>
          <a href="#how-it-works" className="landing-footer-link">How It Works</a>
          <a href="#templates" className="landing-footer-link">Templates</a>
          <Link to="/login" className="landing-footer-link">Login</Link>
        </div>
        <p className="text-xs">Built with MERN Stack + Gemini AI</p>
      </footer>
    </div>
  );
}

export default LandingPage;
