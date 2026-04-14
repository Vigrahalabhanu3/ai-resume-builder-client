// ============================================
// BuilderPage.jsx - Main Resume Builder Page
// ============================================
// Split-screen layout with sidebar editor on left
// and live resume preview on right.
// Handles auto-save with 3-second debounce.
// ============================================

import './index.css';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ResumeProvider, ResumeContext } from '../../context/ResumeContext.jsx';
import { getResume, updateResume } from '../../services/resumeService.js';
import Navbar from '../../components/Navbar';
import ProgressBar from '../../components/ProgressBar';
import Sidebar from '../../components/Sidebar';
import ResumePreview from '../../components/ResumePreview';
import { HiCheckCircle, HiArrowPath } from 'react-icons/hi2';

function BuilderContent() {
  const { id } = useParams();
  const {
    resume, loadResume, getCompletionPercentage,
    isSaving, setIsSaving, lastSaved, setLastSaved,
    hasChanges, setHasChanges,
  } = useContext(ResumeContext);
  const [isLoading, setIsLoading] = useState(true);

  // Load resume on mount
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResume(id);
        loadResume(data);
      } catch (error) {
        toast.error('Failed to load resume');
      }
      setIsLoading(false);
    };

    fetchResume();
  }, [id]);

  // Auto-save with 3-second debounce
  useEffect(() => {
    if (!hasChanges || !resume._id) return;

    const timer = setTimeout(async () => {
      setIsSaving(true);
      try {
        await updateResume(resume._id, {
          title: resume.title,
          templateId: resume.templateId,
          targetRole: resume.targetRole,
          jobDescription: resume.jobDescription,
          sections: resume.sections,
        });
        setLastSaved(new Date());
        setHasChanges(false);
      } catch (error) {
        toast.error('Failed to save changes');
      }
      setIsSaving(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasChanges, resume]);

  const formatLastSaved = () => {
    if (!lastSaved) return '';
    return lastSaved.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="page-bg min-h-screen flex-center">
        <div className="flex-col items-center gap-sm">
          <div className="spinner" />
          <p className="text-muted">Loading resume...</p>
        </div>
      </div>
    );
  }

  const percentage = getCompletionPercentage();

  return (
    <div className="flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
      <Navbar title={resume.title} showBack />

      {/* Progress bar + save indicator */}
      <div className="flex-row items-center gap-md px-lg py-sm border-bottom shrink-0" style={{ background: '#ffffff' }}>
        <div className="flex-1">
          <ProgressBar percentage={percentage} />
        </div>
        <div className="flex-row items-center gap-xs shrink-0">
          {isSaving ? (
            <>
              <HiArrowPath className="spinner-sm" style={{ fontSize: '14px' }} />
              <span className="text-xs">Saving...</span>
            </>
          ) : lastSaved ? (
            <>
              <HiCheckCircle style={{ fontSize: '14px', color: '#16a34a' }} />
              <span className="text-xs">Saved at {formatLastSaved()}</span>
            </>
          ) : null}
        </div>
      </div>

      {/* Split layout */}
      <div className="builder-layout">
        {/* Left panel - Sidebar */}
        <div className="builder-sidebar">
          <Sidebar />
        </div>

        {/* Right panel - Preview */}
        <div className="builder-preview">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}

function BuilderPage() {
  return (
    <ResumeProvider>
      <BuilderContent />
    </ResumeProvider>
  );
}

export default BuilderPage;
