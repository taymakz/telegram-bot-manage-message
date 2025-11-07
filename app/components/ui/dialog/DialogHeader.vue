<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="
      cn(
        'mb-4 flex flex-col gap-2 px-6 pt-6 text-center sm:text-start',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
