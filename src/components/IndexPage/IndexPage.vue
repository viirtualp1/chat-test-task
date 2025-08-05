<template>
  <q-page class="index-page" :class="{ 'is-centered': !selectedChat }">
    <q-btn round color="primary" icon="arrow-left" @click="back" class="index-page__back" />

    <app-chat v-if="selectedChat" />
    <div v-else>
      <h4>Select a chat to start messaging</h4>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useChatsStore, useChatsStoreRefs } from 'stores/chats'
import { AppChat } from 'components/AppChat'

const { setSelectedChat } = useChatsStore()
const { selectedChat } = useChatsStoreRefs()

function back() {
  setSelectedChat(null)
}
</script>

<style lang="scss" src="./IndexPage.scss"></style>
