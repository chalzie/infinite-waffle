<template>
  <div class="main-container text-white mt-8">
    <ul class="list flex flex-col gap-2">
      <li class="list__item-wrapper">
        <div
          class="list__item flex gap-2 py-2"
          tabindex="0"
          @click="isSubmenuActive = !isSubmenuActive"
          @keydown.enter="isSubmenuActive = !isSubmenuActive"
        >
          <SvgDashboardIcon />
          <span class="list__item-text">Dashboard</span>
        </div>
      </li>
      <li class="list__item-wrapper">
        <div
          class="list__item flex gap-2 py-2"
          tabindex="0"
          @click="isSubmenuActive = !isSubmenuActive"
          @keydown.enter="isSubmenuActive = !isSubmenuActive"
        >
          <SvgHistoryIcon />
          <span class="list__item-text">History</span>
        </div>
        <!-- <ul class="submenu" :class="{ active: isSubmenuActive }">
          <li class="submenu__item">
            <span class="submenu__item-text">Snapshot 26.2. 19:27</span>
          </li>
          <li class="submenu__item">
            <span class="submenu__item-text">Snapshot 26.2. 19:29</span>
          </li>
          <li class="submenu__item">
            <span class="submenu__item-text">Snapshot 26.2. 19:37</span>
          </li>
        </ul> -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SvgDashboardIcon from '@/assets/icons/dashboard.svg'
import SvgHistoryIcon from '@/assets/icons/history.svg'

const isSubmenuActive = ref(false)
</script>

<style scoped>
.main-container {
  padding: 20px;
  margin-bottom: 20px;
}
</style>
