<script setup lang="ts">
import { GripVertical, Link, Plus, Trash2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export interface TelegramButton {
  id: string
  text: string
  url: string
  row: number
}

const props = defineProps<{
  buttons: TelegramButton[]
}>()

const emit = defineEmits<{
  'update:buttons': [buttons: TelegramButton[]]
}>()

// Local state for new button
const newButtonText = ref('')
const newButtonUrl = ref('')
const newButtonRow = ref(1)

// Drag state
const draggedButton = ref<TelegramButton | null>(null)

function addButton() {
  if (!newButtonText.value.trim()) {
    toast.error('Button text is required')
    return
  }

  if (!newButtonUrl.value.trim()) {
    toast.error('Button URL is required')
    return
  }

  // Validate URL
  if (!isValidUrl(newButtonUrl.value)) {
    toast.error('Please enter a valid URL (must start with http:// or https://)')
    return
  }

  const newButton: TelegramButton = {
    id: Date.now().toString(),
    text: newButtonText.value,
    url: newButtonUrl.value,
    row: newButtonRow.value,
  }

  emit('update:buttons', [...props.buttons, newButton])

  // Reset form
  newButtonText.value = ''
  newButtonUrl.value = ''
  newButtonRow.value = getNextAvailableRow()

  toast.success('Button added')
}

function removeButton(id: string) {
  emit('update:buttons', props.buttons.filter(b => b.id !== id))
  toast.success('Button removed')
}

function moveButtonToRow(buttonId: string, newRow: number) {
  const updatedButtons = props.buttons.map(button =>
    button.id === buttonId ? { ...button, row: newRow } : button,
  )
  emit('update:buttons', updatedButtons)
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  }
  catch {
    return false
  }
}

function getNextAvailableRow(): number {
  if (props.buttons.length === 0)
    return 1
  return Math.max(...props.buttons.map(b => b.row)) + 1
}

// Group buttons by row
const buttonsByRow = computed(() => {
  const grouped = new Map<number, TelegramButton[]>()

  props.buttons.forEach((button) => {
    if (!grouped.has(button.row)) {
      grouped.set(button.row, [])
    }
    grouped.get(button.row)!.push(button)
  })

  // Sort rows
  return Array.from(grouped.entries())
    .sort(([a], [b]) => a - b)
})

// Drag and drop handlers
function handleDragStart(button: TelegramButton) {
  draggedButton.value = button
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDrop(targetRow: number) {
  if (draggedButton.value && draggedButton.value.row !== targetRow) {
    moveButtonToRow(draggedButton.value.id, targetRow)
    toast.success(`Button moved to row ${targetRow}`)
  }
  draggedButton.value = null
}

function handleDropNewRow(event: DragEvent) {
  event.preventDefault()
  if (draggedButton.value) {
    const newRow = getNextAvailableRow()
    moveButtonToRow(draggedButton.value.id, newRow)
    toast.success(`Button moved to new row ${newRow}`)
  }
  draggedButton.value = null
}

// Get available rows for dropdown
const availableRows = computed(() => {
  const maxRow = props.buttons.length > 0
    ? Math.max(...props.buttons.map(b => b.row))
    : 0
  return Array.from({ length: maxRow + 1 }, (_, i) => i + 1)
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Inline Keyboard Buttons</CardTitle>
      <CardDescription>Add clickable buttons with links to your message</CardDescription>
    </CardHeader>

    <CardContent class="space-y-6">
      <!-- Existing Buttons Preview -->
      <div v-if="buttonsByRow.length > 0" class="space-y-3">
        <Label>Button Preview</Label>
        <div class="space-y-2 rounded-lg border p-4">
          <div
            v-for="[rowNumber, rowButtons] in buttonsByRow"
            :key="rowNumber"
            class="flex flex-wrap gap-2"
            @dragover="handleDragOver"
            @drop="handleDrop(rowNumber)"
          >
            <Badge variant="outline" class="text-xs">
              Row {{ rowNumber }}
            </Badge>
            <div
              v-for="button in rowButtons"
              :key="button.id"
              :draggable="true"
              class="bg-primary text-primary-foreground group relative flex cursor-move items-center gap-2 rounded px-3 py-1.5 text-sm transition-opacity hover:opacity-80"
              @dragstart="handleDragStart(button)"
            >
              <GripVertical class="h-3 w-3 opacity-50" />
              <Link class="h-3 w-3" />
              <span>{{ button.text }}</span>
              <button
                class="absolute right-1 top-1 hidden rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600 group-hover:block"
                @click.stop="removeButton(button.id)"
              >
                <Trash2 class="h-3 w-3" />
              </button>
            </div>
          </div>

          <!-- Drop zone for new row -->
          <div
            class="border-border hover:border-primary flex h-12 items-center justify-center rounded border-2 border-dashed transition-colors"
            @dragover="handleDragOver"
            @drop="handleDropNewRow"
          >
            <span class="text-muted-foreground text-xs">Drop here to create new row</span>
          </div>
        </div>
        <p class="text-muted-foreground text-xs">
          Drag buttons to rearrange rows. Hover to see delete button.
        </p>
      </div>

      <!-- Add New Button Form -->
      <div class="space-y-4 rounded-lg border p-4">
        <h4 class="font-medium text-sm">
          Add New Button
        </h4>

        <div class="grid gap-4 md:grid-cols-2">
          <!-- Button Text -->
          <div class="space-y-2">
            <Label for="button-text">Button Text</Label>
            <Input
              id="button-text"
              v-model="newButtonText"
              placeholder="e.g., Visit Website"
              maxlength="64"
            />
          </div>

          <!-- Button URL -->
          <div class="space-y-2">
            <Label for="button-url">Button URL</Label>
            <Input
              id="button-url"
              v-model="newButtonUrl"
              type="url"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <!-- Row Selection -->
        <div class="space-y-2">
          <Label for="button-row">Row Number</Label>
          <div class="flex items-center gap-2">
            <Input
              id="button-row"
              v-model.number="newButtonRow"
              type="number"
              min="1"
              class="w-24"
            />
            <span class="text-muted-foreground text-xs">
              Buttons in the same row appear side by side
            </span>
          </div>
        </div>

        <!-- Add Button -->
        <Button @click="addButton">
          <Plus class="mr-2 h-4 w-4" />
          Add Button
        </Button>
      </div>

      <!-- Info -->
      <div class="bg-muted rounded-lg p-3 text-xs">
        <p class="mb-1 font-medium">
          💡 Tips:
        </p>
        <ul class="text-muted-foreground ml-4 list-disc space-y-1">
          <li>Buttons in the same row appear horizontally</li>
          <li>Each row can have up to 8 buttons</li>
          <li>Telegram recommends max 3 buttons per row for mobile</li>
          <li>URLs must start with http:// or https://</li>
          <li>Button text is limited to 64 characters</li>
        </ul>
      </div>
    </CardContent>
  </Card>
</template>
