import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CommentInput.css"

const commentInput = (props) => (
  <Form onSubmit={props.onSubmitHandler} style={{ width: "45vh" }} className="commentInput">
    <Form.Control type="text" as="textarea" placeholder="What are your thoughts?" onChange={(e) => props.onChangeHandler(e)}/>
    <Button variant="primary" type="submit" block>
      Submit
    </Button>
  </Form>
);

export default commentInput;
