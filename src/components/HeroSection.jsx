import { ArrowRight, BatteryCharging, Wind, Zap } from 'lucide-react';

function Metric({ label, value, detail, icon: Icon }) {
  return <div className="metric-panel"><span className="metric-icon"><Icon size={16} aria-hidden="true" /></span><span className="mono-label">{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}

export function HeroSection({ airflowMps, powerW, stationSoc, evWh }) {
  const metrics = [
    { label: 'AIRFLOW PER VEHICLE', value: `${airflowMps.toFixed(1)} m/s`, detail: 'at turbine face', icon: Wind },
    { label: 'POWER / TURBINE', value: `${powerW.toFixed(1)} W`, detail: 'Savonius Cp 0.18', icon: Zap },
    { label: 'POWER NODE', value: `${stationSoc.toFixed(0)}% SOC`, detail: 'LiFePO4 5kWh cluster', icon: BatteryCharging },
    { label: 'EV CHARGING', value: `${evWh.toFixed(1)} Wh`, detail: '48V e-scooter', icon: ArrowRight },
  ];

  return (
    <section className="hero-section" id="top">
      <div className="page-width hero-inner">
        <div className="hero-badges"><span className="outline-badge cyan-badge"><i />NOW WITH POWER STATION</span><span className="outline-badge green-badge">INTEGRATED EV CHARGING</span><span className="outline-badge muted-badge">COMPACT VAWT · 0.5–1.2kW CLUSTER</span></div>
        <h1>Every Vehicle Moves Air.<br /><span>We Turn It Into Energy.</span></h1>
        <p className="hero-copy">A compact vertical-axis wind turbine system that harvests wake airflow from highway traffic. Now feeding a central Power Node and integrated micro-mobility EV charging — honest, measured, no hype.</p>
        <div className="hero-actions"><a className="button button-light" href="#how">Explore System <ArrowRight size={15} /></a><a className="button button-outline" href="#demo"><span className="live-dot" /> Launch Demo</a><span className="telemetry mono-label"><i />LIVE TELEMETRY</span></div>
        <div className="metrics-grid">{metrics.map((metric) => <Metric {...metric} key={metric.label} />)}</div>
      </div>
    </section>
  );
}