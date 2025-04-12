import React, { useRef } from 'react'
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const Productzoom = (props) => {
    const zoomSliderBig = useRef();
    const zoomSlider = useRef();

    var settings1 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        Fade: false,
        arrows: false,
      };
    
      var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        Fade: false,
        arrows: true,
        autoplaySpeed: 1500,
        nextArrow: <MdNavigateNext />,
        prevArrow: <MdNavigateBefore />,
      };
    
      const goto = (index) => {
        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
      };
    

  return (
    <div className=''>
      <div className="productzoom position-relative">
              <div className="badge badge-primary">{props.productdata?.discount}%</div>
              <Slider
                {...settings1}
                className="zoomsliderbig"
                ref={zoomSliderBig}
              >
                {props.productdata?.images?.length > 0 && props.productdata.images.map((item, index) => {return(
                  <div className="item" key={index}>
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`${process.env.REACT_APP_BASE_URL}/uploads/${item}`}
                  />
                </div>
                )})}
                
              </Slider>
            </div>
            <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
            {props.productdata?.images?.length > 0 && props.productdata.images.map((item, index) => {return(
              <div className="item res-h-50px" key={index}>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${item}`}
                  alt="banner"
                  className="w-100 prodzoomimg"
                  onClick={() => goto(index)}
                />
              </div>
            )})}
              
            </Slider>

    </div>
  )
}

export default Productzoom
