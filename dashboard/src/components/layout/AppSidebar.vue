<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <div
      :class="[
        'py-6 flex',
        !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
      ]"
    >
      <router-link to="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-black text-xl shadow-md">
          A
        </div>
        <div v-if="isExpanded || isHovered || isMobileOpen" class="flex flex-col">
          <span class="font-extrabold text-lg tracking-wider text-gray-900 dark:text-white leading-tight">
            AHAD<span class="text-amber-500">.CMS</span>
          </span>
          <span class="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">Admin Control</span>
        </div>
      </router-link>
    </div>

    <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar grow">
      <nav className="mb-6">
        <div className="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            <h2
              :class="[
                'mb-3 text-xs font-bold uppercase tracking-wider flex leading-[20px] text-amber-500/80',
                !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
              ]"
            >
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul className="flex flex-col gap-2">
              <li v-for="item in menuGroup.items" :key="item.name">
                <router-link
                  :to="item.path"
                  :class="[
                    'menu-item group flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all',
                    isActive(item.path)
                      ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white',
                  ]"
                >
                  <span className="text-lg">
                    {{ item.icon }}
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    className="menu-item-text"
                  >
                    {{ item.name }}
                  </span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import { HorizontalDots } from "../../icons";
import { useSidebar } from "@/composables/useSidebar";

const route = useRoute();
const { isExpanded, isMobileOpen, isHovered } = useSidebar();

const menuGroups = [
  {
    title: "PORTFOLIO CONTROLS",
    items: [
      {
        icon: "🚀",
        name: "Projects & Case Studies",
        path: "/",
      },
      {
        icon: "⚡",
        name: "Skills & Expertise",
        path: "/skills",
      },
      {
        icon: "👤",
        name: "Hero & Bio Settings",
        path: "/profile",
      },
    ],
  },
];

const isActive = (path) => route.path === path;
</script>
