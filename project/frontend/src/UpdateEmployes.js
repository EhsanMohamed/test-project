import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import employescss from './Employes.module.css'


function UpdateEmployes() {

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Salary, setSalary] = useState(0);
    const [email, setEmail] = useState('');

    const [oldFirstName, setoldFirstName] = useState('');
    const [oldLastName, setoldLastName] = useState('');
    const [oldSalary, setoldSalary] = useState(0);
    const [oldimg, setoldImg] = useState('');
    const [img, setImg] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:700/more/` + id)
            .then(res => {
                setoldFirstName(res.data.data[0].FirstName);
                setoldLastName(res.data.data[0].LastName);
                setoldSalary(res.data.data[0].Salary);
                setoldImg( res.data.data[0].img);

                setFirstName(res.data.data[0].FirstName);
                setLastName(res.data.data[0].LastName);
                setSalary(res.data.data[0].Salary);

            }
            )
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:700', {
            headers: { "a": localStorage.getItem("token") }
        })
            .then(res => {
                setEmail(res.data.email);
            }).catch(err => console.log(err));
    }, []);

    function Submitemp(event) {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('FirstName', FirstName);
		formdata.append('LastName', LastName);
		formdata.append('Salary', Salary);
        formdata.append('email', email);
		formdata.append('img', img);
        formdata.append('oldFirstName', oldFirstName);
		formdata.append('oldLastName', oldLastName);
		formdata.append('oldSalary', oldSalary);

        axios.put('http://localhost:700/update/' + id, formdata)
            .then(res => {
                navigate('/home');
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
        <div className={employescss.elem}>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submitemp}>
                    <h2>Update Employee</h2>
                    <div className="mb-2">
                        <label htmlFor="FirstName">First Name: </label>
                        <input type="text" placeher="First Name" className="form-control"
                            value={FirstName} onChange={event => setFirstName(event.target.value)} />


                    </div>
                    <div className="mb-2">
                        <label htmlFor="LastName">Last Name: </label>
                        <input type="text" placeholder="Last Name" className="form-control"
                            value={LastName} onChange={event => setLastName(event.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="Salary">Salary: </label>
                        <input type="number" placeholder="Salary" className="form-control"
                            value={Salary} onChange={event => setSalary(event.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label className="form-label" htmlFor="inputGroupFile01">Select Image:</label>
                        <br />
                        <img src={oldimg} alt="" width="80" height="80" className="rounded-circle" />
                        <br /><br />
                        <input type="file" className="form-control" 
                        id="inputGroupFile01" onChange={fileHandler} />
                    </div>
                    <br />
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    )

}
export default UpdateEmployes;