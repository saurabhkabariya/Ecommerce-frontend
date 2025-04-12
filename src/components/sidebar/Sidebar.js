import React, { useContext, useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Productitem from '../productitem/productitem';
import { MyContext } from '../../App';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { fetchdatafromapi } from '../../utils/api';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';

const Sidebar = (props) => {
    const [value, setvalue] = useState([0,60000])
    const [radiovalue, setradiovalue] = React.useState('');
    const [subcatid, setsubcatid] = React.useState('');
    const [filtersubcat, setfiltersubcat] = React.useState('');

    const context=useContext(MyContext);

    const {id}=useParams();

    useEffect(()=>{
        setsubcatid(id);
    },[id])

    const handleChange = (event) => {
        setradiovalue(event.target.value);
        setfiltersubcat(event.target.value);
      };

    const filterbysubcat=(subcatid)=>{
        props.filterdata(subcatid);
        setsubcatid(subcatid);
    }
  

    useEffect(()=>{
        props.filterbyprice(value,subcatid);
    },[value])

    const filterbyratting=(rating)=>{
        props.filterbyrating(rating);
    }

    
  return (
      <div className='sidebar'>
        <div className='filterbox'>
            <h6>PRODUCT CATEGORIES</h6>
            <div className='scroll'>
                <ul className='checks'>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    value={radiovalue}
                    onChange={handleChange}
                >
                    {context.categorydata?.length > 0 && context.categorydata?.map((item,index)=>{
                        return(<li key={index}><FormControlLabel value={item?.name} className='w-100' control={<Radio onChange={()=>{filterbysubcat(item._id)}} />} label={item.name} /></li>)
                    })}
                </RadioGroup>
                </ul>
            </div>
        </div>
        <div className='filterbox'>
            <h6>FILTER BY PRICE</h6>
            <RangeSlider value={value} onInput={setvalue} min={0} max={60000} step={5}/>
            <div className='d-flex pt-2 pb-2 pricerange'>
                <span>From: <strong className='text-dark'>Rs {value[0]}</strong></span>
                <span className='filterprice'> From: <strong className='text-dark'>Rs {value[1]}</strong></span>

            </div>
        </div>
        {/* <div className='filterbox'>
            <h6>PRODUCT STATUS</h6>
            <div className='scroll'>
                <ul className='checks'>
                    <li><FormControlLabel className='w-100' control={<Checkbox />} label="In Stock" /></li>
                    <li><FormControlLabel className='w-100' control={<Checkbox />} label="On Sale" /></li>
                </ul>
            </div>
        </div> */}
        <div className='filterbox'>
            <h6>BRANDS</h6>
            <div className='scroll'>
                <ul className='checks'>
                    {/* {context.proddata?.length > 0 && context.proddata.map((item,index)=>{
                        return(<li key={index}><FormControlLabel className='w-100' control={<Checkbox />} label={item.brand} /></li>)
                    })} */}
                    
                <li onClick={()=>{filterbyratting(5)}}><Rating name="read-only" size="small" value={5} readOnly /></li>
                <li onClick={()=>{filterbyratting(4)}}><Rating name="read-only" size="small" value={4} readOnly /></li>
                <li onClick={()=>{filterbyratting(3)}} ><Rating name="read-only" size="small" value={3} readOnly /></li>
                <li onClick={()=>{filterbyratting(2)}} ><Rating name="read-only" size="small" value={2} readOnly /></li>
                <li onClick={()=>{filterbyratting(1)}} ><Rating name="read-only" size="small" value={1} readOnly /></li>
                    
                </ul>


            </div>
        </div>
        {/* <div className='filterbox'>
            <h6>FEATURED PRODUCT</h6>
            <Productitem/>
        </div> */}
      </div>
  )
}

export default Sidebar
