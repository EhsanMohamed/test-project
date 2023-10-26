import employescss from './Employes.module.css'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";




function Department() {
    const [id, setid] = useState('');
    const [department, setDepartment] = useState('');
    const [allData, setAlldata] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:700', {
            headers: { "a": localStorage.getItem("token") }
        })
            .then(res => {
                setid(res.data.id);

            }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:700/department`)
            .then(res => setAlldata(res.data))
            .catch(err => console.log(err));

    }, []);

    const deleted = async (id) => {
        try {
            await axios.delete('http://localhost:700/department/' + id);
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }
    }

    function Submitname(event) {
        event.preventDefault();

        axios.post('http://localhost:700/department', { id, department })
            .then(res => {
                if (res.data.status === "success") {
                    window.location.reload(navigate('/department'));
                } else {
                    window.location.reload();
                }

            }).catch(err => console.log(err));
    }
 

    return (
        <div className={employescss.elem}>
            <form >
                <div>
                    <h4>Add new department </h4>
                </div>
                <br />

                <label><strong>department name :</strong></label><br />
                <input type="text" className="form-control"
                    onChange={(event) => setDepartment(event.target.value)} />
                <br /> <br />
                <button onClick={(e) => Submitname(e)} className='btn btn-success w-50 rounded-0'>Save</button>
                <hr /> <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>department name</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((data, i) => (
                                <tr key={i}>
                                    <td> <strong>{data.name}</strong></td>
                                    <td>
                                        <button onClick={e => deleted(data.ID)} className="btn btn-danger ms-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default Department;