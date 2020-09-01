import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Alert, Card, Modal, FormControl } from "react-bootstrap";
import axios from "axios";
import Cookie from "../../util/cookie";
import Post from "../../components/Post/Post";
import "./Subreddit.css";

class Subreddit extends Component {
  state = {
    posts: null,
    subreddit: null,
    subreddit_description: null,
    redirect: null,
    error: null,
    showModal: false
  };

  componentDidMount() {
    const subreddit = this.props.match.params.subreddit;

    axios
      .get("/r/" + subreddit)
      .then((response) => {
        this.setState({
          posts: response.data.subreddit_posts,
          subreddit: response.data.subreddit,
          subreddit_description: response.data.subreddit_description,
        });
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
      

      //checks if user is suscribed to the subreddit
      let username = Cookie.getCookie("username");
      if(username){
        axios
        .get("/u/" + username + "/" + subreddit)
        .then((response) => {
          this.setState({isSuscribed: response.data.isSuscribed });
        })
        .catch((error) => {
          console.log(error, "ERROR");
        });
      }

  }

  postVoteHandler = (isUpvote, postId) => {
    const token = Cookie.getCookie("token");
    if (!token) {
      return this.setState({ error: "You need to be logged!" });
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

  handleModalClose = () =>{
    this.setState({showModal: false});
  }

  handleModalOpen = () =>{
    this.setState({showModal: true});
  }

  handleModalSubmit = () =>{
    if(this.state.modalTitle !== ""  || this.state.modalTitle !== ""){
      return this.setState({ error: "You need to fill all the inputs!", showModal: false});
    }

    const token = Cookie.getCookie("token");
    if (!token) {
      return this.setState({ error: "You need to be logged!", showModal: false});
    }

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let data = {
      subreddit: this.state.subreddit,
      title: this.state.modalTitle,
      body: this.state.modalDescription
    };
    
    axios
      .post("/create-post", data, config)
      .then((response) => {
        console.log(response);
        this.setState({showModal: false});
      })
      .catch((error) => {
        console.log(error, "ERROR");
      });
      
  }


  //handles suscribe and unsuscribe
  handleSuscription = (type) => {
    let token = Cookie.getCookie("token");
    if (!token) {
      return this.setState({ error: "You need to be logged!" });
    }

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
    .put("/u/" + type + "/" + this.state.subreddit, {},config)
    .then((response) => {
      if(response.status  !== 200){
        this.setState({error: "an error ocurred!"});
      }
    })
    .catch((error) => {
      console.log(error, "ERROR");
    });
  } 


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
          <Card.Body><span id="title">r/{this.state.subreddit}</span></Card.Body>
          <Card.Body><span id="description">{this.state.subreddit_description}</span></Card.Body>
          <Card.Footer>
            {this.state.isSuscribed ?  
            <Button variant="primary" size="lg"  onClick={() => this.handleSuscription("unsuscribe")} block>
              Unsuscribe  
            </Button>  
            : 
            <Button variant="primary" size="lg"  onClick={() => this.handleSuscription("suscribe")} block>
              Suscribe  
            </Button> }
            
            <Button variant="primary" size="lg" onClick={this.handleModalOpen} block>
              Create Post
            </Button>
          </Card.Footer>
        </Card>

        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>r/{this.state.subreddit}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl placeholder="Title" onChange={(e) => this.setState({modalTitle: e.target.value})}/>
            <FormControl as="textarea" placeholder="Description" onChange={(e) => this.setState({modalDescription: e.target.value})}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>Close</Button>
            <Button variant="primary" onClick={this.handleModalSubmit}>Post</Button>
          </Modal.Footer>
        </Modal>

        {posts}
      </div>
    );
  }
}

export default Subreddit;
