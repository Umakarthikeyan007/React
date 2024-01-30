import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Pages/logo.svg';
import axios from 'axios';
import Table from './Table.js';
import { BsFillQuestionCircleFill } from "react-icons/bs";

async function deleted(data){
  document.querySelector('.alertbox').classList.remove('popup');
  window.location.reload();
  await axios.delete(`http://localhost:8002/Users/${data}`).then((result) => {
  }).catch((err) => {
    console.log(err)
  });
}

function cancel(){
  document.querySelector('.alertbox').classList.remove('popup');
}
function First() {

  const [data, setState] = useState([]);
  const nav = useNavigate();

  const temp = async () => {
    const d = await axios.get("http://localhost:8002/Users/get").then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err)
    });
    setState(d);
  }
  useEffect(() => {
    temp();
  }, [])


  return (

    <div>
      <div className='header'><img src={logo} className="App-logo" alt="logo" />
        <h1 className='titlename'>Employee Details</h1>
        <button className="btn add" onClick={() => nav("./Details")}>ADD+</button>
      </div>
      <div className='content'><center> <Table list={data}></Table></center> </div>
      <div className='alertbox'><div className='icon'>{<BsFillQuestionCircleFill/>}</div>
      <h3>Are You Sure You Want to Delete this Data?</h3>
      <button onClick={()=>deleted(sessionStorage.getItem('email'))}>Yes</button>
      <button onClick={()=>cancel()}>No</button>
      </div>
      <div className='footer'>
        <ul>
          <li><a href="https://divum.in/company.html" target='blank'>About Us</a></li>
          <li><a href="https://divum.in/npd-meet.html" target='blank'>NPD Meet</a></li>
          <li><a href="https://divum.in/L&D.html" target='blank'>L&D</a></li>
          <li><a href="https://divum.in/gallery.html" target='blank'>Gallery</a></li>
          <li><a href="https://divum.in/newsletter.html" target='blank'>NewsLetters</a></li>
        </ul>
      </div>
    </div>
  );
}
export default First;