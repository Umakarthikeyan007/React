import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../Pages/logo.svg';
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import { nameValidation, addressValidation, dateValidation,phoneValidation } from "../utils/Validation.js";

function setemail() {
    return sessionStorage.getItem('email');
}
function setfname() {
    return sessionStorage.getItem('fname');
}
function setlname() {
    return sessionStorage.getItem('lname');
}
function setmob() {
    return sessionStorage.getItem('mobile');
}
function setdob() {
    return sessionStorage.getItem('dob');
}
function setaddress() {
    return sessionStorage.getItem('address');
}
export default function Update() {
    const nav = useNavigate();


    const handleSubmit = async (e) => {
        const payload = {
            email: email,
            fname: fname,
            lname: lname,
            mobile: mobile,
            dob: dob,
            address: address
        }
        e.preventDefault();
        try {
            await axios.post("http://localhost:8002/Users/update", JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            document.querySelector('.alertboxmessage').classList.add('popup');
        }
        catch (error) {
            console.log(error);
        }
        
    };
    const [email, setEmail] = useState(setemail());
    const [fname, setFname] = useState(setfname());
    const [lname, setLname] = useState(setlname());
    const [mobile, setMobile] = useState(setmob());
    const [dob, setDob] = useState(setdob());
    const [address, setAddress] = useState(setaddress());


    const [fnameerror, setFnameerror] = useState("");
    const [lnameerror, setLnameerror] = useState("");
    const [moberror, setMoberror] = useState("");
    const [doberror, setDoberror] = useState("");
    const [addresserror, setAddresserror] = useState("");

    const changefname = (e) => {
        setFname(e.target.value);
        if (!nameValidation(e.target.value)) {
            e.target.className = 'error';
            setFnameerror("Name should not contain Special characters and Numbers");
        }
        else {
            e.target.className = '';
            setFnameerror("");
        }
    }
    const changelname = (e) => {
        setLname(e.target.value);
        if (!nameValidation(e.target.value)) {
            e.target.className = 'error';
            setLnameerror("Name should not contain Special characters and Numbers");
        }
        else {
            e.target.className = '';
            setLnameerror("");
        }
    }
    const changedob = (e) => {
        setDob(e.target.value);
        if (!dateValidation(e.target.value)) {
            e.target.className = 'error';
            setDoberror("Invalid DOB");
        }
        else {
            e.target.className = '';
            setDoberror("");
        }
    }
    const changeaddress = (e) => {
        setAddress(e.target.value);
        if(!addressValidation(e.target.value)){
            e.target.className='error';
            setAddresserror("Should contain upto 50 characters");
        }
        else{
            e.target.className='';
            setAddresserror("");
        }
      
    }
    const changeMobile = (e) => {
        setMobile(e);
        let s = String(e);
        if (e && s.length > 0) {
            if(phoneValidation(s)){
                setMoberror("");
            }
            else{
                setMoberror("Invalid Number"); 
            }
        }
    }
    return (
        <div>
            <div className="Detailsheader">
            <img src={logo} className="App-logo" alt="logo" />        
                <h1 className="title">Update Details</h1><br /></div>
                <center>
                <div className="form-section">
                    <form className="formBox" autoComplete="off">
                        <div id="form">
                            <div className="elements">
                                <label>Email:</label>
                                <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled />
                            </div>
                            <div className="elements">
                                <label>First Name:</label>
                                <input type="text" placeholder="Enter your First Name" value={fname} onChange={changefname} required />
                                <p className="fname-span">{fnameerror}</p>
                            </div>
                            <div className="elements">
                                <label>Last Name:</label>
                                <input type="text" placeholder="Enter your Last Name" value={lname} onChange={changelname} required />
                                <p className="lname-span">{lnameerror}</p>
                            </div>
                            <div className="elements">
                                <label>Mobile:</label>
                                <PhoneInput placeholder="Enter phone number" value={mobile} onChange={changeMobile} required />
                                <p className="mob-span">{moberror}</p>
                            </div>
                            <div className="elements">
                                <label>DOB:</label>
                                <input type="date" placeholder="Enter your DOB" value={dob} onChange={changedob} required format="yyyy-mm-dd" />
                                <p className="dob-span">{doberror}</p>
                            </div>
                            <div className="elements">
                                <label>Address:</label>
                                <textarea placeholder="Enter your Address" value={address} onChange={changeaddress} required ></textarea>
                                <p className="address-span">{addresserror}</p>
                            </div>
                            <div className="buttons">
                            <button className="btn" onClick={handleSubmit}>UPDATE</button>
                            <button className="btn" onClick={() => nav('/')}>GO BACK</button></div>
                        </div>
                    </form>
                </div>
                <div className="alertboxmessage"><h2>Details Updated Successfully</h2>
                <button onClick={()=>nav(-1)}>Ok</button></div>
                </center>
        </div>

    );
}