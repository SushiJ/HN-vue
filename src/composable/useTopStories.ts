import { ref } from "vue";
import { axiosInstance } from "../lib/axios";
import { FETCH_STATUS } from "../types";

type opts = {
  resultsPerPage: number;
  pageNumber: number;
};

export async function useTopStories<T>(opts: opts) {
  const results = ref<Array<T>>([]);
  const error = ref<any | null>(null);
  const status = ref<FETCH_STATUS>("IDLE");

  try {
    status.value = "LOADING";

    const { data } = await axiosInstance.get<Array<T>>("/topstories.json");
    const result = data.slice(
      opts.pageNumber * opts.resultsPerPage,
      opts.pageNumber === 0
        ? opts.resultsPerPage
        : opts.pageNumber * opts.resultsPerPage + opts.resultsPerPage
    );

    result.forEach(async (element: T) => {
      const response = await axiosInstance.get(`item/${element}.json`);
      results.value.push(response.data);
    });
    status.value = "SUCCESS";
  } catch (e) {
    status.value = "ERROR";
    error.value = `${e}`;
  } finally {
    status.value = "IDLE";
  }

  return {
    results,
    error,
    status,
  };
}
