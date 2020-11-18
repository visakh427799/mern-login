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
import {Registration} from '../apis/registration_api';
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

export default function SignIn() {
  const classes = useStyles();
  const from = { pathname: '/login' };
  const[email,setEmail]=useState("");
  const[username,setUserName]=useState("");
  const[password,setPassWord]=useState("");
  const[repassword,setRePassword]=useState("");
  const[loading,setLoading]=useState(false);

  const[redirect,setRedirect]=useState(false);

  const setDir=()=>{
      setRedirect(true);
  }

  const renDirect=()=>{

    if(redirect)
    {
        
        return <Redirect to={from} />
       
    }
}

   const handleChangeEmail=(e)=>{
          var em=e.target.value;
          //console.log(em);
          setEmail(em);
         
   }

   const handleChangeUsername=(e)=>{
    var unm=e.target.value;
    console.log(unm);
    setUserName(unm);
   
   }

   const handleChangePassword=(e)=>{
    var pwd=e.target.value;
   console.log(pwd);
    setPassWord(pwd);
   
  }

  const handleChangeRePasswod=(e)=>{
    var repwd=e.target.value;
   console.log(repwd);
    setRePassword(repwd);
   
  }

  

  const handleButtonClick = async() => {
    if (!loading) {
        setLoading(true);
       if(email!==''&&username!==''&& password!==''&& repassword!=='')
             {
                      if(password===repassword)
                              {
                                        var payload={
                                          email:email,
                                          name:username,
                                          password:password,
                                        }
                                    

                                    var sts= await Registration(payload);
                                    console.log(sts);
                                    if(sts==="0")
                                    {
                                            alert("Network Error")
                                            setLoading(false);
                                    }
                                    else if(sts==="1")
                                    {
                                            alert("Registration successfull please Login")
                                            setDir();

                                    }
                                    else{
                                            var val=window.confirm("Email already exist do you want to Login");
                                            if (val)
                                            //if user click ok then redirect into login page
                                                {
                                                  setDir();
                                                }
                                            else{
                                                  setLoading(false);
                                                }
                                        }

                              }
                              else{
                                alert("Password mismatch")
                                setLoading(false);
                              }
        
                        }
                        else{
                          alert("Please fill all the fields");
                          setLoading(false);
                        }
        
        
            }
      
  }




  return (
    <div  className="border border-primary">
         
        <div className="row">
            
                      <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                  
                    
                      <h2 className="text-info">REGISTER</h2>
                      
                      <form className={classes.form} noValidate>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required={true}
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          onChange={handleChangeEmail}
                          
                        
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required={true}
                          fullWidth
                          label="Username"
                          onChange={handleChangeUsername}
                        />
                        
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required={true}
                          fullWidth
                          id="password"
                          label="Password"
                          type="password"
                          onChange={handleChangePassword}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required={true}
                          fullWidth
                          name="password"
                          label="re-enter Password"
                          type="password"
                          id="password"
                          autoComplete="re-enter password"
                          onChange={handleChangeRePasswod}
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
                          Sign In
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