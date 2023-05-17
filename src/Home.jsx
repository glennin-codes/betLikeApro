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
  CircularProgress,
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
  const [Loading, setLoading] = useState(false);
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
    .get("https://propredictor.azurewebsites.net/matches")
    .then((response) => {
      const { data } = response;
      setMatchLoading(false);
  
      if (data && data.length > 0) {
        setMatches(
          data.filter((match) => {
            const matchDate = new Date(match.matchTime);
            return matchDate >= today && matchDate < tomorrow;
          })
        );
      } else {
        setMatches([]); // Set an empty array to indicate no matches
      }
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
    setLoading(true);
    axios
      .post("https://propredictor.azurewebsites.net/predict", {
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
      })
      .then((response) => {
        setLoading(false);
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
        setLoading(false)
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
         container
         justify='center'
         spacing={2}
            
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
            <StyledCard sx={{ height: 150, width: 300,marginBottom:'5rem' }}>
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
            <StyledCard sx={{ height: 150, width: 300,marginBottom:'5rem' }}>
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
            { matches.length > 0 ? (
            matches.map((match) => (
              <Grid item key={match.matchId}>
                <StyledCard>
                  <CardContent
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
                      {Loading ? <CircularProgress size={24} /> :    Predict  }
                  
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))): (
              <Grid item xs={12} sx={{ textAlign: 'center', padding: '2rem' }}>
                <Typography variant="h5" color="error" gutterBottom>
                  No matches today
                </Typography>
                <Typography variant="body1">
                  Check back later for more exciting matches!
                </Typography>
                <img
  src="https://scontent.fnbo9-1.fna.fbcdn.net/v/t39.30808-6/331269067_562886035783249_661952417681640681_n.png?_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeFU6KtPG2no_02pnBx1ENn2azI1BOuOzT5rMjUE647NPtafPqTThSi6zczO5neF8FHt-8YARaKjC6ELxSbdmpMW&_nc_ohc=j8eSD-aLjMYAX-T849K&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fnbo9-1.fna&oh=00_AfBmz8z2mIZDoihapEOtQotMh814pmg_A_diRZP9H5INHg&oe=646B4ED1"
  alt="No Matches"
  style={{
    marginTop: '2rem',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    maxWidth: '550px',
  }}
/>

              </Grid>
            )}
          
            

          </Grid>
        </>
      )} 
      
      <>
        <Typography variant="h6" align="center" gutterBottom>
          {tomorrow}
        </Typography>
        <>
          <Grid 
         container
         justify='center'
         spacing={2}
            
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
            <StyledCard sx={{ height: 150, width: 300,marginBottom:'5rem' }}>
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
            <StyledCard sx={{ height: 150, width: 300,marginBottom:'5rem' }}>
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
