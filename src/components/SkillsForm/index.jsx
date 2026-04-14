// ============================================
// SkillsForm.jsx - Skills Tag Input Editor
// ============================================
// Three sections (Technical, Soft, Languages) each
// with tag input. Press Enter to add, click X to remove.
// ============================================

import { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import { HiXMark } from 'react-icons/hi2';

const SKILL_CATEGORIES = [
  { key: 'technical', label: 'Technical Skills', tagClass: 'tag-purple', placeholder: 'e.g., React, Node.js, Python' },
  { key: 'soft', label: 'Soft Skills', tagClass: 'tag-green', placeholder: 'e.g., Leadership, Communication' },
  { key: 'languages', label: 'Languages', tagClass: 'tag-blue', placeholder: 'e.g., English, Spanish' },
];

function SkillsForm() {
  const { resume, updateSection } = useContext(ResumeContext);
  const skills = resume.sections.skills || { technical: [], soft: [], languages: [] };
  const [inputs, setInputs] = useState({ technical: '', soft: '', languages: '' });

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = inputs[category].trim();
      if (!value) return;
      if (skills[category].includes(value)) return;

      const updated = { ...skills, [category]: [...skills[category], value] };
      updateSection('skills', updated);
      setInputs((prev) => ({ ...prev, [category]: '' }));
    }
  };

  const removeSkill = (category, index) => {
    const updated = {
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index),
    };
    updateSection('skills', updated);
  };

  return (
    <div>
      {SKILL_CATEGORIES.map(({ key, label, tagClass, placeholder }) => (
        <div key={key} className="mb-lg">
          <h4 className="section-title">{label}</h4>

          {/* Tags */}
          <div className="flex-row flex-wrap gap-xs mb-sm">
            {(skills[key] || []).map((skill, index) => (
              <span
                key={index}
                className={`tag ${tagClass}`}
              >
                {skill}
                <button
                  onClick={() => removeSkill(key, index)}
                  className="tag-remove"
                >
                  <HiXMark />
                </button>
              </span>
            ))}
          </div>

          {/* Input */}
          <div className="chip-input-container">
            <input
              type="text"
              value={inputs[key]}
              onChange={(e) => setInputs((prev) => ({ ...prev, [key]: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, key)}
              className="chip-input"
              placeholder={`${placeholder} (press Enter to add)`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsForm;
