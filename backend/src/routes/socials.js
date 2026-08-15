import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/socials (public)
router.get('/', async (req, res) => {
  try {
    const socials = await prisma.socialLink.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    res.json(socials);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching social links' });
  }
});

// POST /api/socials (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { platform, url, icon, displayOrder } = req.body;
    const social = await prisma.socialLink.create({
      data: {
        platform,
        url,
        icon: icon || 'Globe',
        displayOrder: Number(displayOrder) || 0,
      },
    });
    res.status(201).json(social);
  } catch (error) {
    res.status(500).json({ error: 'Error creating social link' });
  }
});

// PUT /api/socials/:id (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, url, icon, displayOrder } = req.body;
    const social = await prisma.socialLink.update({
      where: { id },
      data: {
        platform,
        url,
        icon,
        displayOrder: Number(displayOrder),
      },
    });
    res.json(social);
  } catch (error) {
    res.status(500).json({ error: 'Error updating social link' });
  }
});

// DELETE /api/socials/:id (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.socialLink.delete({ where: { id } });
    res.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting social link' });
  }
});

export default router;
