import React, { useState, useEffect, ReactElement } from "react";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Story from "./Story";
import { StoryType } from "./StoryType";
import { getStoriesIds, getStory } from "./StoriesApi";
import shuffle from "lodash/shuffle";

const STORIES_LIMIT = 10;

function Stories(): ReactElement {
  const [stories, setStories]: [StoryType[], CallableFunction] = useState([]);

  useEffect(() => {
    getStoriesIds().then((ids: number[]) => {
      const storiesPromieses: Promise<StoryType>[] = shuffle(ids)
        .slice(0, STORIES_LIMIT)
        .map((storyId: number) => getStory(storyId));

      Promise.allSettled(storiesPromieses).then((results) => {
        const successfullStories: PromiseFulfilledResult<StoryType>[] = results.filter(
          ({ status }) => status === "fulfilled"
        ) as PromiseFulfilledResult<StoryType>[];

        const stories = successfullStories.map(({ value }) => value);
        stories.sort((a: StoryType, b: StoryType) => a.score - b.score);
        setStories(stories);
      });
    });
  }, []);

  if (stories.length < 1) {
    return <LinearProgress />;
  }
  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" align="center">
        10 Hacker News Stories
      </Typography>

      <Divider />

      <Box m={5}>
        <Container maxWidth="md">
          <Grid container spacing={5} alignItems="flex-start">
            {stories.map((story) => (
              <Grid item key={`story-${story.id}`} xs={12} sm={6} md={4}>
                <Story story={story} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default Stories;
