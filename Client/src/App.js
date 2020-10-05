import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AuthForm from "./components/AuthForm/AuthForm";
import Post from "./components/Post/Post";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/auth" exact component={AuthForm} />
      </Switch>
      <Post
        votes="5000000"
        title="this is a title"
        username="username"
        subreddit="subreddit"
        date="5/5/8"
        body="Lorem ipsum dolor sit amet consectetur adipiscing elit mi lacus
                magna hendrerit, ante aenean velit ligula orci sapien mollis
                varius nec netus duis, porttitor malesuada at ultrices tellus
                pellentesque interdum imperdiet libero pretium. Pretium a enim
                felis nulla netus congue porta varius, mi ridiculus dapibus
                laoreet taciti suspendisse facilisi sociis, nec vehicula non
                sagittis turpis mattis orci. Sociis varius sagittis ornare netus
                metus himenaeos diam dictum fusce lobortis tincidunt, aliquet
                laoreet sapien convallis sollicitudin lacus posuere rutrum sem
                senectus mus nam, suspendisse nulla fames at ullamcorper luctus
                auctor leo magnis nullam."
      />
    </BrowserRouter>
  );
}

export default App;
