import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

export default function Selectclass(props) {
  return (
    <Container maxWidth="lg" style={{ width: "100%", marginBottom: "5rem" }}>
      <Box
        sx={{
          display: "flex",
          mt: "3rem",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ alignSelf: "flex-start" }}>
          <h3 style={{ margin: 0 }}>Emotion Analysis of Social Media Post </h3>
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={props.dept}
              onChange={props.onDeptSet}
              label="Type"
            >
              <MenuItem value="Facebook">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"facebook"}>Facebook</MenuItem>
              <MenuItem value={"instagram"}>Instagram</MenuItem>
              <MenuItem value={"twitter"}>Twitter</MenuItem>
              <MenuItem value={"youtube"}>Youtube</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Analysis</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={props.sec}
              onChange={props.onSecSet}
              label="Parsing"
            >
              <MenuItem value={"url"}>Parse a url</MenuItem>
              <MenuItem value={"profile"}>Parse a profile</MenuItem>
              <MenuItem value={"post"}>Write a post</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}
