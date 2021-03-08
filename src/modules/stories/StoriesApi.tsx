import pick from "lodash/pick";
import { StoryType, AuthorType } from "./StoryType";

const HOST_URL = "https://hacker-news.firebaseio.com";

export async function getStoriesIds(): Promise<Array<number>> {
  const res = await fetch(`${HOST_URL}/v0/topstories.json`);
  return await res.json();
}

export async function getStory(storyId: number): Promise<StoryType> {
  const res = await fetch(`${HOST_URL}/v0/item/${storyId}.json`);
  const data = await res.json();

  const requiredFields = ["title", "url", "score", "time", "by", "id"];
  const storyData = pick(data, requiredFields);

  if (data.type === "story" && requiredFields.every((i) => i in storyData)) {
    const story: StoryType = {
      title: storyData.title,
      url: storyData.url,
      score: storyData.score,
      time: storyData.time,
      by: storyData.by,
      id: storyData.id,
      author: await fetchAuthor(data.by),
    };
    return story;
  }
  throw Error("Invalid story");
}

async function fetchAuthor(id: string): Promise<AuthorType> {
  const res = await fetch(`${HOST_URL}/v0/user/${id}.json`);
  const data = await res.json();

  return {
    id,
    karma: data.karma,
  };
}
