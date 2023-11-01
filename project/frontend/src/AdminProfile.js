import React, { useState } from 'react';
import employescss from './Employes.module.css'
import { EditName, EditPassword, EditImage } from './EditInfo';
import { BiSolidEditAlt } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri"
 

function Profile() {

    const [editMode, setEditMode] = useState(false);
    const [test, setTest] = useState('');


    const changeToFalse = () => {
        setEditMode(false);
    }

    return (
        <div className={employescss.elem}>

            {editMode ?
                (
                    (() => {
                        if (test === 'name') {
                            return (

                                <EditName changeToFalse={changeToFalse} />
                            )
                        } else if (test === 'password') {
                            return (

                                <EditPassword changeToFalse={changeToFalse} />

                            )
                        } else if (test === 'img') {
                            return (
                                <EditImage changeToFalse={changeToFalse} />
                            ) 
                        }
                    })()) 
                    : 
                    (
                    <div className="w-50 bg-white rounded p-3" >
 
                        <h2>Manage Profile </h2>
                        <br />
                        <div onClick={() => {
                            setEditMode(true)
                            setTest('name')
                        }}
                            style={{ cursor: 'pointer' }} className='px-3 pt-2 pb-5 border shadow w-50' >
                            <div style={{ display: "flex", marginBottom: 10 }}>Change Name :
                                <div >
                                    <BiSolidEditAlt style={{ marginLeft: 5, color: "green" }}
                                        size="30px" />
                                </div>
                            </div>

                        </div>
                        <br />

                        <div onClick={() => {
                            setEditMode(true)
                            setTest('password')
                        }} style={{ cursor: 'pointer' }} className='px-3 pt-2 pb-5 border shadow w-50'>

                            <div style={{ marginBottom: 10 }}>Change Password <RiLockPasswordFill /> :
                                <BiSolidEditAlt size="30px" style={{ marginLeft: 5, color: "green" }} />
                            </div>
                        </div>
                        <br />

                        <div onClick={() => {
                            setEditMode(true)
                            setTest('img')
                        }} style={{ cursor: 'pointer' }} className='px-3 pt-2 pb-5 border shadow w-50'>

                            <div style={{ marginBottom: 10 }}>Change Photo  :
                                <BiSolidEditAlt size="30px" style={{ marginLeft: 5, color: "green" }} /> </div>

                        </div>



                    </div>
                )
            }
        </div>
    )

}
export default Profile;