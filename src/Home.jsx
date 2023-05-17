import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Snackbar,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Root = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const StyledCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing(2)};
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

function Home() {
  const [matches, setMatches] = useState([]);
  const [today, setToday] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [matchLoading, setMatchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [showPredictionToast, setShowPredictionToast] = useState(false);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setToday(formatDate(today));
    setTomorrow(formatDate(tomorrow));
    setMatchLoading(true);
    axios
      .get("http://localhost:5000/matches")
      .then((response) => {
        const { data } = response;
        setMatchLoading(false);
        setMatches(
          data.filter((match) => {
            const matchDate = new Date(match.matchTime);
            return matchDate >= today && matchDate < tomorrow;
          })
        );
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Network error. Please check your internet connection.");
        }
      });
  }, []);

  const handlePrediction = (match) => {
    const { homeTeamId, awayTeamId, homeTeamName, awayTeamName } = match;
    axios
      .post("http://localhost:5000/predict", {
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
      })
      .then((response) => {
        const prediction = response.data.prediction;
        if (prediction === 0) {
          setPredictionResult(`${homeTeamName} has a high chances of winning`);
        } else if (prediction === 1) {
          setPredictionResult(`${awayTeamName} high chances of winning`);
        } else if (prediction === 0) {
          setPredictionResult("mostly going to a Draw");
        } else {
          setPredictionResult(
            "Undocumented prediction. Please check again later."
          );
        }
        setShowPredictionToast(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Network error. Please check your internet connection.");
        }
      });
  };

  const handleClosePredictionToast = () => {
    setShowPredictionToast(false);
    setPredictionResult("");
  };

  return (
    <Root>
      <Typography variant="h4" align="center" gutterBottom>
        Matches Today
      </Typography>
      <Divider />
      <Typography variant="h6" align="center" gutterBottom>
        {today}
      </Typography>
      {matchLoading ? (
        <>
          <Grid 
            
          >
            <StyledCard sx={{ height: 150, width: 300,marginBottom:'5rem'}}>
              <CardContent sx={{ fontSize: "3rem" }}>
                {/* Skeleton for the logo */}

                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                </Grid>
                <Grid item
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Skeleton for the team names */}
                  <Skeleton
                    variant="text"
                    width={260}
                    height={24}
                    
                    style={{ marginTop: "8px" ,paddingRight:'10'}}
                  />

                  {/* Skeleton for the competition name */}
                  <Skeleton
                    variant="text"
                    width={260}
                    height={24}
                    style={{ marginTop: "8px" }}
                  />
                </Grid>
                <Grid item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                
                }}
                >
                {/* Skeleton for the match time */}
                <Skeleton
                  variant="text"
                  width={280}
                  height={12}
                  style={{ marginTop: "4px" }}
                />

                {/* Skeleton for the Predict button */}
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={36}
                  style={{ marginTop: "8px" }}
                />
                </Grid>
              </CardContent>
            </StyledCard>
            <StyledCard sx={{ height: 150, width: 300 }}>
              <CardContent sx={{ fontSize: "3rem" }}>
                {/* Skeleton for the logo */}

                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                </Grid>
                <Grid item
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Skeleton for the team names */}
                  <Skeleton
                    variant="text"
                    width={260}
                    height={24}
                    
                    style={{ marginTop: "8px" ,paddingRight:'10'}}
                  />

                  {/* Skeleton for the competition name */}
                  <Skeleton
                    variant="text"
                    width={260}
                    height={24}
                    style={{ marginTop: "8px" }}
                  />
                </Grid>
                <Grid item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                
                }}
                >
                {/* Skeleton for the match time */}
                <Skeleton
                  variant="text"
                  width={280}
                  height={12}
                  style={{ marginTop: "4px" }}
                />

                {/* Skeleton for the Predict button */}
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={36}
                  style={{ marginTop: "8px" }}
                />
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={2} justify="center">
            {matches.map((match) => (
              <Grid item key={match.matchId}>
                <StyledCard>
                  <CardContent
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <LogoImage
                          src={match.homeTeamLogo}
                          alt={match.homeTeamName}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" component="h2">
                          {match.homeTeamName} vs {match.awayTeamName}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <LogoImage
                          src={match.awayTeamLogo}
                          alt={match.awayTeamName}
                        />
                      </Grid>
                    </Grid>
                    <Typography color="textSecondary" gutterBottom>
                      {match.competitionName}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {new Date(match.matchTime).toLocaleString()}
                    </Typography>
                    <Button
                      sx={{ bottom: -10, width: "100%", textAlign: "center" }}
                      variant="contained"
                      color="primary"
                      onClick={() => handlePrediction(match)}
                    >
                      Predict
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <>
        <Typography variant="h6" align="center" gutterBottom>
          {tomorrow}
        </Typography>
        <Snackbar
          open={showPredictionToast}
          autoHideDuration={3500}
          onClose={handleClosePredictionToast}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MuiAlert
            severity={error ? "error" : "success"}
            onClose={handleClosePredictionToast}
            elevation={6}
            variant="filled"
            sx={{ fontWeigt: "600", fontFamily: "Ubuntu" }}
          >
            {error ? error : predictionResult}
          </MuiAlert>
        </Snackbar>
      </>
    </Root>
  );
}

export default Home;
