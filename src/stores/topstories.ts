import { defineStore } from "pinia";
import { FETCH_STATUS } from "../types";

type TopStories = {
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

type State = {
  topStories: Array<TopStories>;
  status: FETCH_STATUS;
  isError: boolean;
  error: string;
};

export const useTopStoriesStore = defineStore("topStories", {
  state: (): State => ({
    topStories: [],
    status: "IDLE",
    isError: false,
    error: "",
  }),
  actions: {
    // async fetchTopStories(pageNumber: number = 0) {
    //   try {
    //     this.topStories = [];
    //     this.status = "LOADING";
    //     const { data } = await axios.get<Array<string>>(
    //       "https://hacker-news.firebaseio.com/v0/topstories.json",
    //     );
    //     const results = data.slice(
    //       pageNumber,
    //       10,
    //       // pageNumber === 0 ? 10 : pageNumber * 30 + 30,
    //     );
    //     results.forEach(async (element: string) => {
    //       const response = await axios.get(
    //         `https://hacker-news.firebaseio.com/v0/item/${element}.json`,
    //       );
    //       this.topStories.push(response.data);
    //     });
    //     this.status = "SUCCESS";
    //   } catch (e) {
    //     this.status = "ERROR";
    //     this.isError = true;
    //     this.error = `${e}`;
    //   } finally {
    //     this.status = "IDLE";
    //   }
    // },
    // async fetchNewStories() {
    //   try {
    //     const { data } = await axios.get<Array<string>>(
    //       "https://hacker-news.firebaseio.com/v0/newstories.json",
    //     );
    //
    //     const results = data.slice(0, 25);
    //
    //     results.forEach(async (element: string) => {
    //       const response = await axios.get(
    //         `https://hacker-news.firebaseio.com/v0/item/${element}.json`,
    //       );
    //       this.newStories.push(response.data);
    //     });
    //   } catch (e) {
    //     console.log(e);
    //     this.error = `${e}`;
    //   }
    // },
    // async fetchSingleStories(params: string) {
    //   try {
    //     const response = await axios.get(
    //       `https://hacker-news.firebaseio.com/v0/item/${params}.json`,
    //     );
    //     this.singleStory = response.data;
    //     this.singleStory.kids?.forEach(async (id) => {
    //       const response = await axios.get(
    //         `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
    //       );
    //       nextTick(() => this.comments.push(response.data));
    //     });
    //   } catch (e) {
    //     this.error = `${e}`;
    //     console.log(e);
    //   } finally {
    //     this.error = "";
    //   }
    // },
  },
});
