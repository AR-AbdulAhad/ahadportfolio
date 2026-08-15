import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/skills (public)
router.get('/', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skills' });
  }
});

// POST /api/skills (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, category, proficiency, icon, displayOrder } = req.body;
    const skill = await prisma.skill.create({
      data: {
        name,
        category: category || 'Frontend',
        proficiency: Number(proficiency) || 80,
        icon: icon || 'Code',
        displayOrder: Number(displayOrder) || 0,
      },
    });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Error creating skill' });
  }
});

// PUT /api/skills/:id (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, proficiency, icon, displayOrder } = req.body;
    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        category,
        proficiency: Number(proficiency),
        icon,
        displayOrder: Number(displayOrder),
      },
    });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Error updating skill' });
  }
});

// DELETE /api/skills/:id (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting skill' });
  }
});

export default router;
