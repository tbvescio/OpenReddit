import React, { Component } from "react";
import axios from "axios";
import {Card,ListGroup } from "react-bootstrap";
import "./ResultPage.css"

class ResultPage extends Component {
  state = {
    subreddits: [],
    accounts: null,
  };
  componentDidMount() {
    const filter = this.props.match.params.filter;

    axios
      .get("/search/" + filter)
      .then((response) => {
        this.setState({
          subreddits: response.data.data.subreddits,
          accounts: response.data.data.accounts,
        });
        console.log(this.state)
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
  }

  render() {
    let subreddits;
    if (this.state.subreddits) {
      subreddits = this.state.subreddits.map((subreddit) => {
        return (
          <ListGroup.Item key={subreddit._id}>
            <a href={"u/" + subreddit.name}>{subreddit.name}</a>
          </ListGroup.Item>
        );
      });
    }

    let accounts;
    if (this.state.accounts) {
      accounts = this.state.accounts.map((account) => {
        return (
          <ListGroup.Item key={account._id}>
            <a href={"r/" + account.username}>{account.username}</a>
          </ListGroup.Item>
        );
      });
    }


    return (
      <div>
        <Card style={{ width: "18rem" }} variant="dark">
          <Card.Header>Subreddits</Card.Header>
          <ListGroup variant="flush" className="card-subreddits" >
            {subreddits}
          </ListGroup>
        </Card>

        <Card style={{ width: "18rem" }} >
          <Card.Header>Accounts</Card.Header>
          <ListGroup variant="flush" className="card-accounts">
            {accounts}
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default ResultPage;
