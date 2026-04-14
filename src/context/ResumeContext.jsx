// ============================================
// ResumeContext.jsx - Resume Builder State
// ============================================
// Central state management for the resume builder.
// Manages resume data, active section/tab, and save state.
// ============================================

import { createContext, useState } from 'react';

const ResumeContext = createContext(null);

const initialResume = {
  _id: null,
  title: 'Untitled Resume',
  templateId: 'classic',
  targetRole: '',
  jobDescription: '',
  sections: {
    personalInfo: {
      fullName: '', email: '', phone: '',
      location: '', linkedIn: '', portfolio: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: { technical: [], soft: [], languages: [] },
    projects: [],
    certifications: [],
  },
  atsScore: null,
};

function ResumeProvider({ children }) {
  const [resume, setResume] = useState(initialResume);
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [activeTab, setActiveTab] = useState('sections');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSection = (sectionName, data) => {
    setResume((prev) => ({
      ...prev,
      sections: { ...prev.sections, [sectionName]: data },
    }));
    setHasChanges(true);
  };

  const updateTemplate = (templateId) => {
    setResume((prev) => ({ ...prev, templateId }));
    setHasChanges(true);
  };

  const updateAtsScore = (atsScore) => {
    setResume((prev) => ({ ...prev, atsScore }));
  };

  const updateField = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const loadResume = (resumeData) => {
    setResume(resumeData);
    setHasChanges(false);
  };

  const resetResume = () => {
    setResume(initialResume);
    setHasChanges(false);
  };

  const getCompletionPercentage = () => {
    const checks = [
      resume.sections.personalInfo.fullName,
      resume.sections.personalInfo.email,
      resume.sections.summary,
      resume.sections.experience.length > 0,
      resume.sections.education.length > 0,
      resume.sections.skills.technical.length > 0,
    ];
    const filled = checks.filter(Boolean).length;
    return Math.round((filled / checks.length) * 100);
  };

  const value = {
    resume, setResume, loadResume, resetResume,
    activeSection, setActiveSection,
    activeTab, setActiveTab,
    isSaving, setIsSaving,
    lastSaved, setLastSaved,
    hasChanges, setHasChanges,
    updateSection, updateTemplate, updateAtsScore, updateField,
    getCompletionPercentage,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export { ResumeContext, ResumeProvider };
