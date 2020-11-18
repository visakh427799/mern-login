import axios from 'axios';


export const Login=data=>{

    return axios.post('http://localhost:8000/login', data)
     .then(res => res.data);
  
  }
