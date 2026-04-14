// ============================================
// VersionCard.jsx - Single Resume Version Card
// ============================================
// Displays version metadata with restore/delete actions.
// ATS score badge is color-coded by threshold.
// ============================================

import './index.css';
import { HiArrowPath, HiTrash, HiClock } from 'react-icons/hi2';

function VersionCard({ version, onRestore, onDelete }) {
  const getScoreBadge = (score) => {
    if (score >= 80) return 'version-badge badge-success';
    if (score >= 60) return 'version-badge badge-warning';
    return 'version-badge badge-danger';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="version-card">
      {/* Top Row: Label + Version */}
      <div className="flex-between items-center mb-sm">
        <div>
          <h3 className="heading-sm">
            {version.label || `Version ${version.versionNumber}`}
          </h3>
          <span className="text-xs text-muted">v{version.versionNumber}</span>
        </div>
        {version.atsScore != null && (
          <span className={getScoreBadge(version.atsScore)}>
            ATS: {version.atsScore}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex-row items-center gap-sm mb-sm text-xs text-muted">
        <span className="flex-row items-center gap-sm">
          <HiClock />
          {formatDate(version.createdAt)}
        </span>
        {version.templateId && (
          <span className="badge">{version.templateId}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex-row items-center gap-sm">
        <button
          onClick={() => onRestore(version._id)}
          className="btn btn-primary btn-sm grow flex-row flex-center items-center gap-sm"
        >
          <HiArrowPath />
          Restore
        </button>
        <button
          onClick={() => onDelete(version._id)}
          className="btn btn-danger btn-sm flex-row flex-center items-center gap-sm"
        >
          <HiTrash />
        </button>
      </div>
    </div>
  );
}

export default VersionCard;
