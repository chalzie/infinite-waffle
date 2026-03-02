<template>
  <div class="settings-container text-white">
    <ul class="list">
      <li class="list__item-wrapper py-2">
        <div class="list__item flex gap-2" tabindex="0" @click="isSettingsSubmenuActive = !isSettingsSubmenuActive" @keydown.enter="isSettingsSubmenuActive = !isSettingsSubmenuActive">
          <SvgSettingsIcon />
          <span class="list__item-text">Settings</span>
        </div>
        <!-- <ul class="submenu" :class="{ active: isSettingsSubmenuActive }">
          <li class="submenu__item">
            <span class="submenu__item-text">Settings</span>
          </li>
          <li class="submenu__item">
            <span class="submenu__item-text">Settings</span>
          </li>
          <li class="submenu__item">
            <span class="submenu__item-text">Settings</span>
          </li>
        </ul> -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SvgSettingsIcon from '@/assets/icons/settings.svg'

const isSettingsSubmenuActive = ref(false)
</script>

<style scoped>
.settings-container {
  padding: 20px;
  margin-bottom: 20px;

  &::before {
    content: 'APPLICATION';
    color: var(--color-white);
  }
}
</style>
