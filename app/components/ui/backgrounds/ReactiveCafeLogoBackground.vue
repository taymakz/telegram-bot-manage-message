<script setup lang="ts">
interface CafeWithLogoBackground {
  logo_background_color_light?: string | null
  logo_background_color_dark?: string | null
  [key: string]: any
}

interface Props {
  cafe?: CafeWithLogoBackground | null
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  cafe: null,
  class: 'bg-card',
})

const colorMode = useColorMode()

// Normalize different color-mode implementations
const modeRef = computed(() => {
  const cm: any = colorMode
  return unref(cm?.value ?? cm?.preference ?? null)
})

const isDark = computed(() => modeRef.value === 'dark')

// Compute reactive background color
const backgroundColor = computed(() => {
  if (!props.cafe)
    return null

  const dark = props.cafe?.logo_background_color_dark ?? null
  const light = props.cafe?.logo_background_color_light ?? null
  const raw = isDark.value ? (dark ?? light) : (light ?? dark)

  // validate color before returning it
  if (!raw || typeof raw !== 'string')
    return null
  const isValid = (value: string) => {
    // Prefer native check when available (browser)
    if (
      typeof CSS !== 'undefined'
      && typeof (CSS as any).supports === 'function'
    ) {
      try {
        return (CSS as any).supports('color', value)
      }
      catch {
        // fallthrough to regex
      }
    }

    // Basic regex fallback for common formats: hex, rgb/rgba, hsl/hsla
    const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
    const func = /^(?:rgb|rgba|hsl|hsla)\(/i
    return hex.test(value.trim()) || func.test(value.trim())
  }

  return isValid(raw) ? raw : null
})

// Compute final style object
const dynamicStyle = computed(() => {
  const bgColor = backgroundColor.value
  return bgColor ? { backgroundColor: bgColor } : {}
})
</script>

<template>
  <div :class="props.class" :style="dynamicStyle">
    <slot />
  </div>
</template>
