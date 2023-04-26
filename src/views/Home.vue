<script setup lang="ts">
import { useStore } from "../store";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Item from "./Item.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

const page = ref(route.query.page || 0);

let results = store.topStories;

onMounted(() => store.fetchTopStories(page.value as number));
function nextPage() {
  // @ts-ignore
  page.value++;
  router.push({ query: { page: page.value } });
  store.fetchTopStories(page.value as number);
}
</script>
<template>
  <div>
    <Item v-for="result in results" :key="result.id" :result="result"></Item>
  </div>
  <button @click="nextPage">More</button>
</template>
