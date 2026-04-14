// ============================================
// DashboardPage.jsx - Resume Dashboard
// ============================================

import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import { getResumes, deleteResume } from '../../services/resumeService.js';
import { HiTrash, HiClock, HiDocumentText, HiSparkles } from 'react-icons/hi2';
import TEMPLATES from '../../constants/templates.js';

function DashboardPage() {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Delete this resume? This cannot be undone.')) return;
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success('Resume deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const getTemplate = (id) => TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];

  return (
    <div className="page-bg min-h-screen">
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="heading-lg">My Resumes</h1>
            <p className="text-muted mt-xs">
              {resumes.length} resume{resumes.length !== 1 ? 's' : ''} created
            </p>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex-center" style={{ padding: '80px 0' }}>
            <div className="spinner" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && resumes.length === 0 && (
          <div className="empty-state">
            <div className="icon-circle icon-circle-purple mb-md">
              <HiDocumentText style={{ fontSize: '28px' }} />
            </div>
            <h3 className="heading-sm mb-xs">No resumes yet</h3>
            <p className="text-muted mb-lg">Head to the Home page to create your first AI-powered resume</p>
          </div>
        )}

        {/* Resume Grid */}
        {!isLoading && resumes.length > 0 && (
          <div className="grid-auto">
            {resumes.map((resume) => {
              const template = getTemplate(resume.templateId);
              return (
                <div
                  key={resume._id}
                  onClick={() => navigate(`/builder/${resume._id}`)}
                  className="resume-card"
                >
                  {/* Template color bar */}
                  <div
                    className="resume-card-bar"
                    style={{ background: `linear-gradient(90deg, ${template.colors.primary}, ${template.colors.accent})` }}
                  />
                  <div className="resume-card-body">
                    <div className="flex-between mb-sm">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 className="heading-sm truncate">{resume.title}</h3>
                        {resume.targetRole && (
                          <p className="text-xs truncate" style={{ marginTop: '2px' }}>{resume.targetRole}</p>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleDelete(resume._id, e)}
                        className="btn-icon-sm btn-ghost text-danger"
                        style={{ opacity: 0.4 }}
                      >
                        <HiTrash style={{ fontSize: '14px' }} />
                      </button>
                    </div>

                    {/* ATS Score */}
                    {resume.atsScore?.overall > 0 && (
                      <div className="flex-row items-center gap-sm mb-sm">
                        <HiSparkles style={{ color: '#d97706', fontSize: '14px' }} />
                        <div className="resume-card-score-bar">
                          <div
                            style={{
                              height: '100%',
                              borderRadius: '2px',
                              width: `${resume.atsScore.overall}%`,
                              backgroundColor: resume.atsScore.overall >= 80 ? '#16a34a'
                                : resume.atsScore.overall >= 60 ? '#d97706'
                                : '#dc2626',
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{resume.atsScore.overall}</span>
                      </div>
                    )}

                    <div className="flex-between">
                      <div className="flex-row items-center gap-xs">
                        <HiClock style={{ fontSize: '12px', color: '#9ca3af' }} />
                        <span className="text-xs">{formatDate(resume.updatedAt)}</span>
                      </div>
                      <span
                        className="badge"
                        style={{ background: template.colors.light, color: template.colors.primary }}
                      >
                        {template.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
