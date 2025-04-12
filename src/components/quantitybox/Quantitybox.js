import {React,useContext,useEffect,useState} from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import Button from "@mui/material/Button";
import { MyContext } from "../../App";

const Quantitybox = (props) => {
    const [inputval, setinputval] = useState(1)
    const context=useContext(MyContext)

    useEffect(()=>{
      if(props?.value !== undefined && props?.value !== null && props?.value !== ""  ){
        setinputval(props.value);
        context.getcartdata();

      }
    },[props.value])
    const minus=()=>{
      if(inputval!==1 && inputval>0){
        setinputval(inputval-1)
      }
    }
    const plus=()=>{
        setinputval(inputval+1)
    }
    useEffect(()=>{
      props.quantityset(inputval)
      props.selecteditem(props.item,inputval)
    },[inputval])
  return (
    <div>
      <div className="quantitydrop d-flex align-items-center">
          <Button onClick={minus}>
            <FaMinus />
          </Button>
          <input type="text" value={inputval} />
          <Button onClick={plus}>
            <FaPlus />
          </Button>
        </div>
    </div>
  );
};

export default Quantitybox;
