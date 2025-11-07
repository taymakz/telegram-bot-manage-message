<script setup lang="ts">
import BottomSheet from '@douxcode/vue-spring-bottom-sheet'
import { useMediaQuery } from '@vueuse/core'
import Dialog from '~/components/ui/dialog/Dialog.vue'
import DialogFooter from '~/components/ui/dialog/DialogFooter.vue'
import DialogScrollContent from '~/components/ui/dialog/DialogScrollContent.vue'
import { appDesktopStartMinWidth } from '~/constants'
import DialogDescription from '../dialog/DialogDescription.vue'
import DialogHeader from '../dialog/DialogHeader.vue'
import DialogTitle from '../dialog/DialogTitle.vue'
import DialogTrigger from '../dialog/DialogTrigger.vue'
import '@douxcode/vue-spring-bottom-sheet/dist/style.css'

interface Props {
  open?: boolean
  class?: string
}

defineProps<Props>()

const isOpen = defineModel('open', { required: false, default: false })

const isDesktop = useMediaQuery(appDesktopStartMinWidth)
</script>

<template>
  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogScrollContent class="p-0" :class="$props.class">
      <DialogHeader>
        <DialogTitle>
          <slot name="title" />
        </DialogTitle>
        <DialogDescription>
          <slot name="description" />
        </DialogDescription>
      </DialogHeader>
      <div class="px-6">
        <slot name="default" />
      </div>
      <DialogFooter v-if="$slots.footer">
        <slot name="footer" />
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>

  <div v-if="!isDesktop && $slots.trigger" @click="isOpen = true">
    <slot name="trigger" />
  </div>

  <ClientOnly>
    <BottomSheet v-if="!isDesktop" v-model="isOpen">
      <template #header>
        <div class="mt-2 text-center">
          <h2>
            <slot name="title" />
          </h2>
          <p class="text-muted-foreground text-sm">
            <slot name="description" />
          </p>
        </div>
      </template>
      <div class="overflow-y-auto p-4">
        <slot name="default" />
      </div>
      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </BottomSheet>
  </ClientOnly>
</template>
