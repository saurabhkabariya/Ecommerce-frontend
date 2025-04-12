import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import { IoMdSearch } from "react-icons/io";
import { fetchdatafromapi } from "../../../utils/api";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";


const Searchbox = () => {

  const [searchfields, setsearchfields] = useState("");

  const context=useContext(MyContext);

  const history=useNavigate();



  const onchangevalue = (e)=>{
    setsearchfields(e.target.value);
  }
  const searchproducts=()=>{
    fetchdatafromapi(`/api/search?q=${searchfields}`).then((res)=>{
      context.setsearchdata(res);
      history("/search");
    })
  }
  return (
      <div className="header-search ml-3 mr-3">
        <input type="text" placeholder="Search for products..." onChange={onchangevalue} value={searchfields} />
        <Button onClick={searchproducts}>
          <IoMdSearch />
        </Button>
      </div>
  );
};

export default Searchbox;
