// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Additem from './pages/Additem';
import AssetItem from './pages/AssetItem';
import Edit from './pages/Edit';


export default function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/" element={<AssetItem/>}/>
        <Route path="/additem" element={<Additem/>}/>
        <Route path='/update/:serialno' element={<Edit/>}/>
  
      </Routes>
    </BrowserRouter>
  );
}
