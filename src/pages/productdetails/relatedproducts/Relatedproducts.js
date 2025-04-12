import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Productitem from '../../../components/productitem/productitem';

const Relatedproducts = (props) => {
    
  return (
    <div className='mt-5'>
      <h4 className='producttext'>RELATED PRODUCTS</h4>
      <div className="product_row w-100 mt-2">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={5}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper res-show"
                  style={{display:"none"}}
                >
                  {props.relatedproddata?.length > 0 && props.relatedproddata?.map((proddata,index)=>{
                    return(
                      <SwiperSlide key={index}>
                        <Productitem proddata={proddata}/>
                      </SwiperSlide>
                    )
                  })}
                  
                  
                </Swiper>
                <Swiper
                  slidesPerView={5}
                  spaceBetween={10}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper res-hide"
                >
                  {props.relatedproddata?.length > 0 && props.relatedproddata?.map((proddata,index)=>{
                    return(
                      <SwiperSlide key={index}>
                        <Productitem proddata={proddata}/>
                      </SwiperSlide>
                    )
                  })}
                  
                  
                </Swiper>
              </div>
    </div>
  )
}

export default Relatedproducts
