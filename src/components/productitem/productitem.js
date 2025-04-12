import {React,useContext} from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { CiHeart } from "react-icons/ci";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { postdata } from "../../utils/api";

const Productitem = (props) => {

  const context=useContext(MyContext);

  const history=useNavigate();

  const viewproductdetails=(id)=>{
      context.setopenProductModal({
        id:id,
        open:true
      })
      
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


  return (
      <Link to={`/product/${props.proddata?.id}`} className={` productitem ${props.itemview} rounded`}>
        
        <div className="imgwrapper rounded">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/uploads/${props.proddata?.images[0]}`}
            alt="product"
            className="w-100"
          />
          <div className="actions">
              <Button onClick={()=>viewproductdetails(props.proddata?.id)}>
                <BsArrowsFullscreen />
              </Button>
              <Button onClick={()=>addtomylist(props.proddata?.id)}>
                <CiHeart style={{fontSize:"20px"}} />
              </Button>
            </div>
          </div>
          <div className="info">
            <h4>{props.proddata?.name}</h4>
            <span className="text-success d-block">In Stock</span>
            <Rating
              className="mt-2 mb-2"
              name="half-rating-read"
              defaultValue={parseInt(props.proddata?.rating)}
              value={parseInt(props.proddata?.rating)}
              precision={1}
              size="small"
              readOnly
            />
            <div className="d-flex">
              <span className="oldprice">Rs {props.proddata?.oldprice}</span>
              <span className="newprice text-danger">Rs {props.proddata?.price}</span>
            </div>
            <span className="badge badge-primary">{props.proddata?.discount}%</span>
            
          </div>

    </Link>
  );
};

export default Productitem;
