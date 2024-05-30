import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { calculateCumulativeCancerRisk, generateRadiationLevels } from '../utils/simulationUtils';

const SimulationResults = ({ data }) => {
  const [radiationLevels, setRadiationLevels] = useState([]);
  const [cumulativeCancerRisk, setCumulativeCancerRisk] = useState([]);
  const [radiationChartData, setRadiationChartData] = useState(null);
  const [cancerRiskChartData, setCancerRiskChartData] = useState(null);
  const [radiationReceived, setRadiationReceived] = useState(0);
  const [radiationComparisonNormal, setRadiationComparisonNormal] = useState('');
  const [radiationComparisonWorker, setRadiationComparisonWorker] = useState('');
  const [radiationComparisonAstronaut, setRadiationComparisonAstronaut] = useState('');

  useEffect(() => {
    if (data) {
      const { thickness, material, days, radiationLevels } = data;
      const dailyRadiation = radiationLevels[material][thickness];
      const levels = generateRadiationLevels(days, dailyRadiation);
      const cumulativeRisk = calculateCumulativeCancerRisk(levels);

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

      // Calculate total radiation received and comparisons
      const totalReceivedRadiation = levels.reduce((sum, level) => sum + level, 0); // Total in mSv
      setRadiationReceived(totalReceivedRadiation.toFixed(2));

      const allowableRadiationNormal = 1; // Annual allowable for normal person in mSv
      const allowableRadiationWorker = 50; // Annual allowable for radiation worker in mSv
      const allowableRadiationAstronaut = 600; // Maximum radiation for an astronaut in mSv

      const comparisonNormal = totalReceivedRadiation / allowableRadiationNormal;
      setRadiationComparisonNormal(comparisonNormal.toFixed(2));

      const comparisonWorker = totalReceivedRadiation / allowableRadiationWorker;
      setRadiationComparisonWorker(comparisonWorker.toFixed(2));

      const comparisonAstronaut = totalReceivedRadiation / allowableRadiationAstronaut;
      setRadiationComparisonAstronaut(comparisonAstronaut.toFixed(2));
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
      <p>Total Radiation Received: {radiationReceived} mSv</p>
      <p>Final Cumulative Cancer Risk: {cumulativeCancerRisk[cumulativeCancerRisk.length - 1].toFixed(2)}%</p>
      <p>Radiation received is {radiationComparisonNormal} times than normal person's annual limit (1 mSv/year)</p>
      <p>Radiation received is {radiationComparisonWorker} times than radiation worker's annual limit (50 mSv/year)</p>
      <p>Radiation received is {radiationComparisonAstronaut} times than the limit for an astronaut (NASA-STD-3001) (600 mSv/mission)</p>
      <button onClick={() => window.location.reload()}>Restart Simulation</button>
    </div>
  );
};

export default SimulationResults;
