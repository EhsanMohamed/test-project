import React, { useState, useEffect } from 'react';
import axios from "axios";
import design from './Employes.module.css'
import { useParams } from "react-router-dom";


function Moreinfo() {

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Salary, setSalary] = useState(0);
    const [img, setImg] = useState('');
    const [Department, setDepartment] = useState('');

    
    const [allData,setAlldata]=useState([]);

    const { id } = useParams();




    useEffect(() => {
        axios.get(`http://localhost:700/more/` + id)
            .then(res => {
                setFirstName(res.data.data[0].FirstName);
                setLastName(res.data.data[0].LastName);
                setSalary(res.data.data[0].Salary);
                setImg(res.data.data[0].img);
                setDepartment(res.data.data2[0].name);
            
                setAlldata(res.data.data1)
            }
            )
            .catch(err => console.log(err));

    }, []);




    return (
        <div className={design.elem}>
            <div className="w-50 bg-white rounded p-3">
                <form>
                    <h2>All Information</h2>

                    <div className="mb-2">
                        <label htmlFor="Department">Department  : </label>
                        <h5>{Department}</h5>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="FirstName">First Name : </label>
                        <h5>{FirstName}</h5>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="LastName">Last Name : </label>
                        <h5>{LastName}</h5>

                    </div>
                    <div className="mb-2">
                        <label htmlFor="Salary">Salary : </label>
                        <h5>{Salary}</h5>

                    </div>

                    <div className="mb-2">
                        <label htmlFor="Image">Photo : </label><br />
                        <img src={img} alt="hugenerd"
                            width="80" height="80" className="rounded-circle" />
                    </div>


                    <br />
                    <hr />
                    <h4>Old Information</h4>
                    
                    <table className="table">
                        <thead >
                            <tr>
                                <th>old First name </th>
                                <th>old Last name</th>
                                <th>old Salary</th>
                                <th>Edit by</th>
                                <th>Update date  </th>
                            </tr> 
                        </thead>
                        <tbody >
                            {
                                allData.map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.FirstName}</td>
                                        <td>{data.LastName}</td>
                                        <td>{data.Salary}</td>
                                        <td>{data.edit_by}</td>
                                        <td>{data.time}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                     
                    </table>
                </form>
            </div>
        </div>
    )
}

export default Moreinfo;