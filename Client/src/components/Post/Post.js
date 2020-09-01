import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Post.css";

const post = (props) => (
  <Card style={{ width: "45vh" }}  className="card">
    <Card.Body>
      <div onClick={() => props.postClick(props.postId, props.subreddit)}>
        <Card.Title id="title">{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" id="subtitle">
          <p>
            <a href={"/r/" + props.subreddit}>r/{props.subreddit} </a>
            Posted By <a href={"/u/" + props.user}>u/{props.user}</a>
          </p>
        </Card.Subtitle>
        <hr />
        <Card.Text>{props.body}</Card.Text>
      </div>
      
      <hr />

      <div className="votes-container">
        <Button
          variant="primary"
          onClick={() => props.onUpvoteClick(true, props.postId)}
        >
          Upvote
        </Button>
        <Card.Subtitle className="mb-2" id="votes">{props.votes}</Card.Subtitle>
        <Button
          variant="primary"
          onClick={() => props.onUpvoteClick(false, props.postId)}
        >
          Downvote
        </Button>
      </div>

    </Card.Body>
  </Card>
);

export default post;
