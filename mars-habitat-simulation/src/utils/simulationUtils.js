export const generateRadiationLevels = (days, dailyRadiation) => {
  const levels = [];
  const mean = 0.64;
  const stdDev = 0.12;

  for (let i = 0; i < days; i++) {
    const randomFactor = mean + stdDev * (Math.random() - 0.5) * 2;
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
