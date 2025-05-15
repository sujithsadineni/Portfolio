import React from "react";
import Navbar from "./components/navbar/Navbar";
import "./index.css";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Projects from "./components/projects/Projects";
import Clients from "./components/clients/Clients";
import ProfessionalExperience from "./components/experience/ProfessionalExperience";
// import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <About />
      <Experience />
      <ProfessionalExperience />
      <Projects />
      <Clients />
      <Footer />
    </>
  );
};

export default App;
