// ============================================
// PersonalInfoForm.jsx - Personal Details Form
// ============================================
// Controlled form for name, email, phone, location,
// LinkedIn, and portfolio fields.
// ============================================

import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';

const FIELDS = [
  { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
  { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 123-4567' },
  { key: 'location', label: 'Location', type: 'text', placeholder: 'San Francisco, CA' },
  { key: 'linkedIn', label: 'LinkedIn', type: 'url', placeholder: 'linkedin.com/in/johndoe' },
  { key: 'portfolio', label: 'Portfolio', type: 'url', placeholder: 'johndoe.dev' },
];

function PersonalInfoForm() {
  const { resume, updateSection } = useContext(ResumeContext);
  const personalInfo = resume.sections.personalInfo;

  const handleChange = (key, value) => {
    updateSection('personalInfo', { ...personalInfo, [key]: value });
  };

  return (
    <div className="grid-2">
      {FIELDS.map(({ key, label, type, placeholder }) => (
        <div key={key} className="form-group">
          <label className="label-text">
            {label}
          </label>
          <input
            type={type}
            value={personalInfo[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className="input-field"
            placeholder={placeholder}
          />
        </div>
      ))}
    </div>
  );
}

export default PersonalInfoForm;
