<template>
  <admin-layout>
    
    <!-- MODE 1: PROJECTS LIST TABLE VIEW -->
    <div v-if="viewMode === 'list'" class="space-y-6">
      
      <!-- Top Header Banner -->
      <div class="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">🚀 Projects & Case Studies</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Add, edit, or delete dynamic portfolio projects and case studies shown on your live site.</p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="openProjectForm()" class="px-4 py-2 text-sm font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm">
            + Add New Project & Case Study
          </button>
        </div>
      </div>

      <!-- Projects Table -->
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 uppercase text-xs">
            <tr>
              <th class="px-6 py-4">Project</th>
              <th class="px-6 py-4">Category</th>
              <th class="px-6 py-4">Tech Stack</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
            <tr v-for="proj in projects" :key="proj.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                <img :src="proj.imageUrl || '/images/portfolio/fuji.jpg'" class="w-12 h-12 rounded-lg object-cover border border-gray-700 shrink-0" />
                <div>
                  <div class="font-semibold text-base">{{ proj.title }}</div>
                  <div class="text-xs text-gray-400 truncate max-w-sm mt-0.5">{{ proj.description }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-block whitespace-nowrap px-3 py-1 text-xs font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full">
                  {{ proj.category }}
                </span>
              </td>
              <td class="px-6 py-4 font-mono text-xs text-gray-400 max-w-xs truncate">
                {{ proj.techStack }}
              </td>
              <td class="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                <button @click="openProjectForm(proj)" class="px-3.5 py-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-md hover:bg-blue-500/20 border border-blue-500/20">Edit Case Study</button>
                <button @click="removeProject(proj.id)" class="px-3.5 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 rounded-md hover:bg-rose-500/20 border border-rose-500/20">Delete</button>
              </td>
            </tr>
            <tr v-if="!projects.length">
              <td colspan="4" class="px-6 py-8 text-center text-gray-400">No projects found. Click above to create your first project!</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- MODE 2: DEDICATED PROJECT & CASE STUDY FORM PAGE -->
    <div v-else-if="viewMode === 'form'" class="space-y-6">
      
      <!-- Top Action Header -->
      <div class="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div class="flex items-center gap-4">
          <button @click="viewMode = 'list'" class="px-3 py-2 text-sm font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-all flex items-center gap-1.5">
            ← Back to Projects List
          </button>
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ projectForm.id ? 'Edit Case Study: ' + projectForm.title : 'Create New Project & Case Study' }}
          </h1>
        </div>

        <div class="flex items-center gap-3">
          <button @click="viewMode = 'list'" class="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
          <button @click="saveProject" class="px-6 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors shadow-sm">
            Save Case Study
          </button>
        </div>
      </div>

      <!-- Form Card -->
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 space-y-6 shadow-sm">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Project Overview & Metadata</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Project Title</label>
            <input v-model="projectForm.title" placeholder="e.g. Transformative 3D Portfolio" class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Category (e.g. Full Stack, Mobile, WebGL)</label>
            <input v-model="projectForm.category" placeholder="Full Stack" class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Tech Stack (comma separated)</label>
            <input v-model="projectForm.techStack" placeholder="React, Node.js, Express, Prisma, MySQL" class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Live Demo URL</label>
            <input v-model="projectForm.liveUrl" placeholder="https://ahad.dev" class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Image Banner URL</label>
            <input v-model="projectForm.imageUrl" placeholder="/images/portfolio/fuji.jpg" class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Full Description & Case Study Details</label>
            <textarea v-model="projectForm.description" rows="6" placeholder="Describe the project goals, technical challenges solved, architecture breakdown, and impact..." class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white leading-relaxed"></textarea>
          </div>
        </div>

        <!-- Image Preview Box -->
        <div v-if="projectForm.imageUrl" class="pt-4 border-t border-gray-100 dark:border-gray-800">
          <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Banner Image Preview</label>
          <div class="w-full max-w-md h-48 rounded-xl overflow-hidden border border-gray-700">
            <img :src="projectForm.imageUrl" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
          <button @click="viewMode = 'list'" class="px-5 py-2.5 text-sm text-gray-400 hover:text-white">Cancel</button>
          <button @click="saveProject" class="px-6 py-2.5 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors">
            Save Case Study
          </button>
        </div>
      </div>

    </div>

  </admin-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminLayout from '../../components/layout/AdminLayout.vue';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../services/api';

const projects = ref([]);
const viewMode = ref('list'); // 'list' | 'form'
const projectForm = ref({ id: '', title: '', category: 'Full Stack', description: '', techStack: '', imageUrl: '', liveUrl: '' });

const loadProjects = async () => {
  try {
    const data = await fetchProjects();
    if (data) projects.value = data;
  } catch (e) {
    console.error('Error loading projects:', e);
  }
};

onMounted(() => {
  loadProjects();
});

const openProjectForm = (proj = null) => {
  if (proj) {
    projectForm.value = { ...proj };
  } else {
    projectForm.value = { id: '', title: '', category: 'Full Stack', description: '', techStack: '', imageUrl: '', liveUrl: '' };
  }
  viewMode.value = 'form';
};

const saveProject = async () => {
  try {
    if (projectForm.value.id) {
      await updateProject(projectForm.value.id, projectForm.value);
    } else {
      await createProject(projectForm.value);
    }
    viewMode.value = 'list';
    loadProjects();
  } catch (e) {
    alert('Error saving project.');
  }
};

const removeProject = async (id) => {
  if (!confirm('Are you sure you want to delete this project?')) return;
  try {
    await deleteProject(id);
    loadProjects();
  } catch (e) {
    alert('Failed to delete project.');
  }
};
</script>
