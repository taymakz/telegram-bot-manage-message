<script setup lang="ts">
import { Check, Database, Edit2, Plus, TestTube, Trash2, X } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { useDatabaseProfilesStore } from '~/stores/databaseProfiles'

const store = useDatabaseProfilesStore()

// Add Profile Dialog
const isAddDialogOpen = ref(false)
const newName = ref('')
const newDatabaseUrl = ref('')
const isTesting = ref(false)

// Edit Profile Dialog
const isEditDialogOpen = ref(false)
const editingProfileId = ref<string | null>(null)
const editName = ref('')
const editDatabaseUrl = ref('')

async function handleTestConnection(url: string) {
  if (!url.trim()) {
    toast.error('Please enter a database URL')
    return
  }

  isTesting.value = true

  try {
    const result = await $fetch<any>('/api/database/testConnection', {
      method: 'POST',
      body: { databaseUrl: url },
    })

    if (result.success) {
      toast.success(result.message)
    }
    else {
      toast.error(result.message)
    }
  }
  catch (error: any) {
    toast.error(error.data?.message || 'Failed to test connection')
  }
  finally {
    isTesting.value = false
  }
}

async function handleAddProfile() {
  if (!newName.value.trim() || !newDatabaseUrl.value.trim()) {
    toast.error('Please fill in all fields')
    return
  }

  store.addProfile({
    name: newName.value.trim(),
    databaseUrl: newDatabaseUrl.value.trim(),
  })

  toast.success('Database profile added successfully')

  // Reset form
  newName.value = ''
  newDatabaseUrl.value = ''
  isAddDialogOpen.value = false
}

function openEditDialog(profileId: string) {
  const profile = store.profiles.find(p => p.id === profileId)
  if (profile) {
    editingProfileId.value = profileId
    editName.value = profile.name
    editDatabaseUrl.value = profile.databaseUrl
    isEditDialogOpen.value = true
  }
}

function handleEditProfile() {
  if (!editingProfileId.value || !editName.value.trim() || !editDatabaseUrl.value.trim()) {
    return
  }

  store.updateProfile(editingProfileId.value, {
    name: editName.value.trim(),
    databaseUrl: editDatabaseUrl.value.trim(),
  })

  toast.success('Database profile updated')

  // Reset
  editingProfileId.value = null
  editName.value = ''
  editDatabaseUrl.value = ''
  isEditDialogOpen.value = false
}

function handleDeleteProfile(profileId: string) {
  store.deleteProfile(profileId)
  toast.success('Database profile deleted')
}

function handleSelectProfile(value: any) {
  if (value && typeof value === 'string') {
    store.setActiveProfile(value)
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-start justify-between">
        <div>
          <CardTitle>
            <Database class="mr-2 inline h-5 w-5" />
            Database Profile Manager
          </CardTitle>
          <CardDescription>Manage your database connections for importing chat IDs</CardDescription>
        </div>

        <!-- Add Profile Dialog -->
        <Dialog v-model:open="isAddDialogOpen">
          <DialogTrigger as-child>
            <Button size="sm">
              <Plus class="mr-2 h-4 w-4" />
              Add Database
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Database Profile</DialogTitle>
              <DialogDescription>
                Create a new database connection profile
              </DialogDescription>
            </DialogHeader>

            <div class="space-y-4 p-4">
              <div class="space-y-2">
                <Label for="db-name">Profile Name</Label>
                <Input
                  id="db-name"
                  v-model="newName"
                  placeholder="My Production DB"
                />
              </div>

              <div class="space-y-2">
                <Label for="db-url">Database URL</Label>
                <Input
                  id="db-url"
                  v-model="newDatabaseUrl"
                  type="password"
                  placeholder="postgresql://user:pass@host:5432/dbname"
                />
                <p class="text-muted-foreground text-xs">
                  Supports PostgreSQL, MySQL, MongoDB connection strings
                </p>
              </div>

              <Button
                variant="outline"
                class="w-full"
                :disabled="!newDatabaseUrl.trim() || isTesting"
                @click="handleTestConnection(newDatabaseUrl)"
              >
                <TestTube class="mr-2 h-4 w-4" />
                {{ isTesting ? 'Testing...' : 'Test Connection' }}
              </Button>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                @click="isAddDialogOpen = false"
              >
                Cancel
              </Button>
              <Button
                :disabled="!newName.trim() || !newDatabaseUrl.trim()"
                @click="handleAddProfile"
              >
                <Check class="mr-2 h-4 w-4" />
                Add Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CardHeader>

    <CardContent class="space-y-4">
      <!-- No Profiles State -->
      <div
        v-if="!store.hasProfiles"
        class="text-muted-foreground flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center"
      >
        <Database class="text-muted-foreground mb-2 h-12 w-12" />
        <p class="mb-2 text-sm">
          No database profiles yet
        </p>
        <p class="text-xs">
          Click "Add Database" to create your first database profile
        </p>
      </div>

      <!-- Profile Selection -->
      <div v-else class="space-y-4">
        <div class="space-y-2">
          <Label for="active-db-profile">Active Database Profile</Label>
          <Select
            :model-value="store.activeProfileId || undefined"
            @update:model-value="handleSelectProfile"
          >
            <SelectTrigger id="active-db-profile">
              <SelectValue placeholder="Select a database profile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="profile in store.profiles"
                :key="profile.id"
                :value="profile.id"
              >
                {{ profile.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Active Profile Details -->
        <div
          v-if="store.activeProfile"
          class="bg-muted/50 space-y-2 rounded-lg border p-4"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 space-y-1">
              <p class="text-sm font-medium">
                {{ store.activeProfile.name }}
              </p>
              <p class="text-muted-foreground text-xs font-mono">
                {{ store.activeProfile.databaseUrl.substring(0, 40) }}...
              </p>
            </div>

            <div class="flex gap-2">
              <!-- Test Button -->
              <Button
                size="sm"
                variant="ghost"
                :disabled="isTesting"
                @click="handleTestConnection(store.activeProfile.databaseUrl)"
              >
                <TestTube class="h-4 w-4" />
              </Button>

              <!-- Edit Button -->
              <Button
                size="sm"
                variant="ghost"
                @click="openEditDialog(store.activeProfile.id)"
              >
                <Edit2 class="h-4 w-4" />
              </Button>

              <!-- Delete Button -->
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button size="sm" variant="ghost">
                    <Trash2 class="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Database Profile</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{{ store.activeProfile.name }}"?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      @click="handleDeleteProfile(store.activeProfile!.id)"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Profile Dialog -->
      <Dialog v-model:open="isEditDialogOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Database Profile</DialogTitle>
            <DialogDescription>
              Update database profile information
            </DialogDescription>
          </DialogHeader>

          <div class="space-y-4 p-4">
            <div class="space-y-2">
              <Label for="edit-db-name">Profile Name</Label>
              <Input
                id="edit-db-name"
                v-model="editName"
                placeholder="My Production DB"
              />
            </div>

            <div class="space-y-2">
              <Label for="edit-db-url">Database URL</Label>
              <Input
                id="edit-db-url"
                v-model="editDatabaseUrl"
                type="password"
                placeholder="postgresql://user:pass@host:5432/dbname"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              @click="isEditDialogOpen = false"
            >
              <X class="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              :disabled="!editName.trim() || !editDatabaseUrl.trim()"
              @click="handleEditProfile"
            >
              <Check class="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardContent>
  </Card>
</template>
