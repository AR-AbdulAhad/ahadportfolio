import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroSection = ({ heroData }) => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="intro" className="s-intro target-section">
      <div className="row intro-content wide">
        <motion.div
          className="column"
          style={{ y: yText, opacity: opacityText }}
        >
          <motion.div
            className="text-pretitle with-line"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroData?.pretitle || 'Hello World'}
          </motion.div>

          <motion.h1
            className="text-huge-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            I am {heroData?.name || 'Abdul Ahad'}, <br />
            {heroData?.title || 'a Full-Stack Developer'} <br />
            & Web Architect based <br />
            in Pakistan.
          </motion.h1>
        </motion.div>

        <motion.ul
          className="intro-social"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
        </motion.ul>
      </div>

      <motion.a
        href="#about"
        className="intro-scrolldown smoothscroll"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { duration: 0.5, delay: 1 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
          <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" fill="currentColor" />
        </svg>
      </motion.a>
    </section>
  );
};
