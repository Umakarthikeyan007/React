import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {asignoptions,leveloptions,statusoptions} from "../Utils/AppConstants";
import { sdateValidation,edateValidation } from "../Utils/Validate";

export default function Details(){

        const [task, setTask] = useState('');
        const [sdate, setSdate] = useState(new Date());
        const [edate, setEdate] = useState(new Date());
        const [description, setDescription] = useState('');
        const [rca,setRca] = useState('');
        const [asignee,setAsignee] = useState(asignoptions.label);
        const [level,setLevel] = useState(leveloptions.label);
        const [status,setStatus] = useState(statusoptions.label);

        const nav = useNavigate();

        const changeValues=(e)=>{
            if (e.target.name === 'task') {
                setTask(e.target.value);
            }

            if (e.target.name === 'sdate') {
                setSdate(e.target.value);
                if(!sdateValidation(e.target.value)){
                    document.querySelector('.sdate-error').style.visibility="visible";
                }
                else{
                    document.querySelector('.sdate-error').style.visibility="hidden";
                }
            }

            if (e.target.name === 'edate') {
                setEdate(e.target.value);
                if(!edateValidation(e.target.value,sdate)){
                    document.querySelector('.edate-error').style.visibility="visible";
                }
                else{
                    document.querySelector('.edate-error').style.visibility="hidden";
                }
            }
            if (e.target.name === 'description') {
                setDescription(e.target.value);
            }
            if (e.target.name === 'rca') {
                setRca(e.target.value);
            }
        }
        const handleSubmit=async (e)=>{
            const payload={
               task:task,
               sdate:sdate,
               edate:edate,
               description:description,
               asignee:asignee,
               level:level,
               status:status,
               rca:rca
            }
            console.log(payload);
            e.preventDefault();
        }

    return(
        <div className="details-page">
            <h1>To Do Planner</h1>
            <div className="details-form">
                <form>
                    <div>
                        <div><label>Task:</label></div>
                        <div><input type="text" name="task" required maxLength={50} value={task} onChange={changeValues}/></div>
                    </div>
                    <div>
                        <div><label>Start Date:</label></div>
                        <div> <input type="date" name="sdate" value={sdate} onChange={changeValues} required format="yyyy-mm-dd" /></div>
                    </div>
                    <p className="error sdate-error">Start Date should be greater than or equal to current date</p>
                    <div>
                        <div><label>End Date:</label></div>
                        <div><input type="date" name="edate" value={edate} onChange={changeValues} required format="yyyy-mm-dd" /></div>
                    </div>
                    <p className="error edate-error">End Date should be greater than start date</p>
                    <div>
                        <div><label>Description:</label></div>
                        <div><textarea name="description"required placeholder='Description' rows={8} cols={75} maxLength={500} value={description} onChange={changeValues} /></div>
                    </div>
                    <div>
                        <div><label>Asignee:</label></div>
                        <div> <Select options={asignoptions} name="asignee" onChange={(e)=> setAsignee(e.label)}/></div>
                    </div>
                    <div>
                        <div><label>Level:</label></div>
                        <div><Select options={leveloptions} name="level" onChange={(e)=> setLevel(e.label)}/></div>
                    </div>
                    <div>
                        <div><label>Status:</label></div>
                        <div><Select options={statusoptions} name="status" onChange={(e)=> setStatus(e.label)}/></div>
                    </div>
                    <div>
                        <div><label>RCA:</label></div>
                        <div><textarea name="rca" placeholder='RCA' disabled={!isFixed(status)} rows={8} cols={75} maxLength={5000} value={rca} onChange={changeValues} /></div>
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
                <button onClick={() => nav(-1)} >Go Back</button>
            </div>
        </div>
    );
}

function isFixed(status){
  return (status === "Fixed") ? true : false;
}





