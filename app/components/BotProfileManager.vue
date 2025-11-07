<script setup lang="ts">
import { Check, Edit2, Plus, Trash2, X } from 'lucide-vue-next'
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
import { useBotProfilesStore } from '~/stores/botProfiles'

const store = useBotProfilesStore()

// Add Profile Dialog
const isAddDialogOpen = ref(false)
const newBotName = ref('')
const newBotToken = ref('')

// Edit Profile Dialog
const isEditDialogOpen = ref(false)
const editingProfileId = ref<string | null>(null)
const editBotName = ref('')
const editBotToken = ref('')

function handleAddProfile() {
  if (!newBotName.value.trim() || !newBotToken.value.trim()) {
    return
  }

  store.addProfile({
    bot_name: newBotName.value.trim(),
    bot_token: newBotToken.value.trim(),
  })

  // Reset form
  newBotName.value = ''
  newBotToken.value = ''
  isAddDialogOpen.value = false
}

function openEditDialog(profileId: string) {
  const profile = store.profiles.find(p => p.id === profileId)
  if (profile) {
    editingProfileId.value = profileId
    editBotName.value = profile.bot_name
    editBotToken.value = profile.bot_token
    isEditDialogOpen.value = true
  }
}

function handleEditProfile() {
  if (!editingProfileId.value || !editBotName.value.trim() || !editBotToken.value.trim()) {
    return
  }

  store.updateProfile(editingProfileId.value, {
    bot_name: editBotName.value.trim(),
    bot_token: editBotToken.value.trim(),
  })

  // Reset
  editingProfileId.value = null
  editBotName.value = ''
  editBotToken.value = ''
  isEditDialogOpen.value = false
}

function handleDeleteProfile(profileId: string) {
  store.deleteProfile(profileId)
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
          <CardTitle>Bot Profile Manager</CardTitle>
          <CardDescription>Manage your Telegram bot profiles</CardDescription>
        </div>

        <!-- Add Profile Dialog -->
        <Dialog v-model:open="isAddDialogOpen">
          <DialogTrigger as-child>
            <Button size="sm">
              <Plus class="mr-2 h-4 w-4" />
              Add Profile
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bot Profile</DialogTitle>
              <DialogDescription>
                Create a new Telegram bot profile
              </DialogDescription>
            </DialogHeader>

            <div class="space-y-4 p-4">
              <div class="space-y-2">
                <Label for="bot-name">Bot Name</Label>
                <Input
                  id="bot-name"
                  v-model="newBotName"
                  placeholder="My Telegram Bot"
                />
              </div>

              <div class="space-y-2">
                <Label for="bot-token">Bot Token</Label>
                <Input
                  id="bot-token"
                  v-model="newBotToken"
                  type="password"
                  placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                @click="isAddDialogOpen = false"
              >
                Cancel
              </Button>
              <Button
                :disabled="!newBotName.trim() || !newBotToken.trim()"
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
        <p class="mb-2 text-sm">
          No bot profiles yet
        </p>
        <p class="text-xs">
          Click "Add Profile" to create your first bot profile
        </p>
      </div>

      <!-- Profile Selection -->
      <div v-else class="space-y-4">
        <div class="space-y-2">
          <Label for="active-profile">Active Bot Profile</Label>
          <Select
            :model-value="store.activeProfileId || undefined"
            @update:model-value="handleSelectProfile"
          >
            <SelectTrigger id="active-profile">
              <SelectValue placeholder="Select a bot profile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="profile in store.profiles"
                :key="profile.id"
                :value="profile.id"
              >
                {{ profile.bot_name }}
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
                {{ store.activeProfile.bot_name }}
              </p>
              <p class="text-muted-foreground text-xs font-mono">
                {{ store.activeProfile.bot_token.substring(0, 20) }}...
              </p>
            </div>

            <div class="flex gap-2">
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
                    <AlertDialogTitle>Delete Bot Profile</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{{ store.activeProfile.bot_name }}"?
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
            <DialogTitle>Edit Bot Profile</DialogTitle>
            <DialogDescription>
              Update bot profile information
            </DialogDescription>
          </DialogHeader>

          <div class="space-y-4 p-4">
            <div class="space-y-2">
              <Label for="edit-bot-name">Bot Name</Label>
              <Input
                id="edit-bot-name"
                v-model="editBotName"
                placeholder="My Telegram Bot"
              />
            </div>

            <div class="space-y-2">
              <Label for="edit-bot-token">Bot Token</Label>
              <Input
                id="edit-bot-token"
                v-model="editBotToken"
                type="password"
                placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
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
              :disabled="!editBotName.trim() || !editBotToken.trim()"
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
