<script setup lang="ts">
import { Database, ImagePlus, Loader2, Send, Trash2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import ImportFromDatabaseDialog from '~/components/ImportFromDatabaseDialog.vue'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import Textarea from '~/components/ui/textarea/Textarea.vue'
import { useBotProfilesStore } from '~/stores/botProfiles'

const emit = defineEmits<{
  messageUpdated: [text: string, parseMode: string | null, imageUrl: string | undefined]
}>()

const store = useBotProfilesStore()
const { parseChatIds, sendMessageToMultipleChats, uploadImage } = useTelegram()

// Form State
const messageText = ref('')
const parseMode = ref<string>('None')
const chatIdsInput = ref('')
const selectedImage = ref<File | null>(null)
const imagePreviewUrl = ref<string>()
const uploadedImageUrl = ref<string>()

// Import from database dialog state
const isImportDialogOpen = ref(false)

function handleIdsImported(ids: string) {
  chatIdsInput.value = ids
}

// UI State
const isSending = ref(false)
const isUploadingImage = ref(false)

// Parse Mode Options
const parseModeOptions = [
  { label: 'None', value: 'None' },
  { label: 'Markdown', value: 'Markdown' },
  { label: 'MarkdownV2', value: 'MarkdownV2' },
  { label: 'HTML', value: 'HTML' },
]

// Watch for changes and emit to parent
watch([messageText, parseMode, uploadedImageUrl], () => {
  emit('messageUpdated', messageText.value, parseMode.value === 'None' ? null : parseMode.value, uploadedImageUrl.value)
})

// Image Upload Handler
const fileInputRef = ref<HTMLInputElement>()

function handleImageSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    selectedImage.value = file
    imagePreviewUrl.value = URL.createObjectURL(file)

    // Auto-upload image
    handleImageUpload()
  }
}

async function handleImageUpload() {
  if (!selectedImage.value)
    return

  isUploadingImage.value = true

  try {
    uploadedImageUrl.value = await uploadImage(selectedImage.value)
    toast.success('Image uploaded successfully')
  }
  catch (error: any) {
    toast.error(error.message || 'Failed to upload image')
    removeImage()
  }
  finally {
    isUploadingImage.value = false
  }
}

