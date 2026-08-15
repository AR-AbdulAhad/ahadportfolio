import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/experience (public)
router.get('/', async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching experiences' });
  }
});

// POST /api/experience (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, companyOrInstitution, roleOrDegree, timeframe, description, displayOrder } = req.body;
    const exp = await prisma.experience.create({
      data: {
        type: type || 'JOB',
        companyOrInstitution,
        roleOrDegree,
        timeframe,
        description,
        displayOrder: Number(displayOrder) || 0,
      },
    });
    res.status(201).json(exp);
  } catch (error) {
    res.status(500).json({ error: 'Error creating experience record' });
  }
});

// PUT /api/experience/:id (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { type, companyOrInstitution, roleOrDegree, timeframe, description, displayOrder } = req.body;
    const exp = await prisma.experience.update({
      where: { id },
      data: {
        type,
        companyOrInstitution,
        roleOrDegree,
        timeframe,
        description,
        displayOrder: Number(displayOrder),
      },
    });
    res.json(exp);
  } catch (error) {
    res.status(500).json({ error: 'Error updating experience record' });
  }
});

// DELETE /api/experience/:id (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    res.json({ message: 'Experience record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting experience record' });
  }
});

export default router;
