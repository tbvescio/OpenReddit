import React, { useState } from "react";
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
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import formatDate from "../../util/formatDate";
import { useHistory } from "react-router-dom";

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
  item: {
    margin: "1em auto",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  date: {
    float: "right",
  },
  icon: {
    width: "100%",
  },
});

export default function Post(props) {
  const classes = useStyles();
  let history = useHistory();
  const [redirectToPost, setRedirectToPost] = useState(null);
  const authState = useSelector((state) => state.auth);

  const voteHandler = async (isUpvote) => {
    if (authState.isLogged) {
      try {
        let data = { postId: props.postId, isUpvote: isUpvote };
        let config = {
          headers: {
            Authorization: "Bearer " + authState.token,
          },
        };
        await axios.put("/vote-post", data, config);
        history.go(0)
      } catch (error) {
        history.push("/error");
      }
    } else {
      props.setErrorMessage("You must be logged to do that!");
    }
  };

  const commentClickHandler = async () => {
    setRedirectToPost(`/r/${props.subreddit}/${props.postId}`);
  };

  return (
    <Grid item md={4} className={classes.item}>
      {redirectToPost && <Redirect to={redirectToPost} />}
      <Card className={classes.root} >
        <Grid container>
          <Grid item xs={1} className={classes.voting}>
            <IconButton
              onClick={() => voteHandler(true)}
              className={classes.icon}
            >
              <ArrowDropUpIcon fontSize="large" />
            </IconButton>
            <Typography paragraph noWrap>
              {props.votes}
            </Typography>
            <IconButton
              onClick={() => voteHandler(false)}
              className={classes.icon}
            >
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
                <Link to={`r/${props.subreddit}`} className={classes.link}>
                  r/{props.subreddit}
                </Link>
                {" by "}
                <Link to={`u/${props.username}`} className={classes.link}>
                  u/{props.username}
                </Link>
                <span className={classes.date}>{formatDate(props.date)}</span>
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
      {props.children}
    </Grid>
  );
}
