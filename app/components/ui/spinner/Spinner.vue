<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Loader2
    role="status"
    aria-label="Loading"
    :class="cn('size-4 animate-spin', props.class)"
    v-bind="$attrs"
  />
</template>
