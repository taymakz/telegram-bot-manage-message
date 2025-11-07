<script setup lang="ts">
interface Props {
  value: string
  size?: number
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  backgroundColor?: string
  foregroundColor?: string
  borderRadius?: number
  logoUrl?: string
  logoSize?: number
  logoBackgroundColor?: string
  logoBorderRadius?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  errorCorrectionLevel: 'M',
  backgroundColor: '#FFFFFF',
  foregroundColor: '#000000',
  borderRadius: 0,
  logoSize: 40,
  logoBackgroundColor: '#FFFFFF',
  logoBorderRadius: 8,
})

const canvasRef = ref<HTMLCanvasElement>()

function addLogoToCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const img = new Image()

  img.onload = () => {
    const logoSize = props.logoSize
    const x = (canvas.width - logoSize) / 2
    const y = (canvas.height - logoSize) / 2

    // Create background for logo
    ctx.fillStyle = props.logoBackgroundColor
    ctx.beginPath()
    ctx.roundRect(
      x - 4,
      y - 4,
      logoSize + 8,
      logoSize + 8,
      props.logoBorderRadius,
    )
    ctx.fill()

    // Draw logo
    ctx.drawImage(img, x, y, logoSize, logoSize)
  }

  img.crossOrigin = 'anonymous'
  img.src = props.logoUrl!
}

function addBorderRadius(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const tempCanvas = document.createElement('canvas')
  const tempCtx = tempCanvas.getContext('2d')!

  tempCanvas.width = canvas.width
  tempCanvas.height = canvas.height

  // Copy original canvas to temp canvas
  tempCtx.drawImage(canvas, 0, 0)

  // Clear original canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Create rounded rectangle mask
  ctx.beginPath()
  ctx.roundRect(0, 0, canvas.width, canvas.height, props.borderRadius)
  ctx.clip()

  // Draw temp canvas with clipping
  ctx.drawImage(tempCanvas, 0, 0)
}

// Generate QR code using a simple implementation
function generateQRCode() {
  if (!canvasRef.value)
    return

  // Import QR code library dynamically
  import('qrcode').then((QRCode) => {
    const canvas = canvasRef.value!

    QRCode.toCanvas(canvas, props.value, {
      width: props.size,
      errorCorrectionLevel: props.errorCorrectionLevel,
      color: {
        dark: props.foregroundColor,
        light: props.backgroundColor,
      },
      margin: 2,
    })

    // Add logo if provided
    if (props.logoUrl) {
      addLogoToCanvas(canvas)
    }

    // Add border radius if specified
    if (props.borderRadius > 0) {
      addBorderRadius(canvas)
    }
  })
}

onMounted(() => {
  generateQRCode()
})

watch(
  () => props.value,
  () => {
    generateQRCode()
  },
)

watch(
  [
    () => props.size,
    () => props.errorCorrectionLevel,
    () => props.backgroundColor,
    () => props.foregroundColor,
    () => props.borderRadius,
    () => props.logoUrl,
  ],
  () => {
    generateQRCode()
  },
)
</script>

<template>
  <div class="flex items-center justify-center">
    <canvas
      ref="canvasRef"
      :width="size"
      :height="size"
      class="h-auto max-w-full"
      :style="{ borderRadius: `${borderRadius}px` }"
    />
  </div>
</template>
