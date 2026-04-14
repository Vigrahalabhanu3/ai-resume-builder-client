// ============================================
// resumeService.js - Resume API Calls
// ============================================
// Reference: fetch(), async/await - reference-javascript.md

import API from './api.js';

const createResume = async (data = {}) => {
  const response = await API.post('/resumes', data);
  return response.data;
};

const getResumes = async () => {
  const response = await API.get('/resumes');
  return response.data;
};

const getResume = async (id) => {
  const response = await API.get(`/resumes/${id}`);
  return response.data;
};

const updateResume = async (id, data) => {
  const response = await API.put(`/resumes/${id}`, data);
  return response.data;
};

const updateSection = async (id, section, data) => {
  const response = await API.put(`/resumes/${id}/sections/${section}`, { data });
  return response.data;
};

const updateTemplate = async (id, templateId) => {
  const response = await API.put(`/resumes/${id}/template`, { templateId });
  return response.data;
};

const deleteResume = async (id) => {
  const response = await API.delete(`/resumes/${id}`);
  return response.data;
};

const saveVersion = async (resumeId, label) => {
  const response = await API.post(`/versions/${resumeId}`, { label });
  return response.data;
};

const getVersions = async (resumeId) => {
  const response = await API.get(`/versions/${resumeId}`);
  return response.data;
};

const restoreVersion = async (resumeId, versionId) => {
  const response = await API.post(`/versions/${resumeId}/${versionId}/restore`);
  return response.data;
};

const deleteVersion = async (resumeId, versionId) => {
  const response = await API.delete(`/versions/${resumeId}/${versionId}`);
  return response.data;
};

const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await API.post('/resumes/upload', formData);
  return response.data;
};

export {
  createResume, getResumes, getResume,
  updateResume, updateSection, updateTemplate, deleteResume,
  saveVersion, getVersions, restoreVersion, deleteVersion,
  uploadResume,
};
