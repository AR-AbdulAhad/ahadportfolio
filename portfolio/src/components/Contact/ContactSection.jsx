import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, X, Mail } from 'lucide-react';
import { submitContactForm } from '../../services/api';

export const ContactSection = ({ socialsData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botTrap: '', // Invisible Honeypot field for anti-bot protection
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null, message: '' });

    // Silent bot trap check
    if (formData.botTrap) {
      setStatus({ submitting: false, success: true, error: null, message: 'Message sent!' });
      return;
    }

    try {
      const res = await submitContactForm(formData);
      setStatus({
        submitting: false,
        success: true,
        error: null,
        message: res.message || 'Thank you! Your message has been sent successfully. A confirmation email has been sent to your inbox.',
      });
      setFormData({ name: '', email: '', subject: '', message: '', botTrap: '' });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.toString(),
        message: '',
      });
    }
  };

  return (
    <section id="contact" className="s-contact target-section">
      
      {/* 1. Original Luther Template Header */}
      <div className="row contact-top">
        <div className="column lg-12">
          <h2 className="text-pretitle">Get In Touch</h2>

          <p className="h1">
            I love to hear from you. Whether you have a question or just want to chat about web, mobile & tech — shoot me a message.
          </p>
        </div>
      </div>

      {/* 2. Original Luther Template Bottom Block with Trigger Button */}
      <div className="row contact-bottom">
        <div className="column lg-3 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Reach me at</h3>
          <p className="contact-links">
            <a href="mailto:abdulahad.dev@gmail.com" className="mailtoui">
              abdulahad.dev@gmail.com
            </a>
          </p>
        </div>

        <div className="column lg-4 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Social</h3>
          <ul className="contact-social">
            {socialsData && socialsData.length > 0 ? (
              socialsData.map((s) => (
                <li key={s.id || s.platform}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.platform}
                  </a>
                </li>
              ))
            ) : (
              <>
                <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              </>
            )}
          </ul>
        </div>

        <div className="column lg-4 md-12 contact-block">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setStatus({ submitting: false, success: false, error: null, message: '' });
            }}
            className="btn btn--medium u-fullwidth contact-btn"
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            Say Hello. <Mail size={16} />
          </button>
        </div>
      </div>

      {/* 3. Compact Floating Contact Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                backgroundColor: '#111213',
                color: '#ffffff',
                maxWidth: '480px',
                width: '100%',
                borderRadius: '16px',
                border: '1px solid rgba(234, 190, 124, 0.35)',
                padding: '20px 24px',
                position: 'relative',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 30px rgba(234, 190, 124, 0.15)',
                margin: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#eabe7c',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease',
                  zIndex: 10,
                }}
              >
                <X size={14} />
              </button>

              <div style={{ marginBottom: '0.8rem', paddingRight: '36px' }}>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#eabe7c',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    display: 'block',
                    marginBottom: '2px',
                    fontFamily: 'var(--font-1)',
                  }}
                >
                  Direct Message
                </span>
                <h3
                  style={{
                    fontSize: '1.7rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0,
                    fontFamily: 'var(--font-1, "Public Sans", sans-serif)',
                  }}
                >
                  Contact Abdul Ahad
                </h3>
              </div>

              {/* Success Alert */}
              {status.success && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    backgroundColor: 'rgba(234, 190, 124, 0.12)',
                    border: '1px solid rgba(234, 190, 124, 0.3)',
                    color: '#eabe7c',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '1.15rem',
                  }}
                >
                  <CheckCircle size={16} style={{ minWidth: '16px' }} />
                  <div>{status.message}</div>
                </motion.div>
              )}

              {/* Error Alert */}
              {status.error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    backgroundColor: 'rgba(244, 63, 94, 0.12)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    color: '#f43f5e',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '1.15rem',
                  }}
                >
                  <AlertCircle size={16} style={{ minWidth: '16px' }} />
                  <div>{status.error}</div>
                </motion.div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Invisible Honeypot Field for Spam Bot Protection */}
                <input
                  type="text"
                  name="botTrap"
                  value={formData.botTrap}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                  }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#eabe7c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px', fontWeight: 600 }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Abdul Ahad"
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        height: '32px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '1.15rem',
                        outline: 'none',
                        fontFamily: 'var(--font-1)',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#eabe7c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px', fontWeight: 600 }}>
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        height: '32px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '1.15rem',
                        outline: 'none',
                        fontFamily: 'var(--font-1)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#eabe7c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px', fontWeight: 600 }}>
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Hiring"
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      height: '32px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '1.15rem',
                      outline: 'none',
                      fontFamily: 'var(--font-1)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#eabe7c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px', fontWeight: 600 }}>
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Abdul Ahad, I'd like to discuss a project..."
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      height: '55px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '1.15rem',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'var(--font-1)',
                    }}
                  />
                </div>

                <div style={{ marginTop: '4px' }}>
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="btn btn--primary u-fullwidth"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      fontSize: '1.15rem',
                      height: '34px',
                      margin: 0,
                      opacity: status.submitting ? 0.7 : 1,
                      cursor: 'pointer',
                    }}
                  >
                    {status.submitting ? 'Sending...' : 'Send Message'} <Send size={13} />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
