import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { Button, Card, CardContent, Grid, Typography, Divider } from '@mui/material';
import { test } from './test';

const Root = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const StyledCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing(2)};
`;

function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function Home() {
  const [matches, setMatches] = useState([]);
  const [today, setToday] = useState('');
  const [tomorrow, setTomorrow] = useState('');

  useEffect(() => {
    test();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setToday(formatDate(today));
    setTomorrow(formatDate(tomorrow));

    axios.get('http://localhost:8080/matches').then((response) => {
      const {data}=response
      setMatches(data.matches.filter(match => {
        const matchDate = new Date(match.utcDate);
        return matchDate >= today && matchDate < tomorrow;
      }));
    });
  }, []);

  const handlePrediction = (matchId) => {
    axios.post('/api/predict', { matchId }).then((response) => {
      console.log(response.data.prediction);
    });
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
          <Grid item key={match.id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {match.homeTeam.name} vs {match.awayTeam.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {match.competition.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {new Date(match.utcDate).toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePrediction(match.id)}
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
    </Root>
  );
}

export default Home;
