<script setup lang="ts">
import { RouterLink } from "vue-router";
import { TopStories, NewStories } from "../types";

const props = defineProps<{
  result: TopStories | NewStories;
} & {
  idx: number
}>();
</script>

<template>
  <div class="item container" :data-num="props.idx + 1">
    <a :href="props.result.url" target="_blank" class="title">
      {{ props.result.title }}
    </a>
    <br />
    <span>
      {{ props.result.score }} points | by
      <a :href="`https://news.ycombinator.com/user?id=${props.result.by}`">
        {{ props.result.by }}
      </a>
      |
      <RouterLink :to="{ path: '/story/' + props.result.id }">
        {{ props.result.descendants }} comments
      </RouterLink>
    </span>
  </div>
</template>

<style scoped>
.item {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 12px;

  &::before {
    content: attr(data-num) '.';
    float: left;
    margin-left: -40px;
    width: 32px;
    color: #888;
    text-align: right;
    font-size: 14px;
  }
}

a {
  color: #888;
  text-decoration: none;

  &:hover {
    color: #000;
    text-decoration: underline;
  }
}

.title {
  color: #333;
  margin-bottom: 50px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
}
</style>
