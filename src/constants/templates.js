const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic Professional',
    category: 'professional',
    description: 'Traditional single-column ATS-friendly layout',
    colors: { primary: '#1e3a5f', accent: '#2563eb', text: '#1e293b', light: '#f1f5f9' },
    font: 'Georgia, serif',
    thumbnail: '/templates/classic.png',
  },
  {
    id: 'modern',
    name: 'Modern Tech',
    category: 'modern',
    description: 'Contemporary two-column design with sidebar',
    colors: { primary: '#0f172a', accent: '#6366f1', text: '#1e293b', light: '#eef2ff' },
    font: "'Inter', sans-serif",
    thumbnail: '/templates/modern.png',
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    category: 'creative',
    description: 'Eye-catching layout with vibrant accents',
    colors: { primary: '#7c3aed', accent: '#ec4899', text: '#1e293b', light: '#fdf4ff' },
    font: "'Inter', sans-serif",
    thumbnail: '/templates/creative.png',
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    category: 'minimal',
    description: 'Elegant simplicity with generous whitespace',
    colors: { primary: '#374151', accent: '#6b7280', text: '#1f2937', light: '#f9fafb' },
    font: "'Inter', sans-serif",
    thumbnail: '/templates/minimal.png',
  },
  {
    id: 'executive',
    name: 'Executive',
    category: 'executive',
    description: 'Dark header with structured professional layout',
    colors: { primary: '#1e1b4b', accent: '#4f46e5', text: '#1e293b', light: '#eef2ff' },
    font: "'Playfair Display', serif",
    thumbnail: '/templates/executive.png',
  },
];

export default TEMPLATES;
