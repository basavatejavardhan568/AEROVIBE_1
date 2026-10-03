import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateClusterOutput } from './cluster.js';

test('moderate traffic at twelve turbines preserves the original cluster estimate', () => {
  const result = calculateClusterOutput(12, 'moderate');

  assert.equal(result.perTurbineWh, 8.2);
  assert.ok(Math.abs(result.dailyWh - 98.4) < 0.000001);
  assert.ok(Math.abs(result.eBikesPerDay - 0.164) < 0.000001);
  assert.ok(Math.abs(result.eScooterDays - 15.243902439) < 0.000001);
  assert.ok(Math.abs(result.eRickshawRangeKm - 2.1648) < 0.000001);
  assert.ok(Math.abs(result.streetlights - 0.82) < 0.000001);
  assert.ok(Math.abs(result.annualCo2Kg - 29.45112) < 0.000001);
});

test('unknown traffic density falls back to moderate estimates', () => {
  assert.ok(Math.abs(calculateClusterOutput(12, 'unknown').dailyWh - 98.4) < 0.000001);
});