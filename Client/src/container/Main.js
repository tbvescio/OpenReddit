import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./Main.css";

import Frontpage from "./Frontpage/Frontpage";
import SinglePost from "./SinglePost/SinglePost";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ResultPage from "./ResultPage/ResultPage";
import Subreddit from "./Subreddit/Subreddit";
import Account from "./Account/Account";
import Logout from "./Logout/Logout";

import Navbar from "../components/Navbar/Navbar";

class Main extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Frontpage} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/search/:filter" exact component={ResultPage} />
          <Route path="/u/:username" exact component={Account} />
          <Route path="/r/:subreddit" exact component={Subreddit} />
          <Route path="/r/:subreddit/:postId" exact component={SinglePost} />
        </Switch>
      </div>
    );
  }
}

export default Main;
