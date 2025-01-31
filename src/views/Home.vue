<script setup lang="ts">
import { ref, watch } from "vue";
import { useTopStories } from "../composable/useTopStories";
import { FETCH_STATUS, TopStories } from "../types";
import Item from "../components/Item.vue";

const pgNumber = ref(0);
const resultsPerPage = ref(25);
const options = ref([
  { text: "25", value: 25 },
  { text: "50", value: 50 },
  { text: "75", value: 75 },
]);

const data = ref<Array<TopStories>>([]);
const e = ref<any | null>(null);
const s = ref<FETCH_STATUS>("IDLE");

watch(
  [pgNumber, resultsPerPage],
  async () => {
    const { status, error, results } = await useTopStories<TopStories>({
      pageNumber: pgNumber.value,
      resultsPerPage: resultsPerPage.value,
    });
    data.value = results.value;
    s.value = status.value;
    e.value = error.value;
  },
  { immediate: true }
);

</script>
<template>
  <div class="container">
    <div v-if="s === 'ERROR'">
      <p>An Error Occured {{ e }}</p>
    </div>
    <div v-else-if="s === 'LOADING'">
      <p>Loading...</p>
    </div>
    <div v-else>
      <Item v-for="(result, idx) in data" :key="result.id" :result="result" :idx="idx" />
    </div>
    <div class="interaction">
      <button @click="pgNumber++">more</button>
      <div style="display: flex; height: fit-content; align-items: center">
        <p style="margin-right: 4px;">Results per page</p>
        <select v-model="resultsPerPage">
          <option v-for="option in options" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
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
 
.interaction {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
