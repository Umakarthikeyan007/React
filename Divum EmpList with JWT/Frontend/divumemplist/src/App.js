import './App.css';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Update from "./Pages/Update";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Login/>}/>
        <Route exact path = "/SignUp" element={<SignUp/>}/>
        <Route exact path = "/Home" element={<Home/>}/>
        <Route exact path = "/Details" element={<Details/>}/>
        <Route exact path = "/Update" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
