<script setup lang="ts">
import BottomSheet from '@douxcode/vue-spring-bottom-sheet'
import { useMediaQuery } from '@vueuse/core'
import AlertDialog from '~/components/ui/alert-dialog/AlertDialog.vue'
import AlertDialogContent from '~/components/ui/alert-dialog/AlertDialogContent.vue'
import AlertDialogDescription from '~/components/ui/alert-dialog/AlertDialogDescription.vue'
import AlertDialogFooter from '~/components/ui/alert-dialog/AlertDialogFooter.vue'
import AlertDialogHeader from '~/components/ui/alert-dialog/AlertDialogHeader.vue'
import AlertDialogTitle from '~/components/ui/alert-dialog/AlertDialogTitle.vue'
import Input from '~/components/ui/input/Input.vue'
import { appDesktopStartMinWidth } from '~/constants'
import AlertDialogTrigger from '../alert-dialog/AlertDialogTrigger.vue'
import Button from '../button/Button.vue'
import '@douxcode/vue-spring-bottom-sheet/dist/style.css'

interface Props {
  title: string
  description?: string
  confirmText?: string
  confirmLoading?: boolean
}
const props = defineProps<Props>()
defineEmits<{
  (e: 'confirm'): void
}>()
const isOpen = defineModel<boolean>('open', {
  required: false,
  default: false,
})

const confirmInput = ref('')

const isConfirmValid = computed(() => {
  if (!props.confirmText)
    return true
  return confirmInput.value === props.confirmText
})

watch(
  () => isOpen,
  (newOpen) => {
    if (!newOpen) {
      confirmInput.value = ''
    }
  },
)

const isDesktop = useMediaQuery(appDesktopStartMinWidth)

function handleOpenChange(value: boolean) {
  isOpen.value = value
}
</script>

<template>
  <AlertDialog
    v-if="isDesktop"
    v-model:open="isOpen"
    @update:open="handleOpenChange"
  >
    <AlertDialogTrigger as-child>
      <slot name="default" />
    </AlertDialogTrigger>
    <AlertDialogContent class="p-0">
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ description }}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div v-if="confirmText" class="space-y-2 px-6">
        <!-- Persian -->
        <p class="text-muted-foreground text-sm ltr:hidden rtl:block">
          برای تایید، متن "<span class="font-semibold">{{ confirmText }}</span>" را وارد کنید
        </p>
        <!-- English -->
        <p class="text-muted-foreground text-sm ltr:block rtl:hidden">
          To confirm, type "<span class="font-semibold">{{ confirmText }}</span>"
        </p>
        <Input v-model="confirmInput" :placeholder="confirmText" autofocus />
      </div>

      <AlertDialogFooter class="mt-4">
        <Button variant="outline" @click="isOpen = false">
          لغو
        </Button>
        <Button
          variant="warning"
          :disabled="confirmLoading || !isConfirmValid"
          :loading="confirmLoading"
          @click="$emit('confirm')"
        >
          تایید
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <div v-if="!isDesktop && $slots.default" @click="isOpen = true">
    <slot name="default" />
  </div>

  <BottomSheet
    v-if="!isDesktop"
    v-model="isOpen"
    @update:model-value="handleOpenChange"
  >
    <template #header>
      <div class="mt-2 text-center">
        <h2>{{ title }}</h2>
        <p class="text-muted-foreground mt-2 text-sm">
          {{ description }}
        </p>
      </div>
    </template>
    <div class="p-4">
      <div v-if="confirmText" class="mt-4 space-y-2">
        <!-- Persian -->
        <p class="text-muted-foreground text-sm ltr:hidden rtl:block">
          برای تایید، متن "<span class="font-semibold">{{ confirmText }}</span>" را وارد کنید
        </p>
        <!-- English -->
        <p class="text-muted-foreground text-sm ltr:block rtl:hidden">
          To confirm, type "<span class="font-semibold">{{ confirmText }}</span>"
        </p>
        <Input
          v-model="confirmInput"
          :placeholder="confirmText"
          autofocus
          autocomplete="off"
        />
      </div>
    </div>
    <template #footer>
      <div>
        <Button
          variant="warning"
          :disabled="confirmLoading || !isConfirmValid"
          :loading="confirmLoading"
          class="w-full"
          @click="$emit('confirm')"
        >
          تایید
        </Button>
      </div>
    </template>
  </BottomSheet>
</template>
