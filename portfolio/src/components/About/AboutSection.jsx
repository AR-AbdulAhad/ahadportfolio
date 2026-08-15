import React from 'react';
import { motion } from 'framer-motion';
import { SkillsSection } from '../Skills/SkillsSection';
import { ExperienceSection } from '../Timeline/ExperienceSection';

export const AboutSection = ({ aboutData, resumeUrl, skillsData, experienceData }) => {
  return (
    <section id="about" className="s-about target-section">

      {/* About Info Block */}
      <div className="row about-info wide">

        <motion.div
          className="column lg-6 md-12 about-info__pic-block"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={aboutData?.photoUrl || '/images/about-photo.jpg'}
            alt={aboutData?.name || 'Abdul Ahad'}
            className="about-info__pic"
          />
        </motion.div>

        <motion.div
          className="column lg-6 md-12"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-info__text">

            <h2 className="text-pretitle with-line">
              {aboutData?.pretitle || 'About Me'}
            </h2>

            <p className="attention-getter">
              {aboutData?.bio || aboutData?.attentionGetter ||
                'I am Abdul Ahad, a Full-Stack Developer specializing in modern web applications, RESTful APIs, and cross-platform mobile development using React, Next.js, Node.js, Express, Prisma, MySQL, MongoDB, and Flutter.'}
            </p>

            {/* Metrics Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', margin: '2rem 0' }}>
              <div className="metric-badge">
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#eabe7c' }}>
                  {aboutData?.experienceYears || 3}+
                </div>
                <div style={{ fontSize: '1.2rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Years Exp.
                </div>
              </div>
              <div className="metric-badge">
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#eabe7c' }}>
                  {aboutData?.projectsCompleted || 25}+
                </div>
                <div style={{ fontSize: '1.2rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Projects
                </div>
              </div>
              <div className="metric-badge">
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#eabe7c' }}>
                  {aboutData?.satisfiedClients || 18}+
                </div>
                <div style={{ fontSize: '1.2rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Happy Clients
                </div>
              </div>
            </div>

            <a
              href={resumeUrl || '/resume.pdf'}
              target="_blank"
              rel="noreferrer"
              className="btn btn--medium u-fullwidth"
            >
              Download CV
            </a>

          </div>
        </motion.div>

      </div>

      {/* Expertise / Skills */}
      <SkillsSection skillsData={skillsData} />

      {/* Timelines (Experience & Education) */}
      <ExperienceSection experienceData={experienceData} />

    </section>
  );
};
