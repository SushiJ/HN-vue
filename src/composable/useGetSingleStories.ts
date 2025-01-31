import { ref } from "vue";
import { axiosInstance } from "../lib/axios";
import { FETCH_STATUS, SingleStory } from "../types";

export async function fetchSingleStories<T>(params: string) {
  const results = ref<Array<T>>([]);
  const story = ref<SingleStory | null>(null);
  const error = ref<any | null>(null);
  const status = ref<FETCH_STATUS>("IDLE");

  try {
    status.value = "LOADING";
    const { data } = await axiosInstance.get<SingleStory>(
      `/item/${params}.json`
    );

    story.value = data;

    data.kids?.forEach(async (id: number) => {
      const response = await axiosInstance.get(`/item/${id}.json`);
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
    story,
    error,
    status,
  };
}
