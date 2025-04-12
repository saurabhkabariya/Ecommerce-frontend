// import axios from "axios";
// // import dotenv from "dotenv";
// // dotenv.config();
// require('dotenv/config');
// // "scripts": {
// //     "start": "react-scripts start",
// //     "build": "react-scripts build",
// //     "test": "react-scripts test",
// //     "eject": "react-scripts eject"
// //   },

// export const fetchdatafromapi=async(url)=>{
//     try{
//         const {data}=await axios.get(process.env.REACT_APP_BASE_URL+url);
//         return data;
//     }
//     catch(error){
//         console.log(error);
//         return error;
//     }
// }

// export const postdata=async(url,formdata)=>{
//     const API_BASE_URL = process.env.REACT_APP_BASE_URL;
//     const {res}=await axios.post(API_BASE_URL+url,formdata);
//     return res;
// }

// export const editdata=async(url,updateddata)=>{
//     const API_BASE_URL = process.env.REACT_APP_BASE_URL;
//     const {res}=await axios.put(`${API_BASE_URL}${url}`,updateddata);
//     return res;
// }

// export const deletedata=async(url,id)=>{
//     const API_BASE_URL = process.env.REACT_APP_BASE_URL;
//     const {res}=await axios.delete(`${API_BASE_URL}${url}${id}`);
//     return res;
// }

import axios from "axios";

// Fetch data from API
export const fetchdatafromapi = async (url) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Post data to API
export const postdata = async (url, formdata) => {
  try {
    // const token = localStorage.getItem("token");
    // console.log(formdata);
    
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`,formdata,{
      headers: { "Content-Type": "application/json" } 
    });
    // const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`, {
    //   method:"POST",
    //   headers:{
    //     'Content-Type':'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body:JSON.stringify(formdata)
    // });
    return data;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};

// Edit existing data
export const editdata = async (url, updateddata) => {
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`, updateddata);
    return data;
  } catch (error) {
    console.error("Error updating data:", error);
    return null;
  }
};

// Delete data
export const deletedata = async (url, id) => {
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
};
