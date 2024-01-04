import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TimePicker } from "@mui/lab";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, Navigate } from "react-router-dom";
import { useContextValue } from "./shared/contextProvider";

export default function Admin() {
  const [dept, setdept] = React.useState("CSE");
  const [sec, setsec] = React.useState("A");
  const [date, setdate] = React.useState(null);
  const [from, setfrom] = React.useState(null);
  const [to, setto] = React.useState();
  const [{ user }] = useContextValue();

  const handleDeptChange = (event) => {
    setdept(event.target.value);
  };
  const handleSecChange = (event) => {
    setsec(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  if (!user) {
    return <Navigate to="/login/" replace={true} state={user} />;
  }

  return (
    <>
      <Container
        id="routine"
        component="main"
        maxWidth="xs"
        style={{ marginBottom: "5em" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AdminPanelSettingsIcon />
          </Avatar>
          <h3>Register to Monitor a person emotion</h3>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Social Media
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={dept}
                    onChange={handleDeptChange}
                    label="Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Facebook"}>Facebook</MenuItem>
                    <MenuItem value={"Instagram"}>Instagram</MenuItem>
                    <MenuItem value={"Twitter"}>Twitter</MenuItem>
                    <MenuItem value={"Youtube"}>Youtube</MenuItem>
                    {/* <MenuItem value={"FT"}>FT</MenuItem>
                    <MenuItem value={"CE"}>CE</MenuItem>
                    <MenuItem value={"ME"}>ME</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" sx={{ m: 1 }} fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={sec}
                    onChange={handleSecChange}
                    label="Type"
                  >
                    <MenuItem value={"url"}> Parse a url</MenuItem>
                    <MenuItem value={"single"}> Parse a Single post</MenuItem>
                    {/* <MenuItem value={"post"}>Write </MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="class"
                  required
                  fullWidth
                  id="class"
                  label="Teacher Assigned"
                  autoFocus
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  name="Url"
                  required
                  fullWidth
                  id="Url"
                  label="Url"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start From"
                    value={date}
                    onChange={(newValue) => {
                      setdate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="From"
                    value={from}
                    onChange={(newValue) => {
                      setfrom(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                  <TimePicker
                    label="To"
                    value={to}
                    onChange={(newValue) => {
                      setto(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Your Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I confirm all inputs are correctly mentioned."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="button button-primary button-wide-mobile"
              sx={{ mt: 3, mb: 2, textAlign: "center" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
      <Container component="main" maxWidth="md">
        <section className="section" style={{ marginBottom: "3em" }}>
          <div
            className="section-inner"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "3rem",
              paddingBottom: "3rem",
            }}
          >
            <h3 className="section-title mt-0">Administrator</h3>
            <div className="cta-cta">
              <Link className="button button-primary button-wide-mobile" to="/">
                Find your analysis
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
