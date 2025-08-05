<template>
  <q-list>
    <template v-for="(chat, idx) in chats" :key="idx">
      <app-chat-item :chat="chat" @select:chat="onChatSelected" />
      <q-separator v-if="idx !== chats.length - 1" spaced />
    </template>
  </q-list>
</template>

<script setup lang="ts">
import { useChatsStoreRefs, useChatsStore } from 'stores/chats'
import { AppChatItem } from './AppChatItem'

const { setSelectedChat } = useChatsStore()
const { chats } = useChatsStoreRefs()

function onChatSelected(id: string) {
  setSelectedChat(id)

  const chat = chats.value.find((chat) => chat.id === id)
  if (!chat) return

  chat.messages = chat.messages.map((message) => ({
    ...message,
    is_read: true,
  }))
}
</script>
