<template>
  <div v-if="chat" class="app-chat">
    <div class="app-chat__content">
      <q-chat-message
        v-for="(message, idx) in messages"
        :key="idx"
        :name="chat.from"
        bg-color="primary"
        text-color="white"
        :text="[message.text]"
      />
    </div>

    <div class="app-chat__footer">
      <q-input class="app-chat__input" v-model="text" label="Введите сообщение">
        <template v-slot:before>
          <q-avatar color="primary" text-color="white"> Я </q-avatar>
        </template>

        <template v-slot:after>
          <q-btn round dense flat icon="send" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useChatsStoreRefs } from 'stores/chats'

const { chats, selectedChat } = useChatsStoreRefs()

const text = ref('')

const chat = computed(() => {
  return chats.value.find((chat) => chat.id === selectedChat.value)
})

const messages = computed(() => {
  return chat.value?.messages || []
})
</script>

<style lang="scss" src="./AppChat.scss"></style>
