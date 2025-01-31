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

export type FETCH_STATUS = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
