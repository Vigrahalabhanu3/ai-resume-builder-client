// ============================================
// sectionTypes.js - Resume Section Definitions
// ============================================

import { HiUser, HiBriefcase, HiAcademicCap, HiSparkles, HiWrenchScrewdriver, HiDocumentText, HiTrophy } from 'react-icons/hi2';

const SECTION_TYPES = [
  { id: 'personalInfo', label: 'Personal Info', icon: HiUser },
  { id: 'summary', label: 'Summary', icon: HiDocumentText },
  { id: 'experience', label: 'Experience', icon: HiBriefcase },
  { id: 'education', label: 'Education', icon: HiAcademicCap },
  { id: 'skills', label: 'Skills', icon: HiWrenchScrewdriver },
  { id: 'projects', label: 'Projects', icon: HiSparkles },
  { id: 'certifications', label: 'Certifications', icon: HiTrophy },
];

export default SECTION_TYPES;
