import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../Utils/Table"
import { useState , useEffect } from "react";

export default function Home(){
    const [data, setState] = useState([]);
    const nav = useNavigate();

    const temp = async () => {
        const d = await axios.get("http://localhost:5000/Users/displaytable",{
            withCredentials:true
        }).then((result) => {
          return result.data || [];
        }).catch((err) => {
            nav('/');
        });
        setState(d);
      }

      useEffect(() => {
        temp();
      }, [])


    const logout =async ()=>{
        try {
            const response = await axios.get('http://localhost:5000/mainUser/logout',{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(response.status===200){
                nav("/");
                return true;    
            }
            else{
                return false;
            }
        } catch (error) {
            return error;
        }    
    }

    return(
        <div className="home-page">
             <h1>Divum Employee Details</h1>
             <button onClick={()=>nav("/Details")}>Add</button>
             <button onClick={logout}>LogOut</button>
              <div className="home-table">
              <Table list={data}></Table>
              </div>
        </div>
    );
}