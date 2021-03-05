import pick from "lodash/pick";

const HOST_URL = "https://hacker-news.firebaseio.com";

export async function getStoriesIds() {
  const res = await fetch(`${HOST_URL}/v0/topstories.json`);
  return await res.json();
}

export async function getStory(storyId) {
  const res = await fetch(`${HOST_URL}/v0/item/${storyId}.json`);
  const data = await res.json();

  const requiredFields = ["title", "url", "score", "time", "by", "id"];
  const story = pick(data, requiredFields);

  if (data.type === "story" && requiredFields.every((i) => i in story)) {
    return {
      ...story,
      author: await fetchAuthor(data.by),
    };
  }
  throw Error(`Invalid story at ${HOST_URL}/v0/item/${storyId}.json`);
}

export async function fetchAuthor(id) {
  const res = await fetch(`${HOST_URL}/v0/user/${id}.json`);
  const data = await res.json();

  return {
    id,
    karma: data.karma,
  };
}
