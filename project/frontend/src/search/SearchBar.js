import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ setResults }) => {

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");


  const fetchData = (value) => {

    axios.get("http://localhost:700/home")
      .then(res => {
        const results = res.data.filter((f) => {
          return (
            value && (
            f.FirstName.toLowerCase().startsWith(value.toLowerCase()) || 
            f.LastName.toLowerCase().startsWith(value.toLowerCase()))
          );
        });
        setResults(results);
      }).catch(err => console.log(err));

  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
    fetchFromApi(value);
  };
  
  const navigate = useNavigate();

  const fetchFromApi=(value)=>{
    axios.post("http://localhost:700/search",{value})
    .then(res => {
      setResult(res.data)

      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        console.log(element);
      }
      }).catch(err => console.log(err));

  }
  const f=()=>{
    navigate('/search')
  }

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" style={{cursor:"pointer"}}
       onClick={(e)=>f()}/>
      <input
        placeholder="Search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};