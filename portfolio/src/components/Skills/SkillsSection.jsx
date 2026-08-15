import React from 'react';
import { motion } from 'framer-motion';
import { Code, Box, Layout, Server, Database, Smartphone, Lock, Cpu } from 'lucide-react';

const iconMap = {
  Code: Code,
  Box: Box,
  Layout: Layout,
  Server: Server,
  Database: Database,
  Smartphone: Smartphone,
  Lock: Lock,
};

export const SkillsSection = ({ skillsData }) => {
  const defaultSkills = [
    { id: '1', name: 'React / Next.js', category: 'Frontend', proficiency: 95, icon: 'Code' },
    { id: '2', name: 'Three.js / WebGL', category: 'Frontend', proficiency: 88, icon: 'Box' },
    { id: '3', name: 'Tailwind CSS / GSAP', category: 'Frontend', proficiency: 92, icon: 'Layout' },
    { id: '4', name: 'Node.js & Express', category: 'Backend', proficiency: 90, icon: 'Server' },
    { id: '5', name: 'Prisma & MySQL', category: 'Database', proficiency: 92, icon: 'Database' },
    { id: '6', name: 'MongoDB & Redis', category: 'Database', proficiency: 88, icon: 'Database' },
    { id: '7', name: 'Flutter & Firebase', category: 'Mobile', proficiency: 85, icon: 'Smartphone' },
    { id: '8', name: 'REST APIs & JWT Auth', category: 'Backend', proficiency: 94, icon: 'Lock' },
  ];

  const list = skillsData && skillsData.length > 0 ? skillsData : defaultSkills;

  return (
    <div className="row about-expertise" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <div className="column lg-12">
        <motion.h2
          className="text-pretitle with-line"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Expertise & Skills
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginTop: '2rem',
          }}
        >
          {list.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Cpu;
            return (
              <motion.div
                key={skill.id || skill.name}
                className="skill-card-modern"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        backgroundColor: 'rgba(234, 190, 124, 0.15)',
                        color: '#eabe7c',
                        padding: '8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4
                        style={{
                          margin: 0,
                          color: '#fff',
                          fontSize: '1.6rem',
                          fontWeight: 600,
                          fontFamily: 'var(--font-1, "Public Sans", sans-serif)',
                        }}
                      >
                        {skill.name}
                      </h4>
                      <span
                        style={{
                          fontSize: '1.2rem',
                          color: 'var(--color-text-light, #727373)',
                          fontFamily: 'var(--font-1, "Public Sans", sans-serif)',
                        }}
                      >
                        {skill.category || 'Tech Stack'}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#eabe7c',
                      fontFamily: 'var(--font-1, "Public Sans", sans-serif)',
                    }}
                  >
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="skill-bar-bg">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.08 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
