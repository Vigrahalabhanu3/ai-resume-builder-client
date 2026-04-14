// ============================================
// ProgressBar.jsx - Resume Completion Progress
// ============================================

import './index.css';

function ProgressBar({ percentage }) {
  const getFillClass = () => {
    if (percentage >= 80) return 'progress-fill-green';
    if (percentage >= 50) return 'progress-fill-amber';
    return 'progress-fill-purple';
  };

  return (
    <div className="flex-row items-center gap-sm">
      <div className="progress-track">
        <div
          className={`progress-fill ${getFillClass()}`}
          style={{ width: `${percentage}%`, transition: 'width 0.5s ease-out' }}
        />
      </div>
      <span className="text-xs font-semibold" style={{ minWidth: '36px', textAlign: 'right' }}>
        {percentage}%
      </span>
    </div>
  );
}

export default ProgressBar;
