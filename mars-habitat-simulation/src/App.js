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
    'Kevlar': { 1: 0.763, 3: 0.755, 5: 0.749 },
    'LiH': { 1: 0.753, 3: 0.729, 5: 0.712 },
    'Polyesterene': { 1: 0.763, 3: 0.748, 5: 0.739 },
    'Mylar': { 1: 0.705, 3: 0.641, 5: 0.604 },
    'Carbon': { 1: 0.769, 3: 0.771, 5: 0.773 },
    'No Shield': { 1: 1.0, 3: 1.0, 5: 1.0 },
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
              <option value={3}>3 cm</option>
              <option value={5}>5 cm</option>
            </select>
          </label>
          <label>
            Material:
            <select value={material} onChange={(e) => setMaterial(e.target.value)}>
              <option value="Kevlar">Kevlar</option>
              <option value="LiH">LiH</option>
              <option value="Polyesterene">Polyesterene</option>
              <option value="Mylar">Mylar</option>
              <option value="Carbon">Carbon</option>
              <option value="No Shield">No Shield</option>
            </select>
          </label>
          <label>
            Days in Simulation:
            <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} />
          </label>
          <p className="note">Note: The simulation also accounts for an additional 10 cm of Martian regolith on top of the chosen material and thickness.</p>
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
