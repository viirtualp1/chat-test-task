<template>
  <div class="app-sidebar">
    <div class="app-sidebar__filters">
      <q-input v-model="filters.search" dense outlined label="Search" clearable debounce="100">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <div class="app-sidebar__filters-sort">
        <app-button
          label="Recent"
          :outline="filters.sort !== SortFilterType.RECENT"
          @click="selectFilter(SortFilterType.RECENT)"
        />
        <app-button
          label="New"
          :outline="filters.sort !== SortFilterType.NEW"
          @click="selectFilter(SortFilterType.NEW)"
        />
      </div>
    </div>

    <app-chats-list />
  </div>
</template>

<script setup lang="ts">
import { AppButton } from 'components/AppButton'
import { AppChatsList } from 'components/AppChatsList'
import { SortFilterType, useFiltersStoreRefs } from 'src/stores/filters'

const { filters } = useFiltersStoreRefs()

function selectFilter(type: SortFilterType) {
  filters.value.sort = type
}
</script>

<style lang="scss" src="./AppSidebar.scss"></style>
