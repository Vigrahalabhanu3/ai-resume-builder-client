// ============================================
// ProjectsForm.jsx - Projects Section Editor
// ============================================
// Dynamic list of project entries with name,
// description, technologies (tag input), link,
// and bullet points.
// ============================================

import { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import BulletPointEditor from '../BulletPointEditor';
import { HiPlus, HiTrash, HiXMark } from 'react-icons/hi2';

function ProjectsForm() {
  const { resume, updateSection } = useContext(ResumeContext);
  const projects = resume.sections.projects || [];
  const [techInputs, setTechInputs] = useState({});

  const addEntry = () => {
    const newEntry = {
      _id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      bullets: [],
    };
    updateSection('projects', [...projects, newEntry]);
  };

  const updateEntry = (index, field, value) => {
    const updated = projects.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj,
    );
    updateSection('projects', updated);
  };

  const deleteEntry = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    updateSection('projects', updated);
  };

  const handleTechKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = (techInputs[index] || '').trim();
      if (!value) return;
      const proj = projects[index];
      if (proj.technologies.includes(value)) return;
      updateEntry(index, 'technologies', [...proj.technologies, value]);
      setTechInputs((prev) => ({ ...prev, [index]: '' }));
    }
  };

  const removeTech = (projIndex, techIndex) => {
    const proj = projects[projIndex];
    const updated = proj.technologies.filter((_, i) => i !== techIndex);
    updateEntry(projIndex, 'technologies', updated);
  };

  return (
    <div>
      <button
        onClick={addEntry}
        className="btn btn-outline btn-sm btn-full mb-md"
      >
        <HiPlus />
        Add Project
      </button>

      {projects.map((proj, index) => (
        <div
          key={proj._id}
          className="card card-sm card-purple-top mb-md"
        >
          <div className="flex-between mb-sm">
            <span className="label-text" style={{ marginBottom: 0 }}>
              Project {index + 1}
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
              <label className="label-text">Project Name</label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => updateEntry(index, 'name', e.target.value)}
                className="input-field"
                placeholder="Project name"
              />
            </div>
            <div className="form-group">
              <label className="label-text">Link</label>
              <input
                type="url"
                value={proj.link}
                onChange={(e) => updateEntry(index, 'link', e.target.value)}
                className="input-field"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="form-group">
            <label className="label-text">Description</label>
            <textarea
              value={proj.description}
              onChange={(e) => updateEntry(index, 'description', e.target.value)}
              rows={2}
              className="textarea-field"
              placeholder="Brief project description"
            />
          </div>

          {/* Technologies tag input */}
          <div className="form-group">
            <label className="label-text">Technologies</label>
            <div className="flex-row flex-wrap gap-xs mb-sm">
              {(proj.technologies || []).map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="tag tag-purple"
                >
                  {tech}
                  <button
                    onClick={() => removeTech(index, techIdx)}
                    className="tag-remove"
                  >
                    <HiXMark />
                  </button>
                </span>
              ))}
            </div>
            <div className="chip-input-container">
              <input
                type="text"
                value={techInputs[index] || ''}
                onChange={(e) => setTechInputs((prev) => ({ ...prev, [index]: e.target.value }))}
                onKeyDown={(e) => handleTechKeyDown(e, index)}
                className="chip-input"
                placeholder="Add technology (press Enter)"
              />
            </div>
          </div>

          <div>
            <label className="label-text">Bullet Points</label>
            <BulletPointEditor
              bullets={proj.bullets || []}
              onChange={(bullets) => updateEntry(index, 'bullets', bullets)}
              resumeId={resume._id}
              context={{ company: proj.name, role: 'Project' }}
            />
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <p className="text-muted text-center py-lg">
          No projects yet. Click above to add one.
        </p>
      )}
    </div>
  );
}

export default ProjectsForm;
