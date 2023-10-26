import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import employescss from './Employes.module.css'

import { SearchBar } from "./search/SearchBar";
import { SearchResultsList } from "./search/SearchResultsList";
 


function Employes() {

    const [allData, setAlldata] = useState([]);
    const [results, setResults] = useState([]);


    const deleted = async (id) => {
        try {
            await axios.delete('http://localhost:700/home/' + id);
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:700/home`)
            .then(res => {
                setAlldata(res.data)
            })
            .catch(err => console.log(err));

    }, []);

  

    return (

        
        <div className={employescss.elem}>
            <div className=" bg-white rounded p-4">
                
                <SearchBar setResults={setResults} /> 
                { results && results.length > 0  &&
                 <SearchResultsList results={results}  />}

               
                <br />
                <Link to="/add" className="btn btn-success">Add Employee</Link>
                <br /><br />

                <table className="table">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Salary</th>
                            <th>Add By</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((data, i) => (
                                <tr key={i}>
                                    <td>
                                        <img src={data.img}
                                            alt="hugenerd" width="40" height="40" className="rounded-circle" />
                                    </td>
                                    <td>{data.FirstName}</td>
                                    <td>{data.LastName}</td>
                                    <td>{data.Salary}</td>
                                    <td>{data.add_by}</td>


                                    <td>

                                        <Link to={`moreinfo/${data.ID}`} className='btn btn-success me-2'>Show info.</Link>
                                        <Link to={`update/${data.ID}`} className='btn btn-primary me-2'>Update</Link>

                                        <button onClick={e => deleted(data.ID)} className="btn btn-danger ms-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>



                </table>
            </div>



        </div>
    )


}
export default Employes;