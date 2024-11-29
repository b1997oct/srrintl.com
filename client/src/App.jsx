import React from 'react'
import {
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Books from './pages/Books';
import Readme from './pages/Readme';



export default function App() {
  return createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/books' element={<Books />} />
      <Route path='/readme.md' element={<Readme />} />
    </>
  );
}
