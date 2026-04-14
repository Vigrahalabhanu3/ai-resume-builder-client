// ============================================
// TemplateSelector.jsx - Template Grid (Sidebar)
// ============================================
// Horizontal scrollable template list for the
// builder sidebar. Using React Context (React: useContext)
// ============================================

import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import TEMPLATES from '../../constants/templates.js';
import TemplateCard from '../TemplateCard';

function TemplateSelector() {
  const { resume, updateTemplate } = useContext(ResumeContext);

  return (
    <div style={{ padding: '16px' }}>
      <h3 className="heading-md" style={{ marginBottom: '4px' }}>Choose a Template</h3>
      <p className="text-muted text-sm" style={{ marginBottom: '16px' }}>
        Select a design that fits your style.
      </p>

      <div className="template-selector-grid">
        {TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isActive={resume.templateId === template.id}
            onSelect={() => updateTemplate(template.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;
