import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/logo.png";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { postdata } from "../../utils/api";
import { Backdrop, CircularProgress } from "@mui/material";

import { firebaseapp } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import google from '../../assets/images/Google.png'

const auth=getAuth(firebaseapp);
const provider=new GoogleAuthProvider();

const Signup = () => {

  const [isloading, setisloading] = useState(false)
  

  const [formfield, setformfield] = useState({
          name:"",
          email:"",
          phone:"",
          password:"",
          isadmin:false
      })
  
  const history= useNavigate();

  const context = useContext(MyContext);
  useEffect(() => {
    context.setisheaderfootershow(false);
  }, []);

  const onchangeinput=(e)=>{
    setformfield(()=>({
        ...formfield,
        [e.target.name]:e.target.value
    }))
}

const signup=(e)=>{
  e.preventDefault();

  try{

      if(formfield.name===""){
          context.setalertbox({
              open:true,
              color:"error",
              msg:"Name cannot be blank!"
          })
          return false;
      }
      if(formfield.email===""){
          context.setalertbox({
              open:true,
              color:"error",
              msg:"Email cannot be blank!"
          })
          return false;
      }
      if(formfield.phone===""){
          context.setalertbox({
              open:true,
              color:"error",
              msg:"Phone number cannot be blank!"
          })
          return false;
      }
      if(formfield.password===""){
          context.setalertbox({
              open:true,
              color:"error",
              msg:"Password cannot be blank!"
          })
          return false;
      }
      setisloading(true);
      postdata('/api/user/signup',formfield).then((res)=>{
        // console.log(formfield);
        
          if(res.error!==true){
              context.setalertbox({
                  open:true,
                  color:"success",
                  msg:"Registered successfully!"
              })
              
              setTimeout(()=>{
                  history("/signin");
              },1000)
              setisloading(false);
              return true;

          }
          else{
              context.setalertbox({
                  open:true,
                  color:"error",
                  msg:res.msg
              })
              setisloading(false);
          }
      })

      
  }
  catch(err){
      console.log(err);
      
  }
  
}

const signinwithgoogle=()=>{
            signInWithPopup(auth, provider).then((res)=>{
              const credential = GoogleAuthProvider.credentialFromResult(res);
              const token = credential.accessToken;

              const user = res.user;

              const fields={
                name:user.providerData[0].displayName,
                email:user.providerData[0].email,
                password:null,
                images:user.providerData[0].photoURL,
                phone:user.providerData[0].phoneNumber

              }
              setisloading(true);
              postdata("/api/user/authwithgoogle",fields).then((res)=>{
                try{
                  if(res.error !== true){
                    localStorage.setItem("token",res.token);
                    const user={
                      name:res.user?.name,
                      email:res.user?.email,
                      id:res.user?.id
                    }
                    localStorage.setItem("user",JSON.stringify(user));

                    context.setalertbox({
                      open:true,
                      color:"success",
                      msg:"Loggedin successfully!"
                    })

                    setTimeout(() => {
                      setisloading(false);
                      window.location.href="/";
                    }, 2000);
                  }
                  else{
                    context.setalertbox({
                      open:true,
                      color:"error",
                      msg:"Failed to login!"
                    })
                    setisloading(false);
                  }

                }
                catch(err){
                  console.log(err);
                  setisloading(false);
                  
                }
              });

              context.setalertbox({
                open:true,
                color:"success",
                msg:"User Authenticated Successfully!"
              })
            }).catch((err)=>{
              const errorCode = err.code;
              const errorMessage = err.message;
              const email = err.customData.email;
              const credential = GoogleAuthProvider.credentialFromError(err);
              context.setalertbox({
                open:true,
                color:"error",
                msg:errorMessage
              })
            })
          }







  return (
    <section className="section signuppage signinpage">
      <div className="container">
        <div className="shapebottom">
          <svg
            fill="#fff"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 1921 819.8"
            style={{ enableBackground: "new 0 0 1921 819.8" }}
          >
            {" "}
            <path
              class="st0"
              d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
            ></path>{" "}
          </svg>
        </div>
        <div className="box card p-3 shadow border-0">
          <div className="text-center">
            <Link to="/"><img className="w-45" src={Logo} /></Link>
          </div>

          <form className="mt-3" onSubmit={signup}>
            <h2 className="mb-4 text-center">Sign Up</h2>
            <div className="row mb-2 res-gap-2">
              <div className="col-md-6">
              <div className="formgroup mb-2">
              <TextField
                label="Name"
                type="name"
                variant="outlined"
                placeholder="Name"
                className="w-100 res-show"
                name="name"
                size="small"
                onChange={onchangeinput}
                style={{display:"none"}}
              />
              <TextField
                label="Name"
                type="name"
                variant="outlined"
                placeholder="Name"
                className="w-100 res-hide"
                name="name"
                onChange={onchangeinput}
              />
              </div>
                
              </div>
              <div className="col-md-6">
              <div className="formgroup mb-2">
                <TextField
                  label="Phone No."
                  type="number"
                  variant="outlined"
                  placeholder="Phone No."
                  className="w-100 res-show"
                  name="phone"
                  size="small"
                  onChange={onchangeinput}
                  style={{display:"none"}}
                />
                <TextField
                  label="Phone No."
                  type="number"
                  variant="outlined"
                  placeholder="Phone No."
                  className="w-100 res-hide"
                  name="phone"
                  onChange={onchangeinput}
                />
              </div>
              </div>
            </div>
            <div className="formgroup mb-2">
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                placeholder="Username@email.com"
                className="w-100 res-show"
                size="small"
                name="email"
                onChange={onchangeinput}
                style={{display:"none"}}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                placeholder="Username@email.com"
                className="w-100 res-hide"
                name="email"
                onChange={onchangeinput}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                placeholder="********"
                className="w-100 res-show"
                size="small"
                name="password"
                onChange={onchangeinput}
                style={{display:"none"}}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                placeholder="********"
                className="w-100 res-hide"
                name="password"
                onChange={onchangeinput}
              />
            </div>
            <Link className="border-effect cursor txt forgetlink">Forgot Password?</Link>
            <div className="d-flex align-items-center mt-3 mb-3 btns">
            <Button
              className="btn-blue btn-lg btn-big signinbtn"
              type="submit"
            >
              Sign up
            </Button>

            {isloading === true && (
                                                    <Backdrop
                                                      sx={(theme) => ({
                                                        color: "#fff",
                                                        zIndex: theme.zIndex.drawer + 1,
                                                      })}
                                                      open={isloading}
                                                    >
                                                      <CircularProgress color="inherit" />
                                                    </Backdrop>
                                                  )}

            <Link to='/' className="closebtn"><Button
              variant="outlined"
              className="btn-lg btn-big w-100"
              onClick={()=>context.setisheaderfootershow(true)}
            >
              Cancel
            </Button></Link>

            </div>
            <div className="signuppart d-flex gap-2 ">
              <p>Already Registered?</p>{" "}
              <Link to="/signin" className="border-effect signinlink text-bold">
                Sign In
              </Link>
            </div>
            {/* <h6 className="mt-1 text-center text-bold">
              Or continue with social account
            </h6> */}

            {/* <ul className="list list-inline text-center mt-3 mb-1 d-flex socials justify-content-center ">
              <li className="list-inline-item">
                <Button onClick={signinwithgoogle}>
                    <FaGoogle />
                </Button>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                    <FaSquareFacebook />
                </Link>
              </li>
            </ul> */}
            <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
                            <span className='line'></span>
                            <span className='txt'>or</span>
                            <span className='line'></span>
                        </div>
                        <div className='formgroup text-center mb-0'>
                            <Button variant='outlined' className='w-100 btn-lg loginwithgoogle' onClick={signinwithgoogle}><img src={google} className='mr-1' alt='google'/> Sign up with google</Button>
                        </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
