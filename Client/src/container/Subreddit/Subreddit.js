import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookie from "../../util/cookie";
import Post from "../../components/Post/Post";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import "./Subreddit.css"

class Subreddit extends Component {
  state = {
    posts: null,
    subreddit: null,
    subreddit_description: null,
    redirect: null,
    error: null,
  };

  componentDidMount() {
    const subreddit = this.props.match.params.subreddit;

    axios
      .get("/r/" + subreddit)
      .then((response) => {
        console.log(response);
        this.setState({
          posts: response.data.subreddit_posts,
          subreddit: response.data.subreddit,
          subreddit_description: response.data.subreddit_description,
        });
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
            onUpvoteClick={this.postVoteHandler}
            postClick={this.postClickHandler}
          />
        );
      });
    }

    return (
      <div>
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}

        <Card style={{ width: "45vh" }} className="subreddit-card">
          <Card.Body>Subreddit: {this.state.subreddit}</Card.Body>
          <Card.Footer>Description: {this.state.subreddit_description}</Card.Footer>
        </Card>
        {posts}
      </div>
    );
  }
}

export default Subreddit;
