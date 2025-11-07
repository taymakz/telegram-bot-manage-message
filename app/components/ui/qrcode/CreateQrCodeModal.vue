<script setup lang="ts">
import { toast } from 'vue-sonner'
import Button from '~/components/ui/button/Button.vue'
import DialogResponsive from '~/components/ui/DialogResponsive.vue'
import Label from '~/components/ui/label/Label.vue'
import { QRCodeGenerator } from '~/components/ui/qrcode'

interface Props {
  modelValue?: boolean
  qrValue: string
  filename: string
  brandColors?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  brandColors: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Reactive state
const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

// QR Code Modal State
const showCustomColorModal = ref(false)
const customColorInput = ref('#000000')
const colorPickerTarget = ref<'qr' | 'bg'>('qr')
const selectedQRColor = ref('#89b5fa')
const selectedBgColor = ref('#ffffff')
const hasBackground = ref(false)
const selectedVariant = ref<
  'default' | 'rounded' | 'circle' | 'pixelated' | 'dots'
>('rounded')

// Predefined colors
const defaultColors = [
  '#89b5fa',
  '#1f66f4',
  '#000000',
  '#3B82F6',
  '#EF4444',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
]
const backgroundColors = [
  '#ffffff', // White
  '#f8f9fa', // Light gray
  '#e9ecef', // Gray
  '#dee2e6', // Light blue-gray
  '#ffc107', // Yellow
  '#17a2b8', // Cyan
  '#28a745', // Green
  '#dc3545', // Red
]

// QR Code variants
const qrVariants = [
  { value: 'default' as const, label: 'پیش‌فرض', icon: 'square' },
  { value: 'rounded' as const, label: 'گرد', icon: 'circle' },
  { value: 'pixelated' as const, label: 'پیکسلی', icon: 'grid' },
  { value: 'circle' as const, label: 'دایره‌ای', icon: 'circle-dot' },
  { value: 'dots' as const, label: 'نقطه‌ای', icon: 'dot' },
]

// Computed values
const availableColors = computed(() => {
  return [...props.brandColors, ...defaultColors]
})

const qrBackgroundColor = computed(() => {
  return hasBackground.value ? selectedBgColor.value : '#0000'
})

// Functions
function openCustomColorModal(target: 'qr' | 'bg') {
  colorPickerTarget.value = target
  customColorInput.value
    = target === 'qr' ? selectedQRColor.value : selectedBgColor.value
  showCustomColorModal.value = true
}

function closeCustomColorModal() {
  showCustomColorModal.value = false
}

function applyCustomColor() {
  const color = customColorInput.value
  if (colorPickerTarget.value === 'qr') {
    selectedQRColor.value = color
  }
  else {
    selectedBgColor.value = color
  }
  closeCustomColorModal()
}

function downloadQR(filename: string) {
  try {
    // Get QR value from the data attribute
    const qrElement = document.querySelector('#qr-canvas [data-qr-value]')
    const qrValue = qrElement?.getAttribute('data-qr-value') || props.qrValue

    if (!qrValue) {
      throw new Error('QR value not found')
    }

    // Use the useQrcode composable to generate base64
    const qrBase64 = useQrcode(qrValue, {
      toBase64: true,
      variant: selectedVariant.value,
      blackColor: selectedQRColor.value,
      whiteColor: hasBackground.value ? selectedBgColor.value : '#ffffff',
    })

    // Wait for the QR code to be generated
    nextTick(() => {
      // Create download link
      const link = document.createElement('a')
      link.download = `${filename}-qrcode.png`
      link.href = qrBase64.value
      link.click()

      toast.success('QR کد با کیفیت بالا دانلود شد')
      isOpen.value = false
    })
  }
  catch (error) {
    console.error('Download error:', error)
    toast.error('خطا در تولید QR کد')
  }
}

// Close modal on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      isOpen.value = false
      closeCustomColorModal()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<template>
  <DialogResponsive v-model:open="isOpen">
    <template #trigger>
      <slot name="trigger">
        <Button class="w-full">
          <span class="icon-[ph--qr-code] size-4" />
          تولید QR کد قابل دانلود
        </Button>
      </slot>
    </template>
    <template #title>
      تولید QR کد
    </template>
    <template #description>
      QR کد خود را شخصی سازی کنید
    </template>
    <template #default>
      <div class="space-y-6">
        <!-- QR Code Preview -->
        <div id="qr-canvas" class="flex justify-center">
          <div
            class="rounded-xl p-4"
            :style="{
              backgroundColor: hasBackground ? selectedBgColor : 'transparent',
            }"
          >
            <QRCodeGenerator
              :key="`${selectedQRColor}-${selectedBgColor}-${hasBackground}-${selectedVariant}`"
              :value="qrValue"
              :data-qr-value="qrValue"
              :foreground-color="selectedQRColor"
              :background-color="qrBackgroundColor"
              :size="240"
              :variant="selectedVariant"
            />
          </div>
        </div>

        <!-- Color Selection -->
        <div class="space-y-4">
          <!-- Variant Selection -->
          <div>
            <Label class="text-sm font-medium">نوع QR کد</Label>
            <div class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="variant in qrVariants"
                :key="variant.value"
                class="rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors"
                :class="
                  selectedVariant === variant.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                "
                @click="selectedVariant = variant.value"
              >
                <span :class="`icon-[ph--${variant.icon}] mr-2 size-4`" />
                {{ variant.label }}
              </button>
            </div>
          </div>

          <div>
            <Label class="text-sm font-medium">رنگ QR کد</Label>
            <div class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="color in availableColors"
                :key="color"
                class="size-8 rounded-full border-2"
                :class="
                  selectedQRColor === color ? 'border-primary' : 'border-border'
                "
                :style="{ backgroundColor: color }"
                @click="selectedQRColor = color"
              />
              <!-- Custom Color Button for QR -->
              <button
                class="flex size-8 items-center justify-center rounded-full border-2 border-dashed border-gray-400"
                title="رنگ شخصی"
                @click="openCustomColorModal('qr')"
              >
                <span class="icon-[ph--plus] size-4 text-gray-500" />
              </button>
            </div>

            <!-- Custom QR Color Dialog -->
            <div
              v-if="showCustomColorModal && colorPickerTarget === 'qr'"
              class="mt-4 rounded-lg border p-4"
            >
              <div class="space-y-3">
                <div>
                  <Label class="text-sm font-medium">رنگ شخصی QR کد</Label>
                  <div class="mt-2 flex items-center gap-3">
                    <input
                      v-model="customColorInput"
                      type="color"
                      class="size-12 cursor-pointer rounded-lg border"
                      :title="customColorInput"
                    >
                    <input
                      v-model="customColorInput"
                      type="text"
                      class="flex-1 rounded-lg border px-3 py-2"
                      placeholder="#000000"
                      pattern="^#[0-9A-Fa-f]{6}$"
                    >
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    @click="closeCustomColorModal"
                  >
                    لغو
                  </Button>
                  <Button size="sm" @click="applyCustomColor">
                    اعمال رنگ
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Background Color Selection -->
          <div>
            <Label class="text-sm font-medium">پس زمینه</Label>
            <div class="mt-2 space-y-2">
              <label class="flex items-center gap-2">
                <input
                  v-model="hasBackground"
                  type="checkbox"
                  class="rounded"
                >
                <span class="text-sm">پس زمینه داشته باشد</span>
              </label>

              <div v-if="hasBackground" class="flex flex-wrap gap-2">
                <button
                  v-for="color in backgroundColors"
                  :key="color"
                  class="size-8 rounded-full border-2"
                  :class="
                    selectedBgColor === color
                      ? 'border-primary'
                      : 'border-border'
                  "
                  :style="{ backgroundColor: color }"
                  @click="selectedBgColor = color"
                />
                <!-- Custom Color Button for Background -->
                <button
                  class="flex size-8 items-center justify-center rounded-full border-2 border-dashed border-gray-400"
                  title="رنگ شخصی"
                  @click="openCustomColorModal('bg')"
                >
                  <span class="icon-[ph--plus] size-4 text-gray-500" />
                </button>
              </div>

              <!-- Custom Background Color Dialog -->
              <div
                v-if="
                  showCustomColorModal
                    && colorPickerTarget === 'bg'
                    && hasBackground
                "
                class="mt-4 rounded-lg border p-4"
              >
                <div class="space-y-3">
                  <div>
                    <Label class="text-sm font-medium">رنگ شخصی پس زمینه</Label>
                    <div class="mt-2 flex items-center gap-3">
                      <input
                        v-model="customColorInput"
                        type="color"
                        class="size-12 cursor-pointer rounded-lg border"
                        :title="customColorInput"
                      >
                      <input
                        v-model="customColorInput"
                        type="text"
                        class="flex-1 rounded-lg border px-3 py-2"
                        placeholder="#ffffff"
                        pattern="^#[0-9A-Fa-f]{6}$"
                      >
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      @click="closeCustomColorModal"
                    >
                      لغو
                    </Button>
                    <Button size="sm" @click="applyCustomColor">
                      اعمال رنگ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <!-- Download Button -->
      <Button class="w-full" @click="downloadQR(filename)">
        <span class="icon-[ph--download] size-4" />
        دانلود QR کد
      </Button>
    </template>
  </DialogResponsive>
</template>
