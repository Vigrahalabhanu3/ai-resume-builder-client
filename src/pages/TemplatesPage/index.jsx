// ============================================
// TemplatesPage.jsx - Template Gallery
// ============================================

import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import TemplateCard, { SAMPLE_DATA } from '../../components/TemplateCard';
import TEMPLATES from '../../constants/templates.js';
import { createResume } from '../../services/resumeService.js';
import ClassicTemplate from '../../components/templates/ClassicTemplate.jsx';
import ModernTemplate from '../../components/templates/ModernTemplate.jsx';
import CreativeTemplate from '../../components/templates/CreativeTemplate.jsx';
import MinimalTemplate from '../../components/templates/MinimalTemplate.jsx';
import ExecutiveTemplate from '../../components/templates/ExecutiveTemplate.jsx';
import { HiXMark } from 'react-icons/hi2';

const TEMPLATE_COMPONENTS = {
  classic: ClassicTemplate, modern: ModernTemplate, creative: CreativeTemplate,
  minimal: MinimalTemplate, executive: ExecutiveTemplate,
};

const POPULAR_IDS = ['classic', 'modern', 'creative'];

function TemplatesPage() {
  const navigate = useNavigate();
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTemplate, setNewTemplate] = useState('classic');
  const [newTargetRole, setNewTargetRole] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const resume = await createResume({
        title: newTitle || 'Untitled Resume',
        templateId: newTemplate,
        targetRole: newTargetRole,
      });
      toast.success('Resume created!');
      navigate(`/builder/${resume._id}`);
    } catch (error) {
      toast.error('Failed to create resume');
    }
  };

  return (
    <div className="page-bg min-h-screen">
      <Navbar />
      <div className="templates-page">
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <h1 className="heading-xl">Template Gallery</h1>
          <p className="text-muted mt-sm">Choose a professional template to get started</p>
        </div>

        <div className="template-grid-3">
          {TEMPLATES.map((tmpl) => (
            <div key={tmpl.id} style={{ position: 'relative' }}>
              {POPULAR_IDS.includes(tmpl.id) && (
                <div className="popular-badge">Popular</div>
              )}
              <TemplateCard
                template={tmpl}
                isActive={false}
                onSelect={() => setPreviewTemplate(tmpl)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (() => {
        const PreviewComp = TEMPLATE_COMPONENTS[previewTemplate.id] || ClassicTemplate;
        return (
          <div className="modal-overlay" onClick={() => setPreviewTemplate(null)}>
            <div className="template-preview-modal" onClick={(e) => e.stopPropagation()}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button onClick={() => setPreviewTemplate(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '22px', display: 'flex' }}>
                    <HiXMark />
                  </button>
                  <div>
                    <h2 className="heading-lg" style={{ margin: 0 }}>{previewTemplate.name}</h2>
                    <p className="text-muted" style={{ marginTop: '2px' }}>{previewTemplate.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setNewTemplate(previewTemplate.id);
                    setPreviewTemplate(null);
                    setShowCreate(true);
                  }}
                  className="btn btn-primary-gradient"
                  style={{ padding: '12px 32px', fontSize: '15px' }}
                >
                  Use This Template
                </button>
              </div>
              <div style={{ flex: 1, overflow: 'auto', padding: '32px', background: '#f3e8ff', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <div style={{
                  width: '794px', minHeight: '1100px', background: '#ffffff',
                  boxShadow: '0 8px 40px rgba(124,58,237,0.15)', borderRadius: '6px',
                  overflow: 'hidden', transform: 'scale(0.75)', transformOrigin: 'top center',
                  marginBottom: `${-(1100 * 0.25)}px`,
                }}>
                  <PreviewComp sections={SAMPLE_DATA} colors={previewTemplate.colors} />
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 className="heading-md mb-lg">Create Resume</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="label-text">Resume Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Software Engineer Resume"
                />
              </div>
              <div className="form-group">
                <label className="label-text">Target Role</label>
                <input
                  type="text"
                  value={newTargetRole}
                  onChange={(e) => setNewTargetRole(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Frontend Developer"
                />
              </div>
              <p className="text-sm text-muted mb-md">
                Template: <span className="font-semibold text-purple">{TEMPLATES.find(t => t.id === newTemplate)?.name}</span>
              </p>
              <div className="flex-row gap-sm">
                <button type="button" onClick={() => setShowCreate(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary-gradient" style={{ flex: 1 }}>Create Resume</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplatesPage;
