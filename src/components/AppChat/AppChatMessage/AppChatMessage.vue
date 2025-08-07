<template>
  <q-chat-message
    :bg-color="isSent ? 'primary' : 'grey-3'"
    :text-color="isSent ? 'white' : 'black'"
    :sent="isSent"
    :stamp="parsedDate"
    :text="[message.text]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format, parseISO } from 'date-fns'
import { ChatMessageType, type ChatMessage } from 'src/types/chat'

const props = defineProps<{
  message: ChatMessage
}>()

const isSent = computed(() => {
  return props.message.type === ChatMessageType.OUTPUT
})

const parsedDate = computed(() => {
  return format(parseISO(props.message.date), 'dd.MM.yyyy HH:mm')
})
</script>
