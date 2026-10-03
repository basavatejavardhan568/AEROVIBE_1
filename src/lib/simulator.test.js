import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advanceBackgroundCharge,
  calculateBurstChargeWh,
  calculateFlowAndPower,
  calculateStationSoc,
  varyTrafficSample,
} from './simulator.js';

test('default traffic settings preserve the flow-guide calculation', () => {
  const result = calculateFlowAndPower({
    speedKmh: 60,
    vehicleMultiplier: 1,
    flowGuide: true,
    crosswindKmh: 3,
  });

  assert.equal(result.flow, 4.44);
  assert.ok(Math.abs(result.power - 7.7200034688) < 0.000001);
});

test('flow is capped at the simulator maximum', () => {
  const result = calculateFlowAndPower({
    speedKmh: 120,
    vehicleMultiplier: 3,
    flowGuide: true,
    crosswindKmh: 15,
  });

  assert.equal(result.flow, 12);
});

test('sample variation stays inside the original airflow and power bands', () => {
  const low = varyTrafficSample({ flow: 10, power: 20 }, () => 0);
  const high = varyTrafficSample({ flow: 10, power: 20 }, () => 1);

  assert.deepEqual(low, { flow: 9, power: 16 });
  assert.deepEqual(high, { flow: 12, power: 28 });
});

test('station state of charge is clamped to its 50 Wh demo capacity', () => {
  assert.equal(calculateStationSoc(18.4), 36.8);
  assert.equal(calculateStationSoc(-5), 0);
  assert.equal(calculateStationSoc(80), 100);
});

test('traffic samples add the existing demo charge increment', () => {
  assert.ok(Math.abs(calculateBurstChargeWh(20) - 0.02442) < 0.000001);
});

test('background charging transfers energy only while the station is above reserve', () => {
  const active = advanceBackgroundCharge({ stationWh: 18.4, evWh: 6.2, evCharging: true, powerW: 10 });
  assert.equal(active.stationWh, 18.392);
  assert.equal(active.evWh, 6.208);
  assert.ok(Math.abs(active.powerW - 9.2) < 0.000001);

  const reserve = advanceBackgroundCharge({ stationWh: 2, evWh: 6.2, evCharging: true, powerW: 10 });
  assert.equal(reserve.stationWh, 2);
  assert.equal(reserve.evWh, 6.2);
  assert.ok(Math.abs(reserve.powerW - 9.2) < 0.000001);
});