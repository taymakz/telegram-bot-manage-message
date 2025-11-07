<script setup lang="ts">
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
}

const props = defineProps<Props>()

const { formatPreviewText } = useTelegram()

const formattedText = computed(() => {
  return formatPreviewText(props.text, props.parseMode)
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
