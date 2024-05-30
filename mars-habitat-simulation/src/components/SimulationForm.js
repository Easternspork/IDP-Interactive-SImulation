import React, { useState } from 'react';

const SimulationForm = ({ setSimulationData }) => {
  const [thickness, setThickness] = useState(1);
  const [material, setMaterial] = useState('Kevlar');
  const [days, setDays] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    const radiationValues = {
      'Kevlar': { 1: 0.763, 3: 0.755, 5: 0.749 },
      'LiH': { 1: 0.753, 3: 0.729, 5: 0.712 },
      'Polyesterene': { 1: 0.763, 3: 0.748, 5: 0.739 },
      'Mylar': { 1: 0.705, 3: 0.641, 5: 0.604 },
      'Carbon': { 1: 0.769, 3: 0.771, 5: 0.773 },
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
          <option value={3}>3 cm</option>
          <option value={5}>5 cm</option>
        </select>
      </label>
      <label>
        Material:
        <select value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="Kevlar">Kevlar</option>
          <option value="LiH">LiH</option>
          <option value="Polyesterene">Polypropylene</option>
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
