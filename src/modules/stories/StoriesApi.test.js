import { getStoriesIds, getStory, fetchAuthor } from "./StoriesApi";

beforeAll(() => jest.spyOn(window, "fetch"));

test("get stories ids", async () => {
  const storiesIds = [1, 2, 3, 4, 6, 9];

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => storiesIds,
  });

  const ids = await getStoriesIds();

  expect(ids).toEqual(storiesIds);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test("get story by id", async () => {
  const storyResponse = {
    id: 123,
    url: "story_url",
    title: "story title",
    score: "story score",
    time: 1615215281,
    by: "John Smith",
    type: "story",
  };
  const authorResponse = {
    id: "John Smith",
    karma: "42",
  };

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => storyResponse,
  });
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => authorResponse,
  });

  const result = await getStory(123);

  expect(result).toEqual({
    author: {
      id: "John Smith",
      karma: "42",
    },
    by: "John Smith",
    id: 123,
    score: "story score",
    time: 1615215281,
    title: "story title",
    url: "story_url",
  });
  expect(fetch).toHaveBeenCalledTimes(2);
});
