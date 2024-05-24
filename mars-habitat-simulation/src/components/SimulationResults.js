import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { calculateCumulativeCancerRisk, generateRadiationLevels } from '../utils/simulationUtils';

const SimulationResults = ({ data }) => {
  const [radiationLevels, setRadiationLevels] = useState([]);
  const [cumulativeCancerRisk, setCumulativeCancerRisk] = useState([]);
  const [radiationChartData, setRadiationChartData] = useState(null);
  const [cancerRiskChartData, setCancerRiskChartData] = useState(null);
  const [radiationComparison, setRadiationComparison] = useState('');

  useEffect(() => {
    if (data) {
      const { thickness, material, days, radiationPerThickness } = data;
      const dailyRadiation = radiationPerThickness[thickness];
      const materialEffectiveness = getMaterialEffectiveness(material);
      const levels = generateRadiationLevels(days, dailyRadiation * materialEffectiveness);
      const cumulativeRisk = calculateCumulativeCancerRisk(levels);

      console.log(cumulativeRisk)

      setRadiationLevels(levels);
      setCumulativeCancerRisk(cumulativeRisk);

      const radiationChartData = {
        labels: Array.from({ length: days }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Radiation Level (mSv)',
            data: levels,
            borderColor: 'red',
            fill: false,
          },
        ],
      };

      const cancerRiskChartData = {
        labels: Array.from({ length: days }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Cumulative Cancer Risk (%)',
            data: cumulativeRisk,
            borderColor: 'blue',
            fill: false,
          },
        ],
      };

      setRadiationChartData(radiationChartData);
      setCancerRiskChartData(cancerRiskChartData);

      // Calculate radiation comparison
      const allowableLevels = 1; // Normal person: 1 mSv/year
      const totalAllowableRadiation = allowableLevels * (days / 365);
      const totalReceivedRadiation = levels.reduce((sum, level) => sum + level, 0); // Convert to Sv
      const comparison = totalReceivedRadiation / totalAllowableRadiation;
      setRadiationComparison(comparison.toFixed(5));
    }
  }, [data]);

  if (!radiationChartData || !cancerRiskChartData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="results-container">
      <h2>Simulation Results</h2>
      <div className="chart-container">
        <h3>Radiation Levels Over Time</h3>
        <Line data={radiationChartData} />
      </div>
      <div className="chart-container">
        <h3>Cumulative Cancer Risk Over Time</h3>
        <Line data={cancerRiskChartData} />
      </div>
      <p>Final Cumulative Cancer Risk: {cumulativeCancerRisk[cumulativeCancerRisk.length - 1].toFixed(5)}%</p>
      <p>Radiation received is {radiationComparison} times more than normal person's limit</p>
      <button onClick={() => window.location.reload()}>Restart Simulation</button>
    </div>
  );
};

// Function to get the effectiveness of the chosen material in shielding radiation
const getMaterialEffectiveness = (material) => {
  // Add effectiveness values for each material
  const materialEffectivenessMap = {
    Kevlar: 0.8,
    LiH: 0.6,
    Polypropylene: 0.5,
    Mylar: 0.7,
    Carbon: 0.9,
  };
  return materialEffectivenessMap[material];
};

export default SimulationResults;
