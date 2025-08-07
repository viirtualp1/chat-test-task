<template>
  <q-list>
    <template v-for="(chat, idx) in filteredChats" :key="chat.from">
      <app-chat-item :chat="chat" @select:chat="onChatSelected" />
      <q-separator v-if="idx !== filteredChats.length - 1" spaced />
    </template>
  </q-list>
</template>

<script setup lang="ts">
import { useChatsStoreRefs, useChatsStore } from 'stores/chats'
import { useChatsFilters } from 'src/composables/useChatsFilters'
import { AppChatItem } from './AppChatItem'

const { setSelectedChat } = useChatsStore()
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
</script>
