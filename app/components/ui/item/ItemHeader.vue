<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="item-header"
    :class="
      cn('flex basis-full items-center justify-between gap-2', props.class)
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
