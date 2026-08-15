import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching testimonials' });
  }
});

// POST /api/testimonials (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { authorName, authorRole, company, text, avatarUrl, displayOrder } = req.body;
    const item = await prisma.testimonial.create({
      data: {
        authorName,
        authorRole,
        company: company || '',
        text,
        avatarUrl: avatarUrl || '',
        displayOrder: Number(displayOrder) || 0,
      },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error creating testimonial' });
  }
});

// PUT /api/testimonials/:id (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { authorName, authorRole, company, text, avatarUrl, displayOrder } = req.body;
    const item = await prisma.testimonial.update({
      where: { id },
      data: {
        authorName,
        authorRole,
        company,
        text,
        avatarUrl,
        displayOrder: Number(displayOrder),
      },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error updating testimonial' });
  }
});

// DELETE /api/testimonials/:id (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id } });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting testimonial' });
  }
});

export default router;
