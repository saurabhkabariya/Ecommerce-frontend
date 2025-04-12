import React, { useState } from "react";

const Otpbox= ({length,onChange}) => {
    const [otp,setotp]=useState(new Array(length).fill(""));

    const handlechange=(e,i)=>{
        const value=e.value;
        if(isNaN(value)) return;

        const newotp=[...otp];
        newotp[i]=value;

        setotp(newotp);
        onChange(newotp.join(""));

        if(value && i < length-1){
            document.getElementById(`otp-input-${i+1}`).focus();
        }
    };

    const handlekeydown=(e,i)=>{
        if(e.key==="Backspace" && !otp[i] && i>0){
            document.getElementById(`otp-input-${i-1}`).focus();
        }
    }
    return(
        <div style={{display:'flex',gap:'5px',justifyContent:'center'}} className="otp-box">
            {console.log(otp)
            }
            {otp.map((data,index)=>{
                <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e)=>handlechange(e.target.index)}
                onKeyDown={(e)=>handlekeydown(e,index)}
                style={{
                    width:"45px",
                    height:"45px",
                    textAlign:"center",
                    fontSize:"17px"
                }}
                />
            })}
        </div>
    )
}

export default Otpbox;