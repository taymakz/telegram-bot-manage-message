<script setup lang="ts">
import { Button } from '../button'
import Input from '../input/Input.vue'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'انتخاب رنگ',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const localValue = ref(props.modelValue)
const isOpen = ref(false)

// Update local value when prop changes
watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
  },
)

// Common colors for quick selection
const commonColors = [
  '#000000',
  '#ffffff',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#84cc16',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#64748b',
  '#6b7280',
  '#9ca3af',
  '#d1d5db',
]

function updateColor(color: string) {
  localValue.value = color
  emit('update:modelValue', color)
}

function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  updateColor(target.value)
}

function selectCommonColor(color: string) {
  updateColor(color)
  isOpen.value = false
}

// Validate hex color
const isValidHex = computed(() => {
  return /^#(?:[0-9A-F]{3}){1,2}$/i.test(localValue.value)
})
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="text-sm font-medium">{{ label }}</label>

    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          :disabled="disabled"
          class="h-10 w-full justify-start gap-2"
        >
          <div
            class="border-border h-4 w-4 rounded border"
            :style="{ backgroundColor: isValidHex ? localValue : '#000000' }"
          />
          <span class="text-sm">{{ localValue || placeholder }}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-64" align="start">
        <div class="space-y-4">
          <!-- Color input -->
          <div>
            <label class="mb-2 block text-sm font-medium">کد رنگ</label>
            <Input
              :value="localValue"
              label="#000000"
              class="font-mono"
              @input="handleInputChange"
            />
          </div>

          <!-- Color picker input -->
          <div>
            <label class="mb-2 block text-sm font-medium">انتخاب رنگ</label>
            <input
              type="color"
              :value="localValue"
              class="border-border h-10 w-full cursor-pointer rounded border"
              @input="handleInputChange"
            >
          </div>

          <!-- Common colors -->
          <div>
            <label class="mb-2 block text-sm font-medium">رنگ‌های متداول</label>
            <div class="grid grid-cols-6 gap-2">
              <button
                v-for="color in commonColors"
                :key="color"
                class="border-border h-8 w-8 rounded border transition-transform hover:scale-110"
                :style="{ backgroundColor: color }"
                :title="color"
                @click="selectCommonColor(color)"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
