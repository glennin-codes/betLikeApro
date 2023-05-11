import axios from "axios";

export const test=async ()=>{
try{
   const response =await  axios.get('http://api.football-data.org/v4/matches?status=SCHEDULED', {
        headers: { 'X-Auth-Token': '5777078bb3ca4a72a3e01a5fdebac8db' }
      })
       console.log("testing data",response);
    
}catch(error){
    console.log(error)
}
}
