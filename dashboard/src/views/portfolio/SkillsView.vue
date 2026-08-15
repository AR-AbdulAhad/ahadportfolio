<template>
  <admin-layout>
    <div class="space-y-6">
      
      <!-- Top Header Banner -->
      <div class="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">⚡ Skills & Expertise</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage technical skills, category tags, and proficiency levels shown on your portfolio.</p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="openSkillModal()" class="px-4 py-2 text-sm font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-sm">
            + Add New Skill
          </button>
        </div>
      </div>

      <!-- Skills Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div v-for="skill in skills" :key="skill.id" class="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl space-y-3 shadow-sm">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ skill.name }}</h3>
            <span class="text-sm font-bold text-amber-500">{{ skill.proficiency }}%</span>
          </div>
          <div class="text-xs text-gray-400">Category: {{ skill.category }}</div>
          <div class="w-full bg-gray-200 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden">
            <div class="bg-amber-500 h-full rounded-full transition-all" :style="{ width: skill.proficiency + '%' }"></div>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button @click="removeSkill(skill.id)" class="text-xs font-semibold text-rose-400 hover:underline">Delete Skill</button>
          </div>
        </div>
        <div v-if="!skills.length" class="col-span-full py-12 text-center text-gray-400 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          No skills found. Click above to add your first skill!
        </div>
      </div>

    </div>

    <!-- SKILL EDIT / CREATE MODAL -->
    <div v-if="showSkillModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div class="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl">
        <h3 class="text-xl font-bold text-white">Add New Skill</h3>
        
        <div class="space-y-3 text-sm">
          <div>
            <label class="block text-xs text-gray-400 mb-1">Skill Name</label>
            <input v-model="skillForm.name" class="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          </div>

          <div>
            <label class="block text-xs text-gray-400 mb-1">Category (Frontend, Backend, Database, Mobile)</label>
            <input v-model="skillForm.category" class="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          </div>

          <div>
            <label class="block text-xs text-gray-400 mb-1">Proficiency % (0 - 100)</label>
            <input v-model.number="skillForm.proficiency" type="number" class="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button @click="showSkillModal = false" class="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
          <button @click="saveSkill" class="px-5 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg">Save Skill</button>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminLayout from '../../components/layout/AdminLayout.vue';
import { fetchSkills, createSkill, deleteSkill } from '../../services/api';

const skills = ref([]);
const showSkillModal = ref(false);
const skillForm = ref({ name: '', category: 'Frontend', proficiency: 90 });

const loadSkills = async () => {
  try {
    const data = await fetchSkills();
    if (data) skills.value = data;
  } catch (e) {
    console.error('Error loading skills:', e);
  }
};

onMounted(() => {
  loadSkills();
});

const openSkillModal = () => {
  skillForm.value = { name: '', category: 'Frontend', proficiency: 90 };
  showSkillModal.value = true;
};

const saveSkill = async () => {
  try {
    await createSkill(skillForm.value);
    showSkillModal.value = false;
    loadSkills();
  } catch (e) {
    alert('Error saving skill.');
  }
};

const removeSkill = async (id) => {
  if (!confirm('Delete skill?')) return;
  try {
    await deleteSkill(id);
    loadSkills();
  } catch (e) {
    alert('Error deleting skill.');
  }
};
</script>
