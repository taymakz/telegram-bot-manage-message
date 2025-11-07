<script setup lang="ts">
import BotProfileManager from '~/components/BotProfileManager.vue'
import MessageComposer from '~/components/MessageComposer.vue'
import TelegramPreview from '~/components/TelegramPreview.vue'
import { Button } from '~/components/ui/button'

// Message preview state
const previewText = ref('')
const previewParseMode = ref<string | null>(null)
const previewImageUrl = ref<string>()

function handleMessageUpdate(text: string, parseMode: string | null, imageUrl: string | undefined) {
  previewText.value = text
  previewParseMode.value = parseMode
  previewImageUrl.value = imageUrl
}
</script>

<template>
  <div class="container mx-auto space-y-8 p-8">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">
          Telegram Message Manager
        </h1>
        <p class="text-muted-foreground text-lg">
          Manage bot profiles and send messages to multiple chats
        </p>
      </div>
      
      <!-- Diagnostics Link -->
      <NuxtLink to="/diagnostics">
        <Button variant="outline" size="sm">
          Network Diagnostics
        </Button>
      </NuxtLink>
    </div>

    <!-- Bot Profile Manager -->
    <BotProfileManager />

    <!-- Message Composer and Preview -->
    <div class="grid gap-8 lg:grid-cols-2">
      <!-- Message Composer -->
      <MessageComposer @message-updated="handleMessageUpdate" />

      <!-- Telegram Preview -->
      <TelegramPreview
        :text="previewText"
        :parse-mode="previewParseMode"
        :image-url="previewImageUrl"
      />
    </div>

    <!-- Footer Info -->
    <div class="bg-muted/50 rounded-lg border p-6">
      <h3 class="mb-2 font-semibold">
        How to use:
      </h3>
      <ol class="text-muted-foreground space-y-2 text-sm">
        <li>1. Create a bot profile with your Telegram Bot Token (get it from @BotFather)</li>
        <li>2. Select the bot profile you want to use</li>
        <li>3. Compose your message and select the format</li>
        <li>4. Enter the chat IDs where you want to send the message</li>
        <li>5. Optionally upload an image</li>
        <li>6. Click "Send Message" to deliver your message</li>
      </ol>

      <div class="mt-4 space-y-1">
        <h4 class="text-sm font-semibold">
          Supported Chat ID formats:
        </h4>
        <ul class="text-muted-foreground space-y-1 text-xs font-mono">
          <li>• 123,456 (comma-separated)</li>
          <li>• [123,456] (array format)</li>
          <li>• [{id:123}, {id:456}] (object array)</li>
        </ul>
      </div>
    </div>
  </div>
</template>
