<script setup lang="ts">
import Item from "../components/Item.vue";
import { fetchNewStories } from "../composable/useGetNewStories";
import { NewStories } from "../types";

const { results, status, error } = await fetchNewStories<NewStories>();
</script>

<template>
  <div class="container">
    <div v-if="status === 'LOADING'">Loading...</div>
    <div v-else-if="status === 'ERROR'">
      <p>An Error Occured {{ error }}</p>
    </div>
    <div v-else>
      <Item v-for="(result, idx) in results" :key="result.id" :result="result" :idx="idx" />
    </div>
  </div>
</template>
