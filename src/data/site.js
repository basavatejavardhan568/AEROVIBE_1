export const VEHICLES = [
  { id: '2w', label: '2-Wheeler', icon: '🛵', multiplier: 0.6 },
  { id: 'car', label: 'Car', icon: '🚗', multiplier: 1 },
  { id: 'bus', label: 'Bus', icon: '🚌', multiplier: 1.8 },
  { id: 'truck', label: 'Truck', icon: '🚚', multiplier: 2.5 },
];

export const DENSITIES = [
  { id: 'light', label: 'LIGHT', shortLabel: 'L', vehiclesPerDay: 3800 },
  { id: 'moderate', label: 'MODERATE', shortLabel: 'M', vehiclesPerDay: 8200 },
  { id: 'heavy', label: 'HEAVY', shortLabel: 'H', vehiclesPerDay: 11400 },
];

export const FLOW_SPEED = { light: 1.2, moderate: 2.1, heavy: 3.2 };

export const SYSTEM_STAGES = [
  { icon: '🚗', title: 'VEHICLE', detail: '60 km/h avg' },
  { icon: '〰️', title: 'AIRFLOW', detail: '2-9 m/s wake' },
  { icon: '◫', title: 'FLOW GUIDE', detail: '1.8x concentrator' },
  { icon: '🌀', title: 'VAWT', detail: 'Savonius H-rotor' },
  { icon: '⚡', title: 'GENERATOR', detail: 'PMG 100W' },
  { icon: '🔋', title: 'POWER STATION', detail: '5kWh LiFePO4', highlight: true },
  { icon: '🧠', title: 'EMS', detail: 'MPPT + prioritize' },
  { icon: '🔌', title: 'EV CHARGING', detail: '48V micro-mob', highlight: true },
];

export const INITIAL_SIMULATION = {
  speedKmh: 60,
  vehicleId: 'car',
  density: 'moderate',
  flowGuide: true,
  crosswindKmh: 3,
  stationWh: 18.4,
  evWh: 6.2,
  powerW: 0,
  airflowMps: 0,
  evCharging: true,
};