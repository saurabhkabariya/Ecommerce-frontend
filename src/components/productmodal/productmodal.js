import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Rating from "@mui/material/Rating";

import Quantitybox from "../quantitybox/Quantitybox";
import { CiHeart } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import { MyContext } from "../../App";
import Productzoom from "../productzoom/Productzoom";
import { FaShoppingCart } from "react-icons/fa";
import { postdata } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Productmodal = (props) => {
  const [quantity, setquantity] = useState(1);
  const [activestate, setactivestate] = useState(null);
  let [cartfield, setcartfield] = useState({})
  const [taberror, settaberror] = useState(false);


  

  const history=useNavigate();

  const context=useContext(MyContext)



  const quantityset=(val)=>{
    setquantity(val);
  }

  const selecteditem=()=>{

  }

  const addtomylist = (id)=>{
      const userdata=JSON.parse(localStorage.getItem("user"));
      if(userdata){
        const data={
          producttitle: props.proddata?.name,
          image: props.proddata?.images[0],
          rating: props.proddata?.rating,
          price: props.proddata?.price,
          productid:id,
          userid:userdata?.id
        }
        
        postdata(`/api/mylist/add`,data).then((res)=>{
          if (res && res.status !== false){
            context.setalertbox({
              open:true,
              color:"success",
              msg:"Product added to wishlist!"
            })
          }
          else{
            context.setalertbox({
              open:true,
              color:"error",
              msg:"Product already exist in wishlist!"
            })
          }
          
        })
        setTimeout(() => {
          history("/mylist")
        }, 500);
      }
      else{
        context.setalertbox({
          open:true,
          color:"error",
          msg:"Please login first!"
        })
        setTimeout(() => {
          history("/signin");
        }, 500);
      }
    }

    const addtocart=(data)=>{

      // if(activestate !== null){
        const userdata=JSON.parse(localStorage.getItem("user"));
        
    
        cartfield.producttitle= data?.name
        cartfield.image= data?.images[0]
        cartfield.rating= data?.rating
        cartfield.price= data?.price
        cartfield.quantity= quantity
        cartfield.subtotal= parseInt(data?.price * quantity)
        cartfield.productid= data?.id
        cartfield.userid= userdata?.id
    
        
    
        context.addtocart(cartfield);
  
      // }
      // else{
      //   settaberror(true);
      // }
  
    }


  return (
    <div>
      <Dialog
        className="productmodal"
        open={true}
        onClose={()=>context.setopenProductModal({id:'',open:false})}
      >
        <Button className="close_" onClick={()=>context.setopenProductModal(false)}>
          <IoMdClose />
        </Button>
        <h4 className="mb-1 font-weight-bold pr-5">
          {props.productdata.name}
        </h4>
        <div className="d-flex align-items-center ">
          <div className="d-flex align-items-center mr-4">
            <span>Brands:</span>
            <span className="ml-2">
              <b>{props.productdata.brand}</b>
            </span>
          </div>
          <Rating
            name="half-rating-read"
            defaultValue={props.productdata.rating}
            value={props.productdata.rating}
            precision={1}
            size="small"
            readOnly
          />
        </div>
        <hr />
        <div className="row  mt-2 productdetailsmodal">
          <div className="col-md-5">
            <Productzoom productdata={props.productdata}/>
          </div>

          <div className="col-md-7">
            <div className="info d-flex align-items-center mb-3">
              <span className="oldprice lg mr-2">Rs: {props.productdata.oldprice}</span>
              <span className="newprice text-danger lg">Rs: {props.productdata.price}</span>
            </div>
            <span className="badge bg-success">IN STOCK</span>
            <p className="mt-3">
              {props.productdata.description}
            </p>

            <div className="d-flex align-items-center ">
              <Quantitybox quantityset={quantityset} selecteditem={selecteditem} />
    
              <Button className="btn-blue btn-lg btn-big btn-round ml-3 cartbutton" onClick={()=>{addtocart(props.productdata)}}>
                    <FaShoppingCart className="cartbtn" />
                    {context.addingincart === true ? "Adding..." : "ADD TO CART"}
                    
              </Button>
            </div>
            <div className="d-flex align-items-center mt-5 actions">
              <Button variant="outlined" className="btn-round btn-sml " onClick={()=>addtomylist(props.productdata?.id)}><CiHeart className="heart" /> ADD TO WISHLIST</Button>
              <Button variant="outlined" className="btn-round btn-sml "><MdCompareArrows className="compare" /> COMPARE</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Productmodal;
