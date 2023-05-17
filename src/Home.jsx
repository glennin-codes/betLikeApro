import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { Button, Card, CardContent, Grid, Typography, Divider, Snackbar } from '@mui/material';
import { test } from './test';

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
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function Home() {
  const [matches, setMatches] = useState([]);
  const [today, setToday] = useState('');
  const [tomorrow, setTomorrow] = useState('');
 
  const [predictionResult, setPredictionResult] = useState(null);
  const [showPredictionToast, setShowPredictionToast] = useState(false);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setToday(formatDate(today));
    setTomorrow(formatDate(tomorrow));

    axios.get('http://localhost:5000/matches').then((response) => {
      const { data } = response;
      setMatches(
        data.filter((match) => {
          const matchDate = new Date(match.matchTime);
          return matchDate >= today && matchDate < tomorrow;
        })
      );
    });
  }, []);

  const handlePrediction = (match) => {
    const { homeTeamId, awayTeamId,homeTeamName,awayTeamName } = match;
    axios.post('http://localhost:5000/predict', { home_team_id: homeTeamId, away_team_id: awayTeamId }).then((response) => {
      const prediction = response.data.prediction;
      if (prediction===0){
            
      setPredictionResult(`${homeTeamName} has a high chances of winning`);
      }
      else if(prediction===1){
        setPredictionResult(`${awayTeamName} high chances of winning`)
      }else if(prediction===0){
        setPredictionResult('mostly going to a Draw')
      }else{
        setPredictionResult('undocumented,I may miss some old data')
      }
      setShowPredictionToast(true);
    });
  };

  const handlePredictionToastClose = () => {
    setShowPredictionToast(false);
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
      <Grid container spacing={2} justify="center">
        {matches.map((match) => (
          <Grid item key={match.matchId}>
            <StyledCard>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <LogoImage src={match.homeTeamLogo} alt={match.homeTeamName} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="h2">
                      {match.homeTeamName} vs {match.awayTeamName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <LogoImage src={match.awayTeamLogo} alt={match.awayTeamName} />
                  </Grid>
                </Grid>
                <Typography color="textSecondary" gutterBottom>
                  {match.competitionName}
                </Typography>
                <Typography variant="body2" component="p">
                  {new Date(match.matchTime).toLocaleString()}
                </Typography>
                <Button
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
      <Typography variant="h6" align="center" gutterBottom>
        {tomorrow}
      </Typography>
      <Snackbar
        open={showPredictionToast}
        autoHideDuration={3000}
        onClose={handlePredictionToastClose}
        message={`Prediction: ${predictionResult}`}
      />
    </Root>
  );
}

export default Home;
