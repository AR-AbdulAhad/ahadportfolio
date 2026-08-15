import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

export const ProjectsSection = ({ projectsData, onSelectProject }) => {
  const defaultProjects = [
    {
      id: '1',
      title: 'Transformative 3D Portfolio',
      category: 'Full Stack',
      description: 'An interactive portfolio featuring scroll-driven Three.js 3D transformation, custom shader lighting, lenis smooth scrolling, and dynamic CMS dashboard.',
      techStack: 'React, Three.js, Node.js, Express, Prisma, MySQL',
      imageUrl: '/images/portfolio/fuji.jpg',
      liveUrl: 'https://ahad.dev',
    },
    {
      id: '2',
      title: 'Full-Stack E-Commerce Platform',
      category: 'Full Stack',
      description: 'Comprehensive online store engine with real-time inventory management, Stripe payment processing, JWT authentication, and MySQL Prisma backend.',
      techStack: 'Next.js, Node.js, Express, Prisma, MySQL',
      imageUrl: '/images/portfolio/lamp.jpg',
      liveUrl: 'https://ecommerce-demo.dev',
    },
    {
      id: '3',
      title: 'Cross-Platform Mobile Suite',
      category: 'Mobile',
      description: 'Flutter and Firebase powered mobile suite for seamless real-time messaging, push notifications, and offline data sync.',
      techStack: 'Flutter, Dart, Firebase, Node.js',
      imageUrl: '/images/portfolio/rucksack.jpg',
      liveUrl: 'https://flutter-app.dev',
    },
    {
      id: '4',
      title: 'Real-Time Analytics Dashboard',
      category: 'Full Stack',
      description: 'Sleek dark-themed admin dashboard with real-time CRUD operations, interactive data charts, file upload manager, and token authentication.',
      techStack: 'Vue 3, Vite, Tailwind CSS, Express, Prisma',
      imageUrl: '/images/portfolio/skaterboy.jpg',
      liveUrl: 'http://localhost:5174',
    },
  ];

  const list = projectsData && projectsData.length > 0 ? projectsData : defaultProjects;

  return (
    <section id="works" className="s-works target-section">

      <div className="row works-portfolio wide">
        <div className="column lg-12">

          <motion.h2
            className="text-pretitle with-line"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Recent Works
          </motion.h2>

          <motion.p
            className="h1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: '3.5rem' }}
          >
            Here are some of my favorite projects I have done lately. Feel free to check them out.
          </motion.p>

          {/* Professional Cards Grid Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {list.map((project, idx) => {
              const techTags = project.techStack
                ? project.techStack.split(',').map((t) => t.trim())
                : [];

              return (
                <motion.div
                  key={project.id || project.title}
                  className="project-card-modern"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  onClick={() => onSelectProject && onSelectProject(project)}
                >
                  <div className="project-card-img-wrap">
                    <span className="project-cat-badge">{project.category}</span>
                    <img
                      src={project.imageUrl || '/images/portfolio/fuji.jpg'}
                      alt={project.title}
                    />
                    <div className="project-card-overlay"></div>
                  </div>

                  <div className="project-card-body">
                    <h3 className="project-title-modern">{project.title}</h3>

                    <p className="project-desc-modern">{project.description}</p>

                    {/* Tech Stack Badges */}
                    {techTags.length > 0 && (
                      <div style={{ marginBottom: '12px' }}>
                        {techTags.slice(0, 4).map((tag) => (
                          <span className="project-tech-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                        {techTags.length > 4 && (
                          <span className="project-tech-tag">+{techTags.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Card Actions Footer */}
                    <div className="project-card-actions">
                      <span className="project-action-link">
                        View Case Study <ArrowRight size={15} />
                      </span>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-action-link"
                          style={{ opacity: 0.8 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Demo <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
};
