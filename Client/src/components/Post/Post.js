import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Divider,
  IconButton,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  voting: {
    textAlign: "center",
  },
});

const upVoteHandler = () => {};
const downVoteHandler = () => {};
const commentClickHandler = () => {};

export default function Post(props) {
  const classes = useStyles();

  return (
    <Grid item md={4}>
      <Card className={classes.root} variant="outlined">
        <Grid container>
          <Grid item xs={1} className={classes.voting}>
            <IconButton onClick={upVoteHandler}>
              <ArrowDropUpIcon fontSize="large" />
            </IconButton>
            <Typography paragraph noWrap>
              {props.votes}
            </Typography>
            <IconButton onClick={downVoteHandler}>
              <ArrowDropDownIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={10}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                r/{props.subreddit} u/{props.username} {props.date}
              </Typography>
              <Typography variant="h5" component="h2">
                {props.title}
              </Typography>
              <Typography variant="body2" component="p">
                {props.body}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={commentClickHandler}>
                Comments
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
