import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { fetchdatafromapi } from '../../utils/api'

const Homebanner = () => {
  
    const [homebannerlist, sethomebannerlist] = useState([]);

    useEffect(()=>{
      fetchdatafromapi("/api/homebanner").then((res) => {
        sethomebannerlist(res);
      });
    },[])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 1500,
        nextArrow: <MdNavigateNext />,
        prevArrow: <MdNavigateBefore />,
      };


  return (
    <div className="container mt-3">
      <div className='homebannersection'>
      <Slider {...settings}>
      {homebannerlist?.length > 0 && homebannerlist?.map((item,index) => {
        return(
          <div className="item" key={index}>
            <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.images[0]}`} alt="banner" className="w-100" />
          </div>
        )
      })}
    </Slider>
      </div>
    </div>
  )
}

export default Homebanner
