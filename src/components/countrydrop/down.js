import { FaAngleDown } from "react-icons/fa";
import {React,useContext,useState,useEffect} from "react";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MyContext } from "../../App";

const Down = () => {
  const [isOpenModel, setIsOpenModel] = useState(false)
  const [selectedTab, setselectedTab] = useState(null)
  const [countryList, setcountryList] = useState([])

  const context=useContext(MyContext)

  useEffect(() => {
    setcountryList(context.countryList)
  }, [])
  

  const filterList=(e)=>{
    const keyword=e.target.value.toLowerCase()
    if(keyword!==''){
      
      const list=countryList.filter((item)=>{
        return item.country.toLowerCase().includes(keyword)
      })
      setcountryList(list)
    }
    else{
      setcountryList(context.countryList)
    }
    
  }

  const selectCountry=(index,country)=>{
    setselectedTab(index)
    setIsOpenModel(false)
    context.setselectedCountry(country)
    localStorage.setItem("location",country);
    window.location.href="/";
  }

  return (
    <div>
      <Button className="countrydrop" onClick={()=>{setIsOpenModel(!isOpenModel)}}>
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="cname">{context.selectedCountry !==''? context.selectedCountry.length>15? context.selectedCountry.substr(0,15)+'...':context.selectedCountry : "Select a location"}</span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>
      <Dialog open={isOpenModel} onClose={()=>{setIsOpenModel(!isOpenModel)}} className="locationmodel">
        <h4 className="mb-0">Choose your delivery location</h4>
        <p>Enter your address and we will specify the offer for your area.</p>
        <Button className="close_" onClick={()=>{setIsOpenModel(!isOpenModel)}}><IoMdClose /></Button>
        <div className="header-search w-100">
        <input type="text" placeholder="Search for products..." onChange={filterList} />
        <Button>
          <IoMdSearch />
        </Button>
      </div>
      <ul className="countrylist mt-3">
        <li><Button onClick={()=>{selectCountry(0, "All")}}
        className={`${selectedTab===0 ? 'active' : ''}`}>All</Button></li>
        {
          countryList?.length!==0 && countryList?.map((item,index)=>{
            return(
              <li key={index}><Button onClick={()=>{selectCountry(index+1, item.country)}}
              className={`${selectedTab===index+1 ? 'active' : ''}`}>{item.country}</Button></li>
            )
          })
        }
        
      </ul>

      </Dialog>
    </div>
  );
};

export default Down;
