import React, { useState } from 'react';

const SimulationForm = ({ setSimulationData }) => {
  const [thickness, setThickness] = useState(1);
  const [material, setMaterial] = useState('Kevlar');
  const [days, setDays] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    const radiationValues = {
      'Kevlar': { 1: 0.50, 5: 0.30, 10: 0.15 },
      'LiH': { 1: 0.40, 5: 0.25, 10: 0.10 },
      'Polypropylene': { 1: 0.45, 5: 0.28, 10: 0.12 },
      'Mylar': { 1: 0.55, 5: 0.32, 10: 0.18 },
      'Carbon': { 1: 0.48, 5: 0.29, 10: 0.14 },
    };
    setSimulationData({
      thickness,
      material,
      days,
      radiationPerThickness: radiationValues[material],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="simulation-form">
      <label>
        Thickness (cm):
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
        </select>
      </label>
      <label>
        Number of days:
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          min="1"
        />
      </label>
      <button type="submit">Start Simulation</button>
    </form>
  );
};

export default SimulationForm;
