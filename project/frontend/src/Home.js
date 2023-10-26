import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import design from './Employes.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";


function Home() {

    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [img, setimg] = useState();




    useEffect(() => {
        axios.get('http://localhost:700', {
            headers: { "a": localStorage.getItem("token") }
        })
            .then(res => {
                if (res.data.login === "success") {
                    setAuth(true);
                    setEmail(res.data.email);
                }
                else {
                    navigate('/login')
                    setAuth(false);
                }
            }).catch(err => console.log(err));

    }, []);


    useEffect(() => {
        axios.put(`http://localhost:700/log`, { email })
            .then(res => {

                setName(res.data[0]?.name);
                setimg(res.data[0].img);
            }
            ).catch(err => console.log(err));
    }, [setTimeout(() => { }, 1000)]);


    const Logout = () => {
        axios.put('http://localhost:700/logout', { email })
            .then(res => {
                if (res.data === "success") {
                    localStorage.clear();
                    window.location.reload(navigate('/'));
                }
            }).catch(err => console.log(err));
    }

    function toEdit() {
        navigate('/profile')
    }

    return (
        <div> {
            auth ?

                <div  >
                    <div className="container-fluid">
                        <div className="row flex-nowrap">
                            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                        <span className="fs-5 d-none d-sm-inline">Admin Menu</span>
                                    </a>
                                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                        <li onClick={toEdit} style={{ cursor: 'pointer' }}>

                                            <a className="d-flex align-items-center text-white text-decoration-none "
                                                aria-expanded="false">
                                                <img src={img} alt="hugenerd"
                                                    width="50" height="50" className="rounded-circle" />
                                                <span className="d-none d-sm-inline mx-3 ">{name}</span>
                                            </a>
                                            <br />
                                        </li>

                                        <li>
                                            <Link to="/dashboard" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                                <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                                        </li>
                                        <li>
                                            <Link to="/home" className="nav-link px-0 align-middle ">
                                                <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Employees</span> </Link>
                                        </li>
                                        <li>
                                            <Link to="/department" className="nav-link px-0 align-middle ">
                                                <i className="fs-4 bi bi-card-list"></i> <span className="ms-1 d-none d-sm-inline">Employees Department</span> </Link>
                                        </li>
                                        <li>
                                            <Link to="/profile" className="nav-link px-0 align-middle ">
                                                <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
                                        </li>
                                        <li onClick={Logout} style={{ cursor: 'pointer' }}>
                                            <a className="nav-link px-0 align-middle text-danger">
                                                <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
                                        </li>


                                    </ul>
                                </div>
                            </div>
                            <div className="col p-0 m-0">
                                <div className='p-2 d-flex justify-content-center shadow'>
                                    <h4>Employee Management System</h4>

                                </div>
                                <Outlet />
                            </div>


                        </div>
                    </div>

                </div>

                :

                <div className={design.first}>
                    <div className='bg-white p-3 rounded w-25'>
                        <h4>log in now</h4>

                        <Link to="/login" className='btn btn-primary border w-100  rounded-0 text-decoration-none'>Login</Link>
                    </div>
                </div>
        }
        </div>
    )
}

export default Home;