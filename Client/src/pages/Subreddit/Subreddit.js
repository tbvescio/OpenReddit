import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Post from "../../components/Post/Post";

const getSubreddit = async (subreddit, setData) => {
  try {
    let response = await axios.get(`/r/${subreddit}`);
    return setData({
      subreddit: response.data.subreddit,
      subreddit_description: response.data.subreddit_description,
      subreddit_posts: response.data.subreddit_posts,
    });
  } catch (error) {
    console.log(error);
  }
};

const getIsSucribed = async (username, subreddit, setIsSuscribed) => {
  try {
    if (username !== null) {
      let response = await axios.get(`/u/${username}/${subreddit}`);
      return setIsSuscribed(response.data.isSuscribed);
    }
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
  center: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function Singlepost(props) {
  const classes = useStyles();
  let history = useHistory();
  const { subreddit } = props.match.params;
  const [data, setData] = useState({
    subreddit: null,
    subreddit_description: null,
    subreddit_posts: [],
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuscribed, setIsSuscribed] = useState(null);
  const [dialogInput, setDialogInput] = useState({
    title: null,
    description: null,
  });
  const [open, setOpen] = useState(false);
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    async function callGetSubreddit() {
      await getSubreddit(subreddit, setData);
    }
    async function callGetIsSuscribed() {
      await getIsSucribed(authState.username, subreddit, setIsSuscribed);
    }
    callGetIsSuscribed();
    callGetSubreddit();
  }, []);

  const posts = data.subreddit_posts.map((post) => {
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

  const handleOnChange = (e) => {
    setDialogInput({ ...dialogInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let dataRequest = {
        subreddit: data.subreddit,
        title: dialogInput.title,
        body: dialogInput.description,
      };

      let config = { headers: { Authentication: "Bearer " + authState.token } };
      await axios.post("/create-post", dataRequest, config);
    } catch (error) {
      history.push("/error");
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if (!authState.isLogged) {
      return setErrorMessage("You must be logged!");
    }
    setOpen(true);
  };

  const handleSuscribe = async () => {
    try {
      let config = {
        headers: { Authorization: "Bearer " + authState.token },
      };
      let response = await axios.put(
        `/u/suscribe/${subreddit}`,{}, config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnSuscribe = async () => {
    try {
      const config = {
        headers: { Authorization: "Bearer " + authState.token },
      };
      let response = await axios.put(`/u/unsuscribe/${subreddit}`, {}, config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Grid>
        <Grid item md={4} className={classes.item}>
          <Card>
            <CardContent className={classes.centerText}>
              <Typography variant="h2" component="h2">
                r/{data.subreddit}
              </Typography>
              <Typography variant="body2" component="p">
                {data.subreddit_description}
              </Typography>
            </CardContent>
            <CardActions className={classes.center}>
              <Button size="medium" variant="outlined" onClick={handleOpen}>
                Create Post
              </Button>
              {authState.isLogged && (
                <div>
                  {isSuscribed ? (
                    <Button
                      size="medium"
                      variant="outlined"
                      onClick={handleUnSuscribe}
                    >
                      Unsuscribe
                    </Button>
                  ) : (
                    <Button
                      size="medium"
                      variant="outlined"
                      onClick={handleSuscribe}
                    >
                      Suscribe
                    </Button>
                  )}
                </div>
              )}
            </CardActions>
          </Card>
        </Grid>
        {posts}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => handleOnChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            type="text"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            onChange={(e) => handleOnChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
