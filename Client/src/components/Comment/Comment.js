import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  IconButton,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  item: {
    margin: "1em auto",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  votes: {
      float: "right"
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const authState = useSelector((state) => state.auth);
  let history = useHistory();

  const voteHandler = async (isUpvote) => {
    if (authState.isLogged) {
      try {
        let data = { commentId: props.commentId, isUpvote: isUpvote };
        let config = {
          headers: {
            Authorization: "Bearer " + authState.token,
          },
        };
        await axios.put("/vote-comment", data, config);
      } catch (error) {
        history.push("/error");
      }
    } else {
      props.setErrorMessage("You must be logged to do that!");
    }
  };

  return (
    <Grid item md={4} className={classes.item}>
      <Card className={classes.root} variant="outlined">
        <Grid container>
          <Grid item xs={1} className={classes.voting}>
            <IconButton onClick={() => voteHandler(true)}>
              <ArrowDropUpIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => voteHandler(false)}>
              <ArrowDropDownIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={10} className={classes.voting}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <Link to={`/u/${props.username}`} className={classes.link}>
                  /u/{props.username}
                </Link>
                
                <span className={classes.votes}>{props.votes} points</span> 
              </Typography>
              <Typography variant="body1" component="p">
                {props.body}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
