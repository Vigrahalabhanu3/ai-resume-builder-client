// ============================================
// TemplateCard.jsx - Template Page Preview
// ============================================
// Renders the template as a floating paper page
// with shadow — no card wrapper.
// ============================================

import './index.css';
import { HiCheckCircle } from 'react-icons/hi2';
import ClassicTemplate from '../templates/ClassicTemplate.jsx';
import ModernTemplate from '../templates/ModernTemplate.jsx';
import CreativeTemplate from '../templates/CreativeTemplate.jsx';
import MinimalTemplate from '../templates/MinimalTemplate.jsx';
import ExecutiveTemplate from '../templates/ExecutiveTemplate.jsx';

const SAMPLE_DATA = {
  personalInfo: { fullName: 'Alex Johnson', email: 'alex.johnson@email.com', phone: '(555) 123-4567', location: 'San Francisco, CA', linkedIn: 'linkedin.com/in/alexjohnson', portfolio: 'alexjohnson.dev' },
  summary: 'Results-driven software engineer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture. Led teams of 8+ engineers and delivered products serving 1M+ users.',
  experience: [
    { company: 'Tech Corp', role: 'Senior Software Engineer', startDate: '2021-01', endDate: '', current: true, bullets: ['Led development of microservices architecture serving 1M+ daily active users, reducing latency by 40%', 'Mentored 5 junior developers and established code review practices that reduced bug rate by 35%', 'Architected real-time data pipeline processing 10M+ events daily using Kafka and Redis'] },
    { company: 'StartupXYZ', role: 'Full Stack Developer', startDate: '2018-06', endDate: '2020-12', current: false, bullets: ['Built responsive React dashboard used by 500+ enterprise clients', 'Optimized PostgreSQL queries reducing page load time from 3s to 400ms'] },
  ],
  education: [{ institution: 'MIT', degree: 'B.S.', field: 'Computer Science', startDate: '2014', endDate: '2018', gpa: '3.8' }],
  skills: { technical: ['React', 'Node.js', 'Python', 'AWS', 'TypeScript', 'PostgreSQL'], soft: ['Leadership', 'Communication'], languages: ['English', 'Spanish'] },
  projects: [{ name: 'ResumeAI', description: 'AI-powered resume builder', technologies: ['React', 'Node.js', 'Python'], link: '', bullets: ['Built end-to-end resume builder with 4 AI agents'] }],
  certifications: [{ name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2023-05', link: '' }],
};

const templateComponents = {
  classic: ClassicTemplate, modern: ModernTemplate, creative: CreativeTemplate,
  minimal: MinimalTemplate, executive: ExecutiveTemplate,
};

function TemplateCard({ template, isActive, onSelect }) {
  const TemplateComponent = templateComponents[template.id] || ClassicTemplate;

  return (
    <button type="button" onClick={onSelect} className="template-page-btn">
      {/* Paper page */}
      <div className={`template-page ${isActive ? 'template-page-selected' : ''}`}>
        <div className="template-page-inner">
          <TemplateComponent sections={SAMPLE_DATA} colors={template.colors} />
        </div>
        {isActive && (
          <div className="template-page-check">
            <HiCheckCircle />
          </div>
        )}
      </div>
      {/* Name below */}
      <p className="template-page-name">{template.name}</p>
    </button>
  );
}

export { SAMPLE_DATA };
export default TemplateCard;
