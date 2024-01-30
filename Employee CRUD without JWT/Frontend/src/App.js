import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import First from "./Pages/First.js";
import Details from "./Pages/Details.js";
import Update from './Pages/Update.js';
import React from 'react';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route exact path="/First" element={<First />} />
        <Route exact path="/Details" element={<Details />} />
        <Route exact path="/Update" element={<Update />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
