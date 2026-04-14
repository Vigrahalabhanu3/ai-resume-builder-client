// ============================================
// BulletPointEditor.jsx - Editable Bullet Points
// ============================================
// Manages an array of bullet strings with add,
// delete, edit, and AI improve functionality.
// ============================================

import { useState } from 'react';
import { generateBullets } from '../../services/aiService.js';
import { HiPlus, HiXMark, HiSparkles } from 'react-icons/hi2';
import toast from 'react-hot-toast';

function BulletPointEditor({ bullets, onChange, resumeId, context }) {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const addBullet = () => {
    onChange([...bullets, '']);
  };

  const updateBullet = (index, value) => {
    const updated = bullets.map((b, i) => (i === index ? value : b));
    onChange(updated);
  };

  const deleteBullet = (index) => {
    const updated = bullets.filter((_, i) => i !== index);
    onChange(updated);
  };

  const improveBullet = async (index) => {
    const bullet = bullets[index];
    if (!bullet.trim()) {
      toast.error('Write a bullet point first');
      return;
    }
    setLoadingIndex(index);
    try {
      const result = await generateBullets({
        resumeId,
        rawExperience: bullet,
        company: context?.company || '',
        role: context?.role || '',
      });
      const improved = result.bullets?.[0] || result;
      if (typeof improved === 'string') {
        updateBullet(index, improved);
        toast.success('Bullet improved!');
      }
    } catch (error) {
      toast.error('Failed to improve bullet');
    }
    setLoadingIndex(null);
  };

  return (
    <div>
      {bullets.map((bullet, index) => (
        <div key={index} className="flex-row items-start gap-xs mb-xs">
          <span className="text-muted mt-xs shrink-0">&#8226;</span>
          <input
            type="text"
            value={bullet}
            onChange={(e) => updateBullet(index, e.target.value)}
            className="input-field flex-1"
            placeholder="Describe an achievement or responsibility..."
          />
          <button
            onClick={() => improveBullet(index)}
            disabled={loadingIndex === index}
            className={`btn-icon-sm text-purple cursor-pointer ${loadingIndex === index ? 'btn-disabled' : ''}`}
            title="AI Improve"
          >
            {loadingIndex === index ? (
              <div className="spinner spinner-sm" />
            ) : (
              <HiSparkles />
            )}
          </button>
          <button
            onClick={() => deleteBullet(index)}
            className="btn-icon-sm text-danger cursor-pointer"
          >
            <HiXMark />
          </button>
        </div>
      ))}

      <button
        onClick={addBullet}
        className="btn btn-ghost btn-sm mt-xs"
      >
        <HiPlus />
        Add Bullet
      </button>
    </div>
  );
}

export default BulletPointEditor;
