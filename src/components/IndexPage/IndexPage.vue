<template>
  <q-page class="index-page" :class="{ 'is-centered': !selectedChat }">
    <app-chat v-if="selectedChat" />
    <div v-else>
      <h5>Select a chat to start messaging</h5>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useChatsStoreRefs } from 'stores/chats'
import { AppChat } from 'components/AppChat'

const { selectedChat } = useChatsStoreRefs()
</script>

<style lang="scss" src="./IndexPage.scss"></style>
