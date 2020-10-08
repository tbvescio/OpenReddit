import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";
import { Grid, TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Singlepost(props) {
  const { subreddit, postId } = props.match.params;
  const [data, setData] = useState({ post: null, comments: null });
  const [textInput, setTextInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const authState = useSelector((state) => state.auth);
  let history = useHistory();

  useEffect(() => {
    const getPost = async () => {
      try {
        let response = await axios.get(`/r/${subreddit}/${postId}`);
        let { post, post_comments } = response.data;

        post_comments = post_comments.map((comment) => {
          return (
            <Comment
              commentId={comment._id}
              key={comment._id}
              username={comment.username}
              votes={comment.votes}
              body={comment.body}
              setErrorMessage={setErrorMessage}
            />
          );
        });

        return setData({ post: post, comments: post_comments });
      } catch (error) {
        history.push("/error");
      }
    };
    getPost();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (authState.isLogged && textInput !== "") {
        const dataRequest = {
          postId: data.post._id,
          username: authState.username,
          body: textInput,
        };
        const config = {
          headers: { Authorization: "Bearer " + authState.token },
        };
        await axios.post("/create-comment", dataRequest, config);
        history.go(0);
      } else {
        setErrorMessage("You must be logged to do that!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      {data.post && (
        <Post
          postId={data.post._id}
          key={data.post._id}
          votes={data.post.votes}
          title={data.post.title}
          date={data.post.time}
          body={data.post.body}
          username={data.post.username}
          subreddit={data.post.subreddit}
          setErrorMessage={setErrorMessage}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              name="commentInput"
              label="Your comment goes here"
              variant="outlined"
              rows={3}
              multiline
              fullWidth
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit"  name="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Post>
      )}
      <Grid item md={4}></Grid>
      {data.comments}
    </div>
  );
}
