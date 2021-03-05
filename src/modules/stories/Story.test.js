import { render, screen, waitFor } from "@testing-library/react";
import Story from "./Story";

const story = {
  id: 123,
  url: "story_url",
  title: "story title",
  score: "story score",
  time: new Date().getTime() / 1000,
  author: {
    id: "John Smith",
    karma: "42",
  },
};
test("renders story", async () => {
  await waitFor(() => render(<Story story={story} />));
  expect(screen.getByText(story.title)).toBeInTheDocument();
  expect(screen.getByText(story.score)).toBeInTheDocument();
  expect(screen.getByText(/Today at /)).toBeInTheDocument();
  expect(screen.getByText("John Smith (42)")).toBeInTheDocument();

  expect(screen.getByText("Learn More").closest("a")).toHaveAttribute(
    "href",
    story.url
  );
});
