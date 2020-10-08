import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Post from "../../components/Post/Post";

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
  let history = useHistory();
  const { username } = props.match.params;
  const [open, setOpen] = useState(false);
  const [dialogInput, setDialogInput] = useState({
    title: null,
    description: null,
  });
  const [data, setData] = useState({
    karma: null,
    posts: [],
    created_date: null,
  });
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await axios.get(`/u/${username}`);
        return setData({
          karma: response.data.karma,
          posts: response.data.posts,
          created_date: response.data.created_date,
        });
      } catch (error) {
        history.push("/error");
      }
    };
    getProfile();
  }, []);

  const handleSubmit = async () => {
    try {
      let data = {
        name: dialogInput.name,
        description: dialogInput.description,
      };
      let config = { headers: { Authorization: "Bearer " + authState.token } };
      await axios.post("/create-subreddit", data, config);
    } catch (error) {
      history.push("/error");
    }
    handleClose();
  };

  const handleOnChange = (e) => {
    setDialogInput({ ...dialogInput, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
              {authState.isLogged && authState.username === username && (
                <Button
                  size="medium"
                  variant="outlined"
                  name="createSubreddit"
                  onClick={handleOpen}
                >
                  Create Subreddit
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
        {posts}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Subreddit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => handleOnChange(e)}
          />
          <TextField
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
          <Button onClick={handleClose} name="cancel" color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} name="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
