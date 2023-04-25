<script setup lang="ts">
import { useStore } from "../store";
import { onMounted } from "vue";

const store = useStore();
onMounted(() => store.fetchTopStories());

const results = store.topStories;
</script>
<template>
  <div v-for="result in results">
    <h1>
      {{ result.title }}
    </h1>
  </div>
</template>
