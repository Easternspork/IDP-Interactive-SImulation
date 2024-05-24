import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimulationForm from './components/SimulationForm';
import SimulationResults from './components/SimulationResults';
import './App.css';

const App = () => {
  const [simulationData, setSimulationData] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Mars Habitat Radiation Simulation</h1>
      </header>
      {!simulationData ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SimulationForm setSimulationData={setSimulationData} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SimulationResults data={simulationData} />
        </motion.div>
      )}
    </div>
  );
};

export default App;
