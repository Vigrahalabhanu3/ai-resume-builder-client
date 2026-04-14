// ============================================
// HomePage.jsx - Welcome Hub (Overleaf-style)
// ============================================

import './index.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { getResumes, createResume, uploadResume } from '../../services/resumeService.js';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import TEMPLATES from '../../constants/templates.js';
import TemplateCard, { SAMPLE_DATA } from '../../components/TemplateCard';
import ClassicTemplate from '../../components/templates/ClassicTemplate.jsx';
import ModernTemplate from '../../components/templates/ModernTemplate.jsx';
import CreativeTemplate from '../../components/templates/CreativeTemplate.jsx';
import MinimalTemplate from '../../components/templates/MinimalTemplate.jsx';
import ExecutiveTemplate from '../../components/templates/ExecutiveTemplate.jsx';
import { HiDocumentPlus, HiArrowUpTray, HiChartBar, HiArrowRight, HiClock, HiDocumentText, HiXMark } from 'react-icons/hi2';

const TEMPLATE_COMPONENTS = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
};

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTemplate, setNewTemplate] = useState('classic');
  const [newTargetRole, setNewTargetRole] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getResumes();
      setResumes(data);
    } catch (error) {
      toast.error('Failed to load resumes');
    }
    setIsLoading(false);
  };

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

  const handleUpload = async () => {
    if (!uploadFile) return;
    setIsUploading(true);
    try {
      const resume = await uploadResume(uploadFile);
      toast.success('Resume parsed and imported!');
      setShowUpload(false);
      setUploadFile(null);
      navigate(`/builder/${resume._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to parse resume');
    }
    setIsUploading(false);
  };

  return (
    <div className="page-bg min-h-screen">
      <Navbar />
      <div className="home-page">
        {/* Greeting */}
        <div className="home-greeting">
          <h1 className="heading-xl">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-muted mt-sm">What would you like to do?</p>
        </div>

        {/* 3 Action Cards */}
        <div className="home-actions">
          <div className="home-action-card" onClick={() => setShowCreate(true)}>
            <div className="home-action-icon"><HiDocumentPlus /></div>
            <h3 className="heading-md" style={{ marginBottom: '8px' }}>Create New Resume</h3>
            <p className="text-muted">Start fresh with AI-powered resume building</p>
          </div>

          <div className="home-action-card" onClick={() => setShowUpload(true)}>
            <div className="home-action-icon"><HiArrowUpTray /></div>
            <h3 className="heading-md" style={{ marginBottom: '8px' }}>Improve Existing</h3>
            <p className="text-muted">Upload a PDF to parse, enhance & optimize with AI</p>
          </div>

          <div className="home-action-card" onClick={() => setShowUpload(true)}>
            <div className="home-action-icon"><HiChartBar /></div>
            <h3 className="heading-md" style={{ marginBottom: '8px' }}>Check ATS Score</h3>
            <p className="text-muted">Get a detailed 10-metric ATS analysis of your resume</p>
          </div>
        </div>

        {/* How It Works */}
        <div style={{ marginBottom: '64px' }}>
          <h2 className="heading-lg text-center" style={{ marginBottom: '8px' }}>How It Works</h2>
          <p className="text-muted text-center" style={{ marginBottom: '40px' }}>Build a professional resume in 3 simple steps</p>
          <div className="grid-3">
            {[
              { number: '1', title: 'Chat with AI', desc: 'Describe your experience naturally — our Interview Agent asks smart follow-up questions' },
              { number: '2', title: 'AI Builds Your Resume', desc: 'Bullet Writer and ATS Scorer agents craft optimized content with metrics' },
              { number: '3', title: 'Download & Apply', desc: 'Choose a template, download a polished PDF, and start applying' },
            ].map(({ number, title, desc }) => (
              <div key={number} className="step-card">
                <div className="step-number">{number}</div>
                <h3 className="heading-sm" style={{ marginBottom: '8px' }}>{title}</h3>
                <p className="text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Template Showcase — Clean Grid */}
        <div style={{ marginBottom: '64px' }}>
          <h2 className="heading-lg text-center" style={{ marginBottom: '8px' }}>Choose a Template</h2>
          <p className="text-muted text-center" style={{ marginBottom: '40px' }}>Click any template to preview it full-size</p>
          <div className="template-grid-3">
            {TEMPLATES.slice(0, 3).map((tmpl) => (
              <TemplateCard
                key={tmpl.id}
                template={tmpl}
                isActive={false}
                onSelect={() => setPreviewTemplate(tmpl)}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link to="/templates" className="btn btn-outline" style={{ textDecoration: 'none' }}>
              Browse All Templates →
            </Link>
          </div>
        </div>

        {/* Recent Resumes */}
        {!isLoading && resumes.length > 0 && (
          <div className="home-recent">
            <div className="home-recent-header">
              <h2 className="heading-md">Recent Resumes</h2>
              <Link to="/dashboard" className="btn btn-ghost btn-sm flex-row items-center gap-xs" style={{ textDecoration: 'none' }}>
                View All <HiArrowRight />
              </Link>
            </div>
            <div className="home-recent-grid">
              {resumes.slice(0, 3).map((resume) => {
                const template = TEMPLATES.find((t) => t.id === resume.templateId) || TEMPLATES[0];
                return (
                  <div
                    key={resume._id}
                    onClick={() => navigate(`/builder/${resume._id}`)}
                    className="resume-card"
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      className="resume-card-bar"
                      style={{ background: `linear-gradient(90deg, ${template.colors.primary}, ${template.colors.accent})` }}
                    />
                    <div className="resume-card-body">
                      <h3 className="heading-sm truncate">{resume.title}</h3>
                      {resume.targetRole && <p className="text-xs mt-xs truncate">{resume.targetRole}</p>}
                      <div className="flex-row items-center gap-xs mt-sm">
                        <HiClock style={{ fontSize: '12px', color: '#9ca3af' }} />
                        <span className="text-xs">
                          {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
                    width: '794px',
                    minHeight: '1100px',
                    background: '#ffffff',
                    boxShadow: '0 8px 40px rgba(124,58,237,0.15)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    transform: 'scale(0.75)',
                    transformOrigin: 'top center',
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
            <div className="modal-content" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
              <h2 className="heading-md mb-lg">Create New Resume</h2>
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
                <div className="form-group">
                  <label className="label-text">Template</label>
                  <div className="template-grid-modal" style={{ marginTop: '8px' }}>
                    {TEMPLATES.map((tmpl) => (
                      <TemplateCard
                        key={tmpl.id}
                        template={tmpl}
                        isActive={newTemplate === tmpl.id}
                        onSelect={() => setNewTemplate(tmpl.id)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-row gap-sm" style={{ paddingTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-gradient" style={{ flex: 1 }}>
                    Create Resume
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUpload && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '480px' }}>
              <h2 className="heading-md mb-md">Upload Existing Resume</h2>
              <p className="text-muted mb-lg">Upload a PDF and our AI will parse it into editable sections.</p>

              {!isUploading ? (
                <>
                  <label className={`upload-dropzone ${uploadFile ? 'upload-dropzone-active' : ''}`}>
                    <input
                      type="file"
                      accept=".pdf"
                      style={{ display: 'none' }}
                      onChange={(e) => setUploadFile(e.target.files[0] || null)}
                    />
                    <HiArrowUpTray style={{ fontSize: '32px', color: '#a78bfa', marginBottom: '8px' }} />
                    <p className="text-muted">Click to select a PDF file</p>
                    <p className="text-xs" style={{ marginTop: '4px' }}>PDF up to 5MB</p>
                  </label>

                  {uploadFile && (
                    <div className="upload-file-info">
                      <HiDocumentText style={{ fontSize: '20px', color: '#7c3aed' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="text-sm font-medium truncate">{uploadFile.name}</p>
                        <p className="text-xs">{(uploadFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button onClick={() => setUploadFile(null)} className="btn btn-ghost btn-xs text-danger">Remove</button>
                    </div>
                  )}

                  <div className="flex-row gap-sm" style={{ marginTop: '24px' }}>
                    <button type="button" onClick={() => { setShowUpload(false); setUploadFile(null); }} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    <button onClick={handleUpload} disabled={!uploadFile} className={`btn btn-primary-gradient ${!uploadFile ? 'btn-disabled' : ''}`} style={{ flex: 1 }}>Parse & Import</button>
                  </div>
                </>
              ) : (
                <div className="flex-col items-center gap-md" style={{ padding: '32px 0' }}>
                  <div className="spinner" />
                  <p className="text-muted">Parsing your resume with AI...</p>
                  <p className="text-xs">This may take up to a minute</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
