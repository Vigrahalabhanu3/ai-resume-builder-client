// ============================================
// ResumePreview.jsx - Live Resume Preview Panel
// ============================================
// Right-side panel that renders a live A4 preview
// of the resume using the selected template.
// Supports PDF download via lazy-loaded @react-pdf/renderer.
// ============================================

import './index.css';
import { useContext, useRef, useState, useEffect } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import TEMPLATES from '../../constants/templates.js';
import ClassicTemplate from '../templates/ClassicTemplate.jsx';
import ModernTemplate from '../templates/ModernTemplate.jsx';
import CreativeTemplate from '../templates/CreativeTemplate.jsx';
import MinimalTemplate from '../templates/MinimalTemplate.jsx';
import ExecutiveTemplate from '../templates/ExecutiveTemplate.jsx';
import { HiArrowDownTray } from 'react-icons/hi2';

function ResumePreview() {
  const { resume } = useContext(ResumeContext);
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const [scale, setScale] = useState(0.5);
  const [isDownloading, setIsDownloading] = useState(false);

  const template = TEMPLATES.find((t) => t.id === resume.templateId) || TEMPLATES[0];
  const colors = template.colors;

  // A4 dimensions in px (at 96dpi): 794 x 1123
  const A4_WIDTH = 794;

  const updateScale = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 32;
      const newScale = Math.min(containerWidth / A4_WIDTH, 0.95);
      setScale(newScale);
    }
  };

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const renderTemplate = () => {
    const props = { sections: resume.sections, colors };

    switch (resume.templateId) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
      case 'executive':
        return <ExecutiveTemplate {...props} />;
      case 'classic':
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { default: PdfDocument } = await import('../PdfDocument/index.jsx');

      const blob = await pdf(<PdfDocument resume={resume} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resume.title || 'resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="preview-container h-full flex-col">
      {/* Toolbar */}
      <div className="preview-toolbar flex-between items-center shrink-0">
        <span className="text-sm font-semibold">Preview</span>
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="btn btn-primary btn-sm flex-row items-center gap-sm"
        >
          <HiArrowDownTray />
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {/* A4 Preview Container */}
      <div ref={containerRef} className="preview-paper-area">
        <div
          ref={previewRef}
          className="preview-paper"
          style={{
            width: A4_WIDTH,
            minHeight: 1123,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            marginBottom: -(1123 * (1 - scale)),
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
