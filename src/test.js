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
