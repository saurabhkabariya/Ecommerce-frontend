import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App';
import { IoBagCheckOutline } from 'react-icons/io5';
import { fetchdatafromapi, postdata } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [formfield,setformfield]=useState({
        fullname:"",
        country:"",
        streetaddressline1:"",
        streetaddressline2:"",
        city:"",
        state:"",
        zipcode:"",
        phonenumber:"",
        email:""
    })
    const [cartdata, setcartdata] = useState([])
    const [totalamount, settotalamount] = useState(0);

    const history=useNavigate();

      useEffect(()=>{
          // fetchdatafromapi(`/api/cart`).then((res)=>{
          fetchdatafromapi(`/api/cart?userid=${JSON.parse(localStorage.getItem("user")).id}`).then((res)=>{
            setcartdata(res);
            
            settotalamount(res.length!==0 && res.map(item=>parseInt(item.price)*parseInt(item.quantity)).reduce((total,value)=>total+value,0));
            
          })
        },[])
    

    

    const onchangeinput=(e)=>{
        setformfield(()=>({
            ...formfield,
            [e.target.name]:e.target.value
        }))
    }
    // const [country, setcountry] = useState('');

    const context=useContext(MyContext);

    // const handleChangeCountry = (event) => {
    //     setcountry(event.target.value);
    // };

    const checkout=(e)=>{
        e.preventDefault();
        if(formfield.fullname==="" || formfield.country === "" || formfield.streetaddressline1 === "" || formfield.state === "" || formfield.city === "" || formfield.zipcode === "" || formfield.phonenumber === "" || formfield.email === ""){
            context.setalertbox({
                open:true,
                color:"error",
                msg:"Please Fill all the required fields!"
            })
        }

        

        const addressinfo={
            name:formfield.fullname,
            phonenumber:formfield.phonenumber,
            address:formfield.streetaddressline1 + formfield.streetaddressline2,
            zipcode:formfield.zipcode,
            date:new Date().toLocaleString(
                "en-US",
                {
                    month:"short",
                    day:"2-digit",
                    year:"numeric",
                }
            )

        }

        const userdata=JSON.parse(localStorage.getItem("user"));
        
        var options={
            key: "rzp_test_anx4PdHTQ8iX9a",
            key_secret: "mCDGKcm0O5Pv6iu8cTgNMBUZ",
            amount:parseInt(
                totalamount*100
            ),
            currency:"INR",
            order_reciept:'order_rcptid_'+ formfield.fullname,
            name:"E-Bharat",
            description:"For testing purpose",
            handler:function(response){
                const paymentid=response.razorpay_payment_id

                const payload={
                        name:addressinfo.name,
                        phonenumber:formfield.phonenumber,
                        address:addressinfo.address,
                        zipcode:addressinfo.zipcode,
                        amount:parseInt(
                            totalamount*100
                        ),
                        paymentid:paymentid,
                        email:userdata.email,
                        userid:userdata.id,
                        products:cartdata,
                }

                postdata(`/api/orders/create`,payload).then((res)=>{
                    history('/orders');
                })
            },

            theme:{
                color:"#3399cc"
            }

        };

        var pay=new window.Razorpay(options);
        pay.open();

        
    }
  return (
    <section className='section checkout'>
      <div className='container'>
        <form className='checkoutform' onSubmit={checkout}>
        <div className='row'>
            <div className='col-md-8'>
                <h4 className='hd fw-bold'>BILLING DETAILS</h4>
                    <div className='row mt-3'>
                        <div className='col-md-6'>
                            <div className='formgroup'>
                                <TextField className='w-100' label="Full Name" variant="outlined" name="fullname" onChange={onchangeinput}/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            {/* <div className='formgroup'>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Country Name</InputLabel>
                            <Select
                                value={country}
                                label="Country Name"
                                onChange={handleChangeCountry}
                                >
                                {
                                    context.countryList?.length > 0 && context.countryList?.map((item,index)=>{
                                        return(<MenuItem value={item.country} key={index}>{item.country}</MenuItem>)
                                    })
                                }
                                </Select>
                                </FormControl>
                            </div> */}
                            <div className='formgroup'>
                                <TextField className='w-100' label="Country" variant="outlined" name="country" onChange={onchangeinput}/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                    <h5 className='hd fw-bold'>STREET ADDRESS</h5>
                        <div className='col-md-12'>
                            <div className='formgroup'>
                                <TextField className='w-100' label="House number and street name" variant="outlined" name="streetaddressline1" onChange={onchangeinput}/>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='formgroup'>
                                <TextField className='w-100' label="Society,village,etc.(optional)" variant="outlined" name="streetaddressline2" onChange={onchangeinput}/>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='formgroup'>
                                <TextField className='w-100' label="Town/City" variant="outlined" name="city" onChange={onchangeinput}/>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='formgroup'>
                                <TextField className='w-100' label="State/Country" variant="outlined" name="state" onChange={onchangeinput}/>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='formgroup'>
                                <TextField className='w-100' label="Post Code/PIN Code" variant="outlined" name="zipcode" onChange={onchangeinput}/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                    <div className='col-md-6'>
                            <div className='formgroup'>
                                <TextField className='w-100' label="Phone Number" variant="outlined" name="phonenumber" onChange={onchangeinput}/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='formgroup'>
                                <TextField className='w-100' label="Email Address" variant="outlined" name="email" onChange={onchangeinput}/>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='col-md-4'>
                <div className='card orderinfo'>
                    <h4 className='hd fw-bold'>YOUR ORDER</h4>
                    <div className='table-responsive w-100 mt-3'>
                        <table className='table table-borderless w-100'>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cartdata?.length > 0 && cartdata?.map((item,index)=>{
                                return(
                                    <tr>
                                        <td>{item.producttitle} <b>x {item.quantity}</b></td>
                                        <td>Rs. {item.subtotal}</td>
                                    </tr>
                                )})}

                                <tr>
                                    <td className='fw-bold'>Subtotal</td>
                                    <td className='fw-bold'>Rs. 
                                    {
                                        cartdata?.length!==0 && cartdata?.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0)
                                    }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                                <Button className="btn-red btn-lg btn-big cartbutton mt-5" type='submit'>
                                    <IoBagCheckOutline fontSize="large" className="cartbtn" />
                                        Checkout
                                </Button>
                </div>
            </div>
        </div>
        </form>
      </div>
    </section>
  )
}

export default Checkout
