import axios from 'axios';

const API_BASE_URL = 'https://api.abdulahad.run.place/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1500,
});

// Fallback Mock Data in case backend is offline during client dev
export const MOCK_DATA = {
  hero: {
    pretitle: 'Hello World',
    name: 'Abdul Ahad',
    title: 'Full-Stack Developer',
    tagline: 'Building modern, high-performance web & mobile applications with React, Next.js, Node.js, Express, Prisma, MySQL, MongoDB, Three.js & Flutter.',
    resumeUrl: '/resume.pdf',
  },
  about: {
    pretitle: 'About Me',
    title: 'Building High-Performance Full-Stack & 3D Web Apps',
    bio: 'I am Abdul Ahad, a full-stack developer dedicated to building production-grade web applications, interactive 3D experiences, and cross-platform mobile solutions. I combine strong engineering with high-end aesthetic design.',
    attentionGetter: 'Engineering robust full-stack applications with clean architecture, interactive 3D animations, and real-time backend functionality.',
    photoUrl: '/images/about-photo.jpg',
    experienceYears: 3,
    projectsCompleted: 25,
    satisfiedClients: 18,
  },
  skills: [
    { id: '1', name: 'React / Next.js', category: 'Frontend', proficiency: 95, icon: 'Code', displayOrder: 1 },
    { id: '2', name: 'Three.js / React Three Fiber', category: 'Frontend', proficiency: 88, icon: 'Box', displayOrder: 2 },
    { id: '3', name: 'Tailwind CSS / GSAP', category: 'Frontend', proficiency: 92, icon: 'Layout', displayOrder: 3 },
    { id: '4', name: 'Node.js & Express.js', category: 'Backend', proficiency: 90, icon: 'Server', displayOrder: 4 },
    { id: '5', name: 'Prisma ORM', category: 'Backend', proficiency: 92, icon: 'Database', displayOrder: 5 },
    { id: '6', name: 'MySQL & MongoDB', category: 'Database', proficiency: 88, icon: 'Database', displayOrder: 6 },
    { id: '7', name: 'Flutter & Firebase', category: 'Mobile', proficiency: 85, icon: 'Smartphone', displayOrder: 7 },
    { id: '8', name: 'REST APIs & JWT Auth', category: 'Backend', proficiency: 94, icon: 'Lock', displayOrder: 8 },
  ],
  projects: [
    {
      id: '1',
      title: 'Transformative 3D Portfolio',
      category: 'Full Stack',
      description: 'An interactive portfolio featuring scroll-driven Three.js 3D Optimus Prime transformation, custom shader lighting, lenis smooth scrolling, and dynamic CMS dashboard.',
      techStack: 'React, Three.js, R3F, Node.js, Express, Prisma, MySQL, Tailwind CSS',
      imageUrl: '/images/portfolio/fuji.jpg',
      liveUrl: 'https://ahad.dev',
      githubUrl: 'https://github.com/ahad/3d-portfolio',
      featured: true,
    },
    {
      id: '2',
      title: 'Full-Stack E-Commerce Platform',
      category: 'Full Stack',
      description: 'Comprehensive online store engine with real-time inventory management, Stripe payment processing, JWT authentication, and MySQL Prisma backend.',
      techStack: 'Next.js, Node.js, Express, Prisma, MySQL, Tailwind CSS',
      imageUrl: '/images/portfolio/lamp.jpg',
      liveUrl: 'https://ecommerce-demo.dev',
      githubUrl: 'https://github.com/ahad/fullstack-ecommerce',
      featured: true,
    },
    {
      id: '3',
      title: 'Cross-Platform Mobile Suite',
      category: 'Mobile',
      description: 'Flutter and Firebase powered mobile suite for seamless real-time messaging, push notifications, and offline data sync.',
      techStack: 'Flutter, Dart, Firebase, Node.js REST API',
      imageUrl: '/images/portfolio/rucksack.jpg',
      liveUrl: 'https://flutter-app.dev',
      githubUrl: 'https://github.com/ahad/flutter-mobile-app',
      featured: true,
    },
    {
      id: '4',
      title: 'Interactive Real-Time Analytics Dashboard',
      category: 'Full Stack',
      description: 'Sleek dark-themed admin dashboard with real-time CRUD operations, interactive data charts, file upload manager, and token authentication.',
      techStack: 'React, Express, Prisma, MySQL, Recharts, Tailwind CSS',
      imageUrl: '/images/portfolio/skaterboy.jpg',
      liveUrl: 'https://dashboard.ahad.dev',
      githubUrl: 'https://github.com/ahad/admin-dashboard',
      featured: false,
    },
  ],
  experience: [
    {
      id: '1',
      type: 'JOB',
      companyOrInstitution: 'Apex Tech Solutions',
      roleOrDegree: 'Senior Full-Stack Developer',
      timeframe: '2023 - Present',
      description: 'Architecting scalable web platforms, leading frontend 3D web design integration, and engineering high-throughput REST APIs using Express, Prisma, and MySQL.',
    },
    {
      id: '2',
      type: 'JOB',
      companyOrInstitution: 'Nexus Digital Lab',
      roleOrDegree: 'Frontend & React Developer',
      timeframe: '2021 - 2023',
      description: 'Developed responsive single-page web applications with React, Tailwind CSS, and Framer Motion, optimizing render speed and cross-browser performance.',
    },
    {
      id: '3',
      type: 'EDUCATION',
      companyOrInstitution: 'Institute of Software Engineering',
      roleOrDegree: 'B.S. in Computer Science',
      timeframe: '2018 - 2022',
      description: 'Focused on Data Structures, Database Systems (MySQL/MongoDB), Software Engineering Principles, and Web Development.',
    },
  ],
  testimonials: [
    {
      id: '1',
      authorName: 'Sarah Jenkins',
      authorRole: 'Product Director',
      company: 'InnovateX',
      text: 'Abdul Ahad delivered a breathtaking 3D interactive web application that completely transformed our visual brand. Highly skilled full-stack developer!',
      avatarUrl: '/images/avatars/user-01.jpg',
    },
    {
      id: '2',
      authorName: 'Michael Chen',
      authorRole: 'CTO',
      company: 'CloudMatrix',
      text: 'Clean code, exceptional backend architecture with Express & Prisma, and ultra-responsive frontend development. A true professional.',
      avatarUrl: '/images/avatars/user-02.jpg',
    },
  ],
  socials: [
    { id: '1', platform: 'GitHub', url: 'https://github.com', icon: 'Github' },
    { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
    { id: '3', platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
    { id: '4', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  ],
};

export const fetchHero = async () => {
  try {
    const res = await api.get('/hero');
    return res.data;
  } catch (e) {
    return MOCK_DATA.hero;
  }
};

export const fetchAbout = async () => {
  try {
    const res = await api.get('/about');
    return res.data;
  } catch (e) {
    return MOCK_DATA.about;
  }
};

export const fetchSkills = async () => {
  try {
    const res = await api.get('/skills');
    return res.data;
  } catch (e) {
    return MOCK_DATA.skills;
  }
};

export const fetchProjects = async () => {
  try {
    const res = await api.get('/projects');
    return res.data;
  } catch (e) {
    return MOCK_DATA.projects;
  }
};

export const fetchExperience = async () => {
  try {
    const res = await api.get('/experience');
    return res.data;
  } catch (e) {
    return MOCK_DATA.experience;
  }
};

export const fetchTestimonials = async () => {
  try {
    const res = await api.get('/testimonials');
    return res.data;
  } catch (e) {
    return MOCK_DATA.testimonials;
  }
};

export const fetchSocials = async () => {
  try {
    const res = await api.get('/socials');
    return res.data;
  } catch (e) {
    return MOCK_DATA.socials;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const res = await api.post('/contact', formData);
    return res.data;
  } catch (e) {
    throw e.response?.data?.error || 'Failed to submit contact message. Make sure the backend server is running.';
  }
};
