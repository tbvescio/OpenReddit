import React from "react";

import Navbar from "./components/Navbar/Navbar";
import AuthForm from "./components/AuthForm/AuthForm";

import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/auth" exact component={AuthForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
