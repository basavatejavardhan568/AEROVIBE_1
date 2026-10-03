export const STATION_CAPACITY_WH = 50;
export const FLOW_GUIDE_MULTIPLIER = 1.8;
export const MAX_AIRFLOW_MPS = 12;

export function calculateFlowAndPower({
  speedKmh,
  vehicleMultiplier = 1,
  flowGuide = true,
  crosswindKmh = 0,
}) {
  const baseFlow = (speedKmh / 3.6) * 0.12 * vehicleMultiplier;
  const guidedFlow = flowGuide ? baseFlow * FLOW_GUIDE_MULTIPLIER : baseFlow;
  const flow = Math.min(MAX_AIRFLOW_MPS, guidedFlow + crosswindKmh * 0.28);

  return {
    flow,
    power: 0.49 * flow ** 3 * 0.18,
  };
}

export function varyTrafficSample({ flow, power }, random = Math.random) {
  return {
    flow: flow * (0.9 + random() * 0.3),
    power: power * (0.8 + random() * 0.6),
  };
}

export function calculateStationSoc(energyWh) {
  return Math.min(100, Math.max(0, (energyWh / STATION_CAPACITY_WH) * 100));
}

export function calculateBurstChargeWh(powerW) {
  return powerW * 0.000555 * 2.2;
}

export function advanceBackgroundCharge({ stationWh, evWh, evCharging, powerW }) {
  const shouldChargeEv = evCharging && stationWh > 2;

  return {
    stationWh: shouldChargeEv ? Math.max(0, stationWh - 0.008) : stationWh,
    evWh: shouldChargeEv ? evWh + 0.008 : evWh,
    powerW: Math.max(0, powerW * 0.92),
  };
}