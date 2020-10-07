import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Post from "../../components/Post/Post";

const getPosts = async (token, setPosts, setErrorMessage) => {
  try {
    let response;
    if (token) {
      let config = { headers: { Authorization: "Bearer " + token } };
      response = await axios.get("/frontpage", config);
    } else {
      response = await axios.get("/frontpage-public");
    }
    let posts = response.data.posts.map((post) => {
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
          setErrorMessage={setErrorMessage}
        />
      );
    });
    return setPosts(posts);
  } catch (error) {
    console.log(error);
  }
};

export default function Frontpage() {
  const authState = useSelector((state) => state.auth);
  const [posts, setPosts] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function callGetPosts() {
      await getPosts(authState.token, setPosts, setErrorMessage);
    }
    callGetPosts();
  }, [authState.token]);

  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Grid>{posts}</Grid>
    </div>
  );
}
