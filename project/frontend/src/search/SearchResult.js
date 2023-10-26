import {  useNavigate } from "react-router-dom";
import "./SearchResult.css";



export const SearchResult = ({ result ,ID}) => {
  
  const navigate = useNavigate();

  const f=(id)=>{
    navigate('moreinfo/'+id)
  }

  return (
    <div className="search-result" >
      <div onClick={(e)=>f(ID)}>{result}</div>
    </div>
  );
};
