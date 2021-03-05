import { render, screen, waitFor } from "@testing-library/react";
import Stories from "./Stories";
import { getStory, getStoriesIds } from "./StoriesApi";

jest.mock("./StoriesApi");

const stories = [
  {
    id: 123,
    url: "story_url",
    title: "story title",
    score: "story score",
    time: new Date().getTime() / 1000,
    author: {
      id: "John Smith",
      karma: "42",
    },
  },
  {
    id: 657,
    url: "story2_url",
    title: "story2 title",
    score: "story2 score",
    time: new Date().getTime() / 1000,
    author: {
      id: "Jack Black",
      karma: "56",
    },
  },
];
test("renders stories", async () => {
  getStoriesIds.mockResolvedValueOnce(stories.map(({ id }) => id));

  getStory.mockImplementation((id) => stories.find((s) => s.id == id));

  await waitFor(() => render(<Stories />));

  expect(getStory).toHaveBeenCalledTimes(2);

  expect(screen.getByText(stories[0].title)).toBeInTheDocument();
  expect(screen.getByText(stories[1].title)).toBeInTheDocument();
});
