const API_BASE_URL = 'http://localhost:5000/api';

const request = async (url: string, options: RequestInit = {}) => {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn(`API request error on ${url}:`, e);
    return null;
  }
};

export const fetchHero = async () => await request('/hero');
export const updateHero = async (data: any) => await request('/hero', { method: 'PUT', body: JSON.stringify(data) });

export const fetchAbout = async () => await request('/about');
export const updateAbout = async (data: any) => await request('/about', { method: 'PUT', body: JSON.stringify(data) });

export const fetchSkills = async () => await request('/skills');
export const createSkill = async (data: any) => await request('/skills', { method: 'POST', body: JSON.stringify(data) });
export const updateSkill = async (id: string, data: any) => await request(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteSkill = async (id: string) => await request(`/skills/${id}`, { method: 'DELETE' });

export const fetchProjects = async () => await request('/projects');
export const createProject = async (data: any) => await request('/projects', { method: 'POST', body: JSON.stringify(data) });
export const updateProject = async (id: string, data: any) => await request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProject = async (id: string) => await request(`/projects/${id}`, { method: 'DELETE' });

export const fetchExperience = async () => await request('/experience');
export const createExperience = async (data: any) => await request('/experience', { method: 'POST', body: JSON.stringify(data) });
export const deleteExperience = async (id: string) => await request(`/experience/${id}`, { method: 'DELETE' });

export const fetchContactMessages = async () => await request('/contact');
export const deleteContactMessage = async (id: string) => await request(`/contact/${id}`, { method: 'DELETE' });
