import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {emailValidation,nameValidation,passwordValidation} from "../Utils/Validate";
import axios from "axios";

export default function SignUp(){
    const nav = useNavigate();

    const [email,setEmail]=useState("");
    const [user,setUser]=useState("");
    const [password,setPassword]=useState("");
    const [cnfmpassword,setCnfmpassword]=useState("");

    const changeValues=(e)=>{
        if (e.target.name === 'email') {
            setEmail(e.target.value);
            if (!emailValidation(e.target.value)) {
                document.querySelector('.email-error').style.visibility="visible";
            }
            else {
                document.querySelector('.email-error').style.visibility="hidden";
            }
        }

        if (e.target.name === 'user') {
            setUser(e.target.value);
            if (!nameValidation(e.target.value)) {
                document.querySelector('.name-error').style.visibility="visible";
            }
            else {
                document.querySelector('.name-error').style.visibility="hidden";
            }

        }

        if (e.target.name === 'pwd') {
            setPassword(e.target.value);
        }

        if (e.target.name === 'cpwd') {
            setCnfmpassword(e.target.value);
            if (!passwordValidation(e.target.value,password)) {
                document.querySelector('.confirm-error').style.visibility="visible";
            }
            else {
                document.querySelector('.confirm-error').style.visibility="hidden";
            }

        }
    }

    const handleSubmit=async (e)=>{
        const payload = {
            email: email,
            username: user,
            password:password
        }
        e.preventDefault();

       try {
        await axios.post("http://localhost:5000/mainUser/addUser",payload,{
            withCredentials:true
        }).then((result)=>{
            console.log(result.data);
            return result.data;
        })
       } catch (error) {
        console.log(error);
       }  
       nav("/");
    }
    return(
        <div className="signup-page">
             <h1>To Do Planner</h1>
            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                    <h1>SignUp</h1>
                    <div>
                        <div><label htmlFor ="email">Email:</label></div>
                        <div><input type="email" id ="email" name="email" placeholder="Enter the Email" value={email} onChange={changeValues} required/></div>
                    </div>
                    <p className="error email-error">Invalid Email</p>
                    <div>
                        <div><label htmlFor="user">User Name:</label></div>
                        <div><input type="text" id ="user" name="user" placeholder="Enter the UserName" value={user} onChange={changeValues} required/></div>
                    </div>
                    <p className="error name-error">Invalid UserName</p>
                    <div>
                        <div><label htmlFor="pwd">Password:</label></div>
                        <div><input type="password" id="pwd" name="pwd" placeholder="Enter the Password" value={password} onChange={changeValues} required/></div>
                    </div>
                    <div>
                        <div><label htmlFor="cpwd">Confirm Password:</label></div>
                        <div><input type="password" id="cpwd" name="cpwd" placeholder="Enter the Password"value={cnfmpassword} onChange={changeValues} required/></div>
                    </div>
                    <p className="error confirm-error">Enter the Correct password which is Mentioned above</p>
                    <button>SignUp</button>          
                </form>
            </div>
            <button onClick={()=>nav(-1)}>Go Back</button>
        </div>
    );
}