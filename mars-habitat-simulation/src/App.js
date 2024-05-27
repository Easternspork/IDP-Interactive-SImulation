import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimulationResults from './components/SimulationResults';
import './App.css';

function App() {
  const [thickness, setThickness] = useState(1);
  const [material, setMaterial] = useState('Kevlar');
  const [days, setDays] = useState(30);
  const [simulationData, setSimulationData] = useState(null);

  const radiationLevels = {
    'Kevlar': { 1: 0.8, 5: 0.5, 10: 0.3 },
    'LiH': { 1: 0.7, 5: 0.4, 10: 0.2 },
    'Polypropylene': { 1: 0.9, 5: 0.6, 10: 0.4 },
    'Mylar': { 1: 1.0, 5: 0.7, 10: 0.5 },
    'Carbon': { 1: 0.85, 5: 0.55, 10: 0.35 },
    'No Shield': { 1: 1.0, 5: 1.0, 10: 1.0 },
  };

  const handleSubmit = () => {
    setSimulationData({
      thickness,
      material,
      days,
      radiationLevels,
    });
  };

  return (
    <div className="app">
      {!simulationData ? (
        <motion.div
          className="simulation-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h1>Mars Habitat Radiation Shielding Simulation</h1>
          <label>
            Thickness of Material:
            <select value={thickness} onChange={(e) => setThickness(Number(e.target.value))}>
              <option value={1}>1 cm</option>
              <option value={5}>5 cm</option>
              <option value={10}>10 cm</option>
            </select>
          </label>
          <label>
            Material:
            <select value={material} onChange={(e) => setMaterial(e.target.value)}>
              <option value="Kevlar">Kevlar</option>
              <option value="LiH">LiH</option>
              <option value="Polypropylene">Polypropylene</option>
              <option value="Mylar">Mylar</option>
              <option value="Carbon">Carbon</option>
              <option value="No Shield">No Shield</option>
            </select>
          </label>
          <label>
            Days in Simulation:
            <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} />
          </label>
          <button onClick={handleSubmit}>Start Simulation</button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <SimulationResults data={simulationData} />
        </motion.div>
      )}
    </div>
  );
}

export default App;
