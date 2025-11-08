<script setup lang="ts">
import type { TelegramButton } from '~/components/ButtonManager.vue'
import { ExternalLink } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

interface Props {
  text: string
  parseMode: string | null
  imageUrl?: string
  buttons?: TelegramButton[]
}

const props = defineProps<Props>()

const { formatPreviewText } = useTelegram()

const formattedText = computed(() => {
  return formatPreviewText(props.text, props.parseMode)
})

// Group buttons by row
const buttonsByRow = computed(() => {
  if (!props.buttons || props.buttons.length === 0)
    return []

  const grouped = new Map<number, TelegramButton[]>()

  props.buttons.forEach((button) => {
    if (!grouped.has(button.row)) {
      grouped.set(button.row, [])
    }
    grouped.get(button.row)!.push(button)
  })

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a - b)
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Message Preview</CardTitle>
      <CardDescription>How your message will appear in Telegram</CardDescription>
    </CardHeader>

    <CardContent>
      <!-- Telegram-style message bubble -->
      <div class="bg-muted mx-auto max-w-md space-y-3 rounded-lg p-4">
        <!-- Image Preview -->
        <div v-if="imageUrl" class="overflow-hidden rounded-lg">
          <img
            :src="imageUrl"
            alt="Message image"
            class="h-auto w-full object-cover"
          >
        </div>

        <!-- Text Preview -->
        <div
          v-if="text"
          class="text-sm leading-relaxed"
          v-html="formattedText"
        />

        <!-- Inline Keyboard Buttons -->
        <div v-if="buttonsByRow.length > 0" class="space-y-1.5">
          <div
            v-for="[rowNumber, rowButtons] in buttonsByRow"
            :key="rowNumber"
            class="flex gap-1.5"
          >
            <a
              v-for="button in rowButtons"
              :key="button.id"
              :href="button.url"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 items-center justify-center gap-1.5 rounded px-3 py-2 text-center text-xs font-medium transition-colors"
            >
              <ExternalLink class="h-3 w-3" />
              <span>{{ button.text }}</span>
            </a>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!text && !imageUrl"
          class="text-muted-foreground py-8 text-center text-sm"
        >
          Your message preview will appear here
        </div>

        <!-- Message Info -->
        <div
          v-if="text || imageUrl"
          class="text-muted-foreground flex items-center justify-end gap-1 text-xs"
        >
          <span>{{ new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}</span>
        </div>
      </div>

      <!-- Format Info -->
      <div
        v-if="parseMode && parseMode !== 'None'"
        class="text-muted-foreground mt-4 text-center text-xs"
      >
        Using {{ parseMode }} formatting
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
