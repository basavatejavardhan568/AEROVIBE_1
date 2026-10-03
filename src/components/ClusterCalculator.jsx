import { useState } from 'react';
import { DENSITIES } from '../data/site.js';
import { calculateClusterOutput } from '../lib/cluster.js';

function Result({ label, value, detail }) {
  return <div className="calculator-result"><span className="mono-label">{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}

export function ClusterCalculator() {
  const [turbineCount, setTurbineCount] = useState(12);
  const [density, setDensity] = useState('moderate');
  const output = calculateClusterOutput(turbineCount, density);

  return (
    <div className="calculator-panel">
      <div className="calculator-heading"><div><span className="eyebrow">⚡ INTERACTIVE CALCULATOR</span><h3>Cluster scale</h3></div><span className="honest-pill">HONEST MATH</span></div>
      <label className="range-control" htmlFor="turbine-count"><span><span>Number of turbines</span><output>{turbineCount}</output></span><input id="turbine-count" type="range" min="5" max="100" value={turbineCount} onChange={(event) => setTurbineCount(Number(event.target.value))} /><span className="range-ends"><small>5</small><small>100</small></span></label>
      <fieldset className="segmented-fieldset"><legend>Traffic density</legend><div className="segmented-control">{DENSITIES.map((option) => <button aria-pressed={density === option.id} className={density === option.id ? 'segment selected' : 'segment'} key={option.id} onClick={() => setDensity(option.id)} type="button">{option.label}</button>)}</div><small className="field-hint">{DENSITIES.find((option) => option.id === density).vehiclesPerDay.toLocaleString()} vehicles/day · mixed traffic, avg</small></fieldset>
      <div className="calculator-results">
        <Result label="DAILY ENERGY" value={`${output.dailyWh.toFixed(0)} Wh`} detail={`${output.perTurbineWh} Wh / turbine`} />
        <Result label="E-BIKES / DAY (0.6kWh)" value={output.eBikesPerDay.toFixed(2)} detail={`${(1 / output.eBikesPerDay).toFixed(1)} days → 1 scooter full`} />
        <Result label="E-RICKSHAW RANGE" value={`${output.eRickshawRangeKm.toFixed(1)} km`} detail="22 km/kWh average" />
        <Result label="STREETLIGHTS" value={output.streetlights.toFixed(1)} detail="10W × 12h night" />
      </div>
      <p className="calculator-footnote">CO₂ offset estimate: <strong>{output.annualCo2Kg.toFixed(1)} kg/year</strong> per cluster.</p>
    </div>
  );
}