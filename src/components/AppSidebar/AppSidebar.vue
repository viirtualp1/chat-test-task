<template>
  <div class="app-sidebar">
    <div class="app-sidebar__filters">
      <app-button label="Recent" />
      <app-button label="New" badge-color="red" outline always-visible-badge />
    </div>

    <app-chats-list />
  </div>
</template>

<script setup lang="ts">
import { AppButton } from 'components/AppButton'
import { AppChatsList } from 'components/AppChatsList'
</script>

<style lang="scss" src="./AppSidebar.scss"></style>
