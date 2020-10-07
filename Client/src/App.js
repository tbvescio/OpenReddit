import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Paper } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import AuthForm from "./components/AuthForm/AuthForm";
import Frontpage from "./pages/Frontpage/Frontpage";
import Singlepost from "./pages/SinglePost/Singlepost";
import Subreddit from "./pages/Subreddit/Subreddit";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Paper elevation={0} >
        <Navbar />
        <Switch>
          <Route path="/" exact component={Frontpage} />
          <Route path="/auth" exact component={AuthForm} />
          <Route path="/u/:username" exact component={Profile} />
          <Route path="/r/:subreddit" exact component={Subreddit} />
          <Route path="/r/:subreddit/:postId" exact component={Singlepost} />
        </Switch>
      </Paper>
    </BrowserRouter>
  );
}

export default App;
