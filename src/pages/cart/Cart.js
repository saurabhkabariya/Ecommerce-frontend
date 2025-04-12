import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Quantitybox from "../../components/quantitybox/Quantitybox";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { deletedata, editdata, fetchdatafromapi } from "../../utils/api";
import { MyContext } from "../../App";
import { IoBagCheckOutline } from "react-icons/io5";

const Cart = () => {
  const [cartdata, setcartdata] = useState([])
  const [quantity, setquantity] = useState(1);
  const [isloading, setisloading] = useState(false);
  let [cartfield, setcartfield] = useState({})
  let [changequantity, setchangequantity] = useState(0)

  const context=useContext(MyContext);

  const history=useNavigate();
  
  useEffect(()=>{
    // fetchdatafromapi(`/api/cart`).then((res)=>{
      const userdata=JSON.parse(localStorage.getItem("user"));

      if(!userdata){
        context.setislogin(false);
        history('/signin')
      }

    fetchdatafromapi(`/api/cart?userid=${JSON.parse(localStorage.getItem("user")).id}`).then((res)=>{
      setcartdata(res);
      
    })
  },[])

  const quantityset=(val)=>{
    setquantity(val);
    setchangequantity(val);
  }


  const selecteditem=(item,quantityval)=>{

    if(changequantity!==0){
      setisloading(true);

      const userdata=JSON.parse(localStorage.getItem("user"));
        
    
        cartfield.producttitle= item?.producttitle
        cartfield.image= item?.image
        cartfield.rating= item?.rating
        cartfield.price= item?.price
        cartfield.quantity= quantityval
        cartfield.subtotal= parseInt(item?.price * quantityval)
        cartfield.productid= item?.id
        cartfield.userid= userdata?.id
  
        editdata(`/api/cart/${item?._id}`,cartfield).then((res)=>{
          setTimeout(() => {
            setisloading(false);
            fetchdatafromapi(`/api/cart`).then((res)=>{
              setcartdata(res);
            })
          }, 500);
        })
    }
   
  
  }

  const deleteitem=(id)=>{
    deletedata(`/api/cart`,id).then((res)=>{
      context.setalertbox({
        open:true,
        color:"success",
        msg:"Item deleted successfully from cart!"
      })
        fetchdatafromapi(`/api/cart`).then((res)=>{
          setcartdata(res);
        })
        context.getcartdata();
    })
  }

  return (
    <div>
      <section className="section cartpage">
        <div className="container">
          <div className="row">
            <h2 className="hd mb-1">Your Cart</h2>
              <p>
                There are <b className="text-red">{cartdata?.length}</b> products in your cart
              </p>
            <div className="col-md-9 mb-2">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                  {cartdata?.length > 0 && cartdata?.map((item,index)=>{
                    return(
                    <tr key={index}>
                      <td>
                        

                        
                        <Link to={`/product/${item?.productid}`}>
                          <div className="d-flex align-items-center cartitemimagewrapper">
                            <div className="imgwrapper">
                              <img
                                src={`${process.env.REACT_APP_BASE_URL}/uploads/${item?.image}`} alt="screenshot"
                                className="w-100"
                              />
                            </div>
                            <div className="infocontainer">
                            <div className="info px-3">
                              <h6>{item.producttitle?.length > 60 ? item?.producttitle.substr(0,60)+"..." : item?.producttitle}</h6>
                            </div>
                            <div className="ratting px-3">
                              <Rating
                                className="mt-2 mb-2"
                                name="half-rating-read"
                                defaultValue={item?.rating}
                                value={item?.rating}
                                precision={1}
                                size="small"
                                readOnly
                              />
                            </div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>Rs. {item?.price}</td>
                      <td><Quantitybox quantityset={quantityset} item={item} selecteditem={selecteditem} value={item?.quantity}/></td>
                      <td>Rs. {item?.subtotal}</td>
                      <td><span className="remove" onClick={()=>deleteitem(item?._id)}><IoMdClose /></span></td>
                    </tr>

                    )
                    })}
                  </tbody>
                </table>
                {
                      cartdata?.length<=0 && 
                      <div className="d-flex align-items-center justify-content-center w-100 h-100 flex-column">
                        <img src="https://cdn-icons-png.flaticon.com/128/1136/1136143.png" alt="MyList"/>
                        <span className="fw-bold">Your Cart is currently Empty!</span>
                      </div>
                    }
              </div>
            </div>
            <div className="col-md-3">
                <div className="card border p-3 cartdetails">
                    <h4>CART TOTALS</h4>
                    <div className="cartstats">
                      <span>Subtotal</span>
                      <span className="text-red text-bold">₹
                        {
                          cartdata?.length!==0 && cartdata?.map(item=>parseInt(item?.price)*item?.quantity).reduce((total,value)=>total+value,0)
                        }
                      </span>
                    </div>
                    <div className="cartstats">
                      <span>Shipping</span>
                      <span className="text-bold">Free</span>
                    </div>
                    <div className="cartstats">
                      <span>Estimate for</span>
                      <span className="text-bold">United Kingdom</span>
                    </div>
                    <div className="cartstats">
                      <span>Total</span>
                      <span className="text-red text-bold">₹
                        {
                          cartdata?.length!==0 && cartdata?.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0)
                        }
                      </span>
                    </div>
                    <Link to="/checkout">
                      <Button className="btn-red btn-lg btn-big cartbutton mt-5">
                      <IoBagCheckOutline fontSize="large" className="cartbtn" />
                      Checkout
                      </Button>
                    </Link>
                </div>
            </div>
          </div>
        </div>
      </section>
        {isloading === true && <div className="loading"></div>}
    </div>
  );
};

export default Cart;
