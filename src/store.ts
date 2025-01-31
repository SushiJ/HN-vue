import { nextTick, ref } from "vue";
import axios from "axios";
import { NewStories, SingleStory, TopStories } from "./types";

// export const useStore = defineStore("stories", {
//   state: () => ({
//     topStories: [] as TopStories[],
//     newStories: [] as NewStories[],
//     singleStory: {} as SingleStory,
//     comments: [] as Array<any>,
//     error: "",
//   }),
//   actions: {
//     async fetchTopStories(pageNumber: number) {
//       try {
//         const { data } = await axios.get<Array<string>>(
//           "https://hacker-news.firebaseio.com/v0/topstories.json",
//         );
//         const results = data.slice(
//           pageNumber * 30,
//           pageNumber === 0 ? 30 : pageNumber * 30 + 30,
//         );
//         results.forEach(async (element: string) => {
//           const response = await axios.get(
//             `https://hacker-news.firebaseio.com/v0/item/${element}.json`,
//           );
//           this.topStories.push(response.data);
//         });
//       } catch (e) {
//         this.error = `${e}`;
//       } finally {
//         this.error = "";
//       }
//     },
//     async fetchNewStories() {
//       try {
//         const { data } = await axios.get<Array<string>>(
//           "https://hacker-news.firebaseio.com/v0/newstories.json",
//         );

//         const results = data.slice(0, 25);

//         results.forEach(async (element: string) => {
//           const response = await axios.get(
//             `https://hacker-news.firebaseio.com/v0/item/${element}.json`,
//           );
//           this.newStories.push(response.data);
//         });
//       } catch (e) {
//         console.log(e);
//         this.error = `${e}`;
//       }
//     },
//     async fetchSingleStories(params: string) {
//       try {
//         const response = await axios.get(
//           `https://hacker-news.firebaseio.com/v0/item/${params}.json`,
//         );
//         this.singleStory = response.data;
//         this.singleStory.kids?.forEach(async (id) => {
//           const response = await axios.get(
//             `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
//           );
//           nextTick(() => this.comments.push(response.data));
//         });
//       } catch (e) {
//         this.error = `${e}`;
//         console.log(e);
//       } finally {
//         this.error = "";
//       }
//     },
//   },
// });
