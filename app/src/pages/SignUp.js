import {Container,} from '@mui/material';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import UserInfo from '../components/forms/UserInfo/userInfo';



import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import{auth} from "../firebase/firebaseConfig"
import { useState } from 'react';
import { width } from '@mui/system';
const provider = new GoogleAuthProvider();

export default function SignUpPage(){
    const handleSubmit = (event) => {
      setEmailErr('')
      setPsErr('')
        SignUpWithFirebase()
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPsErr] = useState("");
    const [confirmPSErr, setConfirPsErr] = useState("");
    
    const[step, setStep]=useState(1)


    const SignUpWithFirebase = async () => {
          if(password!=confirmPassword){
            setPsErr("password have to be matched")
            setConfirPsErr("password have to be matched")
            return
          }
          if (email=="dev"){
            setStep(1)
            return
          }
            
          createUserWithEmailAndPassword(auth, email,password)
          .then((userCredential) => {
              console.log('firebase signUp sucess')
              const user = userCredential.user;
              user.getIdToken(true)
              .then((token)=>{
                localStorage.setItem('tokenId', token)
                setStep(2)
              })
          })
          .catch((error) => {
              console.log(error.message)
              setEmailErr(error.message)
              setPsErr(error.message)
              setConfirPsErr(error.message)
          })
      }

    const Steps=()=>{
        switch(step){
            case(1):
                return(       
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    
                  }}
                >
                  <Typography component="h1" variant="h5" sx={{fontSize:30, fontWeight:"600"}}>
                    please enter your information
                  </Typography>
                  <Box
                    sx={{ mt: 1, width:"100%"}}
                  >
                    
                    <UserInfo/>

                    
                  </Box>
                </Box> 
                 )
            default: 
                return(
                  <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    
                  }}
                >
                  <Typography component="h1" variant="h5" sx={{fontSize:30, fontWeight:"600"}}>
                    Sign Up
                  </Typography>
                  <Box
                    sx={{ mt: 1, width:"100%"}}
                  >
                    <TextField
  
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      type='text'
                      onChange={e => setEmail(e.target.value)}
                      sx={{width:"100%", marginY:0}}
                    />
                  <Typography sx={{color:"red", fontSize: "12px", marginBottom:"12px"}}>
                    {emailErr}
                  </Typography>
  
                   <FormControl fullWidth onChange={e => setPassword(e.target.value)} >
                      <InputLabel htmlFor="outlined-adornment-password">
                          Password
                      </InputLabel>
                      <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                          <InputAdornment position="end">
                              <IconButton
                              aria-label="toggle password visibility"
                              onClick={()=>{setShowPassword(!showPassword)}}
                              edge="end"
                              >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                          }
                          label="Password"
                      />
                   </FormControl>
                   <Typography sx={{color:"red", fontSize: "12px", marginBottom:"12px"}}>
                    {passwordErr}
                  </Typography>
  
                  <FormControl fullWidth onChange={e => setConfirmPassword(e.target.value)} >
                      <InputLabel htmlFor="outlined-adornment-password">
                          Confirm Password
                      </InputLabel>
                      <OutlinedInput
                          id="outlined-adornment-password"
                          type={showConfirmPassword ? "text" : "password"}
                          endAdornment={
                          <InputAdornment position="end">
                              <IconButton
                              aria-label="toggle password visibility"
                              onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}
                              edge="end"
                              >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                          }
                          label="Confirm Password"
                      />
                   </FormControl>
                   <Typography sx={{color:"red", fontSize: "12px", marginBottom:"12px"}}>
                    {passwordErr}
                  </Typography>
  
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2}}
                      onClick={()=>handleSubmit()}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="space-between" >
                      <Grid item xs={6} textAlign="center">
                        <Link href="app/src/pages#" variant="body2" >
                          already have a account? <br/> Login
                        </Link>
                      </Grid>
                    </Grid>
                    
                  </Box>
                </Box>)
        }
    
                
      }
    


    return (
      <Container component="main" sx={{width:{sm:"100%", md:"100%", lg:"80%"}, marginX:"auto"}}>
        <Box
          sx={{
            mt: "150px",
          }}
        >
          <Grid container spacing={2} justifyContent="space-around">
            <CssBaseline />
            <Grid
              item
              sx={{
                backgroundImage: "url(https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display:{sm:"none", md:"block"},
                width:"50%"
              }}
            />
            <Grid
              item
              sx={{width:"50%"}}
            >
{Steps()}
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }