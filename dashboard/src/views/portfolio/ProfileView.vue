<template>
  <admin-layout>
    <div class="space-y-6">
      
      <!-- Top Header Banner -->
      <div class="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">👤 Hero & Bio Settings</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage personal bio, hero tagline, profile details, and stats counters.</p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="saveProfileInfo" class="px-5 py-2 text-sm font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors shadow-sm">
            Save All Changes
          </button>
        </div>
      </div>

      <!-- Settings Form Card -->
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6 shadow-sm">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">Personal & Hero Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Developer Full Name</label>
            <input v-model="heroForm.name" class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Professional Title</label>
            <input v-model="heroForm.title" class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">Hero Tagline</label>
            <textarea v-model="heroForm.tagline" rows="2" class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white"></textarea>
          </div>

          <div class="md:col-span-2">
            <label class="block text-xs font-semibold text-gray-400 uppercase mb-2">About Bio Overview</label>
            <textarea v-model="aboutForm.bio" rows="4" class="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white"></textarea>
          </div>
        </div>
      </div>

    </div>
  </admin-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminLayout from '../../components/layout/AdminLayout.vue';
import { fetchHero, updateHero, fetchAbout, updateAbout } from '../../services/api';

const heroForm = ref({ name: '', title: '', tagline: '' });
const aboutForm = ref({ bio: '' });

const loadProfile = async () => {
  try {
    const [hData, aData] = await Promise.all([fetchHero(), fetchAbout()]);
    if (hData) heroForm.value = hData;
    if (aData) aboutForm.value = aData;
  } catch (e) {
    console.error('Error loading profile info:', e);
  }
};

onMounted(() => {
  loadProfile();
});

const saveProfileInfo = async () => {
  try {
    await updateHero(heroForm.value);
    await updateAbout(aboutForm.value);
    alert('Profile updated successfully!');
  } catch (e) {
    alert('Error updating profile.');
  }
};
</script>
