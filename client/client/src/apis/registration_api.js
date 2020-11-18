import axios from 'axios';


export const Registration=data=>{

  return axios.post('http://localhost:8000/reg', data)
   .then(res => res.data);

}