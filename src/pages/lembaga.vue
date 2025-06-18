<script setup>
import LembagaPreview from '@/views/pages/lembaga/LembagaPreview.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  {
    title: 'Lembaga',
    icon: 'ri-school-line',
    tab: 'account',
  }
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
      <!-- Account -->
      <VWindowItem value="Preview">
        <LembagaPreview />
      </VWindowItem>

      <!-- Security -->
      <!-- <VWindowItem value="Edit">
        <AccountSettingsSecurity />
      </VWindowItem> -->
    </VWindow>
  </div>
</template>
