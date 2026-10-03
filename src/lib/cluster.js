import { DENSITIES } from '../data/site.js';

const ENERGY_PER_TURBINE_WH = { light: 3.8, moderate: 8.2, heavy: 11.4 };

export function calculateClusterOutput(turbineCount, density) {
  const turbines = Math.max(1, Number(turbineCount) || 1);
  const densityId = DENSITIES.some((option) => option.id === density) ? density : 'moderate';
  const perTurbineWh = ENERGY_PER_TURBINE_WH[densityId];
  const dailyWh = perTurbineWh * turbines;

  return {
    perTurbineWh,
    dailyWh,
    eBikesPerDay: dailyWh / 600,
    eScooterDays: 1500 / Math.max(1, dailyWh),
    eRickshawRangeKm: (dailyWh / 1000) * 22,
    streetlights: dailyWh / 120,
    annualCo2Kg: (dailyWh * 365 * 0.82) / 1000,
  };
}