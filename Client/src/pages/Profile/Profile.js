import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "../../components/Post/Post";

const getProfile = async (username, setData) => {
  try {
    let response = await axios.get(`/u/${username}`);
    return setData({
      karma: response.data.karma,
      posts: response.data.posts,
      created_date: response.data.created_date,
    });
  } catch (error) {
    console.log(error);
  }
};

const useStyles = makeStyles({
  item: {
    margin: "1em auto",
  },
  centerText: {
    textAlign: "center",
  },
  button: {
    margin: "0px auto",
  },
});

export default function Singlepost(props) {
  const classes = useStyles();
  const { username } = props.match.params;
  const [data, setData] = useState({
    karma: null,
    posts: [],
    created_date: null,
  });
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    async function callgetProfile() {
      await getProfile(username, setData);
    }
    callgetProfile();
  }, []);

  const posts = data.posts.map((post) => {
    return (
      <Post
        postId={post._id}
        key={post._id}
        votes={post.votes}
        title={post.title}
        date={post.time}
        body={post.body}
        username={post.username}
        subreddit={post.subreddit}
      />
    );
  });

  return (
    <div>
      <Grid>
        <Grid item md={4} className={classes.item}>
          <Card>
            <CardContent className={classes.centerText}>
              <Typography variant="h2" component="h2">
                u/{username}
              </Typography>
              <Typography variant="body2" component="p">
                karma: {data.karma}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {posts}
      </Grid>
    </div>
  );
}
