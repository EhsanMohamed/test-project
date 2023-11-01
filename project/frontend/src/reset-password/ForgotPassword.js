import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import design from '../Employes.module.css'


function Forgot() {
    const [email, setEmail] = useState('');
    let [Otp, setOtp] = useState(0);
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        const otp=Math.floor(Math.random()*1000+9000);

        setOtp(Otp=otp);
       
        axios.put('http://localhost:700/forgot-password', {email,Otp})
        .then(res => {
        
            if(res.data.status === "success")
              {
                localStorage.setItem("e",res.data.token);
                navigate('/Verify');
              } 
            else if(res.data.status==="internet error"){
                alert("internet error");
              }
            else if(res.data.status==="failed"){  alert("No email ");  }
            
        }).catch(err => console.log(err))

    }


    return(
        <div className={design.first}>
      <div className="bg-white p-3 rounded w-50">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email" placeholder="Enter Email" autoComplete="off" 
              name="email" className="form-control rounded-0" 
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Search
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default Forgot;