import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Table = (props) => {
    const list = props.list;
    const nav = useNavigate();

    async function confirmDelete(data) {
        let cnfm = window.confirm("Are You sure that you want to delete this data?");
        if (cnfm) {
            sessionStorage.setItem('email', data);
            await axios.delete(`http://localhost:5000/Users/deleteEmployee/${data}`,{
                withCredentials: true  
            }).then((result) => {
            }).catch((err) => {
                console.log(err)
            });
        }
        window.location.reload();
    }

    async function updateprocess(data) {
        await axios.get(`http://localhost:5000/Users/getParticularEmployee/${data}`, {
            withCredentials: true
        }).then((result) => {
            sessionStorage.setItem('email', result.data[0].email);
            sessionStorage.setItem('fname', result.data[0].fname);
            sessionStorage.setItem('lname', result.data[0].lname);
            sessionStorage.setItem('mobile', result.data[0].mobile);
            sessionStorage.setItem('dob', result.data[0].dob);
            sessionStorage.setItem('address', result.data[0].address);
            nav("/Update");
            return result.data;
        }).catch((err) => {
            console.log(err)
        });
    }



    return (
        <>
            <table className="Main-table" cellPadding={10}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>Last Name</th>
                        <th>Mobile</th>
                        <th>DOB</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((e) => {
                            return (
                                <tr key={e.email}>
                                    <td>{e.email}</td>
                                    <td>{e.fname}</td>
                                    <td>{e.lname}</td>
                                    <td>{e.mobile}</td>
                                    <td>{e.dob}</td>
                                    <td>{e.address}</td>
                                    <td>
                                        <div className="Action-buttons">
                                            <div ><button className="Actions" onClick={() => updateprocess(e.email)}>Update</button></div>
                                            <div><button className="Actions" onClick={() => confirmDelete(e.email)}>Delete</button></div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
}

export default Table;