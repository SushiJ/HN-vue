import axios from "axios";
import { type Ref, ref } from "vue";
import { FETCH_STATUS } from "../types";

// pageNumber: number
export function useFetch<T>(url: string) {
  const result: Ref<T | null> = ref(null);
  const status: Ref<FETCH_STATUS> = ref("IDLE");
  let isError = ref(false);
  const error = ref("");

  const fetchData = async () => {
    try {
      status.value = "LOADING";
      const { data } = await axios.get<T>(url);
      result.value = data;

      status.value = "SUCCESS";
    } catch (e) {
      status.value = "ERROR";
      isError.value = true;
      error.value = e as string;
    } finally {
      status.value = "IDLE";
    }
  };

  fetchData();

  //   try {
  //     const { data } = await axios.get<Array<string>>(
  //       "https://hacker-news.firebaseio.com/v0/topstories.json",
  //     );
  //     const results = data.slice(
  //       pageNumber * 30,
  //       pageNumber === 0 ? 30 : pageNumber * 30 + 30,
  //     );
  //     results.forEach(async (element: string) => {
  //       const response = await axios.get(
  //         `https://hacker-news.firebaseio.com/v0/item/${element}.json`,
  //       );
  //       this.topStories.push(response.data);
  //     });
  //   } catch (e) {
  //     this.error = `${e}`;
  //   } finally {
  //     this.error = "";
  //   }

  // newStories: [] as NewStories[],
  // singleStory: {} as SingleStory,
  // comments: [],
  // error: "",
  return { result, isError, error, status };
}
