// ============================================
// VersionsPage.jsx - Resume Version Management
// ============================================
// Lists all saved versions of a resume.
// Supports save, restore, and delete operations.
// ============================================

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import VersionList from '../../components/VersionList';
import { getVersions, saveVersion, restoreVersion, deleteVersion } from '../../services/resumeService.js';
import { HiPlus, HiClock } from 'react-icons/hi2';

function VersionsPage() {
  const { id: resumeId } = useParams();
  const [versions, setVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [versionLabel, setVersionLabel] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchVersions();
  }, [resumeId]);

  const fetchVersions = async () => {
    try {
      setIsLoading(true);
      const data = await getVersions(resumeId);
      setVersions(data);
    } catch (error) {
      toast.error('Failed to load versions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveVersion = async () => {
    if (!versionLabel.trim()) {
      toast.error('Please enter a version label');
      return;
    }
    try {
      setIsSaving(true);
      await saveVersion(resumeId, versionLabel.trim());
      toast.success('Version saved successfully');
      setShowSavePrompt(false);
      setVersionLabel('');
      fetchVersions();
    } catch (error) {
      toast.error('Failed to save version');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestore = async (versionId) => {
    try {
      await restoreVersion(resumeId, versionId);
      toast.success('Version restored successfully');
    } catch (error) {
      toast.error('Failed to restore version');
    }
  };

  const handleDelete = async (versionId) => {
    try {
      await deleteVersion(resumeId, versionId);
      toast.success('Version deleted');
      setVersions((prev) => prev.filter((v) => v._id !== versionId));
    } catch (error) {
      toast.error('Failed to delete version');
    }
  };

  return (
    <div className="page-bg min-h-screen flex-col">
      <Navbar title="Version History" showBack />

      <div className="flex-1 p-lg" style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div className="flex-between mb-lg">
          <div>
            <h1 className="heading-md">Version History</h1>
            <p className="text-muted mt-xs">
              Save snapshots and restore previous versions of your resume
            </p>
          </div>
          <button onClick={() => setShowSavePrompt(true)} className="btn btn-primary btn-sm">
            <HiPlus style={{ fontSize: '18px' }} />
            Save Current Version
          </button>
        </div>

        {/* Save Prompt */}
        {showSavePrompt && (
          <div className="card mb-lg">
            <label className="label-text">Version Label</label>
            <div className="flex-row items-center gap-sm">
              <input
                type="text"
                value={versionLabel}
                onChange={(e) => setVersionLabel(e.target.value)}
                placeholder="e.g., Before AI review, Final draft..."
                className="input-field"
                onKeyDown={(e) => e.key === 'Enter' && handleSaveVersion()}
              />
              <button
                onClick={handleSaveVersion}
                disabled={isSaving}
                className={`btn btn-primary btn-sm ${isSaving ? 'btn-disabled' : ''}`}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => { setShowSavePrompt(false); setVersionLabel(''); }}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="flex-center" style={{ padding: '80px 0' }}>
            <div className="spinner" />
          </div>
        ) : versions.length === 0 ? (
          <div className="empty-state">
            <div className="icon-circle icon-circle-purple mb-md" style={{ backgroundColor: '#f3e8ff' }}>
              <HiClock style={{ fontSize: '28px', color: '#9ca3af' }} />
            </div>
            <h3 className="heading-sm mb-xs">No versions yet</h3>
            <p className="text-muted" style={{ maxWidth: '360px' }}>
              Save a version to create a snapshot of your current resume. You can restore it anytime.
            </p>
          </div>
        ) : (
          <VersionList
            versions={versions}
            resumeId={resumeId}
            onRestore={handleRestore}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default VersionsPage;
