import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

export const useChatsStore = defineStore('chats', () => {
  const selectedChat = ref<number | null>(null)

  return {
    selectedChat,
  }
})

export const useChatsStoreRefs = () => storeToRefs(useChatsStore())
