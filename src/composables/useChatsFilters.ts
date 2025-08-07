import { computed } from 'vue'
import { useChatsStoreRefs } from 'stores/chats'
import { SortFilterType, useFiltersStoreRefs } from 'stores/filters'
import type { FormattedChatMessage } from 'src/types/chat'

export function useChatsFilters() {
  const { chatsList } = useChatsStoreRefs()
  const { filters } = useFiltersStoreRefs()

  const filteredChats = computed(() => {
    return chatsList.value.filter(filterBySearch).filter(filterBySort).sort(sortByDateMessages)
  })

  function filterBySearch(chat: FormattedChatMessage) {
    return chat.from.toLowerCase().includes(filters.value.search?.toLowerCase() || '')
  }

  function filterBySort(chat: FormattedChatMessage) {
    if (filters.value.sort === SortFilterType.RECENT) {
      return true
    }
    return chat.messages.some((message) => !message.is_read)
  }

  function sortByDateMessages(a: FormattedChatMessage, b: FormattedChatMessage) {
    const aLastMessage = a.messages[a.messages.length - 1]
    const bLastMessage = b.messages[b.messages.length - 1]

    if (!aLastMessage || !bLastMessage) return 0

    return new Date(bLastMessage.date).getTime() - new Date(aLastMessage.date).getTime()
  }

  return {
    filteredChats,
  }
}
