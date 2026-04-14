// ============================================
// BulletDiffView.jsx - AI Bullet Comparison
// ============================================
// Side-by-side view showing original vs AI-improved
// bullet points with accept/reject actions.
// ============================================

import './index.css';
import { HiCheck, HiXMark } from 'react-icons/hi2';

function BulletDiffView({ original, improved, onAccept, onReject }) {
  return (
    <div className="card card-flush overflow-hidden">
      <div className="grid-2" style={{ gap: 0 }}>
        {/* Original */}
        <div style={{ borderRight: '1px solid #e9d5ff' }}>
          <div className="diff-original" style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid #fecaca' }}>
            <span className="label-text text-danger" style={{ marginBottom: 0 }}>Original</span>
          </div>
          <div className="diff-original p-md" style={{ borderRadius: 0, border: 'none' }}>
            <p className="text-body">{original}</p>
          </div>
        </div>

        {/* Improved */}
        <div>
          <div className="diff-improved" style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid #bbf7d0' }}>
            <span className="label-text text-success" style={{ marginBottom: 0 }}>Improved</span>
          </div>
          <div className="diff-improved p-md" style={{ borderRadius: 0, border: 'none' }}>
            <p className="text-body">{improved}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex-row justify-end gap-sm p-sm border-bottom" style={{ background: '#faf5ff' }}>
        <button
          onClick={onReject}
          className="btn btn-outline btn-sm"
        >
          <HiXMark />
          Reject
        </button>
        <button
          onClick={onAccept}
          className="btn btn-primary btn-sm"
        >
          <HiCheck />
          Accept
        </button>
      </div>
    </div>
  );
}

export default BulletDiffView;
