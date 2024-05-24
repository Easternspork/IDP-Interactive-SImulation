import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [shieldThickness, setShieldThickness] = useState(1);
  const [shieldMaterial, setShieldMaterial] = useState('Aluminum');
  const [daysOnMars, setDaysOnMars] = useState(1);
  const [numSEPs, setNumSEPs] = useState(1);
  const [sepIntensity, setSepIntensity] = useState('Low');
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);

  const handleSliderChange = (event) => {
    setShieldThickness(event.target.value);
  };

  const handleMaterialChange = (event) => {
    setShieldMaterial(event.target.value);
  };

  const handleDaysChange = (event) => {
    setDaysOnMars(event.target.value);
  };

  const handleNumSEPsChange = (event) => {
    setNumSEPs(event.target.value);
  };

  const handleSepIntensityChange = (event) => {
    setSepIntensity(event.target.value);
  };

  const startSimulation = () => {
    setSimulationStarted(true);
  };

  useEffect(() => {
    let interval;
    if (simulationStarted && currentDay < daysOnMars) {
      interval = setInterval(() => {
        setCurrentDay(prevDay => prevDay + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [simulationStarted, currentDay, daysOnMars]);

  return (
    <div className="App">
      <header className="App-header">
        <motion.div
          className="parameters"
          initial={{ scale: 1 }}
          animate={{ 
            x: simulationStarted ? -350 : 0,
            width: simulationStarted ? 300 : 600,
            scale: simulationStarted ? 0.75 : 1
          }}
          transition={{ type: 'tween', duration: 0.5, ease: 'linear' }}
        >
          <h1>Mars Simulation Parameters</h1>

          <div className="parameter">
            <label>Thickness of Shield (cm): {shieldThickness}</label>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={shieldThickness} 
              onChange={handleSliderChange} 
            />
          </div>

          <div className="parameter">
            <label>Shield Material:</label>
            <select value={shieldMaterial} onChange={handleMaterialChange}>
              <option value="Aluminum">Aluminum</option>
              <option value="Polyethylene">Polyethylene</option>
              <option value="Kevlar">Kevlar</option>
              <option value="Lead">Lead</option>
            </select>
          </div>

          <div className="parameter">
            <label>Days Spent on Mars:</label>
            <input 
              type="number" 
              value={daysOnMars} 
              onChange={handleDaysChange} 
              min="1"
            />
          </div>

          <div className="parameter">
            <label>Number of SEPs:</label>
            <input 
              type="number" 
              value={numSEPs} 
              onChange={handleNumSEPsChange} 
              min="1"
            />
          </div>

          <div className="parameter">
            <label>SEP Intensity:</label>
            <select value={sepIntensity} onChange={handleSepIntensityChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Extreme">Extreme (highest ever recorded)</option>
            </select>
          </div>

          <button onClick={startSimulation}>Start Simulation</button>
        </motion.div>

        {simulationStarted && (
          <motion.div
            className="simulation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2>Simulation Running</h2>
            <p>Day: {currentDay} / {daysOnMars}</p>
          </motion.div>
        )}
      </header>
    </div>
  );
}

export default App;
