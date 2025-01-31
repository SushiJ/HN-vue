import { ref } from "vue";
import { FETCH_STATUS } from "../types";
import { axiosInstance } from "../lib/axios";

export async function fetchNewStories<T>() {
  const results = ref<Array<T>>([]);
  const error = ref<any | null>(null);
  const status = ref<FETCH_STATUS>("IDLE");

  try {
    status.value = "LOADING";

    const { data } = await axiosInstance.get<Array<string>>("/newstories.json");

    const newStories = data.slice(0, 25);

    newStories.forEach(async (element: string) => {
      const response = await axiosInstance.get(`/item/${element}.json`);
      results.value.push(response.data);
    });
    status.value = "SUCCESS";
  } catch (e) {
    console.log(e);
    status.value = "ERROR";
    error.value = `${e}`;
  }
  return {
    results,
    error,
    status,
  };
}
