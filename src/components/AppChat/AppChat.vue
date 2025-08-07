<template>
  <div v-if="chat" class="app-chat">
    <div class="app-chat__header">
      <q-btn
        round
        color="primary"
        icon="arrow_back"
        size="sm"
        class="app-chat__back"
        @click="back"
      />

      {{ chat.from }}
    </div>

    <div ref="chatContentRef" class="app-chat__content">
      <q-chat-message
        v-for="(message, idx) in messages"
        :key="idx"
        bg-color="primary"
        text-color="white"
        :sent="message.type === ChatMessageType.OUTPUT"
        :stamp="parseMessageDate(message.date)"
        :text="[message.text]"
      />
    </div>

    <div class="app-chat__footer">
      <q-input
        v-model="text"
        label="Введите сообщение"
        name="Message"
        outlined
        rounded
        @keydown.enter="sendMessage"
      >
        <template v-slot:prepend>
          <q-avatar color="primary" text-color="white"> Я </q-avatar>
        </template>

        <template v-slot:append>
          <q-btn round dense flat icon="send" @click="sendMessage" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { format, parseISO } from 'date-fns'
import { useChatsStore, useChatsStoreRefs } from 'stores/chats'
import { ChatMessageType } from 'src/types/chat'

const { setSelectedChat } = useChatsStore()
const { chats, selectedChat } = useChatsStoreRefs()

const chatContentRef = ref<HTMLDivElement>()
const text = ref('')

const chat = computed(() => {
  return chats.value.get(selectedChat.value)
})

const messages = computed(() => {
  return chat.value?.messages || []
})

function parseMessageDate(date: string): string {
  return format(parseISO(date), 'dd.MM.yyyy HH:mm')
}

function back() {
  setSelectedChat('')
}

function scrollToLastMessage() {
  if (!chatContentRef.value) return

  const el = chatContentRef.value

  nextTick(() => {
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    })
  })
}

function sendMessage() {
  chat.value?.messages.push({
    text: text.value,
    type: ChatMessageType.OUTPUT,
    date: new Date().toISOString(),
    is_read: false,
  })

  text.value = ''
  scrollToLastMessage()
}
</script>

<style lang="scss" src="./AppChat.scss"></style>
