import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { PiCirclesFourFill } from "react-icons/pi";
import { PiDotsNineBold } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Productitem from "../../components/productitem/productitem";
import Pagination from '@mui/material/Pagination';
import { fetchdatafromapi } from "../../utils/api";
import { MyContext } from "../../App";

const Search = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productview, setproductview] = useState("two")
  const [proddata, setproddata] = useState([])
  const openDropdown = Boolean(anchorEl);
  const [showSidebar, setShowSidebar] = useState(false);

  const context=useContext(MyContext);

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  useEffect(()=>{
    window.scrollTo(0,0);

      setproddata(context.searchdata);
  },[context.searchdata]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterdata=(subcatid)=>{
    fetchdatafromapi(`/api/products?subcatid=${subcatid}`).then((res)=>{
      setproddata(res.ProductList);
      
    })

  }
  const filterbyprice=(price,subcatid)=>{
    
    fetchdatafromapi(`/api/products?minprice=${price[0]}&maxprice=${price[1]}&subcatid=${subcatid}`).then((res)=>{
      setproddata(res.ProductList);
    })
  }

  const filterbyrating=(rating)=>{
    fetchdatafromapi(`/api/products?rating=${rating}`).then((res)=>{
      setproddata(res.ProductList);
    })
  }

  return (
    <div>
      <div className="listingpage">
        <div className="container">
          <div className="productlisting d-flex">
          {/* <div className={`sidebar-container ${showSidebar ? 'res-show' : 'res-hide'}`}>
            <Sidebar
              filterdata={filterdata}
              filterbyprice={filterbyprice}
              filterbyrating={filterbyrating}
            />
          </div> */}

            {/* <Sidebar filterdata={filterdata} filterbyprice={filterbyprice} filterbyrating={filterbyrating} /> */}
            <div className="contentright res-auto res-flex-full">
              <div className="showby mt-3 mb-3 d-flex align-items-center">
                <div className="btnwrapper align-items-center res-show-flex" style={{display:"none"}}>
                  <Button className={productview==="one" && "act"} onClick={()=>setproductview("one")}>
                    <IoMdMenu />
                  </Button>
                  <Button className={productview==="two" && "act"} onClick={()=>setproductview("two")}>
                    <PiCirclesFourFill />
                  </Button>
                  {/* <Button className={productview==="four" && "act"} onClick={()=>setproductview("four")}>
                    <PiDotsNineBold />
                  </Button> */}
                </div>
                <div className="btnwrapper align-items-center res-hide">
                  <Button className={productview==="one" && "act"} onClick={()=>setproductview("one")}>
                    <IoMdMenu />
                  </Button>
                  <Button className={productview==="two" && "act"} onClick={()=>setproductview("two")}>
                    <PiCirclesFourFill />
                  </Button>
                  <Button className={productview==="four" && "act"} onClick={()=>setproductview("four")}>
                    <PiDotsNineBold />
                  </Button>
                </div>
                <div className="mobile-menu-toggle res-show" style={{display:"none"}}>
                  <Button onClick={() => setShowSidebar(!showSidebar)}>
                    <IoMdMenu size={24} />
                  </Button>
                </div>
                {/* <div className="ml-auto showbyfilter">
                  <Button onClick={handleClick}>
                    Show 10 <FaAngleDown className="showarrow" />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openDropdown}
                    onClose={handleClose}
                    className="w-100"
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>10</MenuItem>
                    <MenuItem onClick={handleClose}>20</MenuItem>
                    <MenuItem onClick={handleClose}>30</MenuItem>
                    <MenuItem onClick={handleClose}>40</MenuItem>
                    <MenuItem onClick={handleClose}>50</MenuItem>
                    <MenuItem onClick={handleClose}>60</MenuItem>
                  </Menu>
                </div> */}
              </div>
              <div className="productlisting">
                {
                  proddata?.length > 0 && proddata?.map((item,index)=>{
                    return(<Productitem key={index} itemview={productview} proddata={item}/>)
                  })
                }
                
              </div>
              {/* <div className="d-flex align-items-center justify-content-center mt-4">
                <Pagination count={10} color="primary" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
