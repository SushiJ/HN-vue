<script setup lang="ts">
import { onMounted } from "vue";
import { useTopStories } from "../composable/useTopStories";

const { result, isError, status, error } = useTopStories();
// onMounted(() => useTopStories())
</script>
<template>
  <div class="container">
    <div v-if="status === 'LOADING'">
      <p>Loading...</p>
    </div>
    <div v-if="isError">
      <p>An Error Occured {{ error }}</p>
    </div>
    <div v-else>
      <!-- <Item v-for="result in results" :key="result.id" :result="result" /> -->
      <pre>{{ result }}</pre>
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
  cursor: pointer;
}
</style>
