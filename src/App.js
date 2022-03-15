import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./form/Home";
import Add from "./form/Add";
import Edit from "./form/Edit";

function App() {
  return (
         <Routes>
           <Route path="/home" element={<Home/>}  />
           <Route path="/add" element={<Add/>} />
           <Route path="/edit" element={<Edit/>} />
         </Routes>
  );
}

export default App;
