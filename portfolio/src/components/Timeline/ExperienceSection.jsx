import React from 'react';
import { motion } from 'framer-motion';

export const ExperienceSection = ({ experienceData }) => {
  const jobs = experienceData.filter((i) => i.type === 'JOB');
  const education = experienceData.filter((i) => i.type === 'EDUCATION');

  return (
    <div className="row about-timelines" style={{ marginTop: '4rem' }}>

      {/* Experience Column */}
      <motion.div
        className="column lg-6 tab-12"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-pretitle with-line">
          Experience
        </h2>

        <div className="timeline">
          {jobs && jobs.length > 0 ? (
            jobs.map((item, idx) => (
              <motion.div
                className="timeline__block"
                key={item.id || item.roleOrDegree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="timeline__bullet"></div>
                <div className="timeline__header">
                  <h4 className="timeline__title">{item.companyOrInstitution}</h4>
                  <h5 className="timeline__meta">{item.roleOrDegree}</h5>
                  <p className="timeline__timeframe">{item.timeframe}</p>
                </div>
                <div className="timeline__desc">
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <>
              <div className="timeline__block">
                <div className="timeline__bullet"></div>
                <div className="timeline__header">
                  <h4 className="timeline__title">Senior Full-Stack Engineer</h4>
                  <h5 className="timeline__meta">Tech Solutions</h5>
                  <p className="timeline__timeframe">2022 - Present</p>
                </div>
                <div className="timeline__desc">
                  <p>Architecting scalable web and mobile applications using React, Next.js, Node.js, and Prisma.</p>
                </div>
              </div>

              <div className="timeline__block">
                <div className="timeline__bullet"></div>
                <div className="timeline__header">
                  <h4 className="timeline__title">Frontend & Flutter Developer</h4>
                  <h5 className="timeline__meta">Digital Agency</h5>
                  <p className="timeline__timeframe">2020 - 2022</p>
                </div>
                <div className="timeline__desc">
                  <p>Developed responsive web interfaces and cross-platform mobile apps for international clients.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Education Column */}
      <motion.div
        className="column lg-6 tab-12"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-pretitle with-line">
          Education
        </h2>

        <div className="timeline">
          {education && education.length > 0 ? (
            education.map((item, idx) => (
              <motion.div
                className="timeline__block"
                key={item.id || item.roleOrDegree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="timeline__bullet"></div>
                <div className="timeline__header">
                  <h4 className="timeline__title">{item.companyOrInstitution}</h4>
                  <h5 className="timeline__meta">{item.roleOrDegree}</h5>
                  <p className="timeline__timeframe">{item.timeframe}</p>
                </div>
                <div className="timeline__desc">
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="timeline__block">
              <div className="timeline__bullet"></div>
              <div className="timeline__header">
                <h4 className="timeline__title">Bachelor of Science in Computer Science</h4>
                <h5 className="timeline__meta">University of Engineering & Technology</h5>
                <p className="timeline__timeframe">2018 - 2022</p>
              </div>
              <div className="timeline__desc">
                <p>Specialized in Software Engineering, Database Systems, Web Technologies, and Mobile Computing.</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

    </div>
  );
};
