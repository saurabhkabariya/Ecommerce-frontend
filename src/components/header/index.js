import React, { useContext, useState } from 'react'
import Logo from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from '@mui/icons-material/Logout';

import Down from '../countrydrop/down'
import Searchbox from './searchbox/searchbox'
import Nav from '../navigation/navigation'
import Button from '@mui/material/Button';
import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { MyContext } from '../../App'
import { Menu, MenuItem } from '@mui/material'
import { FaClipboardCheck, FaHeart } from 'react-icons/fa6';


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const history=useNavigate();
    const openmyacc = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClosemyacc = () => {
        setAnchorEl(null);
    };

      const logout=()=>{
        setAnchorEl(null);
        context.setuser({
          name:"",
          email:"",
          userid:""
        })
        localStorage.clear();
        context.setislogin(false);
        context.setalertbox({
          open:true,
          color:"success",
          msg:"User logout Successfully!"
        })

        setTimeout(()=>{
          history("/signin");
        },1000);

      }


    const context=useContext(MyContext)
  return (
    <div>
        <div className='header-wrapper'>
            <div className='top-strip bg-purple'>
                <div className='container'>
                    <p className='mb-0 mt-0 text-center'>“Pick What You Love, Buy With Assurance – <b>Pick N Buy</b> Delivers Trust With Every Click.”</p>
                </div>
            </div>
                <header className='header'>
                    <div className='container'>
                        <div className='row res-row'>
                            <div className='logo-wrapper d-flex align-items-center col-sm-2'>
                                <Link to={'/'}> <img src={Logo} alt='logo'/> </Link>
                            </div>
                            <div className='part3 align-items-center ml-auto res-flex res-right' style={{display:"none"}}>
                                    {context.islogin!==true ? <Link to="/signin"><Button className='btn-blue btn-big btn-round'>Sign In</Button></Link> : 
                                    <Button className='circle mr-3'>
                                        <FiUser onClick={handleClick} />
                                        <Menu
                                                anchorEl={anchorEl}
                                                id="account-menu"
                                                open={openmyacc}
                                                onClose={handleClosemyacc}
                                                onClick={handleClosemyacc}
                                                slotProps={{
                                                  paper: {
                                                    elevation: 0,
                                                    sx: {
                                                      overflow: "visible",
                                                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                      mt: 1.5,
                                                      "& .MuiAvatar-root": {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                      },
                                                      "&::before": {
                                                        content: '""',
                                                        display: "block",
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "background.paper",
                                                        transform: "translateY(-50%) rotate(45deg)",
                                                        zIndex: 0,
                                                      },
                                                    },
                                                  },
                                                }}
                                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                              >
                                                <Link to="/myaccount">
                                                <MenuItem onClick={handleClosemyacc}>
                                                  <ListItemIcon>
                                                    {/* <PersonAdd fontSize="small" /> */}
                                                    <div className='rounded-circle profile-logo' style={{marginLeft:"-4px"}}>
                                                        {context.user.name.charAt(0)}
                                                    </div>
                                                  </ListItemIcon>
                                                  My account
                                                </MenuItem>
                                                </Link>
                                                <Link to="/orders">
                                                <MenuItem onClick={handleClosemyacc}>
                                                  <ListItemIcon>
                                                    
                                                    <FaClipboardCheck fontSize="large"/>
                                                  </ListItemIcon>
                                                  Orders
                                                </MenuItem>
                                                </Link>
                                                <Link to="/mylist"><MenuItem onClick={handleClosemyacc}>
                                                  <ListItemIcon>
                                                    <FaHeart fontSize="large"/>
                                                  </ListItemIcon>
                                                  My WishList
                                                </MenuItem></Link>
                                                <MenuItem onClick={logout}>
                                                  <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                  </ListItemIcon>
                                                  Logout
                                                </MenuItem>
                                              </Menu>
                                    </Button>}
                                    
                                    
                                    <div className='ml-auto carttab d-flex align-items-center'>
                                        <span className='price'>Rs. 
                                        {
                                          context.cartdata?.length!==0 && context.cartdata?.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0)
                                        }
                                        {
                                          context.cartdata?.length===0 && 0
                                        }
                                        </span>
                                        <div className='position-relative ml-2'>
                                            <Link to='/cart'><Button className='circle '><IoCartOutline /></Button></Link>
                                        <span className='count d-flex align-items-center justify-content-center'>{context.cartdata?.length}</span>
                                        </div>
                                    </div>
                                    
                            </div>
                            <div className='part-2 align-items-center col-sm-10 res-auto'>
                                {
                                    context.countryList.length!==0 && <Down/>
                                }
                                <Searchbox/>
                                
                                <div className='part3 align-items-center ml-auto res-hide'>
                                    {context.islogin!==true ? <Link to="/signin"><Button className='btn-blue btn-big btn-round'>Sign In</Button></Link> : 
                                    <Button className='circle mr-3'>
                                        <FiUser onClick={handleClick} />
                                        <Menu
                                                anchorEl={anchorEl}
                                                id="account-menu"
                                                open={openmyacc}
                                                onClose={handleClosemyacc}
                                                onClick={handleClosemyacc}
                                                slotProps={{
                                                  paper: {
                                                    elevation: 0,
                                                    sx: {
                                                      overflow: "visible",
                                                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                      mt: 1.5,
                                                      "& .MuiAvatar-root": {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                      },
                                                      "&::before": {
                                                        content: '""',
                                                        display: "block",
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "background.paper",
                                                        transform: "translateY(-50%) rotate(45deg)",
                                                        zIndex: 0,
                                                      },
                                                    },
                                                  },
                                                }}
                                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                              >
                                                <Link to="/myaccount">
                                                <MenuItem onClick={handleClosemyacc}>
                                                  <ListItemIcon>
                                                    {/* <PersonAdd fontSize="small" /> */}
                                                    <div className='rounded-circle profile-logo' style={{marginLeft:"-4px"}}>
                                                        {context.user.name.charAt(0)}
                                                    </div>
                                                  </ListItemIcon>
                                                  My account
                                                </MenuItem>
                                                </Link>
                                                <Link to="/orders">
                                                <MenuItem onClick={handleClosemyacc}>
                                                  <ListItemIcon>
                                                    
                                                    <FaClipboardCheck fontSize="large"/>
                                                  </ListItemIcon>
                                                  Orders
                                                </MenuItem>
                                                </Link>
                                                <Link to="/mylist"><MenuItem onClick={handleClosemyacc}>
                                                  <ListItemIcon>
                                                    <FaHeart fontSize="large"/>
                                                  </ListItemIcon>
                                                  My WishList
                                                </MenuItem></Link>
                                                <MenuItem onClick={logout}>
                                                  <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                  </ListItemIcon>
                                                  Logout
                                                </MenuItem>
                                              </Menu>
                                    </Button>}
                                    
                                    
                                    <div className='ml-auto carttab d-flex align-items-center'>
                                        <span className='price'>Rs. 
                                        {
                                          context.cartdata?.length!==0 && context.cartdata?.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0)
                                        }
                                        {
                                          context.cartdata?.length===0 && 0
                                        }
                                        </span>
                                        <div className='position-relative ml-2'>
                                            <Link to='/cart'><Button className='circle '><IoCartOutline /></Button></Link>
                                        <span className='count d-flex align-items-center justify-content-center'>{context.cartdata?.length}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {context.categorydata?.length!==0 && <Nav navdata={context.categorydata}/>}

                

        </div>
    </div>
  )
}

export default Header
