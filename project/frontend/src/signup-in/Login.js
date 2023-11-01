import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Validation } from '../signup-in/LoginValidation';
import { GoogleLogin } from 'react-google-login';
import design from '../Employes.module.css';
import { gapi } from "gapi-script";

const id = "358747255632-crftn91acm1vb64tm1iq7kd52kt9856t.apps.googleusercontent.com"

function Login() {

    const navigate = useNavigate();
    const [error, setError] = useState({})


    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }


    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: id,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);


    const doLogin = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setError(err);

        if (err.email === "" && err.password === "") {
            axios.post('http://localhost:700/login', values)
                .then(res => {
                    if (res.data.login === "success") {
                        localStorage.setItem("token", res.data.token);

                        navigate('/dashboard');

                    }
                    else if (res.data.login === "Error") {
                        alert("No  existed");
                    }
                    else if (res.data.login === "failed") { alert("No record existed"); }
                }).catch(err => console.log(err));
        }
    }


    const handleFailure = (result) => {
        console.log("errooooooooor" + result);
    };



    const handleLogin = (googleData) => {

        let email = googleData.profileObj.email + '';


        axios.post('http://localhost:700/googlelogin', { email })
            .then(res => {
                localStorage.setItem("token", res.data.token);

                navigate('/dashboard');
            })
            .catch(error => console.log(error));
    
    }


    return (

        <div className={design.first}>


            <div className='bg-white p-3 rounded w-25'>





                <form action="" onSubmit={doLogin}>
                    <div className='mb-3'>

                        <br /><br />
                        <h2>Sign-In</h2>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" onChange={handleInput} placeholder='Enter Email'
                            name='email' className='form-control rounded-0' />
                        {error.email && <span className='text-danger'> {error.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" ><strong>Password</strong></label>
                        <input type="password" onChange={handleInput} placeholder='Enter Password'
                            name='password' className='form-control rounded-0' />
                        {error.password && <span className='text-danger'> {error.password}</span>}

                    </div>


                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <br />
                    <Link to="/forgot-password" className='text-Primary' style={{color:'blue'}} >Forgot Password?</Link>
                    <br /><br />
                    <h5 style={{ color: 'blue' ,marginLeft:150}}>or</h5>
                  
                        <GoogleLogin
                            clientId={id}
                            className='w-100 rounded-0  justify-content-center'
                            onSuccess={handleLogin}
                            onFailure={handleFailure}
                            cookiePolicy={'single_host_origin'}
                        >Sign-In with Google</GoogleLogin>
                    <hr />
                    <br />
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Sign Up</Link>

                </form>
            </div>
        </div>

    )
}

export default Login;