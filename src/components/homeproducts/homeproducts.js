import React, { useEffect, useState } from "react";
import banner1 from "../../assets/images/Screenshot (209).png";
import Button from "@mui/material/Button";
import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Productitem from "../productitem/productitem";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import newsletter from "../../assets/images/newsletter.png";
import { CiMail } from "react-icons/ci";

import {useContext} from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import Rating from "@mui/material/Rating";
import { CiHeart } from "react-icons/ci";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { fetchdatafromapi } from "../../utils/api";


const Homeproducts = (props) => {

  const [catdata, setcatdata] = useState([]);
  const [featuredprod, setfeaturedprod] = useState([]);
  const context=useContext(MyContext);
  
    const viewproductdetails=(id)=>{
        context.setopenProductModal(true)
    }

  useEffect(() => {
      window.scrollTo(0, 0);

      fetchdatafromapi('/api/category').then((res)=>{
            if(res.CategoryList.length !== 0){
              setcatdata(res.CategoryList);
            }
            
          })
      
          fetchdatafromapi(`/api/products/featured`).then((res)=>{
            if(res.length !== 0){
              setfeaturedprod(res);
            }
          })
            
    }, []);

  return (
    <div>
      

      <section className="homeproducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner">
                  <img src={banner1} alt="banner" className="cursor w-100" />
                </div>
                <div className="banner mt-4">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg"
                    alt="banner"
                    className="cursor w-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-9 productrow">
              <div className="d-flex align-items-center justify-content-between">
                <div className="info w-75 ">
                  <h3 className="mb-0 hd">Popular Products</h3>
                  <p className="text-color text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <Button className="view-allbtn ml-auto ">
                  View All <FaArrowRight />
                </Button>
              </div>
              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {featuredprod?.length !== 0 && featuredprod?.map((item, index) => {
                    <SwiperSlide>
                    <Link to="/product/:id" className={` productitem ${props.itemview} `}>
                      <div className="imgwrapper">
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.images[0]}`}
                          alt="product"
                          className="w-100"
                        />
                        <div className="actions">
                            <Button onClick={()=>viewproductdetails(1)}>
                              <BsArrowsFullscreen />
                            </Button>
                            <Button>
                              <CiHeart style={{fontSize:"20px"}} />
                            </Button>
                          </div>
                        </div>
                        <div className="info">
                          <h4>{item.name}</h4>
                          <span className="text-success d-block">In Stock</span>
                          <Rating
                            className="mt-2 mb-2"
                            name="half-rating-read"
                            defaultValue={item.rating}
                            // precision={0.5}
                            size="small"
                            value={item.rating}
                            readOnly
                          />
                          <div className="d-flex">
                            <span className="oldprice">Rs {item.oldprice}</span>
                            <span className="newprice text-danger">Rs {item.price}</span>
                          </div>
                          <span className="badge badge-primary">28%</span>
                          
                        </div>
                  </Link>
                    </SwiperSlide>
                  })}
                  
                </Swiper>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-4">
                <div className="info w-75 ">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-color text-sml mb-0">
                    New products with updated stocks.
                  </p>
                </div>
                <Button className="viewallbtn ml-auto ">
                  View All <FaArrowRight />
                </Button>
              </div>
              <div className="product_row productrow2 w-100 mt-4 d-flex">
                <Productitem />
                <Productitem />
                <Productitem />
                <Productitem />
                <Productitem />
                <Productitem />
                <Productitem />
                <Productitem />
              </div>
              <div className="d-flex mt-4 ml-2">
                <div className="banner">
                  <img src={banner3} alt="banner" className="cursor w-100" />
                </div>
                <div className="banner">
                  <img src={banner4} alt="banner" className="cursor w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="newsletter mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6">
              <p className="text-white mb-1">$20 discount for your first order</p>
              <h3 className="text-white">Join our newsletter and get...</h3>
              <p className="text-light">
                Join our email subscription now to get updates on <br/>
                promotions and coupons.
              </p>

              <form>
                <CiMail />
                <input type="text" placeholder="Your Email Address"/>
                <Button>Subscribe</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={newsletter} alt="newsletter"/>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Homeproducts;
