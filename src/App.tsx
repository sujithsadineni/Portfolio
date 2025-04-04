import React from 'react';
import Navbar from './components/navbar/Navbar'; 
import './index.css';
// import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
       <Navbar />
      <div className="container" style={{ paddingTop: '100px' }}>
        <h1>Welcome to Sujith's Portfolio</h1>
        <p>This is a modern, responsive portfolio site built with React and SCSS.</p>
      </div>
    </>
  );
};

export default App;

