// ============================================
// CertificationsForm.jsx - Certifications Editor
// ============================================
// Dynamic list of certification entries with
// name, issuer, date, and link fields.
// ============================================

import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import DatePicker from '../DatePicker';
import { HiPlus, HiTrash } from 'react-icons/hi2';

function CertificationsForm() {
  const { resume, updateSection } = useContext(ResumeContext);
  const certs = resume.sections.certifications || [];

  const addEntry = () => {
    const newEntry = {
      _id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    updateSection('certifications', [...certs, newEntry]);
  };

  const updateEntry = (index, field, value) => {
    const updated = certs.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert,
    );
    updateSection('certifications', updated);
  };

  const deleteEntry = (index) => {
    const updated = certs.filter((_, i) => i !== index);
    updateSection('certifications', updated);
  };

  return (
    <div>
      <button
        onClick={addEntry}
        className="btn btn-outline btn-sm btn-full mb-md"
      >
        <HiPlus />
        Add Certification
      </button>

      {certs.map((cert, index) => (
        <div
          key={cert._id}
          className="card card-sm card-purple-top mb-md"
        >
          <div className="flex-between mb-sm">
            <span className="label-text" style={{ marginBottom: 0 }}>
              Certification {index + 1}
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
              <label className="label-text">Certification Name</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateEntry(index, 'name', e.target.value)}
                className="input-field"
                placeholder="AWS Solutions Architect"
              />
            </div>
            <div className="form-group">
              <label className="label-text">Issuer</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateEntry(index, 'issuer', e.target.value)}
                className="input-field"
                placeholder="Amazon Web Services"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="label-text">Date</label>
              <DatePicker
                value={cert.date}
                onChange={(val) => updateEntry(index, 'date', val)}
              />
            </div>
            <div className="form-group">
              <label className="label-text">Credential Link</label>
              <input
                type="url"
                value={cert.link}
                onChange={(e) => updateEntry(index, 'link', e.target.value)}
                className="input-field"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      ))}

      {certs.length === 0 && (
        <p className="text-muted text-center py-lg">
          No certifications yet. Click above to add one.
        </p>
      )}
    </div>
  );
}

export default CertificationsForm;
