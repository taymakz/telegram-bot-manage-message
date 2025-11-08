<script setup lang="ts">
import type { TelegramButton } from '~/components/ButtonManager.vue'
import BotProfileManager from '~/components/BotProfileManager.vue'
import DatabaseProfileManager from '~/components/DatabaseProfileManager.vue'
import MessageComposer from '~/components/MessageComposer.vue'
import TelegramPreview from '~/components/TelegramPreview.vue'
import { Button } from '~/components/ui/button'

// Message preview state
const previewText = ref('')
const previewParseMode = ref<string | null>(null)
const previewImageUrl = ref<string>()
const previewButtons = ref<TelegramButton[]>([])

function handleMessageUpdate(text: string, parseMode: string | null, imageUrl: string | undefined, buttons: TelegramButton[]) {
  previewText.value = text
  previewParseMode.value = parseMode
  previewImageUrl.value = imageUrl
  previewButtons.value = buttons
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

    <!-- Database Profile Manager -->
    <DatabaseProfileManager />

    <!-- Message Composer and Preview -->
    <div class="grid gap-8 lg:grid-cols-2">
      <!-- Message Composer -->
      <MessageComposer @message-updated="handleMessageUpdate" />

      <!-- Telegram Preview -->
      <TelegramPreview
        :text="previewText"
        :parse-mode="previewParseMode"
        :image-url="previewImageUrl"
        :buttons="previewButtons"
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
        <li>3. (Optional) Configure a database profile to import chat IDs</li>
        <li>4. Compose your message and select the format</li>
        <li>5. Enter the chat IDs or import from database</li>
        <li>6. (Optional) Upload an image</li>
        <li>7. (Optional) Add inline keyboard buttons with links</li>
        <li>8. Click "Send Message" to deliver your message</li>
      </ol>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="space-y-1">
          <h4 class="text-sm font-semibold">
            Supported Chat ID formats:
          </h4>
          <ul class="text-muted-foreground space-y-1 text-xs font-mono">
            <li>• 123,456 (comma-separated)</li>
            <li>• [123,456] (array format)</li>
            <li>• [{id:123}, {id:456}] (object array)</li>
          </ul>
        </div>

        <div class="space-y-1">
          <h4 class="text-sm font-semibold">
            Inline Buttons:
          </h4>
          <ul class="text-muted-foreground space-y-1 text-xs">
            <li>• Add clickable buttons with URLs</li>
            <li>• Drag buttons to rearrange rows</li>
            <li>• Max 8 buttons per row (3 recommended)</li>
            <li>• URLs must start with http:// or https://</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
