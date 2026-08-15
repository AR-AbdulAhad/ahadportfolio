import React, { useState, useEffect } from 'react';

export const Navbar = ({ heroData }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  const name = heroData?.name || 'Ahad';
  const firstName = name.split(' ')[0] || 'Ahad';

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'about', 'works', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-is-open');
    } else {
      document.body.classList.remove('menu-is-open');
    }
  }, [mobileMenuOpen]);

  return (
    <header className="s-header">
      <div className="header-mobile">
        <span className="mobile-home-link">
          <a href="#intro">{firstName}.</a>
        </span>
        <a
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'is-clicked' : ''}`}
          href="#0"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          <span>Menu</span>
        </a>
      </div>

      <div className="row wide main-nav-wrap">
        <nav className="column lg-12 main-nav">
          <ul>
            <li>
              <a href="#intro" className="home-link">
                {firstName}.
              </a>
            </li>
            <li className={activeSection === 'intro' ? 'current' : ''}>
              <a href="#intro" className="smoothscroll">
                Intro
              </a>
            </li>
            <li className={activeSection === 'about' ? 'current' : ''}>
              <a href="#about" className="smoothscroll">
                About
              </a>
            </li>
            <li className={activeSection === 'works' ? 'current' : ''}>
              <a href="#works" className="smoothscroll">
                Works
              </a>
            </li>
            <li className={activeSection === 'contact' ? 'current' : ''}>
              <a href="#contact" className="smoothscroll">
                Say Hello
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
