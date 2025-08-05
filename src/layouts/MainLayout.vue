<template>
  <q-layout class="main-layout row">
    <div v-if="isShowSidebar" class="col col-sm-4">
      <app-sidebar />
    </div>

    <q-page-container v-if="isShowContainer" class="col">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import { useChatsStoreRefs } from 'stores/chats'
import { AppSidebar } from 'components/AppSidebar'

const { selectedChat } = useChatsStoreRefs()

const { greater } = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const isShowSidebar = computed(() => {
  if (greater('tablet').value) {
    return true
  }

  return !selectedChat.value
})

const isShowContainer = computed(() => {
  return greater('tablet').value || selectedChat.value
})
</script>
