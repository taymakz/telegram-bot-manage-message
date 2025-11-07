<script setup lang="ts">
interface Props {
  value: string
  size?: number
  foregroundColor?: string
  backgroundColor?: string
  borderRadius?: number
  variant?: 'default' | 'circle' | 'pixelated' | 'rounded' | 'dots'
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF',
  borderRadius: 0,
  variant: 'default',
})

// Convert colors to CSS-compatible format
const blackColor = computed(() => props.foregroundColor)
const whiteColor = computed(() => props.backgroundColor)

// Calculate radius based on variant and border radius
const radius = computed(() => {
  if (props.variant === 'rounded' || props.borderRadius > 0) {
    return Math.max(1, Math.floor(props.borderRadius / 10))
  }
  return 0
})

// Use the composable to generate QR code
const qrCode = useQrcode(
  computed(() => props.value),
  {
    toBase64: true,
    variant: computed(() => props.variant),
    radius,
    blackColor,
    whiteColor,
  },
)
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="overflow-hidden" :style="{ borderRadius: `${borderRadius}px` }">
      <img
        :src="qrCode"
        alt="QR Code"
        :style="{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: '100%',
        }"
      >
    </div>
  </div>
</template>
