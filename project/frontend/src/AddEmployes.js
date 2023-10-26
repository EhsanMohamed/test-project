import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import design from './Employes.module.css'


function AddEmployes() {

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Salary, setSalary] = useState(100);
    const [img, setImg] = useState();
    const navigate = useNavigate();
    const [id, setid] = useState('');
    const [email, setEmail] = useState('');
    const [allData, setAlldata] = useState([]);
    const [department, setDepartment] = useState('');


    function Submitemp(event) {
        const formdata = new FormData();
        formdata.append('FirstName', FirstName);
        formdata.append('LastName', LastName);
        formdata.append('Salary', Salary);
        formdata.append('img', img);
        formdata.append('id', id);
        formdata.append('email', email);
        formdata.append('department', department);

        event.preventDefault();
        axios.post('http://localhost:700/add', formdata)
            .then(res => {
                navigate('/home');

            }).catch(err => console.log(err));
    }


    useEffect(() => {
        axios.get('http://localhost:700', {
            headers: { "a": localStorage.getItem("token") }
        })
            .then(res => {
                setid(res.data.id);
                setEmail(res.data.email);

            }).catch(err => console.log(err));

        axios.get(`http://localhost:700/department`)
            .then(res => {
                setAlldata(res.data);
                setDepartment(res.data[0].ID)
            })
            .catch(err => console.log(err));
    }, []);



    return (
        <div className={design.elem}>

            <div className="w-50 bg-white rounded p-3">

                <h2>Add Employee  </h2>
                <br />

                <label htmlFor="Department">Department : </label>
                <select className="form-select" onChange={e => setDepartment(e.target.value)} >
                    {
                        allData.map((data, i) => (
                            <option key={i} value={data.ID} >{data.name}</option>
                        ))

                    }

                </select>

                <form onSubmit={Submitemp}>

                    <div className="mb-2">
                        <label htmlFor="FirstName">First Name: </label>
                        <input type="text" placeholder="First Name" className="form-control"
                            autoComplete='off' onChange={event => setFirstName(event.target.value)} />

                    </div>
                    <div className="mb-2">
                        <label htmlFor="LastName">Last Name: </label>
                        <input type="text" placeholder="Last Name" className="form-control"
                            autoComplete='off' onChange={event => setLastName(event.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="Salary">Salary: </label>
                        <input type="number" placeholder="Salary" className="form-control"
                            autoComplete='off' value={Salary} onChange={event => setSalary(event.target.value)} />
                        <br />
                        <input type="range" class="form-range" min="100" max="500" step="10" onChange={event => setSalary(event.target.value)} />

                    </div>
                    <div className=" mb-3">
                        <label className="form-label" htmlFor="inputGroupFile01">Select Image:</label>
                        <input type="file" className="form-control" id="inputGroupFile01"
                            onChange={event => setImg(event.target.files[0])} />
                    </div>
                    <br />
                    <button className="btn btn-success">Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployes;