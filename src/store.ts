import { defineStore } from "pinia";
import { nextTick } from "vue";
import axios from "axios";

export type TopStories = {
  by: string;
  descendants: number;
  id: number;
  kids: Array<number>;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type NewStories = {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type SingleStory = {
  by: string;
  descendants: number;
  id: number;
  kids?: Array<number>;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export const useStore = defineStore("stories", {
  state: () => ({
    topStories: [] as TopStories[],
    newStories: [] as NewStories[],
    singleStory: {} as SingleStory,
    comments: [],
    error: "",
  }),
  actions: {
    async fetchTopStories(pageNumber: number) {
      try {
        const { data } = await axios.get<Array<string>>(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        );
        const results = data.slice(
          pageNumber * 30,
          pageNumber === 0 ? 30 : pageNumber * 30 + 30
        );

        results.forEach(async (element: string) => {
          const response = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${element}.json`
          );
          this.topStories.push(response.data);
        });
      } catch (e) {
        this.error = `${e}`;
        console.log(e);
      }
    },
    async fetchNewStories() {
      try {
        const { data } = await axios.get<Array<string>>(
          "https://hacker-news.firebaseio.com/v0/newstories.json"
        );

        const results = data.slice(0, 25);

        results.forEach(async (element: string) => {
          const response = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${element}.json`
          );
          this.newStories.push(response.data);
        });
      } catch (e) {
        console.log(e);
        this.error = `${e}`;
      }
    },
    async fetchSingleStories(params: string) {
      try {
        const response = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${params}.json`
        );
        this.singleStory = response.data;
        this.singleStory.kids?.forEach(async (id) => {
          const response = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          nextTick(
            // @ts-ignore
            this.comments.push(response.data)
          );
        });
      } catch (e) {
        this.error = `${e}`;
        console.log(e);
      }
    },
  },
});
