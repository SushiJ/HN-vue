<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";

type Comment = {
  by: string;
  id: number;
  parent: number;
  text: string;
  time: number;
  type: string;
};
const route = useRoute();

const store = useStore();
onMounted(() => store.fetchSingleStories(route.params.id as string));

const story = store.singleStory;
const comments = store.comments as Comment[];
</script>

<template>
  <div>
    <h2>{{ story.title }}</h2>
    <p>Score: {{ story.score }}</p>
    <p>{{ story.url }}</p>
    <div v-for="comment in comments" :key="comment.time">
      <div>
        <p>{{ comment.text }}</p>
        <div class="comment-author">{{ comment.by }}</div>
        <div class="comment-date">{{ comment.time }}</div>
      </div>
    </div>
  </div>
</template>
