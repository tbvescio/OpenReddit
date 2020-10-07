import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Link, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    width: "7em",
    textAlign: "center",
    margin: "1em auto",
    padding: "0.5em"
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});

const getSearch = async (filter, setData, classes) => {
  try {
    let response = await axios.get(`/search?query=${filter}`);
    const subreddits = response.data.data.subreddits.map((subreddit) => {
      return (
        <Paper className={classes.paper}>
          <Link
            key={subreddit._id}
            href={`/r/${subreddit.name}`}
            className={classes.link}
          >
            r/{subreddit.name}
          </Link>
        </Paper>
      );
    });

    const accounts = response.data.data.accounts.map((account) => {
      return (
        <Paper className={classes.paper}>
          <Link
            key={account._id}
            href={`/u/${account.username}`}
            className={classes.link}
          >
            u/{account.username}
          </Link>
        </Paper>
      );
    });
    setData({
      accounts: accounts,
      subreddits: subreddits,
    });
  } catch (error) {
    console.log(error);
  }
};

export default function SearchResult(props) {
  const { filter } = props.match.params;
  const [data, setData] = useState({ accounts: [], subreddits: [] });
  const classes = useStyles();

  useEffect(() => {
    async function callGetSearch() {
      await getSearch(filter, setData, classes);
    }
    callGetSearch();
  }, []);

  return (
    <Grid>
      <Typography variant="h4">
        {data.accounts}
        {data.subreddits}
      </Typography>
    </Grid>
  );
}
