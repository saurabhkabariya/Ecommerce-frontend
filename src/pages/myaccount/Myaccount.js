import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { IoMdCloudUpload } from 'react-icons/io';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import { editdata, fetchdatafromapi, postdata } from '../../utils/api';
import { MdImageNotSupported } from 'react-icons/md';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Myaccount = () => {
    const [islogin,setislogin]=useState(false);
    const [isloading,setisloading]=useState(false);
    const [preview, setpreview] = useState([]);
    const [userdetails, setuserdetails] = useState([]);
    const [imgfiles, setimgfiles] = useState([]);
    const [images, setImages] = useState([]);
    const [isselectedfile, setisselectedfile] = useState(false);
    const [files, setfiles] = useState([]);
    const [pass,setpass]=useState("");
                
            
        
    
    const [formfield, setformfield] = useState({
        name:"",
        email:"",
        phone:"",
        images:[],
      });
    const [field, setfield] = useState({
        oldpassword:"",
        password:"",
        confirmpassword:"",
      });

    const context=useContext(MyContext);

    const userdata=JSON.parse(localStorage.getItem("user"));
    
    
    const id=userdata.id;

    const formdata=new FormData();

    useEffect(() => {
          if(!imgfiles) return;
          let tmp=[];
          for(let i=0;i<imgfiles.length;i++){
            tmp.push(URL.createObjectURL(imgfiles[i]))
          }
      
          const objurl=tmp;
          setpreview(objurl);
      
          for(let i=0;i<objurl.length;i++){
            return()=>{
              URL.revokeObjectURL(objurl[i]);
            }
          }
          
        }, [imgfiles])

    const history=useNavigate();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
     useEffect(()=>{

      window.scrollTo(0,0);

          const token=localStorage.getItem("token");
          if (token !== null && token!=="" && token!=undefined){
            setislogin(true);
          }
          else{
            setislogin(false);
            history("/signin")
          }

          fetchdatafromapi(`/api/user/${id}`).then((res)=>{
            
                  setuserdetails(res);
                  setpass(res.password)
                  
                  setformfield({
                    name:res.name,
                    email:res.email,
                    phone:res.phone
                  });
                  setpreview(res.images);
        })

      },[])
        const changeinput = (e) =>{
          setformfield(()=>({
            ...formfield,
            [e.target.name]:e.target.value,
            [e.target.phone]:e.target.value
          }))
        }
        const changeinput2 = (e) => {
          const { name, value } = e.target; // Get name and value from input field
          setfield((prevState) => ({
            ...prevState,
            [name]: value, // Update only the specific field
          }));
        };
        

        const onChangeFile = async (e, apiendpoint) => {
          try {
            const files = e.target.files;
            if (!files.length) return;
        
            const formData = new FormData(); // ✅ Ensure FormData is initialized
        
            for (let i = 0; i < files.length; i++) {
              const imgarr=[];
              let file = files[i];
        
              if (["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)) {
                setimgfiles(e.target.files);
                imgarr.push(file);
                formData.append("images", file); // ✅ Append files correctly
                setfiles(imgarr);
                setpreview(imgarr)
              } else {
                context.setalertbox({
                  open: true,
                  msg: "Please upload an image in JPEG, JPG, PNG, or WEBP format!",
                  color: "error",
                });
                return; // Stop execution if an invalid file is found
              }
            }
        
            setisselectedfile(true);
            context.setalertbox({ open: true, msg: "Image uploaded successfully!", color: "success" });
            
        
            // ✅ Send FormData correctly
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}${apiendpoint}`, {
              method: "POST",
              body: formData, 
            });
        
            const data = await res.json();
        
          } catch (error) {
            console.log("Error:", error);
          }
        };
        
        
            const removeImage = (index) => {
              setImages(images.filter((_, i) => i !== index));
            };
        
          const edituser = (e)=>{
            e.preventDefault();
            formdata.append('name',formfield.name);
            formdata.append('phone',formfield.phone);
        
            if(formfield.name!=="" && formfield.phone!==""){
              setisloading(true);
        
              
        
              editdata(`/api/user/${id}`,formfield).then((res)=>{
                setisloading(false);
                context.setalertbox({
                  open:true,
                  color:"success",
                  msg:"Profile updated successfully!"
                });
                // history("/");
              })
        
            }
        
            else{
              context.setalertbox({
                open:true,
                color:"error",
                msg:"Please fill all the details"
              });
              return false;
              // seterrorupload(true);
              // context.handleClickVariant('success');
            }
            // fetchdatafromapi("/api/category").then(res=>{
            //   console.log(res);
              
            // })
            
        
          }

          const changepassword=(e)=>{
            e.preventDefault();
            formdata.append("password",field.password);

            if(field.password!=="" && field.oldpassword!==""){

              if(field.password !==field.confirmpassword){
                context.setalertbox({
                  open:true,
                  color:"error",
                  msg:"Please confirm valid password!"
                });
                return false;
              }   
              else{
                setisloading(true);
  
                const userdata=JSON.parse(localStorage.getItem("user"));
  
                const data={
                  name:userdata?.name,
                  email:userdata?.email,
                  password:field.oldpassword,
                  newpass:field.password,
                  phone:formfield.phone,
                  images:formfield.images
                }
                editdata(`/api/user/${id}`,data).then((res)=>{
                  setisloading(false);
                    context.setalertbox({
                      open: true,
                      color: "success",
                      msg: "Password changed successfully!",
                    });
                  // history("/");
                })

              }
        
            }
        
            else{
              context.setalertbox({
                open:true,
                color:"error",
                msg:"Please fill all the fields!"
              });
              return false;
              // seterrorupload(true);
              // context.handleClickVariant('success');
            }

          }

  return (
    <section className='section myaccountpage'>
      <div className='container'>
        <h2 className='hd'>My Account</h2>
        <Box sx={{ width: '100%' }} className="myaccbox card border-0">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant= 'fullWidth'>
              <Tab label="Edit Profile" {...a11yProps(0)} />
              <Tab label="Change Password" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <form onSubmit={edituser}>
            <div className='row'>
              <div className='col-md-4 img-box'>
                <div className='userimage'>
                {preview?.length !== 0 ? preview.map((img, index) => (
                  <>
                  {
                    isselectedfile === true ? <img className='mx-auto' src={`${img}`} alt='profile-pic'/>
                  : <img className='mx-auto' src={`${process.env.REACT_APP_BASE_URL}/uploads/${img}`} alt='profile-pic'/>
                  }
                  </>
                ))
                :
                <MdImageNotSupported className='w-100 h-100' />
              
              }
                  <div className='overlay d-flex align-items-center justify-content-center'><IoMdCloudUpload />
                  <input type='file' 
                    multiple
                    onChange={(e) => onChangeFile(e,'/api/user/uploadfiles')} 
                    name="images"/>
                  </div>
                </div>
              </div>
              <div className='col-md-8'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='formgroup'>
                      <TextField label="Name" variant="outlined" className='w-100' name='name' onChange={changeinput} value={formfield.name} />
                    </div>

                  </div>
                  <div className='col-md-6'>
                    <div className='formgroup'>
                      <TextField label="Email" disabled variant="outlined" className='w-100' name='email' onChange={changeinput} value={formfield.email} />
                    </div>

                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='formgroup'>
                      <TextField label="Phone number" variant="outlined" className='w-100' name='phone' onChange={changeinput} value={formfield.phone} />
                    </div>

                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='formgroup'>
                      <Button className='btn-lg btn-big btn-blue w-50 font-lg' type='submit'>Update Profile</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            </form>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <form onSubmit={changepassword}>
            <div className='row'>
              <div className='col-md-12'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='formgroup'>
                      <TextField label="Old Password" variant="outlined" className='w-100' name='oldpassword' onChange={changeinput2} value={field.oldpassword} />
                    </div>

                  </div>
                  <div className='col-md-4'>
                    <div className='formgroup'>
                      <TextField label="New Password" variant="outlined" className='w-100' name='password' onChange={changeinput2} value={field.password} />
                    </div>

                  </div>
                  <div className='col-md-4'>
                    <div className='formgroup'>
                      <TextField label="Confirm Password" variant="outlined" className='w-100' name='confirmpassword' onChange={changeinput2} value={field.confirmpassword} />
                    </div>

                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='formgroup text-center'>
                      <Button className='btn-lg btn-big btn-blue w-25 font-lg mx-auto' type='submit'>Change Password</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            </form>
          </CustomTabPanel>
        </Box>
      </div>
    </section>
  )
}

export default Myaccount
