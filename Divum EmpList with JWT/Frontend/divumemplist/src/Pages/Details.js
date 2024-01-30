import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailValidation, nameValidation, phoneValidation, addressValidation, dateValidation } from "../Utils/Validate";
import axios from "axios";


export default function Details(){

    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");

    const changeValues = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
            if (!emailValidation(e.target.value)) {
               document.querySelector(".email-error").style.visibility="visible";
            }
            else {
                document.querySelector(".email-error").style.visibility="hidden";
            }

        }

        if (e.target.name === 'fname') {
            setFname(e.target.value);
            if (!nameValidation(e.target.value)) {
                document.querySelector(".fname-error").style.visibility="visible";
            }
            else {
                document.querySelector(".fname-error").style.visibility="hidden";
            }

        }

        if (e.target.name === 'lname') {
            setLname(e.target.value);
            if (!nameValidation(e.target.value)) {
                document.querySelector(".lname-error").style.visibility="visible";
            }
            else {
                document.querySelector(".lname-error").style.visibility="hidden";
            }
        }

        if (e.target.name === 'dob') {
            setDob(e.target.value);
            if (!dateValidation(e.target.value)) {
                document.querySelector(".dob-error").style.visibility="visible";
            }
            else {
                document.querySelector(".dob-error").style.visibility="hidden";
            }
        }

        if (e.target.name === 'address') {
            setAddress(e.target.value);
            if (!addressValidation(e.target.value)) {
                document.querySelector(".address-error").style.visibility="visible";
            }
            else {
                document.querySelector(".address-error").style.visibility="hidden";
            }
        }
    }
    const changeMobile = (e) => {
        setMobile(e);
        let s = String(e);
        if (e && s.length > 0) {
            if (!phoneValidation(s)) {
                document.querySelector(".mobile-error").style.visibility="visible";
            }
            else {
                document.querySelector(".mobile-error").style.visibility="hidden";
            }
        }
    }

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
            await axios.post("http://localhost:5000/Users/addEmployee", payload,{
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            }).then(result => {
                return result.data;
            })
        } catch (error) {
             nav("/");
        }
        nav("/Home");
    };

    return(
        <div className="details-page">
             <h1>Divum Employee Details</h1>
             <div className="details-form">
                <form onSubmit={handleSubmit}>
                  <h2>Enter Details</h2>
                            <div className="elements">
                                <div><label>Email:</label></div>
                                <div><input type="email" name="email" placeholder="Enter your Email" value={email} onChange={changeValues} onFocus={changeValues} required /></div>
                            </div>
                            <p className="error email-error"> Invalid Email</p>
                            <div className="elements">
                                <div><label>First Name:</label></div>
                                <div><input type="text" name="fname" placeholder="Enter your First Name" value={fname} onChange={changeValues} onFocus={changeValues} required /></div>
                            </div>
                            <p className="error fname-error">Name should not contain Numbers and Special Characters</p>
                            <div className="elements">
                                <div><label>Last Name:</label></div>
                                <div><input type="text" name="lname" placeholder="Enter your Last Name" value={lname} onChange={changeValues} onFocus={changeValues} required /></div>
                            </div>
                            <p className="error lname-error">Name should not contain Numbers and Special Characters</p>
                            <div className="elements">
                                <div><label>Mobile:</label></div>
                                <div><PhoneInput placeholder="Enter phone number" name="mobile" value={mobile} onChange={changeMobile} required /></div>
                            </div>
                            <p className="error mobile-error">Invalid Mobile Number</p>
                            <div className="elements">
                                <div><label>DOB:</label></div>
                                <div><input type="date" name="dob" placeholder="Enter your DOB" value={dob} onChange={changeValues} onFocus={changeValues} required format="yyyy-mm-dd" /></div>
                            </div>
                            <p className="error dob-error">Invalid DOB</p>
                            <div className="elements">
                                <div><label>Address:</label></div>
                                <div><textarea placeholder="Enter your Address" name="address" value={address} onChange={changeValues} onFocus={changeValues} required maxLength={50}></textarea></div>
                            </div>
                            <p className="error address-error">Invalid Address</p>
                            <div>
                               <div><button>CREATE</button></div> 
                                <button onClick={() => nav("/Home")}>GO BACK</button>
                            </div>
                </form>
             </div>
        </div>
    );
}