import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/about (public)
router.get('/', async (req, res) => {
  try {
    let about = await prisma.aboutContent.findFirst();
    if (!about) {
      about = await prisma.aboutContent.create({
        data: {
          pretitle: 'About Me',
          title: 'Passionate Developer crafting dynamic, scalable applications',
          bio: 'I am Abdul Ahad, a dedicated Full-Stack Developer specializing in modern web architecture, interactive 3D web applications, and cross-platform mobile apps.',
          attentionGetter: 'Engineering robust full-stack applications with clean architecture, interactive 3D animations, and real-time backend functionality.',
          photoUrl: '/images/about-photo.jpg',
          experienceYears: 3,
          projectsCompleted: 24,
          satisfiedClients: 18,
        },
      });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching about content' });
  }
});

// PUT /api/about (protected)
router.put('/', authenticateToken, async (req, res) => {
  try {
    const { pretitle, title, bio, attentionGetter, photoUrl, experienceYears, projectsCompleted, satisfiedClients } = req.body;
    let about = await prisma.aboutContent.findFirst();
    
    const dataObj = {
      pretitle,
      title,
      bio,
      attentionGetter,
      photoUrl,
      experienceYears: Number(experienceYears) || 0,
      projectsCompleted: Number(projectsCompleted) || 0,
      satisfiedClients: Number(satisfiedClients) || 0,
    };

    if (about) {
      about = await prisma.aboutContent.update({
        where: { id: about.id },
        data: dataObj,
      });
    } else {
      about = await prisma.aboutContent.create({
        data: dataObj,
      });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: 'Error updating about content' });
  }
});

export default router;
