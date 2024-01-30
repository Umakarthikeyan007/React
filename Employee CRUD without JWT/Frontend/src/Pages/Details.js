import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../Pages/logo.svg';
import axios from "axios";
import PhoneInput from 'react-phone-number-input';
import { emailValidation, nameValidation, phoneValidation, addressValidation, dateValidation } from "../utils/Validation.js";

function enablepopup() {
    document.querySelector('.alertboxmessage').classList.add('popup');
}

export default function Details() {

    const nav = useNavigate();
    const [Message,changeMessage] = useState("");
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [mailerror, setMailerror] = useState("");
    const [fnameerror, setFnameerror] = useState("");
    const [lnameerror, setLnameerror] = useState("");
    const [moberror, setMoberror] = useState("");
    const [doberror, setDoberror] = useState("");
    const [addresserror, setAddresserror] = useState("");

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
            await axios.post("http://localhost:8002/Users/add", payload).then(res => {
                if (res.status == 200) {
                   changeMessage(res.data);
                }
                else if (res.status == 205) {
                  changeMessage("Email Already Exist");
                }
                else {
                    throw new Error(res);
                }
            })
        } catch (error) {
            console.log(error);
        }


        enablepopup();

    };

    const changeValues = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
            if (!emailValidation(e.target.value)) {
                e.target.className = 'error';
                setMailerror("Invalid Mail");
            }
            else {
                e.target.className = '';
                setMailerror("");
            }

        }

        if (e.target.name === 'fname') {
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

        if (e.target.name === 'lname') {
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

        if (e.target.name === 'dob') {
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

        if (e.target.name === 'address') {
            setAddress(e.target.value);
            if (!addressValidation(e.target.value)) {
                e.target.className = 'error';
                setAddresserror("Should contain upto 50 characters");
            }
            else {
                e.target.className = '';
                setAddresserror("");
            }
        }
    }
    const changeMobile = (e) => {
        setMobile(e);
        let s = String(e);
        if (e && s.length > 0) {
            if (phoneValidation(s)) {
                setMoberror("");
            }
            else {
                setMoberror("Invalid Number");
            }
        }
    }
    return (
        <div className="body">
            <div className="Detailsheader">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="title">Enter Details</h1><br /></div>
            <center>
                <div className="form-section">
                    <form className="formBox" autoComplete="off">

                        <div id="form">
                            <div className="elements">
                                <label>Email:</label>
                                <input type="email" name="email" placeholder="Enter your Email" value={email} onChange={changeValues} onFocus={changeValues} required />
                                <p className="email-span">{mailerror}</p>
                            </div>
                            <div className="elements">
                                <label>First Name:</label>
                                <input type="text" name="fname" placeholder="Enter your First Name" value={fname} onChange={changeValues} onFocus={changeValues} required />
                                <p className="fname-span">{fnameerror}</p>
                            </div>
                            <div className="elements">
                                <label>Last Name:</label>
                                <input type="text" name="lname" placeholder="Enter your Last Name" value={lname} onChange={changeValues} onFocus={changeValues} required />
                                <p className="lname-span">{lnameerror}</p>
                            </div>
                            <div className="elements">
                                <label>Mobile:</label>
                                <PhoneInput placeholder="Enter phone number" name="mobile" value={mobile} onChange={changeMobile} required />
                                <p className="mob-span">{moberror}</p>
                            </div>
                            <div className="elements">
                                <label>DOB:</label>
                                <input type="date" name="dob" placeholder="Enter your DOB" value={dob} onChange={changeValues} onFocus={changeValues} required format="yyyy-mm-dd" />
                                <p className="dob-span">{doberror}</p>
                            </div>
                            <div className="elements">
                                <label>Address:</label>
                                <textarea placeholder="Enter your Address" name="address" value={address} onChange={changeValues} onFocus={changeValues} required maxLength={50}></textarea>
                                <p className="address-span">{addresserror}</p>
                            </div>
                            <div className="buttons">
                                <button className="btn" onClick={handleSubmit}>CREATE</button>
                                <button className="btn" onClick={() => nav(-1)}>GO BACK</button></div>
                        </div>
                    </form>
                </div>
                <div className="alertboxmessage"><h2>{Message}</h2>
                    <button onClick={() => nav(-1)}>Ok</button></div>
            </center>
        </div>

    );
}