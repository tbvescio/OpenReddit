import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Post from "../../components/Post/Post";
import Cookie from "../../util/cookie"

class Frontpage extends Component {
  state = {
    posts: [],
    redirect: null,
    error: null,
  };

  componentDidMount() {
    const token = Cookie.getCookie("token");

    if (token) {
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .get("/frontpage", config)
        .then((response) => {
          let posts = response.data.posts;
          if(posts.length === 0){
            return this.setState({ error: "You don't have posts to show" });
          }
          return this.setState({ posts: response.data.posts });
        })
        .catch((error) => {
          console.log(error, "ERROR");
        });
    } else {
      axios
        .get("/frontpage-public")
        .then((response) => {
          console.log(response);
          this.setState({ posts: response.data.posts });
        })
        .catch((error) => {
          console.log(error, "ERROR");
        });
    }
  }

  voteHandler = (isUpvote, postId) => {
    const token = Cookie.getCookie("token");
    if (!token) {
      return this.setState({ error: "You need to be logged!" });
    }
    let data = {
      postId: postId,
      isUpvote: isUpvote,
    };
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .put("/vote-post", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
    console.log(isUpvote, postId);
  };

  postClickHandler = (postId, subreddit) => {
    this.setState({ redirect: "/r/" + subreddit + "/" + postId });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let posts;
    if (this.state.posts) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post._id}
            postId={post._id}
            user={post.username}
            subreddit={post.subreddit}
            title={post.title}
            body={post.body}
            votes={post.votes}
            onUpvoteClick={this.voteHandler}
            postClick={this.postClickHandler}
          />
        );
      });
    }

    return (
      <div>
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        {posts}
      </div>
    );
  }
}

export default Frontpage;
