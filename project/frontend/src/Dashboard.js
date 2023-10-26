import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Dashboard() {
    const [adminCount, setAdminCount] = useState()
    const [employeeCount, setEmployeeCount] = useState()
    const [admin, setAdmin] = useState([]);

    useEffect(() => {


        axios.get('http://localhost:700/adminCount')
            .then(res => {
                setAdminCount(res.data[0].admin)
            }).catch(err => console.log(err));

        axios.get('http://localhost:700/employeeCount')
            .then(res => {
                setEmployeeCount(res.data[0].employee)
            }).catch(err => console.log(err));

        axios.get(`http://localhost:700/admin`)
            .then(res => setAdmin(res.data))
            .catch(err => console.log(err));

           

    }, [])


    return (
        <div>
            <div className='p-3 d-flex justify-content-around mt-3 '>
                <div className='px-3 pt-2 pb-3 border w-25 shadow'>
                    <div className='text-center pb-1 shadow'>
                        <h4>Admin</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: {adminCount}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow w-25'>
                    <div className='text-center shadow pb-1'>
                        <h4>Employee</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: {employeeCount}</h5>
                    </div>
                </div>

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
                                        <img src={ data.img} alt="hugenerd"
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