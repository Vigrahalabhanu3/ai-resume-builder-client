// ============================================
// EducationForm.jsx - Education Section Editor
// ============================================
// Dynamic list of education entries with fields for
// institution, degree, field, dates, and GPA.
// ============================================

import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import DatePicker from '../DatePicker';
import { HiPlus, HiTrash } from 'react-icons/hi2';

function EducationForm() {
  const { resume, updateSection } = useContext(ResumeContext);
  const entries = resume.sections.education || [];

  const addEntry = () => {
    const newEntry = {
      _id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    updateSection('education', [...entries, newEntry]);
  };

  const updateEntry = (index, field, value) => {
    const updated = entries.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu,
    );
    updateSection('education', updated);
  };

  const deleteEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    updateSection('education', updated);
  };

  return (
    <div>
      <button
        onClick={addEntry}
        className="btn btn-outline btn-sm btn-full mb-md"
      >
        <HiPlus />
        Add Education
      </button>

      {entries.map((edu, index) => (
        <div
          key={edu._id}
          className="card card-sm card-purple-top mb-md"
        >
          <div className="flex-between mb-sm">
            <span className="label-text" style={{ marginBottom: 0 }}>
              Education {index + 1}
            </span>
            <button
              onClick={() => deleteEntry(index)}
              className="btn-icon-sm text-danger cursor-pointer"
            >
              <HiTrash />
            </button>
          </div>

          <div className="form-group">
            <label className="label-text">Institution</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => updateEntry(index, 'institution', e.target.value)}
              className="input-field"
              placeholder="University name"
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="label-text">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEntry(index, 'degree', e.target.value)}
                className="input-field"
                placeholder="B.S., M.S., etc."
              />
            </div>
            <div className="form-group">
              <label className="label-text">Field of Study</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => updateEntry(index, 'field', e.target.value)}
                className="input-field"
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="label-text">Start Date</label>
              <DatePicker
                value={edu.startDate}
                onChange={(val) => updateEntry(index, 'startDate', val)}
              />
            </div>
            <div className="form-group">
              <label className="label-text">End Date</label>
              <DatePicker
                value={edu.endDate}
                onChange={(val) => updateEntry(index, 'endDate', val)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label-text">GPA</label>
            <input
              type="text"
              value={edu.gpa}
              onChange={(e) => updateEntry(index, 'gpa', e.target.value)}
              className="input-field"
              placeholder="3.8/4.0"
              style={{ maxWidth: '160px' }}
            />
          </div>
        </div>
      ))}

      {entries.length === 0 && (
        <p className="text-muted text-center py-lg">
          No education entries yet. Click above to add one.
        </p>
      )}
    </div>
  );
}

export default EducationForm;
