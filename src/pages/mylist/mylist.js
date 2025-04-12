import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { deletedata, editdata, fetchdatafromapi } from "../../utils/api";
import { MyContext } from "../../App";

const Mylist = () => {
  const [mylistdata, setmylistdata] = useState([])
  const [isloading, setisloading] = useState(false);
  let [mylistfield, setmylistfield] = useState({});
  const [islogin,setislogin]=useState(false);
  const history=useNavigate();

  

  const context=useContext(MyContext);
  
  useEffect(()=>{

    const token=localStorage.getItem("token");
    if (token !== null && token!=="" && token!=undefined){
      setislogin(true);
    }
    else{
      setislogin(false);
      history("/signin")
    }

    fetchdatafromapi(`/api/mylist?userid=${JSON.parse(localStorage.getItem("user")).id}`).then((res)=>{
      setmylistdata(res);
    })
  },[])



  const selecteditem=(item)=>{


      setisloading(true);

      const userdata=JSON.parse(localStorage.getItem("user"));
        
    
        mylistfield.producttitle= item?.producttitle
        mylistfield.image= item?.image
        mylistfield.rating= item?.rating
        mylistfield.price= item?.price
        mylistfield.productid= item?.id
        mylistfield.userid= userdata?.id
  
        editdata(`/api/mylist/${item?._id}`,mylistfield).then((res)=>{
          setTimeout(() => {
            setisloading(false);
            fetchdatafromapi(`/api/mylist`).then((res)=>{
              setmylistdata(res);
            })
          }, 500);
        })
   
  
  }

  const deleteitem=(id)=>{
    deletedata(`/api/mylist`,id).then((res)=>{
      context.setalertbox({
        open:true,
        color:"success",
        msg:"Item deleted successfully from cart!"
      })
        fetchdatafromapi(`/api/mylist`).then((res)=>{
          setmylistdata(res);
        })
        context.getmylistdata();
    })
  }

  return (
    <div>
      <section className="section cartpage mylistpage">
        <div className="container">
          <div className="row">
            <h2 className="hd mb-1">Your WishList</h2>
              <p>
                There are <b className="text-red">{mylistdata?.length}</b> products in your wishlist
              </p>
            <div className="col-md-12 ">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                  {mylistdata?.length > 0 && mylistdata?.map((item,index)=>{
                    return(
                    <tr key={index}>
                      <td>
                        

                        
                        <Link to={`/product/${item.productid}`}>
                          <div className="d-flex align-items-center cartitemimagewrapper">
                            <div className="imgwrapper">
                              <img
                                src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`} alt="screenshot"
                                className="w-100"
                              />
                            </div>
                            <div className="infocontainer">
                            <div className="info px-3">
                              <h6>{item.producttitle?.length > 60 ? item.producttitle.substr(0,60)+"..." : item.producttitle}</h6>
                            </div>
                            <div className="ratting px-3">
                              <Rating
                                className="mt-2 mb-2"
                                name="half-rating-read"
                                defaultValue={item.rating}
                                value={item.rating}
                                precision={1}
                                size="small"
                                readOnly
                              />
                            </div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>Rs. {item.price}</td>
                      <td><span className="remove" onClick={()=>deleteitem(item?._id)}><IoMdClose /></span></td>
                    </tr>

                    )
                    })}

                  </tbody>
                </table>
                    {
                      mylistdata?.length<=0 && 
                      <div className="d-flex align-items-center justify-content-center w-100 h-100 flex-column">
                        <img src="https://cdn-icons-png.flaticon.com/128/2666/2666505.png" alt="MyList"/>
                        <span className="fw-bold">Your list is currently Empty!</span>
                      </div>
                    }
              </div>
            </div>
          </div>
        </div>
      </section>
        {isloading === true && <div className="loading"></div>}
    </div>
  );
};

export default Mylist;
