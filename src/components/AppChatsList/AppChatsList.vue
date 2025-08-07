<template>
  <q-list>
    <q-banner
      v-if="filteredChats.length === 0 && filters.sort === SortFilterType.NEW"
      dense
      inline-actions
      rounded
      class="bg-primary text-white"
    >
      There are no new chats

      <template v-slot:action>
        <q-btn flat color="white" rounded label="Go to all chats" @click="setRecentFilter" />
      </template>
    </q-banner>

    <template v-for="(chat, idx) in filteredChats" :key="chat.from">
      <app-chats-list-item :chat="chat" @select:chat="onChatSelected" />
      <q-separator v-if="idx !== filteredChats.length - 1" spaced />
    </template>
  </q-list>
</template>

<script setup lang="ts">
import { useChatsStoreRefs, useChatsStore } from 'stores/chats'
import { useChatsFilters } from 'src/composables/useChatsFilters'
import { AppChatsListItem } from './AppChatsListItem'
import { SortFilterType, useFiltersStoreRefs } from 'stores/filters'

const { setSelectedChat } = useChatsStore()
const { filters } = useFiltersStoreRefs()
const { chats } = useChatsStoreRefs()
const { filteredChats } = useChatsFilters()

function onChatSelected(from: string) {
  setSelectedChat(from)

  const chat = chats.value.get(from)
  if (!chat) return

  chat.messages = chat.messages.map((message) => ({
    ...message,
    is_read: true,
  }))
}

function setRecentFilter() {
  filters.value.sort = SortFilterType.RECENT
}
</script>
