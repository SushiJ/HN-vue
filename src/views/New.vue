<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../store";
import Item from "./Item.vue";

const store = useStore();
let results = store.newStories;

onMounted(() => store.fetchNewStories());
</script>

<template>
  <div>
    <Item v-for="result in results" :key="result.id" :result="result"></Item>
  </div>
</template>
