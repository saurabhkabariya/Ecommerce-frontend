import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/index';
import Header from './components/header/index';
import Footer from "./components/footer/footer";
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Productmodal from './components/productmodal/productmodal';
import Listing from './pages/listing/Listing';
import Productdetails from './pages/productdetails/Productdetails';
import Cart from './pages/cart/Cart';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import { fetchdatafromapi, postdata } from './utils/api';
import { Alert, Snackbar } from '@mui/material';
import Mylist from './pages/mylist/mylist';
import Checkout from './pages/checkout/checkout';
import Orders from './pages/orders/orders';
import Search from './pages/search/Search';
import Myaccount from './pages/myaccount/Myaccount';
import Verifyotp from './pages/verifyotp/Verifyotp';


const MyContext=createContext();

function App() {
  
  const [openProductModal, setopenProductModal] = useState({
    id:'',
    open:false
  })
  const [openOrderProductModal, setopenOrderProductModal] = useState(false)
  const [countryList, setcountryList] = useState([])
  const [selectedCountry, setselectedCountry] = useState('')
  const [isheaderfootershow, setisheaderfootershow] = useState(true)
  const [islogin, setislogin] = useState(false)
  const [productdata, setproductdata] = useState([])
  const [categorydata, setcategorydata] = useState([])
  const [subcategorydata, setsubcategorydata] = useState([])
  const [proddata, setproddata] = useState([])
  const [cartdata, setcartdata] = useState([])
  const [mylistdata, setmylistdata] = useState([])
  const [searchdata, setsearchdata] = useState([])


  let [addingincart, setaddingincart] = useState(false)
  const [alertbox, setalertbox] = useState({
      msg:'',
      color:'',
      open:false
    });

  const [user, setuser] = useState({
      name:"",
      email:"",
      userid:""
    });

  useEffect(() => {
    fetchdatafromapi(`/api/products/${openProductModal.id}`).then((res)=>{
      setproductdata(res);
    })
  },[openProductModal])

  useEffect(()=>{
      const token=localStorage.getItem("token");
      if (token !== null && token!==""){
        setislogin(true);
        const userdata=JSON.parse(localStorage.getItem("user"));
        setuser(userdata);
      }
      else{
        setislogin(false);
      }
    },[islogin])
  

  useEffect(() => {

    const userdata=JSON.parse(localStorage.getItem("user"));
    

    getCountry('https://countriesnow.space/api/v0.1/countries/')

    fetchdatafromapi('/api/category').then((res)=>{
      setcategorydata(res.categorylist);
    })

    fetchdatafromapi('/api/subcat').then((res)=>{
      setsubcategorydata(res.subcatlist);
    })
    fetchdatafromapi('/api/products').then((res)=>{
      setproddata(res.ProductList);
    })


    fetchdatafromapi(`/api/cart?userid=${userdata?.id}`).then((res)=>{
          setcartdata(res);
          
        })

    fetchdatafromapi(`/api/mylist?userid=${userdata?.id}`).then((res)=>{
          setmylistdata(res);
        })

        // const location=localStorage.getItem("location");

        // if(location!=="" && location !== null && location !== undefined){
        //   setselectedCountry(location);
        // }

    const location = localStorage.getItem("location");
      if (!location || location === "null") {
        localStorage.setItem("location", "All");
        setselectedCountry("All");
      } else {
        setselectedCountry(location);
      }

  }, [])

  const getcartdata=()=>{
    const userdata=JSON.parse(localStorage.getItem("user"));
    fetchdatafromapi(`/api/cart?userid=${userdata?.id}`).then((res)=>{
      setcartdata(res);
    })
  }
  const getmylistdata=()=>{
    const userdata=JSON.parse(localStorage.getItem("user"));
    fetchdatafromapi(`/api/mylist?userid=${userdata?.id}`).then((res)=>{
      setmylistdata(res);
    })
  }

  const getCountry=async (url)=>{
    await axios.get(url).then((res)=>{
      setcountryList(res.data.data)
    })
  }
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

  setalertbox({
    open:false,
  });
  }

  const addtocart=(data)=>{
    // console.log(data);
    
    postdata(`/api/cart/add`, data).then((res) => {
      setaddingincart(true);
      getcartdata();
      if (res && res.status !== false) {
        setalertbox({
          open: true,
          color: "success",
          msg: "Item is added to the cart",
        });

        setTimeout(() => {
          setaddingincart(false);
        }, 1000);
      } else {
        setalertbox({
          open: true,
          color: "error",
          msg: res?.msg || "Product already added to the cart!",
        });
        setTimeout(() => {
          setaddingincart(false);
        }, 1000);
      }
    });
  }
    

  const values={
    countryList,
    selectedCountry,
    setselectedCountry,
    openProductModal,
    setopenProductModal,
    isheaderfootershow,
    setisheaderfootershow,
    islogin,
    setislogin,
    categorydata,
    setcategorydata,
    subcategorydata,
    setsubcategorydata,
    proddata,
    setproddata,
    alertbox,
    setalertbox,
    user,
    setuser,
    addtocart,
    setaddingincart,
    addingincart,
    cartdata,
    setcartdata,
    getcartdata,
    mylistdata,
    setmylistdata,
    getmylistdata,
    openOrderProductModal,
    setopenOrderProductModal,
    searchdata,
    setsearchdata,
  }

  return (
    
    <BrowserRouter>
    <MyContext.Provider value={values}>
      <Snackbar open={alertbox.open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={alertbox.color === "success" ? 'success' : 'error'}
                variant="filled"
                sx={{ width: '100%' }}
              >
                {alertbox.msg}
              </Alert>
            </Snackbar>
      {isheaderfootershow===true && <Header/>}
      
      <Routes>
        <Route path="/" exact={true} element={<Home/>} />
        <Route path="/category/:id" exact={true} element={<Listing/>} />
        <Route path="/subcat/:id" exact={true} element={<Listing/>} />
        <Route path="/search" exact={true} element={<Search/>} />
        <Route path="/product/:id" exact={true} element={<Productdetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/mylist" element={<Mylist/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/myaccount" element={<Myaccount/>} />
        <Route path="/verifyotp" element={<Verifyotp/>} />
      </Routes>

      {isheaderfootershow===true && <Footer/>}
      
      {openProductModal.open===true && <Productmodal productdata={productdata}/>}
    </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export {MyContext}