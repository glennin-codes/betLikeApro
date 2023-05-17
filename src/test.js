import axios from "axios";

export const test=async ()=>{
try{
  const API_URL = 'http://localhost:8080/matches'
   const data = await  axios.get(API_URL);
   const {matches}=data.data
       console.log("testing data",matches);
       
    
}catch(error){
    console.log(error)
}
}
<>
<Grid 
sx={{display:'flex',
flexDirection:'raw',
raw:'wrap-wrap'
}}
  
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