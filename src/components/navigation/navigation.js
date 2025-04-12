import { React, useState } from "react";
import Button from "@mui/material/Button";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

const Nav = (props) => {
  const [isopensidebarVal, setisopensidebarVal] = useState(false);

  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="navpart1 col-sm-3 res-right res-auto">
            <div className="catWrapper">
              <Button
                className="allcattab align-items-center "
                onClick={() => {
                  setisopensidebarVal(!isopensidebarVal);
                }}
              >
                <span className="icon1 mr-2">
                  <IoMdMenu />
                </span>
                <span className="text">All Categories</span>
                <span className="icon2 ml-2">
                  <FaAngleDown />
                </span>
              </Button>

              <div
                className={`sidebarNav ${
                  isopensidebarVal === true ? "open" : ""
                }`}
              >
                <ul>
              {props.navdata?.length > 0 && props.navdata.map((item,index)=>{
                return(
                  <li className="list-inline-item" key={index}>
                <Link to={`/category/${item._id}`}>
                  <Button>{item?.name}</Button>
                </Link>
                <div className="submenu shadow" key={index}>
                {item?.children?.length > 0 && item?.children?.map((item,index)=>{
                  return(
                    
                      
                      <Link to={`/subcat/${item._id}`} key={index}>
                        <Button>{item.name}</Button>
                      </Link>
                    
                  )
                })}
                </div>
                
              </li>
                )
              })}
                  {/* <li>
                    <Link to="/">
                      <Button>Electronics < MdNavigateNext className="ml-auto" /></Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Mobiles</Button>
                      </Link>
                      <Link to="/">
                        <Button>Laptops</Button>
                      </Link>
                      <Link to="/">
                        <Button>Smart Watches</Button>
                      </Link>
                      <Link to="/">
                        <Button>Cameras</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Stationary < MdNavigateNext className="ml-auto" /></Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Books</Button>
                      </Link>
                      <Link to="/">
                        <Button>Pens</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Backery</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Grocery</Button>
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="navpart2 col-sm-9 align-items-center res-hide">
            <ul className="list list-inline ml-auto">
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </li>
              {props.navdata?.length > 0 && props.navdata.filter((_, index) => index < 7).map((item,index)=>{
                return(
                  <li className="list-inline-item" key={index}>
                    <Link to={`/category/${item._id}`}>
                      <Button>{item?.name}</Button>
                    </Link>
                    
                    <div className="submenu shadow">
                    {item?.children?.length > 0 && item?.children?.map((item,index)=>{
                      return(
                          <Link to={`/subcat/${item._id}`} key={index}>
                            <Button>{item.name}</Button>
                          </Link>
                      )
                    })}
                    </div>
                  </li>
                )
              })}
              
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Blog</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Contact</Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
