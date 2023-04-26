import { defineStore } from "pinia";
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

export const useStore = defineStore("stories", {
  state: () => ({
    topStories: [] as TopStories[],
    newStories: [] as NewStories[],
  }),
  actions: {
    fetchTopStories(pageNumber: number) {
      axios
        .get<Array<string>>(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        )
        .then((resp) => {
          const results = resp.data.slice(
            pageNumber * 30,
            pageNumber === 0 ? 30 : pageNumber * 30 * 2
          );
          results.forEach((element: string) => {
            axios
              .get(`https://hacker-news.firebaseio.com/v0/item/${element}.json`)
              .then((result) => {
                this.topStories.push(result.data);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchNewStories() {
      axios
        .get("https://hacker-news.firebaseio.com/v0/newstories.json")
        .then((resp) => {
          const results = resp.data.slice(0, 25);
          results.forEach((element: string) => {
            axios
              .get(`https://hacker-news.firebaseio.com/v0/item/${element}.json`)
              .then((result) => {
                this.newStories.push(result.data);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          /* eslint-disable */
          console.log(err);
        });
    },
  },
});
