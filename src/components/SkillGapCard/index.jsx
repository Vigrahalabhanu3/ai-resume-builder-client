// ============================================
// SkillGapCard.jsx - Missing Skills Display
// ============================================
// Shows missing skills with priority badges
// and improvement recommendations.
// ============================================

import { HiExclamationCircle, HiArrowTrendingUp } from 'react-icons/hi2';

function SkillGapCard({ missingSkills, recommendations }) {
  if (missingSkills.length === 0 && recommendations.length === 0) return null;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'badge badge-danger';
      case 'medium':
        return 'badge badge-warning';
      case 'low':
        return 'badge badge-purple';
      default:
        return 'badge';
    }
  };

  return (
    <div className="flex-col gap-md">
      {/* Missing Skills */}
      {missingSkills.length > 0 && (
        <div className="flex-col gap-sm">
          <div className="flex-row items-center gap-xs">
            <HiExclamationCircle className="text-purple" />
            <h3 className="section-title">Skill Gaps</h3>
          </div>
          <div className="flex-col gap-sm">
            {missingSkills.map((skill, index) => {
              const name = typeof skill === 'string' ? skill : skill.name;
              const priority = typeof skill === 'string' ? 'medium' : skill.priority;
              const suggestion = typeof skill === 'string' ? '' : skill.suggestion;

              return (
                <div key={index} className="flex-row items-center gap-sm p-sm card-sm">
                  <span className={`tag tag-purple ${getPriorityBadge(priority)}`}>
                    {name}
                  </span>
                  {suggestion && (
                    <p className="text-muted text-xs">{suggestion}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="flex-col gap-sm">
          <div className="flex-row items-center gap-xs">
            <HiArrowTrendingUp className="text-purple" />
            <h3 className="section-title">Recommendations</h3>
          </div>
          <div className="flex-col gap-xs">
            {recommendations.map((rec, index) => (
              <div key={index} className="suggestion-item">
                {typeof rec === 'string' ? rec : rec.text || rec.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillGapCard;
