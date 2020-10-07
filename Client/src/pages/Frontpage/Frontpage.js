import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { Alert, Pagination } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import Post from "../../components/Post/Post";

export default function Frontpage() {
  let history = useHistory();
  const authState = useSelector((state) => state.auth);
  const [posts, setPosts] = useState({ posts: [], totalPages: 0 });
  const [errorMessage, setErrorMessage] = useState(null);

  const getPosts = async (page = 1) => {
    try {
      let response;
      if (authState.token) {
        let config = {
          headers: { Authorization: "Bearer " + authState.token },
        };
        response = await axios.get(`/frontpage?page=${page}`, config);
      } else {
        response = await axios.get(`/frontpage-public?page=${page}`);
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
      return setPosts({ posts, totalPages: response.data.totalPages });
    } catch (error) {
      history.push("/error");
    }
  };
  useEffect(() => {
    async function callGetPosts() {
      await getPosts();
    }
    callGetPosts();
  }, []);
  const handleChange = async (event, value) => {
    await getPosts(value);
  };

  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Grid>{posts.posts}</Grid>

      <Pagination
        count={posts.totalPages}
        onChange={handleChange}
        style={{ display: "flex", justifyContent: "center" }}
      />
    </div>
  );
}
