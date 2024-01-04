import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContextValue } from "../pages/shared/contextProvider";
import { useState } from "react";
import { Alert } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { allActionTypes } from "./shared/reducer";

const Login = () => {
  // email and passwords are set
  const [{ user }, dispatch] = useContextValue();
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = "email@email.com";
    const password = "password";

    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line no-console
    const inputs = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const requestBody = {
      "email"     : data.get("email"),
      "password"  : data.get("password"),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    };

    fetch("https://nodejs-production-314a.up.railway.app/login",options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("Unexpected error occurred");
      }
    })
    .then(data => {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(inputs));
      dispatch({ type: allActionTypes.SETUSER, action: inputs });
      navigate("/dashboard");
    })
    .catch(error => {
      console.error("Error:", error);
      setWarning(true);
    });

    // if (inputs.email === email && inputs.password === password) {
    //   localStorage.setItem("user", JSON.stringify(inputs));
    //   dispatch({ type: allActionTypes.SETUSER, action: inputs });
    //   navigate("/dashboard");
    // } else {
    //   setWarning(true);
    // }
  };

  if (user) {
    return <Navigate to="/dashboard/" replace={true} state={user} />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={() => setWarning(false)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                type="Password"
                name="password"
                onChange={() => setWarning(false)}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                paddingTop: "1rem !important",
                paddingLeft: "1.5rem ",
              }}
            >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Sign In
              </Button>
            </Grid>
            <Grid item container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {warning && (
              <Alert severity="error" sx={{ mt: 5 , marginLeft: 7}}>
                Please enter valid Email Id and Password .
              </Alert>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

//{"error ":"Invalid Password"}