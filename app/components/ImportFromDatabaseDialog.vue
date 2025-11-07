<script setup lang="ts">
import { Check, Loader2, X } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import Textarea from '~/components/ui/textarea/Textarea.vue'
import { useDatabaseProfilesStore } from '~/stores/databaseProfiles'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'idsImported': [ids: string]
}>()

const dbStore = useDatabaseProfilesStore()

const sqlQuery = ref('')
const isQuerying = ref(false)
const queryResults = ref<any[]>([])
const extractedIds = ref<number[]>([])

// Sample queries for different databases
const sampleQueries = {
  postgresql: 'SELECT id FROM users WHERE active = true',
  mysql: 'SELECT user_id AS id FROM customers WHERE status = \'active\'',
  mongodb: '{"status": "active"}',
}

async function handleExecuteQuery() {
  if (!dbStore.activeProfile) {
    toast.error('Please select a database profile first')
    return
  }

  if (!sqlQuery.value.trim()) {
    toast.error('Please enter a query')
    return
  }

  isQuerying.value = true
  queryResults.value = []
  extractedIds.value = []

  try {
    const response = await $fetch<any>('/api/database/query', {
      method: 'POST',
      body: {
        databaseUrl: dbStore.activeProfile.databaseUrl,
        query: sqlQuery.value,
      },
    })

    if (response.success && response.data) {
      queryResults.value = response.data

      // Extract IDs from results using utility
      extractedIds.value = parseIds(response.data)

      if (extractedIds.value.length === 0) {
        toast.warning('No IDs found in query results')
      }
      else {
        toast.success(`Found ${extractedIds.value.length} IDs`)
      }
    }
  }
  catch (error: any) {
    toast.error(error.data?.message || 'Failed to execute query')
    console.error('Query error:', error)
  }
  finally {
    isQuerying.value = false
  }
}

function handleImportIds() {
  if (extractedIds.value.length === 0) {
    toast.error('No IDs to import')
    return
  }

  const idsString = formatIdsForInput(extractedIds.value)
  emit('idsImported', idsString)
  emit('update:open', false)

  toast.success(`Imported ${extractedIds.value.length} IDs`)
}

function handleClose() {
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)">
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Import Chat IDs from Database</DialogTitle>
        <DialogDescription>
          Execute a query on your database to import chat IDs
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 p-4 overflow-y-auto max-h-[60vh]">
        <!-- Database Selection Info -->
        <div v-if="!dbStore.activeProfile" class="bg-muted rounded-lg border p-4 text-center">
          <p class="text-sm">
            No database profile selected. Please configure a database profile first.
          </p>
        </div>

        <div v-else class="bg-muted/50 rounded-lg border p-3">
          <p class="text-sm font-medium">
            Active Database: {{ dbStore.activeProfile.name }}
          </p>
        </div>

        <!-- Query Input -->
        <div class="space-y-2">
          <Label for="sql-query">SQL Query / MongoDB Filter</Label>
          <Textarea
            id="sql-query"
            v-model="sqlQuery"
            placeholder="SELECT id FROM users WHERE active = true"
            rows="5"
            class="font-mono text-sm"
            :disabled="!dbStore.activeProfile"
          />
          <p class="text-muted-foreground text-xs">
            Query should return rows with 'id', 'message_id', 'user_id', or 'chat_id' fields
          </p>
        </div>

        <!-- Sample Queries -->
        <div class="space-y-2">
          <Label class="text-xs">Sample Queries:</Label>
          <div class="space-y-1">
            <button
              v-for="(query, type) in sampleQueries"
              :key="type"
              class="text-muted-foreground hover:text-foreground block w-full rounded border bg-muted p-2 text-left text-xs font-mono transition-colors"
              @click="sqlQuery = query"
            >
              {{ query }}
            </button>
          </div>
        </div>

        <!-- Execute Button -->
        <Button
          class="w-full"
          :disabled="!dbStore.activeProfile || !sqlQuery.trim() || isQuerying"
          @click="handleExecuteQuery"
        >
          <Loader2 v-if="isQuerying" class="mr-2 h-4 w-4 animate-spin" />
          {{ isQuerying ? 'Executing...' : 'Execute Query' }}
        </Button>

        <!-- Results -->
        <div v-if="extractedIds.length > 0" class="space-y-2">
          <Label>Extracted IDs ({{ extractedIds.length }})</Label>
          <div class="bg-muted max-h-40 overflow-y-auto rounded-lg border p-3">
            <p class="font-mono text-xs">
              {{ extractedIds.join(', ') }}
            </p>
          </div>
        </div>

        <!-- Query Results Preview -->
        <div v-if="queryResults.length > 0" class="space-y-2">
          <Label>Query Results ({{ queryResults.length }} rows)</Label>
          <div class="bg-muted max-h-60 overflow-auto rounded-lg border">
            <pre class="p-3 text-xs">{{ JSON.stringify(queryResults.slice(0, 5), null, 2) }}</pre>
            <p v-if="queryResults.length > 5" class="text-muted-foreground border-t p-2 text-xs">
              ... and {{ queryResults.length - 5 }} more rows
            </p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="handleClose">
          <X class="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          :disabled="extractedIds.length === 0"
          @click="handleImportIds"
        >
          <Check class="mr-2 h-4 w-4" />
          Import {{ extractedIds.length }} IDs
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
