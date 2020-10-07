import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {useSelector} from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import AuthForm from "./components/AuthForm/AuthForm";
import Frontpage from "./pages/Frontpage/Frontpage";
import Singlepost from "./pages/SinglePost/Singlepost";
import Subreddit from "./pages/Subreddit/Subreddit";
import Profile from "./pages/Profile/Profile";
import Error from "./pages/Error/Error";
import SearchResult from "./pages/SearchResult/SearchResult";

function App() {
  const themeState = useSelector(state => state.theme);
  const theme = createMuiTheme({
    palette: {
      type: themeState,
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper elevation={0} style={{minHeight: "100vh"}}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Frontpage} />
            <Route path="/auth" exact component={AuthForm} />
            <Route path="/error" exact component={Error} />
            <Route path="/search/:filter" exact component={SearchResult} />
            <Route path="/u/:username" exact component={Profile} />
            <Route path="/r/:subreddit" exact component={Subreddit} />
            <Route path="/r/:subreddit/:postId" exact component={Singlepost} />
          </Switch>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
