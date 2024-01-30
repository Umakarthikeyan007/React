import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {emailValidation} from "../Utils/Validate";
import axios from "axios";

export default function Login(){
    const nav = useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

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
        if(e.target.name === 'pwd'){
            setPassword(e.target.value);
        }
    }

    const handleSubmit= async (e)=>{
        const payload={
            email:email,
            password:password
        }
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/authenticateUser',payload,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(response.status===500){
                throw new Error(response);
            }
            else if (response.status === 205){
               window.alert("Email doesn't exists");
            }
            else if (response.status === 200){
                window.alert("Logged in Successfully");
                nav("/Home");
            } 
        } catch (error) {
            return error
        }
    }

    return(
        <div className="login-page">
            <h1>To Do Planner</h1>
            <div>
                <h3>New to To Do Planner?</h3>
                <button onClick={()=>nav("/SignUp")}>SignUp</button>
            </div><br/><br/>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <div><label htmlFor="email">Email:</label></div>
                        <div><input type="email" id ="email" name="email" value={email} onChange={changeValues} placeholder="Enter the Email" required/></div>
                    </div>
                    <p className="error email-error">Invalid Email</p>
                    <div>
                        <div><label htmlFor="pwd">Password:</label></div>
                        <div><input type="password" id="pwd" name="pwd" value={password} onChange={changeValues} placeholder="Enter the Password" required/></div>
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}