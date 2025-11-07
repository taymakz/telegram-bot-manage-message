<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="item-description"
    :class="
      cn(
        'text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance',
        '[&_a:hover]:text-primary [&_a]:underline [&_a]:underline-offset-4',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </p>
</template>
