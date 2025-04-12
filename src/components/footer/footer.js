import React from 'react'
import { IoShirtOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";

const footer = () => {
  return (
    <footer>
        <div className='container'>
            <div className='topinfo row res-auto'>
                <div className='col d-flex align-items-center res-col'>
                    <span><IoShirtOutline /></span>
                    <span className='ml-2'>Everyday fresh products</span>
                </div>
                <div className='col d-flex align-items-center res-col'>
                    <span><CiDeliveryTruck /></span>
                    <span className='ml-2'>Free delivery for order over $70</span>
                </div>
                <div className='col d-flex align-items-center res-col'>
                    <span><CiDiscount1 /></span>
                    <span className='ml-2'>Daily Mega Discounts</span>
                </div>
                <div className='col d-flex align-items-center res-col'>
                    <span><CiBadgeDollar /></span>
                    <span className='ml-2'>Best price on the market</span>
                </div>
                
            </div>

            <div className='row mt-5 linkswrap'>
                <div className='col'>
                    <h5>FRUIT & VEGETABLES</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                    </ul>
                </div>
                <div className='col'>
                    <h5>BREAKFAST & DAIRY</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                    </ul>
                </div>
                <div className='col'>
                    <h5>MEAT & SEAFOOD</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                    </ul>
                </div>
                <div className='col'>
                    <h5>BEVERAGES</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                    </ul>
                </div>
                <div className='col'>
                    <h5>BREADS & BAKERY</h5>
                    <ul>
                        <li><Link to="#">Fresh Vegetables</Link></li>
                        <li><Link to="#">Herbs & Seasonings</Link></li>
                        <li><Link to="#">Fresh Fruits</Link></li>
                        <li><Link to="#">Cuts & Sprouts</Link></li>
                        <li><Link to="#">Exotic Fruits & Veggies</Link></li>
                        <li><Link to="#">Packaged Produce</Link></li>
                        <li><Link to="#">Party Trays</Link></li>
                    </ul>
                </div>
            </div>

            <div className='copyright mt-3 pb-3 pt-3 d-flex align-items-center'>
                <p className='mb-0'>Copyright 2024. All rights reserved</p>
                <ul className='list list-inline ml-auto mb-0 d-flex socials '>
                    <li className='list-inline-item'>
                        <Link to="#"><FaSquareFacebook /></Link>
                    </li>
                    <li className='list-inline-item'>
                        <Link to="#"><FaSquareXTwitter /></Link>
                    </li>
                    <li className='list-inline-item'>
                        <Link to="#"><RiInstagramFill /></Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default footer
