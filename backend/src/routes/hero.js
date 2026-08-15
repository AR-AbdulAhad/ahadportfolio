import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/hero (public)
router.get('/', async (req, res) => {
  try {
    let hero = await prisma.heroContent.findFirst();
    if (!hero) {
      hero = await prisma.heroContent.create({
        data: {
          pretitle: 'Hello World',
          name: 'Abdul Ahad',
          title: 'Full-Stack Developer',
          tagline: 'Building modern, high-performance web applications with React, Next.js, Node.js, Express, Prisma, MySQL & 3D Interactive experiences.',
          resumeUrl: '/resume.pdf',
        },
      });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching hero content' });
  }
});

// PUT /api/hero (protected)
router.put('/', authenticateToken, async (req, res) => {
  try {
    const { pretitle, name, title, tagline, resumeUrl } = req.body;
    let hero = await prisma.heroContent.findFirst();
    
    if (hero) {
      hero = await prisma.heroContent.update({
        where: { id: hero.id },
        data: { pretitle, name, title, tagline, resumeUrl },
      });
    } else {
      hero = await prisma.heroContent.create({
        data: { pretitle, name, title, tagline, resumeUrl },
      });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Error updating hero content' });
  }
});

export default router;
