import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Story from "./Story";
import { getStoriesIds, getStory } from "./StoriesApi";
import shuffle from "lodash/shuffle";

const STORIES_LIMIT = 10;

function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getStoriesIds().then((ids) => {

      const storiesPromieses = shuffle(ids)
        .slice(0, STORIES_LIMIT)
        .map((storyId) => getStory(storyId));

      Promise.allSettled(storiesPromieses).then((results) => {
        const successfullStories = results.filter(
          ({ status }) => status === "fulfilled"
        );
        const stories = successfullStories.map(({ value }) => value);
        stories.sort((a, b) => a.score - b.score);
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
