import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import Productzoom from "../../components/productzoom/Productzoom";
import Quantitybox from "../../components/quantitybox/Quantitybox";
import { Button } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import Relatedproducts from "./relatedproducts/Relatedproducts";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchdatafromapi, postdata } from "../../utils/api";
import { MyContext } from "../../App";

const Productdetails = () => {
  const [activestate, setactivestate] = useState(null);
  const [activetab, setactivetab] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [proddata, setproddata] = useState([]);
  const [relatedproddata, setrelatedproddata] = useState([]);
  const [taberror, settaberror] = useState(false);
  const [rating, setrating] = useState(1);
  let [cartfield, setcartfield] = useState({})
  let [reviews, setreviews] = useState({
    productid:"",
    customername: "",
    customerid: "",
    review:"",
    customerrating: 0,
  })
  const [reviewdata,setreviewdata]=useState([]);

  const history=useNavigate();


  const context=useContext(MyContext);

  const isActive = (index) => {
    setactivestate(index);
    settaberror(false);
  };

  const {id}=useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    setactivestate(null);

    fetchdatafromapi(`/api/products/${id}`).then((res)=>{

      
      setproddata(res);
      fetchdatafromapi(`/api/products?subcatid=${res?.subcatid}`).then((res)=>{
        const filtereddata=res.ProductList?.filter(item=>item.id !== id);
        setrelatedproddata(filtereddata);
        
      })
      
    })

    fetchdatafromapi(`/api/productreviews?productid=${id}`).then((res)=>{
      setreviewdata(res);
    })

    if(proddata?.productrams === undefined && proddata?.productsize === undefined && proddata?.productweight === undefined ){
      setactivestate(1);
    }
  }, []);



  

  const quantityset=(val)=>{
    setquantity(val);
  }

  const addtocart=(data)=>{

    if(activestate !== null){
      const userdata=JSON.parse(localStorage.getItem("user"));
      
  
      cartfield.producttitle= data?.name
      cartfield.image= data?.images[0]
      cartfield.rating= data?.rating
      cartfield.price= data?.price
      cartfield.quantity= quantity
      cartfield.subtotal= parseInt(data?.price * quantity)
      cartfield.productid= id
      cartfield.userid= userdata?.id
  
      
  
      context.addtocart(cartfield);

    }
    else{
      settaberror(true);
    }

  }

  const selecteditem=()=>{

  }

  const onchangeinput=(e)=>{
    setreviews(()=>({
      ...reviews,
      [e.target.name]:e.target.value
    }))

  }
  const onchangerating=(e)=>{
    reviews.customerrating=e.target.value;
    setrating(e.target.value);
  }

  const addreview=(e)=>{
    e.preventDefault();

    const user=JSON.parse(localStorage.getItem("user"));

    const formdata= new FormData;
    formdata.append("productid",id);
    formdata.append("customername",user?.name);
    formdata.append("customerid",user?.id);
    formdata.append("review",reviews?.review);
    formdata.append("customerrating",reviews?.customerrating);

    postdata("/api/productreviews/add",formdata).then((res)=>{
      setreviews({
        productid:"",
        customername: "",
        customerid: "",
        review:"",
        customerrating: 0,
      })
      setrating(1);
      fetchdatafromapi(`/api/productreviews?productid=${id}`).then((res)=>{
        setreviewdata(res);
      })
    })
  }

    const addtomylist = (proddata)=>{
        const userdata=JSON.parse(localStorage.getItem("user"));
        if(userdata){
          const data={
            producttitle: proddata?.name,
            image: proddata?.images[0],
            rating: proddata?.rating,
            price: proddata?.price,
            productid:proddata?.id,
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
    <div>


      <section className="productdetails section">
        <div className="container">
          <h2 className="hd text-capitalize res-show" style={{display:"none"}}>
                  {proddata.name}
          </h2>
          {/* <ul className='list list-inline'>
                <li className='list-inline-item'>
                    <span>Brands :</span>
                    <span>RARE RABBIT</span>
                </li>
            </ul> */}

          <div className="row">
            <div className="col-md-4 left-part">
              <Productzoom productdata={proddata} />
            </div>
            <div className="col-md-8">
              <div className="d-flex productinfo res-auto">
                <h2 className="hd text-capitalize res-hide">
                  {proddata.name}
                </h2>
                <div className="info">
                  <span className="infobrand">Brands:</span>
                  <span>
                    <b>{proddata.brand}</b>
                  </span>
                </div>
                <div className="rattingreview d-flex align-items-center">
                  <Rating
                    name="half-rating-read"
                    defaultValue={parseInt(proddata.rating)}
                    precision={1}
                    value={parseInt(proddata.rating)}
                    size="small"
                    readOnly
                  />
                  <span className="cursor review">1 Review</span>
                </div>
                <div className="info d-flex align-items-center mb-3 mt-3">
                  <span className="oldprice lg mr-2">Rs: {proddata.oldprice}</span>
                  <span className="newprice text-danger lg">Rs: {proddata.price}</span>
                </div>
                <span className="badge bg-success infobadge">IN STOCK</span>
                <p className="mt-3">
                  {proddata.description}
                </p>

                {
                  proddata.productrams?.length > 0 && 

                    <div className="productSize d-flex align-items-center">
                  {/* <span>Size / Weight:</span> */}
                  <span>RAM:</span>
                  <ul className={`list list-inline mb-0 pl-4 ${taberror===true && "error"}`}>
                  {proddata.productrams.map((item,index)=>{
                      return(
                    <li className="list-inline-item" key={index}>
                      <a
                        className={`tag ${activestate === 0 ? "active" : ""}`}
                        onClick={() => isActive(index)}
                      >
                        {item}
                      </a>
                    </li>
                  )
                })}
                    
                  </ul>
                </div>
                }
                {
                  proddata.productsize?.length > 0 && 

                    <div className="productSize d-flex align-items-center">
                  {/* <span>Size / Weight:</span> */}
                  <span>Size:</span>
                  <ul className={`list list-inline mb-0 pl-4 ${taberror===true && "error"}`}>
                  {proddata.productsize.map((item,index)=>{
                      return(
                    <li className="list-inline-item"  key={index}>
                      <a
                        className={`tag ${activestate === 0 ? "active" : ""}`}
                        onClick={() => isActive(index)}
                      >
                        {item}
                      </a>
                    </li>
                  )
                })}
                    
                  </ul>
                </div>
                }
                {
                  proddata.productweight?.length > 0 && 

                    <div className="productSize d-flex align-items-center">
                  {/* <span>Size / Weight:</span> */}
                  <span>Weight:</span>
                  <ul className={`list list-inline mb-0 pl-4 ${taberror===true && "error"}`}>
                  {proddata.productweight.map((item,index)=>{
                      return(
                    <li className="list-inline-item"  key={index}>
                      <a
                        className={`tag ${activestate === 0 ? "active" : ""}`}
                        onClick={() => isActive(index)}
                      >
                        {item}
                      </a>
                    </li>
                  )
                })}
                    
                  </ul>
                </div>
                }
                
                <div className="d-flex align-items-center mt-3 ">
                  <Quantitybox quantityset={quantityset} selecteditem={selecteditem}/>
                  <Button className="btn-red btn-lg btn-big btn-round ml-3 cartbutton" onClick={()=>{addtocart(proddata)}}>
                    <FaShoppingCart className="cartbtn" />
                    {context.addingincart === true ? "Adding..." : "ADD TO CART"}
                    
                  </Button>
                </div>
                <div className="productmodal">
                  <div className="d-flex align-items-center mt-5 actions">
                    <Button variant="outlined" className="btn-round btn-sml " onClick={()=>addtomylist(proddata)}>
                      <CiHeart className="heart" /> ADD TO WISHLIST
                    </Button>
                    <Button
                      variant="outlined"
                      className="btn-round btn-sml compare "
                    >
                      <MdCompareArrows className="compare" /> COMPARE
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-5 detailspagetabs res-auto">
              <div className="customtabs">
                <ul className="list list-inline">
                  <li className="list-inline-item">
                    <Button onClick={() => setactivetab(0)} className={`tag ${activetab === 0 ? "active" : ""}`}>Description</Button>
                    <Button onClick={() => setactivetab(1)} className={`tag ${activetab === 1 ? "active" : ""}`}>
                      Additional info
                    </Button>
                    <Button onClick={() => setactivetab(2)} className={`tag ${activetab === 2 ? "active" : ""}`}>Reviews ({reviewdata?.length})</Button>
                  </li>
                </ul>
              </div>
              {activetab === 0 && (
                <div className="tabcontent">
                  <p>
                    {proddata?.description}
                  </p>
                </div>
              )}

              {activetab === 1 && (
                <div className="tabcontent">
                  <div className="tableresponsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr class="stand-up">
                          <th>Stand Up</th>
                          <td>
                            <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                          </td>
                        </tr>
                        <tr class="folded-wo-wheels">
                          <th>Folded (w/o wheels)</th>
                          <td>
                            <p>32.5″L x 18.5″W x 16.5″H</p>
                          </td>
                        </tr>
                        <tr class="folded-w-wheels">
                          <th>Folded (w/ wheels)</th>
                          <td>
                            <p>32.5″L x 24″W x 18.5″H</p>
                          </td>
                        </tr>
                        <tr class="door-pass-through">
                          <th>Door Pass Through</th>
                          <td>
                            <p>24</p>
                          </td>
                        </tr>
                        <tr class="frame">
                          <th>Frame</th>
                          <td>
                            <p>Aluminum</p>
                          </td>
                        </tr>
                        <tr class="weight-wo-wheels">
                          <th>Weight (w/o wheels)</th>
                          <td>
                            <p>20 LBS</p>
                          </td>
                        </tr>
                        <tr class="weight-capacity">
                          <th>Weight Capacity</th>
                          <td>
                            <p>60 LBS</p>
                          </td>
                        </tr>
                        <tr class="width">
                          <th>Width</th>
                          <td>
                            <p>24″</p>
                          </td>
                        </tr>
                        <tr class="handle-height-ground-to-handle">
                          <th>Handle height (ground to handle)</th>
                          <td>
                            <p>37-45″</p>
                          </td>
                        </tr>
                        <tr class="wheels">
                          <th>Wheels</th>
                          <td>
                            <p>12″ air / wide track slick tread</p>
                          </td>
                        </tr>
                        <tr class="seat-back-height">
                          <th>Seat back height</th>
                          <td>
                            <p>21.5″</p>
                          </td>
                        </tr>
                        <tr class="head-room-inside-canopy">
                          <th>Head room (inside canopy)</th>
                          <td>
                            <p>25″</p>
                          </td>
                        </tr>
                        <tr class="pa_color">
                          <th>Color</th>
                          <td>
                            <p>Black, Blue, Red, White</p>
                          </td>
                        </tr>
                        <tr class="pa_size">
                          <th>Size</th>
                          <td>
                            <p>M, S</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activetab === 2 && (
                <div className="tabcontent">
                  <div className="row reviewtab">
                    <div className="col-md-9">
                      <h3>Customer questions & answers</h3>
                      <br />

                      {reviewdata?.length>0 && reviewdata?.slice(0)?.reverse().map((item,index)=>{
                        return(
                          <div className="info d-flex align-items-center" key={index}>
                            <div className="infodetails">
                              <h4>{item.customername}</h4>
                              <p>{item.dateCreated}</p>
                              <p>{item.review}</p>
                            </div>
                            <div className="inforatting">
                              <Rating
                                name="half-rating-read"
                                defaultValue={item.customerrating}
                                value={item.customerrating}
                                precision={1}
                                size="small"
                                readOnly
                              />
                            </div>
                          </div>
                        )
                      })}

                      
            
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                </div>
              )}

              <form className="reviewform" onSubmit={addreview}>
                <h4>Add a review</h4>
                <div className="formgroup d-flex flex-column">
                  {/* <input 
                    type="text"
                    className="formcontrolname mt-2 mb-2 p-2"
                    placeholder="Name"
                    value={reviews.customername}
                    name="customername"
                    onChange={onchangeinput}/> */}
                  <textarea
                    className="formcontrol mt-2 mb-2 p-2"
                    placeholder="Write Your Review..."
                    name="review"
                    value={reviews.review}
                    onChange={onchangeinput}
                  ></textarea>
                  <Rating
                    name="simple-uncontrolled"
                    defaultValue={1}
                    value={rating}
                    precision={1}
                    className="reviewratting mt-2 mb-2"
                    onChange={onchangerating}
                  />
                  <Button className="reviewsubmit " type="submit">Submit Review</Button>
                </div>
              </form>
            </div>

            <Relatedproducts relatedproddata={relatedproddata}/>

          </div>
        </div>
      </section>



    </div>
  );
};

export default Productdetails;
