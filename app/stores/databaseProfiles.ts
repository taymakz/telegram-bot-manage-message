import { defineStore } from 'pinia'

export interface DatabaseProfile {
  id: string
  name: string
  databaseUrl: string
  type?: 'postgresql' | 'mysql' | 'mongodb' | 'other'
  lastTested?: string
  isConnected?: boolean
}

export const useDatabaseProfilesStore = defineStore('databaseProfiles', () => {
  // State
  const profiles = ref<DatabaseProfile[]>([])
  const activeProfileId = ref<string | null>(null)

  // Cookie persistence
  const profilesCookie = useCookie<DatabaseProfile[]>('telegram-db-profiles', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })

  const activeProfileCookie = useCookie<string | null>('telegram-active-db-profile', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })

  // Initialize from cookies on mount
  onMounted(() => {
    if (profilesCookie.value && profilesCookie.value.length > 0) {
      profiles.value = profilesCookie.value
    }
    if (activeProfileCookie.value) {
      activeProfileId.value = activeProfileCookie.value
    }
  })

  // Watchers to sync with cookies
  watch(profiles, (newProfiles) => {
    profilesCookie.value = newProfiles
  }, { deep: true })

  watch(activeProfileId, (newActiveId) => {
    activeProfileCookie.value = newActiveId
  })

  // Getters
  const activeProfile = computed(() => {
    if (!activeProfileId.value)
      return null
    return profiles.value.find(p => p.id === activeProfileId.value) || null
  })

  const hasProfiles = computed(() => profiles.value.length > 0)

  // Actions
  function addProfile(profile: Omit<DatabaseProfile, 'id'>) {
    const newProfile: DatabaseProfile = {
      id: Date.now().toString(),
      ...profile,
    }
    profiles.value.push(newProfile)

    // Set as active if it's the first profile
    if (profiles.value.length === 1) {
      activeProfileId.value = newProfile.id
    }

    return newProfile
  }

  function updateProfile(id: string, updates: Partial<Omit<DatabaseProfile, 'id'>>) {
    const index = profiles.value.findIndex(p => p.id === id)
    if (index !== -1) {
      const current = profiles.value[index]
      if (current) {
        profiles.value[index] = {
          id: current.id,
          name: updates.name ?? current.name,
          databaseUrl: updates.databaseUrl ?? current.databaseUrl,
          type: updates.type ?? current.type,
          lastTested: updates.lastTested ?? current.lastTested,
          isConnected: updates.isConnected ?? current.isConnected,
        }
      }
    }
  }

  function deleteProfile(id: string) {
    profiles.value = profiles.value.filter(p => p.id !== id)

    // Clear active profile if deleted
    if (activeProfileId.value === id) {
      activeProfileId.value = profiles.value.length > 0 ? profiles.value[0]?.id || null : null
    }
  }

  function setActiveProfile(id: string) {
    if (profiles.value.some(p => p.id === id)) {
      activeProfileId.value = id
    }
  }

  return {
    // State
    profiles,
    activeProfileId,

    // Getters
    activeProfile,
    hasProfiles,

    // Actions
    addProfile,
    updateProfile,
    deleteProfile,
    setActiveProfile,
  }
})
