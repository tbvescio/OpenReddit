import React, { Component } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Cookie from "../../util/cookie";

import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";
import CommentInput from "../../components/CommentInput/CommentInput";

class SinglePost extends Component {
  state = {
    post: null,
    comments: null,
    commentInput: null,
    error: null,
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const subreddit = this.props.match.params.subreddit;

    axios
      .get("/r/" + subreddit + "/" + postId)
      .then((response) => {
        let post = response.data.post;
        let comments = response.data.post_comments;
        console.log(comments);
        this.setState({ post: post, comments: comments });
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
  }

  postVoteHandler = (isUpvote, postId) => {
    const token = Cookie.getCookie("token");
    if (!token) {
      this.setState({ error: "You need to be logged!" });
    }

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let data = {
      postId: postId,
      isUpvote: isUpvote,
    };
    axios
      .put("/vote-post", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
  };

  postClickHandler = (postId, subreddit) => {
    return;
  };

  onChangeHandler = (e) => {
    this.setState({ commentInput: e.target.value });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const token = Cookie.getCookie("token");
    const username = Cookie.getCookie("username");

    if (!token) {
      return this.setState({ error: "You must be logged!" });
    }

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let data = {
      body: this.state.commentInput,
      postId: this.state.post._id,
      username: username,
    };

    axios
      .post("/create-comment", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
  };

  commentVoteHandler = (isUpvote, commentId) => {
    const token = Cookie.getCookie("token");
    if (!token) {
      this.setState({ error: "You need to be logged!" });
    }

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let data = {
      commentId: commentId,
      isUpvote: isUpvote,
    };

    axios
      .put("/vote-comment", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
  };

  render() {
    let post;
    let comments;
    if (this.state.post) {
      post = (
        <Post
          postId={this.state.post._id}
          user={this.state.post.username}
          subreddit={this.state.post.subreddit}
          title={this.state.post.title}
          body={this.state.post.body}
          votes={this.state.post.votes}
          onUpvoteClick={this.postVoteHandler}
          postClick={this.postClickHandler}
        />
      );
    }
    if (this.state.comments) {
      comments = this.state.comments.map((comment) => {
        return (
          <Comment
            key={comment._id}
            username={comment.username}
            time={comment.time}
            body={comment.body}
            votes={comment.votes}
            commentId={comment._id}
            onUpvoteClick={this.commentVoteHandler}
          />
        );
      });
    }

    return (
      <div>
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        {post}
        <CommentInput
          onChangeHandler={this.onChangeHandler}
          onSubmitHandler={this.onSubmitHandler}
        />
        {comments}
      </div>
    );
  }
}

export default SinglePost;
