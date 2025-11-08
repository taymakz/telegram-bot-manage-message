<script setup lang="ts">
import { RefreshCw } from 'lucide-vue-next'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

const diagnostics = ref<any>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

async function runDiagnostics() {
  isLoading.value = true
  error.value = null

  try {
    const response = await $fetch('/api/telegram/diagnostics')
    diagnostics.value = response
  }
  catch (err: any) {
    error.value = err.message || 'Failed to run diagnostics'
  }
  finally {
    isLoading.value = false
  }
}

// Run on mount
onMounted(() => {
  runDiagnostics()
})
</script>

<template>
  <div class="container mx-auto space-y-8 p-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">
          Network Diagnostics
        </h1>
        <p class="text-muted-foreground text-lg">
          Check if Telegram API is reachable from your server
        </p>
      </div>

      <div class="flex gap-2">
        <Button :disabled="isLoading" @click="runDiagnostics">
          <RefreshCw class="mr-2 h-4 w-4" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </Button>
        <Button as-child variant="outline">
          <NuxtLink to="/">
            Go Back
          </NuxtLink>
        </Button>
      </div>
    </div>

    <!-- Error -->
    <Card v-if="error" class="border-destructive">
      <CardHeader>
        <CardTitle class="text-destructive">
          Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-sm">
          {{ error }}
        </p>
      </CardContent>
    </Card>

    <!-- Results -->
    <div v-if="diagnostics" class="space-y-6">
      <!-- DNS Check -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>DNS Resolution</CardTitle>
              <CardDescription>Can resolve api.telegram.org domain</CardDescription>
            </div>
            <Badge
              :variant="diagnostics.checks.dns?.status === 'success' ? 'success' : 'alert'"
            >
              {{ diagnostics.checks.dns?.status }}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="diagnostics.checks.dns?.status === 'success'" class="space-y-2">
            <p class="text-sm font-medium">
              ✅ DNS is working correctly
            </p>
            <div class="text-muted-foreground text-xs">
              <p class="font-semibold">
                Resolved IP addresses:
              </p>
              <ul class="ml-4 mt-1 list-disc space-y-1">
                <li v-for="addr in diagnostics.checks.dns.addresses" :key="addr">
                  {{ addr }}
                </li>
              </ul>
            </div>
          </div>

          <div v-else class="space-y-2">
            <p class="text-destructive text-sm font-medium">
              ❌ DNS resolution failed
            </p>
            <div class="text-muted-foreground space-y-1 text-xs">
              <p><strong>Error:</strong> {{ diagnostics.checks.dns?.error }}</p>
              <p><strong>Code:</strong> {{ diagnostics.checks.dns?.code }}</p>
            </div>

            <div class="bg-muted mt-4 space-y-2 rounded-lg p-4">
              <p class="text-sm font-semibold">
                💡 Possible Solutions:
              </p>
              <ul class="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                <li>Check your internet connection</li>
                <li>Flush DNS cache: <code>ipconfig /flushdns</code></li>
                <li>Change DNS servers (Google: 8.8.8.8, Cloudflare: 1.1.1.1)</li>
                <li>Use a VPN if Telegram is blocked in your region</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- HTTP Check -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>HTTP Connectivity</CardTitle>
              <CardDescription>Can make HTTP requests to Telegram API</CardDescription>
            </div>
            <Badge
              :variant="diagnostics.checks.http?.status === 'success' ? 'success' : 'alert'"
            >
              {{ diagnostics.checks.http?.status }}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="diagnostics.checks.http?.status === 'success'" class="space-y-2">
            <p class="text-sm font-medium">
              ✅ HTTP connection is working
            </p>
            <p class="text-muted-foreground text-xs">
              {{ diagnostics.checks.http.note }}
            </p>
          </div>

          <div v-else class="space-y-2">
            <p class="text-destructive text-sm font-medium">
              ❌ Cannot connect to Telegram API
            </p>
            <div class="text-muted-foreground space-y-1 text-xs">
              <p><strong>Error:</strong> {{ diagnostics.checks.http?.error }}</p>
              <p v-if="diagnostics.checks.http?.code">
                <strong>Code:</strong> {{ diagnostics.checks.http.code }}
              </p>
            </div>

            <div class="bg-muted mt-4 space-y-2 rounded-lg p-4">
              <p class="text-sm font-semibold">
                💡 Possible Solutions:
              </p>
              <ul class="text-muted-foreground ml-4 list-disc space-y-1 text-xs">
                <li>Check firewall settings</li>
                <li>Disable antivirus temporarily</li>
                <li>Use a VPN service</li>
                <li>Check if your ISP blocks Telegram</li>
                <li>Try using mobile hotspot</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Summary -->
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div v-if="diagnostics.checks.dns?.status === 'success' && diagnostics.checks.http?.status === 'success'">
            <p class="text-sm font-medium text-green-600 dark:text-green-400">
              ✅ All checks passed! Telegram API is reachable.
            </p>
            <p class="text-muted-foreground mt-2 text-xs">
              You can go back to the main app and send messages.
            </p>
            <Button as-child class="mt-4">
              <NuxtLink to="/">
                Go to Dashboard
              </NuxtLink>
            </Button>
          </div>

          <div v-else>
            <p class="text-destructive text-sm font-medium">
              ❌ Connection issues detected
            </p>
            <p class="text-muted-foreground mt-2 text-xs">
              Please resolve the issues above before using the app.
            </p>

    
          </div>

          <div class="text-muted-foreground mt-4 border-t pt-4 text-xs">
            <p><strong>Timestamp:</strong> {{ new Date(diagnostics.timestamp).toLocaleString() }}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Loading State -->
    <Card v-if="isLoading && !diagnostics">
      <CardContent class="flex items-center justify-center py-12">
        <div class="text-center">
          <RefreshCw class="text-muted-foreground mx-auto h-8 w-8 animate-spin" />
          <p class="text-muted-foreground mt-4 text-sm">
            Running diagnostics...
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
