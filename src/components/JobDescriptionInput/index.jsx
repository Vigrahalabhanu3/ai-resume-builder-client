// ============================================
// JobDescriptionInput.jsx - JD Paste Textarea
// ============================================
// Large textarea for pasting job descriptions
// with an "Analyze Match" button.
// ============================================

import { HiMagnifyingGlass } from 'react-icons/hi2';

function JobDescriptionInput({ value, onChange, onAnalyze, isLoading }) {
  return (
    <div className="form-group">
      <label className="label-text">Job Description</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="textarea-field"
        placeholder="Paste the full job description here to analyze your resume match..."
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading || !value.trim()}
        className={`btn btn-primary-gradient btn-full ${isLoading || !value.trim() ? 'btn-disabled' : ''}`}
      >
        {isLoading ? (
          <>
            <div className="spinner spinner-sm" />
            Analyzing...
          </>
        ) : (
          <>
            <HiMagnifyingGlass />
            Analyze Match
          </>
        )}
      </button>
    </div>
  );
}

export default JobDescriptionInput;
