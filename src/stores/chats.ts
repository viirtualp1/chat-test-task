import { v4 as uuidv4 } from 'uuid'
import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useWebSocket } from '@vueuse/core'

export interface WSResponse {
  message?: WSChatMessage
  notification?: string
}

export interface WSChatMessage {
  from: string
  message: string
}

export interface FormattedChatMessage {
  id: string
  from: string
  messages: ChatMessage[]
}

export interface ChatMessage {
  text: string
  date: string
  is_read: boolean
}

export const useChatsStore = defineStore('chats', () => {
  const { status, data } = useWebSocket('ws://[::]:8181')

  const chats = ref<FormattedChatMessage[]>([])
  const selectedChat = ref<string | null>(null)

  const handleNewMessage = (data: WSChatMessage) => {
    const isChatExists = chats.value.some((chat) => chat.from === data.from)

    if (isChatExists) {
      const existingChatIndex = chats.value.findIndex((chat) => chat.from === data.from)

      const existingChat = chats.value[existingChatIndex]
      if (!existingChat) return

      existingChat.messages.push({
        text: data.message,
        date: new Date().toISOString(),
        is_read: selectedChat.value === existingChat.id,
      })

      return
    }

    chats.value.push({
      id: uuidv4(),
      from: data.from,
      messages: [
        {
          text: data.message,
          date: new Date().toISOString(),
          is_read: false,
        },
      ],
    })
  }

  function setSelectedChat(chatId: string | null) {
    selectedChat.value = chatId
  }

  watch(data, (newData) => {
    if (!newData) return

    try {
      const parsedData = JSON.parse(newData as string) as WSResponse

      if (parsedData.message) {
        handleNewMessage(parsedData.message)
      } else if (parsedData.notification) {
        console.log('Notification received:', parsedData.notification)
      }
    } catch (err) {
      console.error('Failed to parse WebSocket message:', err)
    }
  })

  return {
    selectedChat,
    status,
    data,
    chats,
    setSelectedChat,
  }
})

export const useChatsStoreRefs = () => storeToRefs(useChatsStore())
