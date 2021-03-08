import React, { ReactElement } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Typography from "@material-ui/core/Typography";
import DateFormat from "../../components/DateFormat";
import { makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { StoryType } from "./StoryType";

const useStyles: CallableFunction = makeStyles((theme) => ({
  score: {
    verticalAlign: "middle",
    display: "inline-flex",
    fontSize: "18px",
    textAlign: "center",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "150px",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Story({ story }: { story: StoryType }): ReactElement {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        subheader={<DateFormat time={story.time} />}
        titleTypographyProps={{ align: "left" }}
        title={
          <Chip
            avatar={<Avatar>{story.author.id.toUpperCase()[0]}</Avatar>}
            label={`${story.author.id} (${story.author.karma})`}
          />
        }
        subheaderTypographyProps={{ align: "left" }}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="h3" color="textPrimary" align="justify">
          {story.title}
        </Typography>
        <Typography variant="h6" color="textSecondary" align="center">
          <div className={classes.score}>
            <ThumbUpAltIcon /> {story.score}
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Button
            className={classes.button}
            href={story.url}
            target="_blank"
            color="primary"
          >
            Learn More <OpenInNewIcon />
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default Story;
