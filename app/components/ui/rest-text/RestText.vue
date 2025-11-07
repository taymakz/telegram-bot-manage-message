<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const props = defineProps<{
  limit: number
  text: string
  showFromLast?: boolean
}>()

const hasLimitReached = props.text.length > props.limit

const text = computed(() => {
  if (!hasLimitReached)
    return props.text
  if (props.showFromLast) {
    return `...${props.text.slice(-props.limit)}`
  }
  return `${props.text.slice(0, props.limit)}...`
})
</script>

<template>
  <div>
    <template v-if="!hasLimitReached">
      {{ text }}
    </template>
    <template v-else>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {{ text }}
          </TooltipTrigger>
          <TooltipContent :dir="$attrs.dir">
            <p>
              {{ props.text }}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </template>
  </div>
</template>
