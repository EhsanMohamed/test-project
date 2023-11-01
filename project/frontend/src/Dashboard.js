import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PieChart from './charts/PieChart'
import BarChart from './charts/BarChart'
import LineChart from './charts/LineChart'
import { Box } from "@mui/material";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

function Dashboard() {
    const [employeeCount, setEmployeeCount] = useState()
    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:700/employeeCount')
            .then(res => {
                setEmployeeCount(res.data[0].employee)
            }).catch(err => console.log(err));

        axios.get(`http://localhost:700/admin`)
            .then(res => setAdmin(res.data))
            .catch(err => console.log(err));

    }, [])


    return (
        <div style={{ margin: '20px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box>
                    <CCard style={{ height: '30rem', width: '30rem' }}>

                        <CCardHeader>
                            <CRow>
                                <CCol sm={6}>
                                    <h5>Total Employees : ({employeeCount})</h5>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody >
                            <PieChart />
                        </CCardBody>
                    </CCard>
                </Box>

                <Box>

                    <CCard style={{ height: '30rem', width: '30rem' }}>

                        <CCardHeader>
                            <CRow>
                                <CCol sm={6}>
                                    <h5> Department</h5>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody >
                            <BarChart  />
                        </CCardBody>
                    </CCard>
                </Box>
            </div>

            <div style={{ margin: '20px',display: 'flex', justifyContent: 'space-around' }}>
                <Box>
                    <CCard style={{ height: '30rem', width: '60rem' }}>

                        <CCardHeader>
                            <CRow>
                                <CCol sm={6}>
                                    <h4>Salary Chart</h4>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody >
                            <LineChart />
                        </CCardBody>
                    </CCard>
                </Box>
                
            </div>



            <div className='mt-4 px-5 pt-3 pb-3 border w-100 shadow'>

                <h3 >List of Admins</h3>
                <table className='table shadow'>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Active</th>
                            <th>Login time</th>
                            <th>Logout time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            admin.map((data, i) => (
                                <tr key={i}>
                                    <td>
                                        <img src={data.img} alt="hugenerd"
                                            width="40" height="40" className="rounded-circle" />
                                    </td>
                                    <td>{data.name}</td>
                                    <td>{data.active === 'on' ? <span className='text-success'>● on</span> :
                                        <span className='text-danger'>● off</span>}</td>
                                    <td>{data.login_Time}</td>
                                    <td>{data.logout_Time}</td>
                                </tr>))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Dashboard;