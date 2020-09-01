import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookie from "../../util/cookie";
import Post from "../../components/Post/Post";
import {Card,Alert}from "react-bootstrap";
import "./Account.css";

class Account extends Component {
  state = {
    karma: null,
    posts: null,
    created_date: null,
    username: null,
  };
  componentDidMount() {
    const username = this.props.match.params.username;

    axios
      .get("/u/" + username)
      .then((response) => {
        this.setState({
          karma: response.data.karma,
          posts: response.data.posts,
          created_date: response.data.created_date,
          username: username,
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
      <div className="account">
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        <Card  style={{ width: "45vh" }} className="account-card">
          <Card.Body>User: {this.state.username}</Card.Body>
          <Card.Footer>Created: {this.state.created_date}</Card.Footer>
        </Card>
        <h1>Posts:</h1>
        {posts}
      </div>
    );
  }
}

export default Account;
