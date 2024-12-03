import axios from "axios";
import { type Ref, ref, nextTick } from "vue";
import { FETCH_STATUS } from "../types";

export function useTopStories() {
  const status: Ref<FETCH_STATUS> = ref("IDLE");
  let isError = ref(false);
  const error = ref("");
  const result: Array<any> = [];

  const fetchData = async () => {
    try {
      status.value = "LOADING";
      const { data } = await axios.get<Array<number>>(
        "https://hacker-news.firebaseio.com/v0/topstories.json",
      );

      const results = data.slice(0, 30);

      results.forEach(async (d) => {
        const response = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${d}.json`,
        );
        nextTick(() => result.push(response.data));
      });

      status.value = "SUCCESS";
    } catch (e) {
      status.value = "ERROR";
      isError.value = true;
      error.value = e as string;
      console.log(e);
    } finally {
      status.value = "IDLE";
    }
  };

  fetchData();

  console.log(result);
  return { result, isError, error, status };
}
