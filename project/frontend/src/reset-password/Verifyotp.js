import React from 'react'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import design from '../Employes.module.css'

 
function Verifyotp() {
    const [email, setEmail] = useState('');
    let [Otp, setOtp] = useState(0);
    let [error, setError] = useState('');
    const navigate = useNavigate()


    useEffect(()=>{
      axios.get('http://localhost:700',{
          headers:{"a":localStorage.getItem("e")}
      })
      .then(res=>{
          setEmail(res.data.email);
      }).catch(err=>console.log(err));
  },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(Otp===0){
          setError("Please enter the code");
        }else if(Otp.length !== 4){
          setError("The code must be 4 digit");
        }else{

        axios.put('http://localhost:700/verify', {email,Otp})
        .then(res => {
        
            if(res.data.status === "success")
              {
                navigate('/resetpassword');
              } 
            else if(res.data.status==="dont"){
              
              setError("the code is incorecct");

              }
              
            
            else if(res.data.status==="Error"){
                setError("Error");}
            
        }).catch(err => console.log(err))
      
      }


    }


    return(
        <div className={design.first}>
      <div className="bg-white p-3 rounded w-50">
        <h4>Email Verification</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="otp">
              <p>We have sent a code to your email : {email}</p>
            </label>
            <input
              type="text" maxLength="4" placeholder="Enter The Code" 
              autoComplete="off" name="otp" className="form-control rounded-0" 
              onChange={(e) => setOtp(e.target.value)} />
              <span className='text-danger'> {error}</span>

          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Verify Account</button>
          </form>
        
      </div>
    </div>
    )
}

export default Verifyotp;