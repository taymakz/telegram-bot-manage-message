<script setup lang="ts">
import { motion } from 'motion-v'

const { tabs } = defineProps<{
  tabs: { title: string, value: string }[]
}>()

const activeTab = defineModel<string>()

const hoveredLink = ref<string | null>(null)
const showMask = ref(false)
const scrollContainer = ref<HTMLElement>()

function setActiveTab(value: string) {
  activeTab.value = value
}

function isActive(tab: { title: string, value: string }) {
  return activeTab.value === tab.value
}

function checkScrollState() {
  if (!scrollContainer.value)
    return

  const container = scrollContainer.value

  // Check if container is scrollable (has overflow)
  const isScrollable = container.scrollWidth > container.clientWidth

  // For RTL: scrollLeft is negative when scrolled
  // Calculate how much of the scrollable area has been scrolled
  const maxScrollLeft = container.scrollWidth - container.clientWidth
  const currentScrollProgress = Math.abs(container.scrollLeft) / maxScrollLeft

  // Hide mask only when user has scrolled 90% or more
  const hasScrolledEnough = currentScrollProgress >= 0.9

  // Show mask when scrollable and user hasn't scrolled 90% yet
  const newShowMask = isScrollable && !hasScrolledEnough
  showMask.value = newShowMask
}

function handleScroll() {
  checkScrollState()
}

onMounted(() => {
  // Set activeTab to current on mount
  setTimeout(() => {
    checkScrollState()
  }, 100) // Increased timeout to ensure DOM is fully rendered
  window.addEventListener('resize', checkScrollState, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScrollState)
})

const borderId = useId()
const hoverId = useId()
</script>

<template>
  <div
    ref="scrollContainer"
    :class="
      cn(
        'scrollbar-none relative flex items-center justify-between gap-2 overflow-x-auto overflow-y-hidden',
        [showMask ? 'mask-l-from-50%' : 'mask-l-from-100%'],
      )
    "
    style="scrollbar-width: none; -ms-overflow-style: none"
    @scroll="checkScrollState"
  >
    <div
      class="xs:text-sm flex w-fit min-w-max items-center text-xs"
      @mouseleave="hoveredLink = null"
    >
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="
          cn(
            'text-muted-foreground hover:text-foreground relative flex-shrink-0 cursor-pointer px-2 py-4 whitespace-nowrap no-underline md:px-4',
            { 'text-foreground': isActive(tab) },
          )
        "
        @mouseenter="hoveredLink = tab.value"
        @click="setActiveTab(tab.value)"
      >
        <motion.span
          v-if="hoveredLink === tab.value"
          :layout-id="hoverId"
          class="bg-accent/40 absolute inset-0 top-1.5 hidden h-10 w-full rounded-md lg:block"
          :transition="{ duration: 0.2 }"
          :exit="{ opacity: 0 }"
          :initial="{ opacity: 1 }"
          :animate="{ opacity: 1 }"
        />

        <span class="relative">
          {{ tab.title }}
        </span>

        <!-- Active tab border -->
        <motion.span
          v-if="isActive(tab)"
          :layout-id="borderId"
          :transition="{ duration: 0.1 }"
          :initial="{ opacity: 1, scale: 1 }"
          :animate="{ opacity: 1, scale: 1 }"
          class="bg-primary pointer-events-none absolute bottom-0 left-0 h-0.5 w-full rounded-full"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-none {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
