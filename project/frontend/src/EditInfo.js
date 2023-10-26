import { BiArrowBack } from "react-icons/bi";
import { Reset } from './logs/LoginValidation';
import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import User from "./UserModule";

const user1 = new User();

function First() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [img, setimg] = useState('');

    useEffect(() => {
        axios.get('http://localhost:700', {
            headers: { "a": localStorage.getItem("token") }
        })
            .then(res => {
                setName(res.data.name);
                setEmail(res.data.email);
                setimg(res.data.img)
            }).catch(err => console.log(err));
    }, []);

    user1.setname(name);
    user1.setemail(email);
    user1.setimg(img);

}
 
 
function EditName({ changeToFalse }) {
    First();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    let email = user1.getemail() + '';
    let oldname = user1.getname() + '';

    function Submitname(event) {
        event.preventDefault();

        axios.put('http://localhost:700/user/', { name, oldname, email })
            .then(res => {
                if (res.data.status === "success") {
                    window.location.reload(navigate('/profile'));

                } else {
                    window.location.reload();

                }

            }).catch(err => console.log(err));
    }

    return (
        <div >

            <div onClick={() => changeToFalse()} style={{ cursor: 'pointer', color: "red" }}>
                <BiArrowBack size="20px" />
                Back
            </div><br />
            <h5>change name </h5>
            <br />
            <form onSubmit={Submitname}>
                <label><strong>new name :</strong></label><br />
                <input type="text" defaultValue={oldname} className="form-control"
                    onChange={(event) => setName(event.target.value)} />
                <br /> <br />
                <button type='submit' className='btn btn-success w-50 rounded-0'>Save</button>

            </form>
        </div>
    )
}


function EditPassword({ changeToFalse }) {
    First();
    let email = user1.getemail() + '';
    let [error, setError] = useState({});
    const navigate = useNavigate();


    const [values, setValues] = useState({
        password: '',
        repassword: ''
    })


    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }



    function doChange(e) {
        e.preventDefault();

        const err = Reset(values);
        setError(err);

        if (err.password === "" && err.repassword === "") {
            const password = values.password;

            axios.put('http://localhost:700/reset-password', { email, password })
                .then(res => {

                    if (res.data.status === "success") {
                        window.location.reload(navigate('/profile'));
                    }
                    else if (res.data.status === "failed") { alert("password dont change"); }

                }).catch(err => console.log(err))
        }

    }

    return (
        <div >

            <div onClick={() => changeToFalse()} style={{ cursor: 'pointer', color: "red" }}>
                <BiArrowBack size="20px" />
                Back
            </div><br />
            <h5>change password </h5>

            <br />

            <form action="" onSubmit={doChange}>
                <div className='mb-3'>
                    <label htmlFor="password" ><strong>New Password :</strong></label>
                    <input type="password" onChange={handleInput} placeholder='New Password'
                        name='password' className='form-control rounded-0' />
                    {error.password && <span className='text-danger'> {error.password}</span>}

                </div>

                <div className='mb-3'>
                    <label htmlFor="password" ><strong>Conferm Password :</strong></label>
                    <input type="password" onChange={handleInput} placeholder='Conferm Password'
                        name='repassword' className='form-control rounded-0' />
                    {error.repassword && <span className='text-danger'> {error.repassword}</span>}


                </div>

                <button type='submit' className='btn btn-success w-100 rounded-0'>Save</button>


            </form>
        </div>
    )
}


function EditImage({ changeToFalse }) {
    const navigate = useNavigate();
    First();
    const [oldimg, setoldImg] = useState('');
    const [img, setImg] = useState('');
    const i = user1.getimg() + '';

    useEffect(()=>{
        setoldImg(i);
    },[i]);
    
        

    function Submitemp(event) {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('email', user1.getemail());
        formdata.append('img', img);

        axios.put('http://localhost:700/userPh/', formdata)
            .then(res => {
                window.location.reload(navigate('/profile'));
            }).catch(err => console.log(err));
    }

    const fileHandler = (event) => {
        var file = event.target.files[0];

        if (file != null) {
            setoldImg(URL.createObjectURL(file));
            setImg(file);
        }
    }

    return (
        <div >
            <div onClick={() => changeToFalse()}
                style={{ cursor: 'pointer', color: "red" }}>
                <BiArrowBack size="20px" />
                Back
            </div><br />
            <h5>change photo </h5>
            <br />
            <form onSubmit={Submitemp}>

                <label className="form-label" htmlFor="inputGroupFile01"><strong>Select Image:</strong></label>
                <br />
                <img src={oldimg} alt="" width="80" height="80"
                    className="rounded-circle" />
                <br /><br />
                <input type="file" className="form-control"
                    onChange={fileHandler} />
                <br /><br /><button className="btn btn-success">Save </button>
            </form>
        </div>
    )

}



export { EditName, EditPassword, EditImage };