// ============================================
// atsMetrics.js - ATS Scoring Metric Definitions
// ============================================

const ATS_METRICS = [
  { key: 'keywordMatch', label: 'Keyword Match', weight: '20%', description: 'JD keywords found in resume' },
  { key: 'bulletQuality', label: 'Bullet Quality', weight: '15%', description: 'STAR method, specificity, impact' },
  { key: 'formatting', label: 'Formatting', weight: '10%', description: 'Standard headers, clean structure' },
  { key: 'sectionCompleteness', label: 'Completeness', weight: '10%', description: 'All key sections present' },
  { key: 'summaryStrength', label: 'Summary', weight: '10%', description: 'Relevance and conciseness' },
  { key: 'skillCoverage', label: 'Skill Coverage', weight: '10%', description: 'JD skills vs resume skills' },
  { key: 'quantification', label: 'Metrics & Numbers', weight: '10%', description: 'Bullets with quantified results' },
  { key: 'actionVerbs', label: 'Action Verbs', weight: '5%', description: 'Strong verbs leading bullets' },
  { key: 'length', label: 'Length', weight: '5%', description: 'Appropriate word count' },
  { key: 'contactInfo', label: 'Contact Info', weight: '5%', description: 'Email, phone, LinkedIn' },
];

export default ATS_METRICS;
