<script setup lang="ts">
import { RouterLink } from "vue-router";
import { TopStories, NewStories } from "../store";

const props = defineProps<{
  result: TopStories | NewStories;
}>();
</script>

<template>
  <div>
    <RouterLink :to="{ path: '/story/' + props.result.id }">{{
      props.result.title
    }}</RouterLink>
    <br />
    <span>{{ props.result.score }}</span>
    <span>
      by {{ props.result.by }} | {{ props.result.time }} Ago |
      {{ props.result.descendants }} comments
    </span>
  </div>
</template>
