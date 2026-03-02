<template>
  <div class="app-container">
    <AppSidebar />
    <AppDashboard />
  </div>
</template>

<script setup lang="ts">
import AppDashboard from './components/AppDashboard.vue'
import AppSidebar from './components/AppSidebar.vue'
</script>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
