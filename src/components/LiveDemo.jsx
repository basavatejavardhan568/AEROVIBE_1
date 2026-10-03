import { Activity, ArrowRight, BarChart3, BatteryCharging, Wind, Zap } from 'lucide-react';
import { DENSITIES, VEHICLES } from '../data/site.js';
import { SectionHeading } from './PageSections.jsx';

function Readout({ label, value, icon: Icon }) {
  return <div className="readout"><span className="mono-label"><Icon size={13} aria-hidden="true" />{label}</span><strong>{value}</strong></div>;
}

function PowerChart({ samples }) {
  const points = samples.map((power, index) => {
    const x = samples.length < 2 ? 0 : (index / (samples.length - 1)) * 100;
    const y = 39 - (Math.min(80, power) / 80) * 34;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="chart-panel panel-surface">
      <div className="chart-heading"><span className="mono-label"><BarChart3 size={13} />POWER CHART · LIVE SPIKES</span><span>80W</span></div>
      <svg viewBox="0 0 100 42" preserveAspectRatio="none" role="img" aria-label="Live simulated turbine power chart"><path className="chart-gridline" d="M0 5H100M0 22H100M0 39H100" /><polyline className="chart-line" points={points} /></svg>
      <div className="chart-axis"><span>0W</span><span>Time →</span></div>
    </div>
  );
}

export function LiveDemo({ controls, simulation, stationSoc, vehiclesInMotion, running, powerSamples, onControlChange, onStartTraffic, onToggleEvCharging }) {
  const selectedVehicle = VEHICLES.find((vehicle) => vehicle.id === controls.vehicleId);
  const trafficDuration = `${Math.max(1, 5 - controls.densitySpeed)}s`;

  return (
    <section className="content-section demo-section" id="demo">
      <div className="page-width">
        <SectionHeading number="06 / LIVE DEMO · UPGRADED" title="Traffic in. Energy out." meta="SIMULATING" />
        <div className="demo-layout">
          <div className="demo-controls panel-surface">
            <div className="panel-title-row"><span className="eyebrow">CONTROLS</span><span className="formula">P = 0.5·ρ·A·v³·Cp</span></div>
            <label className="range-control" htmlFor="vehicle-speed"><span><span>Vehicle speed</span><output>{controls.speedKmh} km/h</output></span><input id="vehicle-speed" type="range" min="20" max="120" value={controls.speedKmh} onChange={(event) => onControlChange('speedKmh', Number(event.target.value))} /><span className="range-ends"><small>20</small><small>120</small></span></label>
            <fieldset className="vehicle-fieldset"><legend>Vehicle type</legend><div className="vehicle-options">{VEHICLES.map((vehicle) => <button aria-pressed={controls.vehicleId === vehicle.id} className={controls.vehicleId === vehicle.id ? 'vehicle-option selected' : 'vehicle-option'} key={vehicle.id} onClick={() => onControlChange('vehicleId', vehicle.id)} type="button"><span aria-hidden="true">{vehicle.icon}</span>{vehicle.label}</button>)}</div><small className="field-hint">Truck = 2.5× car wake (frontal area)</small></fieldset>
            <fieldset className="segmented-fieldset density-fieldset"><legend>Density</legend><div className="segmented-control compact-segments">{DENSITIES.map((density) => <button aria-label={`${density.label} traffic`} aria-pressed={controls.density === density.id} className={controls.density === density.id ? 'segment selected' : 'segment'} key={density.id} onClick={() => onControlChange('density', density.id)} type="button">{density.shortLabel}</button>)}</div></fieldset>
            <label className="range-control" htmlFor="crosswind-speed"><span><span>Crosswind</span><output>{controls.crosswindKmh} km/h</output></span><input id="crosswind-speed" type="range" min="0" max="15" value={controls.crosswindKmh} onChange={(event) => onControlChange('crosswindKmh', Number(event.target.value))} /><span className="range-ends"><small>0</small><small>15</small></span></label>
            <div className="switch-row"><span>Flow Guide <small>1.8× multiplier</small></span><button className={controls.flowGuide ? 'switch is-on' : 'switch'} type="button" role="switch" aria-checked={controls.flowGuide} aria-label="Flow guide" onClick={() => onControlChange('flowGuide', !controls.flowGuide)}><span /></button></div>
            <button className="button button-cyan send-button" type="button" disabled={running} onClick={onStartTraffic}><Activity size={16} />{running ? 'TRAFFIC FLOWING…' : 'SEND TRAFFIC — 8 VEHICLES'}<ArrowRight size={15} /></button>
          </div>

          <div className="demo-outputs">
            <div className="readout-grid"><Readout label="AIRFLOW" value={`${simulation.airflowMps.toFixed(1)} m/s`} icon={Wind} /><Readout label="POWER" value={`${simulation.powerW.toFixed(1)} W`} icon={Zap} /></div>
            <div className="traffic-visual panel-surface">
              <div className="traffic-heading"><span className="eyebrow">HIGHWAY LANE · TOP VIEW</span><span className="density-indicator"><i />{controls.density.toUpperCase()} TRAFFIC</span></div>
              <div className={running ? 'road-lane is-moving' : 'road-lane'} style={{ '--traffic-duration': trafficDuration }}>
                <div className="lane-line" />
                {vehiclesInMotion.map((vehicle, index) => <span className="passing-vehicle" key={vehicle} style={{ '--vehicle-index': index }} aria-hidden="true">{VEHICLES[(index + 1) % VEHICLES.length].icon}</span>)}
                <div className="lane-turbines" aria-label="Five roadside vertical-axis turbines">{['T01', 'T02', 'T03', 'T04', 'T05'].map((label) => <span className="lane-turbine" key={label}><Wind size={17} /><small>{label}</small></span>)}</div>
              </div>
              <p className="traffic-status">{running ? `${selectedVehicle.icon} ${selectedVehicle.label} wake moving through the turbine array` : 'Press SEND TRAFFIC to generate wake'}</p>
            </div>
            <div className="power-node-demo panel-surface">
              <div className="power-node-heading"><span className="eyebrow">POWER STATION SOC</span><span className="mono-value">{simulation.stationWh.toFixed(2)} Wh / 50 Wh <small>(demo)</small></span></div>
              <div className="soc-track"><span style={{ width: `${stationSoc}%` }} /></div>
              <div className="soc-details"><strong>{stationSoc.toFixed(0)}%</strong><small>Actual bank 5kWh · demo scaled ×100 for visibility</small></div>
              <div className="load-status-grid"><span className={stationSoc >= 20 ? 'load-active' : ''}>💡 Streetlight {stationSoc >= 20 ? 'ON' : 'OFF'}</span><span className={stationSoc >= 30 ? 'load-active' : ''}>📡 Sensors {stationSoc >= 30 ? 'ON' : 'OFF'}</span><span className={stationSoc >= 40 ? 'load-active' : ''}>WiFi {stationSoc >= 40 ? 'ON' : 'OFF'}</span><span className={stationSoc >= 50 ? 'load-active' : ''}>EV 48V {stationSoc >= 50 ? 'ON' : 'OFF'}</span></div>
            </div>
            <div className="ev-output panel-surface">
              <div className="ev-output-heading"><span className="eyebrow">EV CHARGING</span><button className={simulation.evCharging ? 'ev-toggle enabled' : 'ev-toggle'} type="button" onClick={onToggleEvCharging}>{simulation.evCharging ? 'ON' : 'OFF'}</button></div>
              <div className="ev-output-main"><span className="scooter-icon" aria-hidden="true">🛵</span><div><strong>E-Scooter · 48V</strong><small>{stationSoc >= 20 ? 'Slow trickle from buffered energy' : 'Waiting for SOC >20%'}</small></div></div>
              <div className="ev-stats"><div><span>DELIVERED</span><strong>{simulation.evWh.toFixed(2)} Wh</strong></div><div><span>RANGE ADDED</span><strong>{(simulation.evWh / 46).toFixed(2)} km</strong></div><div><span>BATTERY IN</span><strong>{((simulation.evWh / 600) * 100).toFixed(1)}%</strong></div></div>
            </div>
            <PowerChart samples={powerSamples} />
          </div>
        </div>
        <p className="simulation-note"><BatteryCharging size={14} />Demo timing and energy multipliers are accelerated for visibility; they are not field measurements.</p>
      </div>
    </section>
  );
}