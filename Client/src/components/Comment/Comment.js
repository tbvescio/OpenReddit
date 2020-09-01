import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Comment.css";

const comment = (props) => (
  <Card style={{ width: "45vh" }} border="success" className="card">
    <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">
        <p>
          <a href={"/u/" + props.username}>u/{props.username} </a>
        </p>
      </Card.Subtitle>
      <hr />
      <Card.Text>{props.body}</Card.Text>

      <hr />

      <div className="votes-container">
        <Button
          variant="primary"
          onClick={() => props.onUpvoteClick(true, props.commentId)}
        >
          Upvote
        </Button>
        <Card.Subtitle className="mb-2" id="votes">
          {props.votes}
        </Card.Subtitle>
        <Button
          variant="primary"
          onClick={() => props.onUpvoteClick(false, props.commentId)}
        >
          Downvote
        </Button>
      </div>

      <Card.Text>
        <small className="text-muted">Created: {props.time}</small>
      </Card.Text>
    </Card.Body>
  </Card>
);

export default comment;
