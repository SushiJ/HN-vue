<script setup lang="ts">
import { useStore } from "../store";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Item from "./Item.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

const page = ref(route.query.page || 0);

let error = store.error;
let results = store.topStories;

onMounted(() => store.fetchTopStories(page.value as number));
function nextPage() {
  // @ts-ignore
  page.value++;
  router.push({ query: { page: page.value } });
  results = [];
  store.topStories = [];
  store.fetchTopStories(page.value as number);
  results = store.topStories;
}
</script>
<template>
  <div class="container">
    <div v-if="error.length > 0">
      <p>An Error Occured {{ error }}</p>
    </div>
    <div v-else>
      <Item v-for="result in results" :key="result.id" :result="result"></Item>
      <button @click="nextPage">More</button>
    </div>
  </div>
</template>

<style scoped>
button {
  background-color: #e17842;
  border: none;
  padding: 0.5rem;
  color: white;
  margin-top: 0.25rem;
  border-radius: 0.25rem;
}
</style>
