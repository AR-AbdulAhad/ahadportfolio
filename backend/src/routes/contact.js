import express from 'express';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';
import { sendContactEmails } from '../services/emailService.js';

const router = express.Router();
const prisma = new PrismaClient();

// Security Rate Limiter: Max 5 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many contact requests from this IP address. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/contact (Public Contact Form Submission with Honeypot & Security)
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, botTrap } = req.body;

    // 1. HONEYPOT TRAP: If botTrap has any value, silently reject bot
    if (botTrap && botTrap.trim() !== '') {
      console.log('🤖 Honeypot trap triggered! Silent bot rejection.');
      return res.status(201).json({ message: 'Thank you! Your message has been received.' });
    }

    // 2. INPUT VALIDATION & SANITIZATION
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Please enter a valid name.' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Please enter a message.' });
    }

    const cleanName = name.trim().substring(0, 100);
    const cleanEmail = email.trim().toLowerCase().substring(0, 150);
    const cleanSubject = (subject || '').trim().substring(0, 200);
    const cleanMessage = message.trim().substring(0, 2000);
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // 3. PERSIST IN DATABASE
    const contactMsg = await prisma.contactMessage.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
      },
    });

    // 4. SEND DUAL SMTP EMAILS (Notification to Admin + Thank You Auto-Reply to User)
    sendContactEmails({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      ip: clientIp,
    });

    return res.status(201).json({
      message: 'Thank you! Your message has been sent successfully. A confirmation email has been dispatched to your inbox.',
      contactMsg,
    });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return res.status(500).json({ error: 'Failed to process contact message. Please try again.' });
  }
});

// GET /api/contact (protected - view messages in dashboard)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contact messages' });
  }
});

// PATCH /api/contact/:id/read (protected - mark message read/unread)
router.patch('/:id/read', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: Boolean(isRead) },
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error updating message status' });
  }
});

// DELETE /api/contact/:id (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting contact message' });
  }
});

export default router;
