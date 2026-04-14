// ============================================
// SummaryForm.jsx - Professional Summary Editor
// ============================================
// Textarea for the resume summary section with
// AI generate button.
// ============================================

import { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import { generateSummary } from '../../services/aiService.js';
import { HiSparkles } from 'react-icons/hi2';
import toast from 'react-hot-toast';

function SummaryForm() {
  const { resume, updateSection } = useContext(ResumeContext);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    updateSection('summary', e.target.value);
  };

  const handleGenerate = async () => {
    if (!resume._id) return;
    setIsGenerating(true);
    try {
      const result = await generateSummary(resume._id);
      updateSection('summary', result.summary || result);
      toast.success('Summary generated!');
    } catch (error) {
      toast.error('Failed to generate summary');
    }
    setIsGenerating(false);
  };

  return (
    <div>
      <div className="flex-between mb-sm">
        <label className="label-text" style={{ marginBottom: 0 }}>
          Professional Summary
        </label>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`btn btn-outline btn-sm ${isGenerating ? 'btn-disabled' : ''}`}
        >
          <HiSparkles />
          {isGenerating ? 'Generating...' : 'AI Generate'}
        </button>
      </div>
      <textarea
        value={resume.sections.summary || ''}
        onChange={handleChange}
        rows={5}
        className="textarea-field"
        placeholder="Write a brief professional summary highlighting your key achievements and career goals..."
      />
      <p className="text-xs mt-sm">
        {(resume.sections.summary || '').split(/\s+/).filter(Boolean).length} words
      </p>
    </div>
  );
}

export default SummaryForm;
