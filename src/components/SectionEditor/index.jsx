// ============================================
// SectionEditor.jsx - Accordion Section List
// ============================================
// Maps over SECTION_TYPES, shows each as a clickable
// row. Active section expands to show its form.
// ============================================

import './index.css';
import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import SECTION_TYPES from '../../constants/sectionTypes.js';
import PersonalInfoForm from '../PersonalInfoForm';
import ExperienceForm from '../ExperienceForm';
import EducationForm from '../EducationForm';
import SkillsForm from '../SkillsForm';
import ProjectsForm from '../ProjectsForm';
import CertificationsForm from '../CertificationsForm';
import SummaryForm from '../SummaryForm';
import { HiChevronRight } from 'react-icons/hi2';

function SectionEditor() {
  const { activeSection, setActiveSection } = useContext(ResumeContext);

  const renderForm = (sectionId) => {
    switch (sectionId) {
      case 'personalInfo':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'certifications':
        return <CertificationsForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      {SECTION_TYPES.map(({ id, label, icon: Icon }) => {
        const isActive = activeSection === id;

        return (
          <div key={id} className="accordion-item">
            <button
              onClick={() => setActiveSection(isActive ? '' : id)}
              className={`accordion-header ${isActive ? 'accordion-header-active' : ''}`}
            >
              <Icon className="accordion-icon" />
              <span className="flex-1 text-left">{label}</span>
              <HiChevronRight
                className={`accordion-chevron ${isActive ? 'rotate-90' : ''}`}
                style={isActive ? { transform: 'rotate(90deg)' } : {}}
              />
            </button>

            {isActive && (
              <div className="accordion-body">
                {renderForm(id)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SectionEditor;
