import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Code, CheckCircle, Layers, Cpu } from 'lucide-react';

export const CaseStudyPage = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!project) return null;

  const techTags = project.techStack
    ? project.techStack.split(',').map((t) => t.trim())
    : ['React', 'Node.js', 'Express', 'Prisma', 'MySQL'];

  return (
    <motion.div
      className="case-study-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: '#0d0e0f',
        color: '#f3f4f6',
        minHeight: '100vh',
        paddingTop: '4rem',
        paddingBottom: '8rem',
      }}
    >
      <div className="row wide" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Back Button Header */}
        <div style={{ marginBottom: '3rem' }}>
          <button
            onClick={onBack}
            className="btn btn--medium"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#eabe7c',
              cursor: 'pointer',
              fontSize: '1.3rem',
              padding: '10px 20px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
        </div>

        {/* Hero Section */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="project-cat-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '16px' }}>
            {project.category || 'Case Study'}
          </span>

          <h1
            style={{
              fontSize: '4rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-1, "Public Sans", sans-serif)',
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: '1.8rem',
              color: '#a0a5b0',
              maxWidth: '850px',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              fontFamily: 'var(--font-1, "Public Sans", sans-serif)',
            }}
          >
            {project.description}
          </p>

          {/* Action Links */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                }}
              >
                Launch Live App <ExternalLink size={16} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--medium"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontSize: '1.4rem',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                View Source Code <Github size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Project Hero Banner Image */}
        <div
          style={{
            width: '100%',
            maxHeight: '520px',
            overflow: 'hidden',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '4rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          }}
        >
          <img
            src={project.imageUrl || '/images/portfolio/fuji.jpg'}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* 2-Column Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginBottom: '4rem',
          }}
        >
          {/* Left Column: Overview & Solution */}
          <div style={{ backgroundColor: '#141516', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ color: '#eabe7c', fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={22} /> Project Architecture & Goal
            </h3>
            <p style={{ color: '#d1d5db', fontSize: '1.5rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Designed and built as a production-grade full-stack solution tailored for high concurrency, responsive rendering, and real-time state synchronization.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#a0a5b0', fontSize: '1.4rem', marginBottom: '10px' }}>
                <CheckCircle size={18} color="#eabe7c" style={{ minWidth: '18px', marginTop: '3px' }} />
                <span>Responsive & fluid user interface with micro-animations.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#a0a5b0', fontSize: '1.4rem', marginBottom: '10px' }}>
                <CheckCircle size={18} color="#eabe7c" style={{ minWidth: '18px', marginTop: '3px' }} />
                <span>RESTful API backend integrated with Prisma ORM and MySQL.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#a0a5b0', fontSize: '1.4rem' }}>
                <CheckCircle size={18} color="#eabe7c" style={{ minWidth: '18px', marginTop: '3px' }} />
                <span>Optimized build pipeline delivering ultra-fast page load times.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Tech Stack & Specifications */}
          <div style={{ backgroundColor: '#141516', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ color: '#eabe7c', fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={22} /> Technologies & Tools
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '2rem' }}>
              {techTags.map((tech) => (
                <span
                  key={tech}
                  style={{
                    backgroundColor: 'rgba(234, 190, 124, 0.12)',
                    border: '1px solid rgba(234, 190, 124, 0.3)',
                    color: '#eabe7c',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '1.3rem',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
              <div style={{ color: '#888', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Category</div>
              <div style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 600, marginTop: '4px' }}>{project.category || 'Web Application'}</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div
          style={{
            backgroundColor: 'rgba(234, 190, 124, 0.08)',
            border: '1px solid rgba(234, 190, 124, 0.25)',
            borderRadius: '12px',
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '2rem', margin: 0, fontFamily: 'var(--font-1)' }}>
              Interested in building a similar project?
            </h4>
            <p style={{ color: '#a0a5b0', fontSize: '1.4rem', margin: '4px 0 0 0' }}>
              Let's connect and discuss your custom web or mobile development requirements.
            </p>
          </div>
          <button
            onClick={onBack}
            className="btn btn--primary"
            style={{ margin: 0, padding: '12px 24px', fontSize: '1.3rem' }}
          >
            Contact Abdul Ahad
          </button>
        </div>

      </div>
    </motion.div>
  );
};
