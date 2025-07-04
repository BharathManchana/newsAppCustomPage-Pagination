import './App.css';
import React, {useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [pageSize, setPageSize] = useState(10);

  return (
    <>
    {/* Browser router is written in index.js the starting pointing 
    Switch is replaced with Routes and
      //before 
      <Redirect to="/home" />
      // v6
      <Navigate to="/home" /> */}
    <Navbar setPageSize={setPageSize}></Navbar>
    <Routes>
      <Route path='/' element={<News pageSize={pageSize} country='us' category='general' />} />
      <Route path='/business' element={<News pageSize={pageSize} country='us' category='business' />} />
      <Route path='/entertainment' element={<News pageSize={pageSize} country='us' category='entertainment' />} />
      <Route path='/health' element={<News pageSize={pageSize} country='us' category='health' />} />
      <Route path='/science' element={<News pageSize={pageSize} country='us' category='science' />} />
      <Route path='/technology' element={<News pageSize={pageSize} country='us' category='technology' />} />
      <Route path='/sports' element={<News pageSize={pageSize} country='us' category='sports' />} />
      <Route path='/general' element={<News pageSize={pageSize} country='us' category='general' />} />
    </Routes>

    </>
    
  );
}

export default App;
