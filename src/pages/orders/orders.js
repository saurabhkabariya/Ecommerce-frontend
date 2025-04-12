import React, { useContext, useEffect, useState } from 'react'
import { fetchdatafromapi } from '../../utils/api';
import { Button, Dialog, Pagination } from '@mui/material';
import { MyContext } from '../../App';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orderdata, setorderdata] = useState([])
  const [productdata, setproductdata] = useState([])
  const [page, setpage] = useState(1)


  const context=useContext(MyContext);

  const history=useNavigate();

  useEffect(()=>{
    window.scrollTo(0,0);
      const userdata=JSON.parse(localStorage.getItem("user"));

      if(!userdata){
        context.setislogin(false);
        history('/signin')
      }


    fetchdatafromapi(`/api/orders?page=1&perpage=8`).then((res)=>{
      setorderdata(res);
    })
  },[])

  const handlechange = (event, value)=>{
        setpage(value)
        fetchdatafromapi(`/api/orders?page=${value}&perpage=8`).then((res)=>{
          setorderdata(res);
          window.scrollTo({
            top: 200,
            behavior: 'smooth'
          })
        })
        
      }

      const openorderproducts=(id)=>{
        fetchdatafromapi(`/api/orders/${id}`).then((res)=>{
          setproductdata(res);
          context.setopenOrderProductModal(true)
        })
      }

      

  return (
    <>
    <section className='section'>
      <div className='container'>
        <h4 className='hd'>Orders</h4>
      <div className='table-responsive'>
        <table className='table table-striped rounded ordertable table-bordered'>
          <thead className='thead-light'>
            <tr>
              <th>Payment ID</th>
              <th>Products</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>ZIP code</th>
              <th>Total Amount</th>
              <th>Email</th>
              <th>User ID</th>
              <th>Order Status</th>
              <th>Date</th>
            </tr>
          </thead>
            {orderdata?.orderslist?.length > 0 && orderdata?.orderslist?.map((item,index)=>{
              return(
              <tbody>
            <tr key={index}>
              <td><span className='text-blue fw-bold'>{item.paymentid}</span></td>
              <td><Button className='cursor rounded btn-blue' onClick={()=>openorderproducts(item._id)}>Click Here To View</Button></td>
              <td>{item.name}</td>
              <td>{item.phonenumber}</td>
              <td>{item.address}</td>
              <td>{item.zipcode}</td>
              <td>{item.amount}</td>
              <td>{item.email}</td>
              <td>{item.userid}</td>
              <td>{item?.status === "pending" ? <span className='badge badge-danger p-2' >{item?.status}</span> : <span className='badge badge-success p-2' >{item?.status}</span>}</td>
              <td>{item.date}</td>
            </tr>

            </tbody>
            )
            })}
        </table>

        {orderdata?.totalpages > 1 && orderdata?.map((item,index)=>{
          return(
            <div className="d-flex align-items-center tablefooter" key={index}>
                                        <Pagination
                                          count={item?.totalpages}
                                          color="primary"
                                          className="pagination"
                                          showFirstButton
                                          showLastButton
                                          onChange={handlechange}
                                        />
                                      </div>
          )
        })}

        
      </div>
      </div>

    </section>
    {context.openOrderProductModal &&
    <Dialog
            className="productmodal"
            open={true}
            onClose={()=>context.setopenOrderProductModal(false)}
          >
            <Button className="close_" onClick={()=>context.setopenOrderProductModal(false)}>
              <IoMdClose />
            </Button>
            <h4 className='hd mt-3 fw-bold'>Products</h4>
            <div className='table-responsive mt-3'>
            {/* {orderdata?.orderslist?.length > 0 && orderdata?.orderslist?.map((item,index)=>{
              return( */}
            <table className='table table-striped rounded ordertable table-bordered' >
              <thead>
              <tr>
                    <th>Product ID</th>
                    <th>Product Title</th>
                    <th>Product Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
              </tr>


              </thead>
              <tbody>

              
              
                  {productdata?.products?.length>0 && productdata?.products?.map((product,index)=>{
                    return(
                      <tr className='order-products' key={index}>
                        <td>{product.productid}</td>
                        <td>{product.producttitle}</td>
                        <td><img className='w-100 box-shadow' src={`${process.env.REACT_APP_BASE_URL}/uploads/${product.image}`}/></td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.subtotal}</td>
                      </tr>
                    )
                   })} 

              </tbody>
            </table>
                {/* )})} */}
            </div>
    </Dialog>
    }
    </>
  )
}

export default Orders
