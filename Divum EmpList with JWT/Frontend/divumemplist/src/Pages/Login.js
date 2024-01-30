import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {emailValidation} from "../Utils/Validate";
import axios from "axios";

export default function Login(){
    const nav=useNavigate();
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

    const handleSubmit=async (e)=>{
        const payload = {
            email: email,
            password:password
        }
        e.preventDefault();

       try {
        await axios.post("http://localhost:5000/mainUser/authenticateUser",payload,{
            withCredentials:true
        }).then((result)=>{
            console.log(result.data);
            return result.data;
        })
       } catch (error) {
        console.log(error);
       }  
       nav("/Home");
    }

    return(
        <div className="login-page">
          <h1>Divum Employee Details </h1>

          <div className="new-user-suggestion">
            <h3>New to this Page?</h3>
            <button onClick={()=>nav("/SignUp")}>Sign Up</button>
          </div>

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
