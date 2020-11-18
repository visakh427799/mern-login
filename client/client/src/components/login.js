import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Login} from '../apis/login_api';
import { Redirect } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const classes = useStyles();
  const from = { pathname: '/home' };
  const[email,setEmail]=useState("");
  const[password,setPassWord]=useState("");
  const[loading,setLoading]=useState(false);

  
  const[redirect,setRedirect]=useState(false);

  const setDir=()=>{
      setRedirect(true);
  }

  const renDirect=()=>{

    if(redirect)
    {
        console.log("button clicked")
        return <Redirect to={from} />
       
    }
}




   const handleChangeEmail=(e)=>{
          var em=e.target.value;
          //console.log(em);
          setEmail(em);
         
   }

  
   const handleChangePassword=(e)=>{
    var pwd=e.target.value;
    console.log(pwd);
    setPassWord(pwd);
   
  }

  

  

  const handleButtonClick = async() => {
    if (!loading) {
      setLoading(true)
      if(email!==''&&password!=='')
      {
          if(password)
            {
              var payload={
                email:email,
                password:password,
              }
              

              var sts= await Login(payload);
              console.log(sts);

              
              setLoading(false)

              if(sts===1)
              {
              
              setDir();
              
              }
              else{
                  alert("Wrong Email or Password")
              }

          }
        }
        else{
          alert("Please fill all the fields")
          setLoading(false)
        }
    }
 
  }




  return (
    <div  className="border border-primary">
         
        <div className="row">
            
                      <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                  
                    
                      <h2 className="text-info">LOGIN</h2>
                      
                      <form className={classes.form} noValidate>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          onChange={handleChangeEmail}
                        
                        />
                    
                        
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          type="password"
                          onChange={handleChangePassword}
                        />
                        
                        {renDirect()}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          disabled={loading}
                          onClick={handleButtonClick}
                        >
                          Log In
                        </Button>
                        <Grid container>
                          <Grid item xs>
                            <Link href="#" variant="body2">
                              Forgot password?
                            </Link>
                          </Grid>
                          
                        </Grid>
                      </form>
                    </div>
                    <Box mt={8}>
                      <Copyright />
                    </Box>
                  </Container>
        </div>       
    </div>

    
  )
};