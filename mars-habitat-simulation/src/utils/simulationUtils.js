export const generateRadiationLevels = (days, dailyRadiation) => {
  const levels = [];
  const mean = 0.64;
  const stdDev = 0.12;

  const getNormalDistributedRandom = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  for (let i = 0; i < days; i++) {
    const randomFactor = mean + stdDev * getNormalDistributedRandom();
    levels.push(dailyRadiation * randomFactor);
  }

  return levels;
};

export const calculateCumulativeCancerRisk = (levels) => {
  let cumulativeRisk = 0;
  return levels.map(level => {
    cumulativeRisk += (level / 1000) * 0.97; // level is in mSv, so level/1000 gives Sv
    return cumulativeRisk;
  });
};
