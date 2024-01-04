import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { events } from "../../events";
import Selectclass from "./dashboard/Selectclass";
import DatewiseChart from "./dashboard/DatewiseChart";
import { Alert } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContextValue } from "./shared/contextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import ReportAreaChart from "./dashboard/ReportAreaChart";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { flexbox } from "@mui/system";


const Dashboard = () => {
  const [platform, setPlatform] = useState("");
  const [type, setType] = useState("");
  const [submitted, setsubmitted] = useState(false)
  const [data, setdata] = useState(events.CSEA);
  const [{ user }] = useContextValue();
  const [currPost, setcurrPost] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [emotion,setEmotion] = useState("");
  const [imageArr,setImageArr] = useState([])
  const [profileArr,setProfileArr] = useState([])
  const [emotions, setEmotions] = useState({ joy: 0, fear: 0, sadness: 0, neutral : 0, anger : 0 });
  const [positiveNegative,setPositiveNegative] = useState({ positive:0, negative: 0})
  const [positiveMonths, setPositiveMonths] = useState(Array(12).fill(0));
  const [negativeMonths, setNegativeMonths] = useState(Array(12).fill(0));
  const [chart,openChart] = useState(false)
  const [apiCallDone,setapiCallDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [warning,setWarning] = useState(false)

  const updatePositiveMonth = (index) => {
    setPositiveMonths((prevMonths) => {
      const newMonths = [...prevMonths];
      newMonths[index] = newMonths[index] + 1;
      console.log("positive",index, newMonths)
      return newMonths;
    });
  };

  const updateNegativeMonth = (index) => {
    setNegativeMonths((prevMonths) => {
      const newMonths = [...prevMonths];
      newMonths[index] = newMonths[index] + 1;
      console.log("positiveNegative",index, newMonths)
      return newMonths;
    });
  };

  const updateEmotion = (emotion) => {
    setEmotions((prevEmotions) => ({
      ...prevEmotions,
      [emotion]: prevEmotions[emotion] + 1,
    }));
  };
  const updatePositiveNegative = (emotion) => {
    setPositiveNegative((prevEmotions) => ({
      ...prevEmotions,
      [emotion]: prevEmotions[emotion] + 1,
    }));
  };

  useEffect(() => {
    const notify = () => {
      const loggedMesseage =
        "Announcement!! Welcome to PCC CS 593! I am looking forward to being your instructor for\
      the upcoming - Utpal Das ...";
      const msg = "Hey 👋, see how easy!";

      if (user) return toast.dark(loggedMesseage);
      else return toast.dark(msg);
    };
    notify();
  }, [user]);

  useEffect(()=>{
    setsubmitted(false)
    setcurrPost("")
    setFileLink("")
    setEmotion("")
    setImageArr([])
    setProfileArr([])
    setEmotions({ joy: 0, fear: 0, sadness: 0, neutral : 0, anger : 0 })
    setPositiveNegative({ positive:0, negative: 0})
    setPositiveMonths(Array(12).fill(0))
    setNegativeMonths(Array(12).fill(0))
    setapiCallDone(false)
    setIsLoading(false)
    setWarning(false)
  },[type])

  // const notify = <p></p>;
  const handleDeptChange = (event) => {
    setPlatform(event.target.value);
    const val = platform + type;
    console.log(event.target.value);
    setdata(events[val]);
  };
  const handleSecChange = (event) => {
    setType(event.target.value);
    const val = platform + type;
    console.log(event.target.value);
    setdata(events[val]);
  };

  function callImageApi(image) {
    const requestBody2 = {
      "data": [
        image 
      ]
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody2)
    };

    fetch("https://devraj4522-sentiment-image.hf.space/run/predict",options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const arr = data.data[0].analysis
      const newArr = []
      for (let i=0;i<arr.length;i++){
        newArr.push(arr[i].emotions)
      }
      setImageArr(newArr)
      console.log(newArr)
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  function callTextApi(data, month) {
    const requestBody = {
      "data": [
        data 
      ]
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    };

    fetch("https://devraj4522-sentiment.hf.space/run/predict",options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setEmotion(data.data[0].prediction)
      if (type == "profile"){
        updateEmotion(data.data[0].prediction)
        if (month != "NaN"){
          if (data.data[0].prediction == "joy" || data.data[0].prediction == "neutral") {
              
              updatePositiveMonth(month)
              console.log("positive",month, positiveMonths)
          }else{
              
              updateNegativeMonth(month)
              console.log("positivenegative",month, negativeMonths)
          }
        }
      }
      setsubmitted(true);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  function handleButtonClick() {
    if (type == "url") {
      setIsLoading(true)
      const tweet_id = currPost.match(/\d+$/)[0];

      fetch(`https://flask-production-283a.up.railway.app/fetch_tweets_from_id?tweet_id=${tweet_id}`)
      .then(response => response.json())
      .then(data => {
        setWarning(false)
        console.log(data);
        setsubmitted(true);
        const msg = data[0].text
        const image = data[0].media[0].media_url.fullUrl
        callImageApi(image)
        callTextApi(msg ,0)
      })
      .catch(error => {
        console.error("Error:", error);
        setWarning(true)
      });
      setIsLoading(false)
    }else if (type == "profile"){


      setIsLoading(true)
      const user=currPost

      fetch(`https://flask-production-283a.up.railway.app/fetch_user_tweets?user=${user}`)
      .then(response => response.json())
      .then(data => {
        setWarning(false)
        console.log(data);
        setsubmitted(true);
        const arr = []
        for(let i=0;i<data.length;i++){
          const dateObj = new Date(data[i].date);
          const month = dateObj.getMonth();
          callTextApi(data[i].text, month)
          // let _ = data[i].media.length>0 ? callImageApi(data[i].media[0].media_url.fullUrl) : null
          const obj = {
            month : month,
            text  : data[i].text,
            media : data[i].media.length>0 ? data[i].media[0].media_url.fullUrl : null
          };
          arr.push(obj);
        }
        setProfileArr(arr)
        setapiCallDone(true)
      })
      .catch(error => {
        console.error("Error:", error);
        setWarning(true)
      });
      setIsLoading(false)
    } else {
      setIsLoading(true)
      callTextApi(currPost)
      callImageApi(fileLink)
      setIsLoading(false)
    }
  }
  if (!user) {
    return <Navigate to="/login/" replace={true} state={user} />;
  }
  return (
    <>
      <div className="container" style={{ marginBottom: "3rem" }}>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      </div>
      <Paper
        elevation={2}
        sx={{
          my: 3,
          p: 0,
          pl: 1,
          mx: "auto",
          width: "100%",
          maxWidth: "1300px",
        }}
      >

    
      </Paper>
      <Selectclass
        platform={platform}
        type={type}
        onDeptSet={handleDeptChange}
        onSecSet={handleSecChange}
      />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box component="div" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {(type == 'url') && <TextField
                required
                fullWidth
                id="url"
                label="Enter a Url"
                name="url"
                onChange={(e) => setcurrPost(e.target.value)}
              />}
              {(type == 'profile') && <TextField
                required
                fullWidth
                id="url"
                label="Enter User Id"
                name="url"
                onChange={(e) => setcurrPost(e.target.value)}
              />}

              {type == 'post' && <TextField
                required
                fullWidth
                multiline
                rows={4}
                id="Write your post"
                label="Post"
                name="Post"
                onChange={(e) => setcurrPost(e.target.value)}
              />}
            </Grid>
            <Grid item xs={12}>
              {type == 'post' && <TextField
                required
                fullWidth
                id="file"
                label="Enter Image link"
                name="link"
                onChange={(e)=>setFileLink(e.target.value)}
              />}
            </Grid>

            <Grid item xs={12}>
              {type && <Button type="submit" fullWidth variant="contained" onClick={() => handleButtonClick()}>
                Submit
              </Button>}
            </Grid>
          </Grid>
        </Box>
        {/* {warning && (
              <Alert severity="error" sx={{mt:10, width: "max-content", marginLeft: 10 }}>
                Please enter a valid input .
              </Alert>
            )} */}
      </Container>
      
      {submitted && (type == "profile") && <div className="container">

        <Typography sx={{ fontSize: 30, mt: 10, marginLeft: 55 }} color="text.secondary" gutterBottom>
          Total Posts: {profileArr.length}
        </Typography>
      </div>}
      
      {submitted && (type == "url" || type == "post") && (currPost != "") && <div className="container" style={{ marginBottom: "3rem", marginLeft: 'auto', marginRight: 'auto' }}>
      <Typography sx={{ textAlign: "center", fontSize: 30, marginTop: 10, marginBottom:5 }} color="text.secondary">
              <strong>Current Post Emotion</strong>
            </Typography>

        <Card sx={{ minWidth: 100, m: 2 }}>
          <CardContent>
            <Typography sx={{ textAlign: "center" , fontSize: 20}} color="text.secondary">
            {emotion.toUpperCase()}
            </Typography>
          </CardContent>
        </Card>
      </div>
      }

      {submitted && (type == "profile") && <div className="container" style={{ marginBottom: "3rem", display: "flex", flexDirection: "row", marginLeft: 500, marginRight: 'auto' }}>
        <Card sx={{ minWidth: 100, m: 2 }}>
          <CardContent>
            <Typography sx={{ textAlign: "center" }} color="text.secondary">
              Sadness <br /> 😁 <br /> {emotions.sadness}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 100, m: 2 }}>
          <CardContent>
            <Typography sx={{ textAlign: "center" }} color="text.secondary">
              Anger <br /> 😡 <br /> {emotions.anger}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 100, m: 2 }}>
          <CardContent>
            <Typography sx={{ textAlign: "center" }} color="text.secondary">
              Joy <br />🙂 <br /> {emotions.joy}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 100, m: 2 }}>
          <CardContent>
            <Typography sx={{ textAlign: "center" }} color="text.secondary">
              Fear <br /> 😔 <br /> {emotions.fear}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 100, m: 2 }}>
          <CardContent>
            <Typography sx={{ textAlign: "center" }} color="text.secondary">
              Neutral <br /> 😐 <br /> {emotions.neutral}
            </Typography>
          </CardContent>
        </Card>

      </div>
      }


      {submitted && (type == "url" || type == "post") && <div className="container" style={{ marginBottom: "3rem", display: "flex", flexDirection: "column", marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>
      {imageArr.map((element, index) => (
          <div style={{ marginBottom: "2rem", display: "flex",flexDirection: "column", marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}>
          <span style={{ marginLeft: 20 }}>Person {index+1}</span>
          <div style={{ marginBottom: "2rem", display: "flex", marginRight: 'auto', marginTop: 50 }}>
          <Card sx={{ minWidth: 100, m: 2 }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }} color="text.secondary">
                Joy <br /> 😁 <br /> {(element.happy * 100) + "%"}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 100, m: 2 }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }} color="text.secondary">
                Sadness <br /> 😡 <br /> {(element.sad * 100) + "%"}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 100, m: 2 }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }} color="text.secondary">
                Anger <br />🙂 <br /> {(element.angry * 100) + "%"}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 100, m: 2 }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }} color="text.secondary">
                Fear <br /> 😔 <br /> {(element.fear * 100) + "%"}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 100, m: 2 }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }} color="text.secondary">
                Neutral <br /> 😐 <br /> {(element.neutral * 100) + "%"}
              </Typography>
            </CardContent>
          </Card>
          </div>
        </div>
        ))}
      </div>
      }
      
      <div className="container" style={{ marginBottom: "3rem" }}>
        {submitted && (type == "profile") ? <DatewiseChart positiveMonths={positiveMonths} negativeMonths={negativeMonths}/> : null}
      </div>

      <div className="container" style={{ marginBottom: "3rem" }}>
        {submitted && (type == "profile") ? <ReportAreaChart /> : null}
      </div>
      
      
    
    </>
  );
};

export default Dashboard;
