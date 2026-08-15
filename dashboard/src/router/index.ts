import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Projects',
      component: () => import('../views/portfolio/ProjectsView.vue'),
      meta: {
        title: 'Projects & Case Studies',
      },
    },
    {
      path: '/skills',
      name: 'Skills',
      component: () => import('../views/portfolio/SkillsView.vue'),
      meta: {
        title: 'Skills & Expertise',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/portfolio/ProfileView.vue'),
      meta: {
        title: 'Hero & Bio Settings',
      },
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'CMS'} | Abdul Ahad Dashboard`
  next()
})
