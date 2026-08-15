import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@ahad.dev' },
    update: { passwordHash },
    create: {
      username: 'ahad_admin',
      email: 'admin@ahad.dev',
      passwordHash,
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email} (Password: admin123)`);

  // 2. Hero Content
  const heroCount = await prisma.heroContent.count();
  if (heroCount === 0) {
    await prisma.heroContent.create({
      data: {
        pretitle: 'Hello World',
        name: 'Abdul Ahad',
        title: 'Full-Stack Developer',
        tagline: 'I build modern, high-performance web and mobile applications with React, Next.js, Node.js, Express, Prisma, MySQL & 3D Interactive experiences.',
        resumeUrl: '/resume.pdf',
      },
    });
    console.log('✅ Hero content seeded');
  }

  // 3. About Content
  const aboutCount = await prisma.aboutContent.count();
  if (aboutCount === 0) {
    await prisma.aboutContent.create({
      data: {
        pretitle: 'About Me',
        title: 'Passionate Developer crafting dynamic, scalable applications',
        bio: 'I am Abdul Ahad, a dedicated Full-Stack Developer specializing in modern web architecture, interactive 3D web applications, and cross-platform mobile apps. With deep expertise across React, Next.js, Node.js, Express, Prisma, MySQL, MongoDB, and Flutter, I engineer seamless end-to-end digital solutions.',
        attentionGetter: 'Engineering robust full-stack applications with clean architecture, interactive 3D animations, and real-time backend functionality.',
        photoUrl: '/images/about-photo.jpg',
        experienceYears: 3,
        projectsCompleted: 24,
        satisfiedClients: 18,
      },
    });
    console.log('✅ About content seeded');
  }

  // 4. Skills
  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    const skillsData = [
      { name: 'React / Next.js', category: 'Frontend', proficiency: 95, icon: 'Code', displayOrder: 1 },
      { name: 'Three.js / React Three Fiber', category: 'Frontend', proficiency: 88, icon: 'Box', displayOrder: 2 },
      { name: 'Tailwind CSS / GSAP', category: 'Frontend', proficiency: 92, icon: 'Layout', displayOrder: 3 },
      { name: 'Node.js & Express.js', category: 'Backend', proficiency: 90, icon: 'Server', displayOrder: 4 },
      { name: 'Prisma ORM', category: 'Backend', proficiency: 92, icon: 'Database', displayOrder: 5 },
      { name: 'MySQL & MongoDB', category: 'Database', proficiency: 88, icon: 'Database', displayOrder: 6 },
      { name: 'Flutter & Firebase', category: 'Mobile', proficiency: 85, icon: 'Smartphone', displayOrder: 7 },
      { name: 'REST APIs & JWT Auth', category: 'Backend', proficiency: 94, icon: 'Lock', displayOrder: 8 },
    ];

    for (const skill of skillsData) {
      await prisma.skill.create({ data: skill });
    }
    console.log('✅ Skills seeded');
  }

  // 5. Projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const projectsData = [
      {
        title: 'Transformative 3D Portfolio',
        category: 'Full Stack',
        description: 'An interactive portfolio featuring scroll-driven Three.js 3D Optimus Prime transformation, custom shader lighting, lenis smooth scrolling, and dynamic CMS dashboard.',
        techStack: 'React, Three.js, R3F, Node.js, Express, Prisma, MySQL, Tailwind CSS',
        imageUrl: '/images/portfolio/fuji.jpg',
        liveUrl: 'https://ahad.dev',
        githubUrl: 'https://github.com/ahad/3d-portfolio',
        featured: true,
        displayOrder: 1,
      },
      {
        title: 'Full-Stack E-Commerce Platform',
        category: 'Full Stack',
        description: 'Comprehensive online store engine with real-time inventory management, Stripe payment processing, JWT authentication, and MySQL Prisma backend.',
        techStack: 'Next.js, Node.js, Express, Prisma, MySQL, Tailwind CSS',
        imageUrl: '/images/portfolio/lamp.jpg',
        liveUrl: 'https://ecommerce-demo.dev',
        githubUrl: 'https://github.com/ahad/fullstack-ecommerce',
        featured: true,
        displayOrder: 2,
      },
      {
        title: 'Cross-Platform Mobile Suite',
        category: 'Mobile',
        description: 'Flutter and Firebase powered mobile suite for seamless real-time messaging, push notifications, and offline data sync.',
        techStack: 'Flutter, Dart, Firebase, Node.js REST API',
        imageUrl: '/images/portfolio/rucksack.jpg',
        liveUrl: 'https://flutter-app.dev',
        githubUrl: 'https://github.com/ahad/flutter-mobile-app',
        featured: true,
        displayOrder: 3,
      },
      {
        title: 'Interactive Real-Time Analytics Dashboard',
        category: 'Full Stack',
        description: 'Sleek dark-themed admin dashboard with real-time CRUD operations, interactive data charts, file upload manager, and token authentication.',
        techStack: 'React, Express, Prisma, MySQL, Recharts, Tailwind CSS',
        imageUrl: '/images/portfolio/skaterboy.jpg',
        liveUrl: 'https://dashboard.ahad.dev',
        githubUrl: 'https://github.com/ahad/admin-dashboard',
        featured: false,
        displayOrder: 4,
      },
    ];

    for (const proj of projectsData) {
      await prisma.project.create({ data: proj });
    }
    console.log('✅ Projects seeded');
  }

  // 6. Experiences & Education
  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    const expData = [
      {
        type: 'JOB',
        companyOrInstitution: 'Apex Tech Solutions',
        roleOrDegree: 'Senior Full-Stack Developer',
        timeframe: '2023 - Present',
        description: 'Architecting scalable web platforms, leading frontend 3D web design integration, and engineering high-throughput REST APIs using Express, Prisma, and MySQL.',
        displayOrder: 1,
      },
      {
        type: 'JOB',
        companyOrInstitution: 'Nexus Digital Lab',
        roleOrDegree: 'Frontend & React Developer',
        timeframe: '2021 - 2023',
        description: 'Developed responsive single-page web applications with React, Tailwind CSS, and Framer Motion, optimizing render speed and cross-browser performance.',
        displayOrder: 2,
      },
      {
        type: 'EDUCATION',
        companyOrInstitution: 'Institute of Software Engineering',
        roleOrDegree: 'B.S. in Computer Science',
        timeframe: '2018 - 2022',
        description: 'Focused on Data Structures, Database Systems (MySQL/MongoDB), Software Engineering Principles, and Web Development.',
        displayOrder: 3,
      },
    ];

    for (const exp of expData) {
      await prisma.experience.create({ data: exp });
    }
    console.log('✅ Experiences & Education seeded');
  }

  // 7. Testimonials
  const testCount = await prisma.testimonial.count();
  if (testCount === 0) {
    const testData = [
      {
        authorName: 'Sarah Jenkins',
        authorRole: 'Product Director',
        company: 'InnovateX',
        text: 'Abdul Ahad delivered a breathtaking 3D interactive web application that completely transformed our visual brand. Highly skilled full-stack developer!',
        avatarUrl: '/images/avatars/user-01.jpg',
        displayOrder: 1,
      },
      {
        authorName: 'Michael Chen',
        authorRole: 'CTO',
        company: 'CloudMatrix',
        text: 'Clean code, exceptional backend architecture with Express & Prisma, and ultra-responsive frontend development. A true professional.',
        avatarUrl: '/images/avatars/user-02.jpg',
        displayOrder: 2,
      },
    ];

    for (const t of testData) {
      await prisma.testimonial.create({ data: t });
    }
    console.log('✅ Testimonials seeded');
  }

  // 8. Social Links
  const socialCount = await prisma.socialLink.count();
  if (socialCount === 0) {
    const socialsData = [
      { platform: 'GitHub', url: 'https://github.com', icon: 'Github', displayOrder: 1 },
      { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', displayOrder: 2 },
      { platform: 'Twitter', url: 'https://twitter.com', icon: 'Twitter', displayOrder: 3 },
      { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', displayOrder: 4 },
    ];

    for (const s of socialsData) {
      await prisma.socialLink.create({ data: s });
    }
    console.log('✅ Social links seeded');
  }

  console.log('✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
