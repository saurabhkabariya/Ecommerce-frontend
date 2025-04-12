import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useContext } from "react";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";

const Homecat = (props) => {

    const [catdata, setcatdata] = useState([])

    // const context=useContext(MyContext)

    useEffect(()=>{
        setcatdata(props.catdata);
    },[])
  return (
    <div>
      <section className="homecat">
        <div className="container">
        <h3 className="mb-2 hd">Featured Categories</h3>
          <Swiper
            slidesPerView={4}
            spaceBetween={5}
            navigation={true}
            slidesPerGroup={1}
            modules={[Navigation]}
            className="mySwiper res-show"
            style={{display:"none"}}
          >

            {catdata?.length !== 0 && catdata?.map((item, index) => {
                return (
                    <SwiperSlide key={index}>
                      <Link to={`/category/${item._id}`}>
                        <div className="item text-center box-shadow">
                            <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.images[0]}`} alt="banner"/>
                            <h6 className="mt-2">{item.name}</h6>
                        </div>
                      </Link>
                    </SwiperSlide>
                )
            })}
            
          </Swiper>
          <Swiper
            slidesPerView={10}
            spaceBetween={20}
            navigation={true}
            slidesPerGroup={1}
            modules={[Navigation]}
            className="mySwiper res-hide"
          >

            {catdata?.length !== 0 && catdata?.map((item, index) => {
                return (
                    <SwiperSlide key={index}>
                      <Link to={`/category/${item._id}`}>
                        <div className="item text-center box-shadow">
                            <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.images[0]}`} alt="banner"/>
                            <h6 className="mt-2">{item.name}</h6>
                        </div>
                      </Link>
                    </SwiperSlide>
                )
            })}
            
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Homecat;
