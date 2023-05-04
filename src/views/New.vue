<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../store";
import Item from "./Item.vue";

const store = useStore();
let results = store.newStories;
let error = store.error;

onMounted(() => store.fetchNewStories());
</script>

<template>
  <div class="container">
    <div v-if="error.length > 0">
      <p>An Error Occured {{ error }}</p>
    </div>
    <div v-else>
      <Item v-for="result in results" :key="result.id" :result="result"></Item>
    </div>
  </div>
</template>
