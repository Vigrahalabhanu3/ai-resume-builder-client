// ============================================
// AtsScoreCircle.jsx - Animated Circular Score
// ============================================
// SVG circle with stroke-dasharray animation.
// Color changes based on score threshold.
// ============================================

import { useState, useEffect } from 'react';

function AtsScoreCircle({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let frame;
    let start = 0;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return '#7c3aed'; // purple-600
    if (score >= 60) return '#a78bfa'; // purple-400
    return '#ef4444'; // red-500
  };

  const getLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="score-circle-container">
      <div className="score-ring">
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e9e0f5"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 0.3s ease',
            }}
          />
        </svg>
        <div className="score-value">
          <span className="heading-md font-bold">{animatedScore}</span>
          <span className="text-xs text-muted">/ 100</span>
        </div>
      </div>
      <span className="score-label" style={{ backgroundColor: `${getColor()}20`, color: getColor() }}>
        {getLabel()}
      </span>
    </div>
  );
}

export default AtsScoreCircle;
