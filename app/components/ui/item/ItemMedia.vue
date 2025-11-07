<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'icon' | 'image'
    class?: HTMLAttributes['class']
  }>(),
  {
    variant: 'default',
  },
)

const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: 'size-8 border rounded-sm bg-muted [&_svg:not([class*="size-"])]:size-4',
        image:
          'size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
</script>

<template>
  <div
    data-slot="item-media"
    :data-variant="variant"
    :class="cn(itemMediaVariants({ variant }), props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
