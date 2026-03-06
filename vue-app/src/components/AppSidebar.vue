<template>
  <aside class="app-sidebar p-8">
    <div
      class="logo-container flex justify-center items-center"
      tabindex="0"
      aria-label="Logo"
      role="link"
      @click="navigateTo('/')"
      @keydown.enter="navigateTo('/')"
    >
      <img src="/logo.svg" alt="Logo" class="logo">
    </div>

    <MenuMain />
    <MenuSettings />
  </aside>
</template>

<script setup lang="ts">
import MenuMain from '@/components/sidebar/MenuMain.vue'
import MenuSettings from '@/components/sidebar/MenuSettings.vue'

const navigateTo = (path: string) => {
  window.location.href = path
}
</script>

<style scoped>
.app-sidebar {
  display: none;
  width: 300px;
  height: 100vh;
  background: linear-gradient(225deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
  color: var(--color-white);

  .logo-container {
    min-height: 35px;

    :hover {
      cursor: pointer;
    }

    &:focus-visible {
      outline: 2px solid var(--color-accent);
    }
  }
}
@media screen and (min-width: 576px) {
  .app-sidebar {
    display: block;
  }
}
</style>
