import { defineStore } from "pinia";
import axios from "axios";

type TopStories = {
  by: string;
  decendants: number;
  id: number;
  kids: Array<number>;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export const useStore = defineStore("stories", {
  state: () => ({
    topStories: [] as TopStories[],
    newStories: [],
  }),
  actions: {
    fetchTopStories() {
      axios
        .get<Array<string>>(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        )
        .then((resp) => {
          const results = resp.data.slice(0, 30);
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
  },
});
