// ============================================
// VersionList.jsx - Version Grid Display
// ============================================
// Maps an array of versions to VersionCard components.
// ============================================

import VersionCard from '../VersionCard';

function VersionList({ versions, resumeId, onRestore, onDelete }) {
  return (
    <div className="grid-3">
      {versions.map((version) => (
        <VersionCard
          key={version._id}
          version={version}
          onRestore={onRestore}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default VersionList;
