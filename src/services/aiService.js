// ============================================
// aiService.js - AI API Calls
// ============================================
// Reference: fetch(), async/await - reference-javascript.md

import API from './api.js';

const chatWithAgent = async (resumeId, message, sectionTargeted = '') => {
  const response = await API.post('/ai/chat', { resumeId, message, sectionTargeted });
  return response.data;
};

const generateBullets = async (data) => {
  const response = await API.post('/ai/generate-bullets', data);
  return response.data;
};

const generateSummary = async (resumeId) => {
  const response = await API.post('/ai/generate-summary', { resumeId });
  return response.data;
};

const getAtsScore = async (resumeId, jobDescription) => {
  const response = await API.post('/ai/ats-score', { resumeId, jobDescription });
  return response.data;
};

const reviewResume = async (resumeId) => {
  const response = await API.post('/ai/review', { resumeId });
  return response.data;
};

const matchJob = async (resumeId, jobDescription) => {
  const response = await API.post('/ai/match-job', { resumeId, jobDescription });
  return response.data;
};

const detectSkillGaps = async (resumeId, jobDescription) => {
  const response = await API.post('/ai/skill-gaps', { resumeId, jobDescription });
  return response.data;
};

const getChatHistory = async (resumeId) => {
  const response = await API.get(`/ai/chat-history/${resumeId}`);
  return response.data;
};

export {
  chatWithAgent, generateBullets, generateSummary,
  getAtsScore, reviewResume, matchJob, detectSkillGaps, getChatHistory,
};
