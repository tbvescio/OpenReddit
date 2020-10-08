import React from "react";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Error() {
  let history = useHistory();
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h2" gutterBottom>
        Looks like something happened!
      </Typography>
      <Button variant="contained" name="homepage" onClick={() => history.push("/")}>
        Go to home page
      </Button>
    </div>
  );
}
