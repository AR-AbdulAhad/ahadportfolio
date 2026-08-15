import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// GET /api/projects/:id (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching project' });
  }
});

// POST /api/projects (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, category, description, techStack, imageUrl, liveUrl, githubUrl, featured, displayOrder } = req.body;
    const project = await prisma.project.create({
      data: {
        title,
        category: category || 'Full Stack',
        description,
        techStack: typeof techStack === 'object' ? JSON.stringify(techStack) : techStack,
        imageUrl: imageUrl || '',
        liveUrl: liveUrl || '',
        githubUrl: githubUrl || '',
        featured: Boolean(featured),
        displayOrder: Number(displayOrder) || 0,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
});

// PUT /api/projects/:id (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, techStack, imageUrl, liveUrl, githubUrl, featured, displayOrder } = req.body;
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        category,
        description,
        techStack: typeof techStack === 'object' ? JSON.stringify(techStack) : techStack,
        imageUrl,
        liveUrl,
        githubUrl,
        featured: Boolean(featured),
        displayOrder: Number(displayOrder),
      },
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error updating project' });
  }
});

// DELETE /api/projects/:id (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project' });
  }
});

export default router;
