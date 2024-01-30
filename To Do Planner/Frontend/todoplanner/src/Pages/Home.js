import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../Utils/Table";
export default function Home(){
    const [data, setState] = useState([]);
    const nav = useNavigate();

    const temp = async () => {
        const d = await axios.get("http://localhost:5000/getAllTask").then((result) => {
          return result.data.rows;  
        }).catch((err) => {
          console.log(err)
        });
        setState(d);
      }
      useEffect(() => {
        temp();
      }, [])

    return(
        <div className="home-page">
            <h1>To Do Planner</h1>
            <button onClick={()=>nav("/Details")}>Add</button>
            <button>LogOut</button>
            <div className="table-content"><Table list={data}></Table></div>
        </div>
    );
}