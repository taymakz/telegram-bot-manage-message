<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Separator as SeparatorPrimitive } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <SeparatorPrimitive
    v-bind="delegatedProps"
    :class="
      cn(
        'bg-border shrink-0',
        props.orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
        props.class,
      )
    "
  />
</template>
