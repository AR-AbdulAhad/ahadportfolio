import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.js';
import heroRoutes from './routes/hero.js';
import aboutRoutes from './routes/about.js';
import skillsRoutes from './routes/skills.js';
import projectsRoutes from './routes/projects.js';
import experienceRoutes from './routes/experience.js';
import testimonialsRoutes from './routes/testimonials.js';
import contactRoutes from './routes/contact.js';
import socialsRoutes from './routes/socials.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup allowing portfolio and dashboard origins
app.use(
  cors({
    origin: '*', // Allow all during development or specific client URLs
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/socials', socialsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Abdul Ahad Portfolio API is running smoothly' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Abdul Ahad Portfolio API server running on http://localhost:${PORT}`);
});
