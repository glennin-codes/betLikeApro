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

  useEffect(() => {
  
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setToday(formatDate(today));
    setTomorrow(formatDate(tomorrow));

    axios.get('http://localhost:5000/matches').then((response) => {
      console.log("original",response);
   
    const { data } = response;
       console.log("original",data);
      
      setMatches(
        data.filter((match) => {
          const matchDate = new Date(match.matchTime);
          return matchDate >= today && matchDate < tomorrow;
        })
      );
    });
  }, []);

  const handlePrediction = ({homeTeamID,awayTeamId}) => {
    

    axios.post('http://localhost:5000/predict', { home_team_id: homeTeamID, away_team_id: awayTeamId }).then((response) => {
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
    </Root>
  );
}

export default Home;





// import React, { useState, useEffect } from 'react';
// import styled from '@emotion/styled';
// import axios from 'axios';
// import { Button, Card, CardContent, Grid, Typography, Divider } from '@mui/material';
// import { test } from './test';

// const Root = styled.div`
//   padding: ${({ theme }) => theme.spacing(2)};
// `;

// const StyledCard = styled(Card)`
//   margin: ${({ theme }) => theme.spacing(2)};
// `;

// function formatDate(date) {
//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//   return date.toLocaleDateString(undefined, options);
// }

// function Home() {
//   const [matches, setMatches] = useState([]);
//   const [today, setToday] = useState('');
//   const [tomorrow, setTomorrow] = useState('');

//   useEffect(() => {
//     test();
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
//     setToday(formatDate(today));
//     setTomorrow(formatDate(tomorrow));

//     axios.get('http://localhost:5000/matches').then((response) => {
//       const {data}=response
//       setMatches(data.matches.filter(match => {
//         const matchDate = new Date(match.utcDate);
//         return matchDate >= today && matchDate < tomorrow;
//       }));
//     });
//   }, []);

//   const handlePrediction = (matchId) => {
//     axios.post('http://localhost:5000/predict', { matchId }).then((response) => {
//       console.log(response.data.prediction);
//     });
//   };

//   return (
//     <Root>
//       <Typography variant="h4" align="center" gutterBottom>
//         Matches Today
//       </Typography>
//       <Divider />
//       <Typography variant="h6" align="center" gutterBottom>
//         {today}
//       </Typography>
//       <Grid container spacing={2} justify="center">
//         {matches.map((match) => (
//           <Grid item key={match.id}>
//             <StyledCard>
//               <CardContent>
//                 <Typography variant="h6" component="h2">
//                   {match.homeTeam.name} vs {match.awayTeam.name}
//                 </Typography>
//                 <Typography color="textSecondary" gutterBottom>
//                   {match.competition.name}
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                   {new Date(match.utcDate).toLocaleString()}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => handlePrediction(match.id)}
//                 >
//                   Predict
//                 </Button>
//               </CardContent>
//             </StyledCard>
//           </Grid>
//         ))}
//       </Grid>
//       <Typography variant="h6" align="center" gutterBottom>
//         {tomorrow}
//       </Typography>
//     </Root>
//   );
// }

// export default Home;
