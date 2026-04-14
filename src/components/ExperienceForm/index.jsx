// ============================================
// ExperienceForm.jsx - Work Experience Editor
// ============================================
// Dynamic list of experience entries with fields
// for company, role, dates, and bullet points.
// ============================================

import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import BulletPointEditor from '../BulletPointEditor';
import DatePicker from '../DatePicker';
import { HiPlus, HiTrash } from 'react-icons/hi2';

function ExperienceForm() {
  const { resume, updateSection } = useContext(ResumeContext);
  const experiences = resume.sections.experience || [];

  const addEntry = () => {
    const newEntry = {
      _id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [],
    };
    updateSection('experience', [...experiences, newEntry]);
  };

  const updateEntry = (index, field, value) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp,
    );
    updateSection('experience', updated);
  };

  const deleteEntry = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    updateSection('experience', updated);
  };

  return (
    <div>
      <button
        onClick={addEntry}
        className="btn btn-outline btn-sm btn-full mb-md"
      >
        <HiPlus />
        Add Experience
      </button>

      {experiences.map((exp, index) => (
        <div
          key={exp._id}
          className="card card-sm card-purple-top mb-md"
        >
          <div className="flex-between mb-sm">
            <span className="label-text" style={{ marginBottom: 0 }}>
              Experience {index + 1}
            </span>
            <button
              onClick={() => deleteEntry(index)}
              className="btn-icon-sm text-danger cursor-pointer"
            >
              <HiTrash />
            </button>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="label-text">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateEntry(index, 'company', e.target.value)}
                className="input-field"
                placeholder="Company name"
              />
            </div>
            <div className="form-group">
              <label className="label-text">Role</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) => updateEntry(index, 'role', e.target.value)}
                className="input-field"
                placeholder="Job title"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="label-text">Start Date</label>
              <DatePicker
                value={exp.startDate}
                onChange={(val) => updateEntry(index, 'startDate', val)}
              />
            </div>
            <div className="form-group">
              <label className="label-text">End Date</label>
              <DatePicker
                value={exp.endDate}
                onChange={(val) => updateEntry(index, 'endDate', val)}
                disabled={exp.current}
              />
            </div>
          </div>

          <label className="checkbox-label mb-sm">
            <input
              type="checkbox"
              checked={exp.current || false}
              onChange={(e) => updateEntry(index, 'current', e.target.checked)}
            />
            Currently working here
          </label>

          <div>
            <label className="label-text">Bullet Points</label>
            <BulletPointEditor
              bullets={exp.bullets || []}
              onChange={(bullets) => updateEntry(index, 'bullets', bullets)}
              resumeId={resume._id}
              context={{ company: exp.company, role: exp.role }}
            />
          </div>
        </div>
      ))}

      {experiences.length === 0 && (
        <p className="text-muted text-center py-lg">
          No experience entries yet. Click above to add one.
        </p>
      )}
    </div>
  );
}

export default ExperienceForm;
