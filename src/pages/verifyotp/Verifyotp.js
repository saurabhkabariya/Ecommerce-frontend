import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Logo from "../../assets/images/logo.png";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { postdata } from "../../utils/api";
import { Backdrop, CircularProgress } from "@mui/material";
import Otpbox from "../../components/otpbox/Otpbox";



const Verifyotp = () => {
  const [isloading, setisloading] = useState(false);
  const [otp,setotp]=useState("");

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    context.setisheaderfootershow(false);
  }, []);

  const handleotpchange=(value)=>{
    setotp(value);
}
  const verify=(e)=>{
    e.preventDefault();
    const obj={
        otp:otp,
        email:localStorage.getItem("useremail"),
    };

    postdata(`/api/user/verifyemail`,obj).then((res)=>{
        if(res?.success===true){
            context.setalertbox({
                open:true,
                color:"success",
                msg:res?.msg
            })
            setisloading(false);
            localStorage.removeItem("useremail");
            history("/signin");
        }
        else{
            context.setalertbox({
                open:true,
                color:"error",
                msg:res?.msg
            });
            setisloading(false);
        }

    })
  }


  return (
    <section className="section signinpage otppage">
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

        <div className="container">
            <div className="box card p-3 shadow border-0">
            <div className="text-center">
                <Link to="/"><img className="w-45" src={Logo} /></Link>
            </div>

            <form className="mt-3" onSubmit={verify}>
                <h2 className="mb-4">OTP Verification</h2>
                <p className="text-center">
                    OTP has been sent to <b>{localStorage.getItem("useremail")}</b>
                </p>

                <Otpbox length={6} onChange={handleotpchange}/>
                
                <div className="d-flex align-items-center mt-3 mb-3">
                    <Button type="submit" className="btn-blue col btn-lg btn-big">
                        Verify OTP
                    </Button>
                </div>
                <p className="text-center"><a className="border-effect cursor txt">Resend OTP</a></p>
            </form>
            </div>
        </div>
    </section>
  );
};

export default Verifyotp;
