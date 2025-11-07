<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { Eye, EyeOff } from 'lucide-vue-next'
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const isVisible = ref(false)

const inputType = computed(() => (isVisible.value ? 'text' : 'password'))

function toggleVisibility() {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <InputGroup :class="props.class">
    <InputGroupInput
      v-model="modelValue"
      :type="inputType"
      data-slot="input-password"
    />

    <InputGroupAddon align="inline-end">
      <InputGroupButton
        aria-label="Toggle password visibility"
        size="icon-xs"
        @click="toggleVisibility"
      >
        <Eye v-if="!isVisible" class="size-4" />
        <EyeOff v-else class="size-4" />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
