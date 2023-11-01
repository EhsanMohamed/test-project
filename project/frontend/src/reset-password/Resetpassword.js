import React from 'react'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import design from '../Employes.module.css'
import {Reset} from '../signup-in/LoginValidation';



function Resetpassword(){

    const [email, setEmail] = useState('');
    let [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:700',{
            headers:{"a":localStorage.getItem("e")}
        })
        .then(res=>{
            setEmail(res.data.email);
        }).catch(err=>console.log(err));
    },[]);

    const [values, setValues] = useState({ 
        password: '',
        repassword :''
    })
    
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))}
         


    function doChange(e){
        e.preventDefault(); 

        const err = Reset(values);
        setError(err);

        if(err.password === "" && err.repassword === ""){
            const password=values.password;

            axios.put('http://localhost:700/reset-password',{email,password})
        .then(res => {
        
            if(res.data.status === "success")
              {
                navigate('/login');
                localStorage.clear();
              } 
            else if(res.data.status==="Error"){
                alert("Error");
              }
            else if(res.data.status==="failed"){  alert("password dont change");  }
            
        }).catch(err => console.log(err))
        }

    }
    
    return(

        <div className={design.first}>
            <div className='bg-white p-3 rounded w-50'>
            <h2>Reset Password</h2>
                <form action="" onSubmit={doChange}>
                    <div className='mb-3'>
                        <label htmlFor="password" ><strong>New Password</strong></label>
                        <input type="password" onChange={handleInput} placeholder='New Password'
                        name='password' className='form-control rounded-0'/>
                        {error.password && <span className='text-danger'> {error.password}</span>}

                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password" ><strong>Conferm Password</strong></label>
                        <input type="password" onChange={handleInput} placeholder='Conferm Password'
                        name='repassword' className='form-control rounded-0'/>
                        {error.repassword && <span className='text-danger'> {error.repassword}</span>}


                    </div>
                
                <button type='submit' className='btn btn-success w-100 rounded-0'>Save</button>
                
                
                </form>
            </div>
            
        </div>

    






)}
export default Resetpassword;