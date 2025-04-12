import React, { useContext, useEffect, useRef, useState } from 'react'
import Homebanner from '../../components/homebanner/homebanner'
// import Homeproducts from '../../components/homeproducts/homeproducts'
import { fetchdatafromapi, postdata } from '../../utils/api'

import Homecat from "../../components/homecat/homecat";
import { MyContext } from '../../App';


import banner1 from "../../assets/images/Screenshot (209).png";
import Button from "@mui/material/Button";
import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// import Productitem from "../productitem/productitem";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import newsletter from "../../assets/images/newsletter.png";
import { CiMail } from "react-icons/ci";

import { Tab, Tabs } from '@mui/material';
import Productitem from '../../components/productitem/productitem';

const Home = (props) => {


  const [catdata, setcatdata] = useState([]);
  const [proddata, setproddata] = useState([]);
  const [featuredprod, setfeaturedprod] = useState([]);
  const [choosencat, setchoosencat] = useState([]);
  const [selectedcat, setselectedcat] = useState("");
  const [filterdata, setfilterdata]= useState([]);
  const [location, setlocation]=useState(localStorage.getItem("location"));

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const context=useContext(MyContext);

  useEffect(()=>{
    setlocation(localStorage.getItem("location"));
    // if(location!=="All" && location !== null && location !== undefined){
    // fetchdatafromapi(`/api/products?catname=${selectedcat}&location=${location}`).then((res)=>{
    //   if(res.length !== 0){
    //     setfilterdata(res.ProductList);
    //   }
      
    // })
    // }
    setTimeout(() => {
      fetchdatafromapi(`/api/products?catname=${selectedcat}&location=${location}`).then((res)=>{
        if(res.length !== 0){
          setfilterdata(res.ProductList);
        }
        
      })
    }, 100);
  },[selectedcat,location])


  useEffect(()=>{
    window.scrollTo(0,0);

    context.setisheaderfootershow(true);

    setselectedcat(context.categorydata[0]?.name);

    setlocation(localStorage.getItem("location"));

        if(location!=="" && location !== null && location !== undefined){
      
          fetchdatafromapi(`/api/products/featured?location=${location}`).then((res)=>{
            if(res.length !== 0){
              setfeaturedprod(res);
            }
            
          })
      
      
          fetchdatafromapi(`/api/products?perpage=8&location=${location}`).then((res)=>{
            if(res.length !== 0){
              // setproddata(res);
              setproddata(res.ProductList);
            }
            
            fetchdatafromapi('/api/category').then((res)=>{
              setcatdata(res.categorylist);
              setselectedcat(res.categorylist[0]?.name);
          })

          fetchdatafromapi(`/api/products?catname=${selectedcat}&location=${location}`).then((res)=>{
            if(res.length !== 0){
              setfilterdata(res.ProductList);
            }
            
          })
  
      })
        }
        else{
          
      
          fetchdatafromapi(`/api/products/featured`).then((res)=>{
            if(res.length !== 0){
              setfeaturedprod(res);
            }
            
          })
      
          fetchdatafromapi(`/api/products?perpage=12&&catname=Electronics`).then((res)=>{
            if(res.length !== 0){
              setchoosencat(res.ProductList);
            }
            
          })
      
          fetchdatafromapi(`/api/products?perpage=12`).then((res)=>{
            if(res.length !== 0){
              // setproddata(res);
              setproddata(res.ProductList);
            }
            
  
      })

        }

  },[])

  useEffect(() => {
    if (context.categorydata?.length > 0) {
      setselectedcat(context.categorydata[0].name);
    }
  }, [context.categorydata]);
  


  const selectcat=(cat)=>{
    setselectedcat(cat);
  }
  


  return (
    <div>
      <Homebanner/>
      {catdata?.length !== 0 && <Homecat catdata={catdata}/>}
      
      <div>
      

      <section className="homeproducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner">
                  <img src={banner1} alt="banner" className="home-banner cursor" />
                </div>
                <div className="banner banner2 res-mt-0">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg"
                    alt="banner"
                    className="home-banner cursor"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-9 productrow">
              <div className="d-flex align-items-center justify-content-between">
                <div className="info w-75 ">
                  <h3 className="mb-0 hd">Featured Products</h3>
                  <p className="text-color text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <Button className="view-allbtn ml-auto ">
                  View All <FaArrowRight />
                </Button>
              </div>
              <div className="product_row mt-4 featureprod">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={5}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper home-swiper res-show"
                  style={{display:"none"}}
                >
                  {featuredprod?.length !== 0 && featuredprod?.map((item, index) => {
                    return(
                      <SwiperSlide key={index}>
                      <Productitem proddata={item}/>
                      </SwiperSlide>
                    )
                    
                  })}


                  
                </Swiper>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper home-swiper res-hide"
                >
                  {featuredprod?.length !== 0 && featuredprod?.map((item, index) => {
                    return(
                      <SwiperSlide key={index}>
                      <Productitem proddata={item}/>
                      </SwiperSlide>
                    )
                    
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

              {proddata?.length !== 0 && proddata?.map((item, index) => {
                    return(
                    <Productitem proddata={item}/>
                    )
                    
                  })}


              </div>
<div className="d-flex align-items-center justify-content-between mt-4">
                <div className="info w-75 ">
                  <h3 className="mb-0 hd">Filter Products</h3>
                  <p className="text-color text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>

                  <div className='ml-auto'>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    {context.categorydata?.length > 0 && context.categorydata?.map((item,index)=>{
                    return(<Tab label={item.name} onClick={()=>{selectcat(item.name)}} />)
                    })}

                  </Tabs>
                </div>
                </div>
                
              </div>
              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={10}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper home-swiper res-show"
                  style={{display:"none"}}
                >
                  {filterdata?.length !== 0 ? filterdata?.map((item, index) => {
                    return(
                      <SwiperSlide key={index}>
                      <Productitem proddata={item}/>
                    </SwiperSlide>
                    )
                    
                  }) : <h4 className='text-left fw-bold ml-4'>No Products Found</h4>}
                  
                </Swiper>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper home-swiper res-hide"
                >
                  {filterdata?.length !== 0 ? filterdata?.map((item, index) => {
                    return(
                      <SwiperSlide key={index}>
                      <Productitem proddata={item}/>
                    </SwiperSlide>
                    )
                    
                  }) : <h4 className='text-left fw-bold ml-4'>No Products Found</h4>}
                  
                </Swiper>
              </div>
              <div className="d-flex mt-4 ml-2 justify-content-between">
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
            <div className="col-md-6 res-up">
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
            <div className="col-md-6 res-behind res-dull">
              <img src={newsletter} alt="newsletter"/>
            </div>

          </div>
        </div>
      </section>
      
    </div>
    </div>
  )
}

export default Home