function removeImage() {
  selectedImage.value = null
  imagePreviewUrl.value = undefined
  uploadedImageUrl.value = undefined
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

function triggerImageUpload() {
  fileInputRef.value?.click()
}

// Send Message Handler
async function handleSendMessage() {
  // Validation
  if (!store.activeProfile) {
    toast.error('Please select a bot profile')
    return
  }

  if (!messageText.value.trim() && !uploadedImageUrl.value) {
    toast.error('Please enter a message or upload an image')
    return
  }

  if (!chatIdsInput.value.trim()) {
    toast.error('Please enter at least one chat ID')
    return
  }

  const chatIds = parseChatIds(chatIdsInput.value)

  if (chatIds.length === 0) {
    toast.error('Invalid chat ID format')
    return
  }

  isSending.value = true

  try {
    const results = await sendMessageToMultipleChats(
      store.activeProfile.bot_token,
      chatIds,
      {
        text: messageText.value,
        parse_mode: parseMode.value === 'None' ? null : parseMode.value as any,
        photo: uploadedImageUrl.value,
      },
    )

    // Check results
    const successCount = results.filter(r => r.success).length
    const failCount = results.length - successCount

    if (successCount > 0) {
      toast.success(`Message sent to ${successCount} chat${successCount > 1 ? 's' : ''}`)
    }

    if (failCount > 0) {
      const failedChats = results
        .filter(r => !r.success)
        .map(r => `${r.chat_id}: ${r.error}`)
        .join('\n')

      toast.error(`Failed to send to ${failCount} chat${failCount > 1 ? 's' : ''}`, {
        description: failedChats,
      })
    }

    // Clear form on success
    if (successCount === results.length) {
      messageText.value = ''
      chatIdsInput.value = ''
      removeImage()
    }
  }
  catch (error: any) {
    toast.error(error.message || 'Failed to send message')
  }
  finally {
    isSending.value = false
  }
}

// Computed
const canSend = computed(() => {
  return store.activeProfile
    && (messageText.value.trim() || uploadedImageUrl.value)
    && chatIdsInput.value.trim()
    && !isSending.value
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Message Composer</CardTitle>
      <CardDescription>Compose and send messages to Telegram chats</CardDescription>
    </CardHeader>

    <CardContent class="space-y-6">
      <!-- Message Text -->
      <div class="space-y-2">
        <Label for="message-text">Message Text</Label>
        <Textarea
          id="message-text"
          v-model="messageText"
          placeholder="Enter your message here..."
          rows="6"
          class="resize-none"
        />
      </div>

      <!-- Parse Mode -->
      <div class="space-y-2">
        <Label for="parse-mode">Message Format</Label>
        <Select v-model="parseMode">
          <SelectTrigger id="parse-mode">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="option in parseModeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <p class="text-muted-foreground text-xs">
          Choose how to format your message text
        </p>
      </div>

      <!-- Chat IDs -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <Label for="chat-ids">Chat IDs</Label>
          <Button
            variant="outline"
            size="sm"
            @click="isImportDialogOpen = true"
          >
            <Database class="mr-2 h-4 w-4" />
            Import from Database
          </Button>
        </div>
        <Textarea
          id="chat-ids"
          v-model="chatIdsInput"
          placeholder="123,456 or [123,456] or [{id:123},{id:456}]"
          rows="3"
          class="resize-none font-mono text-sm max-h-40"
        />
        <p class="text-muted-foreground text-xs">
          Enter one or more chat IDs (supports multiple formats)
        </p>
      </div>

      <!-- Image Upload -->
      <div class="space-y-2">
        <Label>Image (Optional)</Label>

        <!-- Image Preview -->
        <div
          v-if="imagePreviewUrl"
          class="relative overflow-hidden rounded-lg border"
        >
          <img
            :src="imagePreviewUrl"
            alt="Selected image"
            class="h-auto w-full max-w-sm object-cover"
          >
          <Button
            size="sm"
            variant="destructive"
            class="absolute right-2 top-2"
            :disabled="isUploadingImage"
            @click="removeImage"
          >
            <Trash2 class="h-4 w-4" />
          </Button>

          <!-- Upload Progress -->
          <div
            v-if="isUploadingImage"
            class="bg-background/80 absolute inset-0 flex items-center justify-center backdrop-blur-sm"
          >
            <div class="flex items-center gap-2">
              <Loader2 class="h-5 w-5 animate-spin" />
              <span class="text-sm">Uploading...</span>
            </div>
          </div>
        </div>

        <!-- Upload Button -->
        <div v-else>
          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageSelect"
          >
          <Button
            variant="outline"
            @click="triggerImageUpload"
          >
            <ImagePlus class="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>

        <p class="text-muted-foreground text-xs">
          Upload an image to send with your message
        </p>
      </div>

      <!-- Send Button -->
      <div class="flex justify-end gap-2 pt-4">
        <Button
          size="lg"
          :disabled="!canSend"
          @click="handleSendMessage"
        >
          <Loader2 v-if="isSending" class="mr-2 h-4 w-4 animate-spin" />
          <Send v-else class="mr-2 h-4 w-4" />
          {{ isSending ? 'Sending...' : 'Send Message' }}
        </Button>
      </div>

      <!-- No Active Profile Warning -->
      <div
        v-if="!store.activeProfile"
        class="bg-muted text-muted-foreground rounded-lg border p-4 text-center text-sm"
      >
        Please select or create a bot profile to send messages
      </div>
    </CardContent>

    <!-- Import from Database Dialog -->
    <ImportFromDatabaseDialog
      v-model:open="isImportDialogOpen"
      @ids-imported="handleIdsImported"
    />
  </Card>
</template>
