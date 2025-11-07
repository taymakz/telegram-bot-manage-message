<script setup lang="ts">
import { motion } from 'motion-v'

const { activeTab, tabs } = defineProps<{
  activeTab: string
  tabs: { title: string, value: string }[]
}>()
</script>

<template>
  <div>
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <template v-for="tab in tabs" :key="tab.value">
          <motion.div
            v-if="activeTab === tab.value"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -10 }"
            :transition="{ duration: 0.2 }"
          >
            <slot :name="tab.value" :tab="tab">
              {{ tab.title }}
            </slot>
          </motion.div>
        </template>
      </AnimatePresence>
    </LayoutGroup>
  </div>
</template>
