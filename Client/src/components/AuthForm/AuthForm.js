import React, { useState, useEffect } from "react";
import axios from "axios";
import {makeStyles,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../actions";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    width: "100%",
    marginTop: "1.5em",
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged === true) {
      setRedirectToHome(true);
    }
  }, [isLogged]);

  const handleInputChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = { username: inputData.username, password: inputData.password };
    if (isSignUp) {
      if (inputData.password !== inputData.confirmPassword) {
        return setErrorMessage("Passwords don't match!");
      }
      try {
        await axios.post("/auth/signup", data);
        setIsSignUp(!isSignUp); //changes to sign in
      } catch (error) {
        if (error.response.status === 409) {
          //user already exists
          return setErrorMessage("User already exists!");
        }
        return setErrorMessage("Oops something happened!");
      }
    } else {
      try {
        let response = await axios.post("/auth/login", data);
        const  {token} = response.data;
        dispatch(signIn(token, inputData.username));
      } catch (error) {
        if (error.response.status === 401) {
          return setErrorMessage("Data is not correct!");
        }
        return setErrorMessage("Oops something happened!");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {redirectToHome && <Redirect to="" />}
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          {isSignUp ? "Sign Up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          {isSignUp && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            aria-label="Go to auth page"
          >
            {isSignUp ? "Sign Up" : "Sign in"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {errorMessage && (
          <Alert severity="error" className={classes.error}>
            {errorMessage}
          </Alert>
        )}
      </div>
    </Container>
  );
}
