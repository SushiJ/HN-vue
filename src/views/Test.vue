<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import useSWRV from "swrv";

const { data, error } = useSWRV(
  "/api/user",
  async () =>
    await fetch("https://hacker-news.firebaseio.com/v0/topstories.json"),
);
let ActualData = null;
data.value?.json().then((data) => (ActualData = data));
</script>
<template>
  <div>
    <div v-if="error">failed to load</div>
    <div v-if="!data">loading...</div>
    <div v-else>{{ ActualData }}</div>
  </div>
</template>
