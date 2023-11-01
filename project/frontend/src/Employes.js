import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import employescss from './Employes.module.css'
import { DataGrid ,GridToolbar} from "@mui/x-data-grid";
import { Box } from '@mui/material';

import { SearchBar } from "./search/SearchBar";
import { SearchResultsList } from "./search/SearchResultsList";



function Employes() {

    const columns = [
        {
            field: 'img', headerName: 'Photo', renderCell: (cellValues) => {
                return <img src={cellValues.row.img}
                    alt="hugenerd" width="40" height="40" className="rounded-circle" />
            }
        }
        , { field: 'FirstName', headerName: 'First Name', flex: 1}
        , { field: 'LastName', headerName: 'Last Name', flex: 1 }
        , { field: 'Salary', headerName: 'Salary' }
        , { field: 'add_by', headerName: 'Add By', flex: 1 }
        , {
            headerName: 'Action', width: 300,
            renderCell: (cellValues) => {
                return (
                    <div>
                        <Link to={`update/${cellValues.row.ID}`} className='btn btn-primary me-2'>Update</Link>
                        <Link to={`moreinfo/${cellValues.row.ID}`} className='btn btn-success me-2'>Show info.</Link>
                        <button onClick={e => deleted(cellValues.row.ID)} className="btn btn-danger ms-2">Delete</button>

                    </div>
                )
            }
        }


    ]
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


        < Box m="20px"  >
            <Box m="40px 0 0 0" >

                <SearchBar setResults={setResults} />
                {results && results.length > 0 &&
                    <SearchResultsList results={results} />}

                <br />
                <Link to="/add" className="btn btn-success">Add Employee</Link>
                <br /><br />

                <DataGrid checkboxSelection rows={allData} columns={columns}
                    getRowId={(row) => row.ID} pageSizeOptions={5}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5
                            }
                        }
                    }} 
                    
                    components={{Toolbar:GridToolbar}  } 
                    
                    />

            </Box>



        </Box>
    )


}
export default Employes;