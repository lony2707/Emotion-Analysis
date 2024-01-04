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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContextValue } from "./shared/contextProvider";
import { allActionTypes } from "./shared/reducer";

export default function SignUp() {
  const [{ user }, dispatch] = useContextValue();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line no-console
    const inputs = {
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    };
    console.log(data.get("email"),data.get("password"),data.get("firstName"),data.get("lastName"))
    
    const requestBody = {
      "firstName" : data.get("firstName"),
      "lastName"  : data.get("lastName"),
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

    fetch("https://nodejs-production-314a.up.railway.app/register",options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dispatch({ type: allActionTypes.SETUSER, action: inputs });
      navigate("/");
    })
    .catch(error => {
      console.error("Error:", error);
    });

    
  };

  if (user) {
    return <Navigate to="/" replace={true} state={user} />;
  }

  return (
    <>
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="dept"
                  required
                  fullWidth
                  id="dept"
                  label="Department"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="section"
                  label="Section"
                  name="Section"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="space-around">
              <Grid item xs={12} sm={6}>
                <Link to="/login/" variant="body2">
                  Already have account? Sign In
                </Link>
              </Grid>
              <Grid item>
                <Link to="/" variant="body2">
                  Home
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
