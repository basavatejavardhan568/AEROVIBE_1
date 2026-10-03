import { Activity, ArrowRight, BatteryCharging, CarFront, Check, Fan, Lightbulb, Network, Wind, Zap } from 'lucide-react';
import { SYSTEM_STAGES } from '../data/site.js';
import { ClusterCalculator } from './ClusterCalculator.jsx';

export function SectionHeading({ number, title, meta }) {
  return <div className="section-heading"><div><span className="section-number">{number}</span><h2>{title}</h2></div><span className="section-meta">{meta}</span></div>;
}

export function ConceptSection() {
  return (
    <section className="content-section" id="concept">
      <div className="page-width">
        <SectionHeading number="01 / HIDDEN RESOURCE" title="Vehicles don't just move. They push." meta="WAKE PROFILE · TOP VIEW" />
        <div className="concept-layout">
          <div className="concept-copy">
            <p>At 60 km/h a car displaces ~80 m³ of air per second. That wake is usually wasted as turbulence. VAYU captures the 2–5 m/s usable component at roadside with a low-inertia VAWT. No new land, no tower — just median-mounted poles.</p>
            <div className="wake-facts">
              <div><span>FRONT</span><strong>High-pressure bow wave</strong><small>+1.8 m/s</small></div>
              <div><span>SIDES</span><strong>Shear flow acceleration</strong><small>+2.4 m/s</small></div>
              <div><span>WAKE</span><strong>Low-pressure turbulent trail</strong><small>3–6 m/s for 2.5s</small></div>
            </div>
            <aside className="honesty-note"><strong>HONEST MEASURE</strong><span>Usable energy is milliwatts to watts per pass. Value comes from thousands of passes × clustering × storage. We never claim highway fast-charging.</span></aside>
          </div>
          <div className="wake-diagram" aria-label="Top-view illustration of a vehicle wake and a roadside turbine">
            <div className="diagram-caption mono-label">VEHICLE WAKE PROFILE · TOP VIEW</div>
            <div className="diagram-road"><span className="road-dash" /><span className="road-dash" /><span className="road-dash" /></div>
            <div className="diagram-car"><CarFront size={35} /><span>VEHICLE</span></div>
            <div className="wake-stream"><Wind size={42} /><span>WAKE FLOW</span></div>
            <div className="wake-turbine"><Fan size={30} /><span>TURBINE · 1.2m OFFSET</span></div>
            <div className="diagram-specs"><span>ρ = 1.225 kg/m³</span><span>A = 0.8 m²</span><span>Cp = 0.18</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SystemChainSection() {
  return (
    <section className="content-section chain-section" id="how">
      <div className="page-width">
        <SectionHeading number="02 / SYSTEM CHAIN" title="One wake. Eight stages." meta="END-TO-END" />
        <div className="stage-scroll"><ol className="stage-list">{SYSTEM_STAGES.map((stage, index) => <li className={stage.highlight ? 'stage-card highlighted' : 'stage-card'} key={stage.title}><span className="stage-icon" aria-hidden="true">{stage.icon}</span><strong>{stage.title}</strong><small>{stage.detail}</small>{index < SYSTEM_STAGES.length - 1 && <ArrowRight className="stage-arrow" size={16} aria-hidden="true" />}</li>)}</ol></div>
        <div className="chain-notes"><div><strong>P = 0.5·ρ·A·v³·Cp</strong><span>Conservative Cp 0.18, measured not theoretical max.</span></div><div><strong>Guide = 1.8×</strong><span>Ducted deflector from wind-tunnel data, not free energy.</span></div><div><strong>Cluster gain</strong><span>12 nodes share DC bus → 1 Power Node, reduces inverter loss.</span></div></div>
      </div>
    </section>
  );
}

const POWER_USES = [
  { title: 'Buffer Battery Bank', text: 'LiFePO4 5kWh per cluster, 6000 cycles, SOC 0–100%. Demo scaled to 50Wh for visibility. Real: 48V 100Ah.' },
  { title: 'Smart EMS', text: 'MPPT per turbine, load priority: 1. Lights  2. Sensors  3. EV  4. Storage. Automatic islanding.' },
  { title: 'Microgrid Output', text: 'Street lights 10W LED, sensors, CCTV, public WiFi 20W, emergency 5V USB, 48V e-mobility.' },
];

export function PowerStationSection({ stationSoc, stationWh }) {
  const outputs = [
    ['Energy / node / day', '3–12 Wh'],
    ['Cluster · 12 nodes', '40–140 Wh/day'],
    ['Streetlight · 10W × 12h', '120 Wh/night'],
    ['Annual CO₂ offset / cluster', '12–38 kg'],
    ['Uptime · heavy traffic', '94%'],
    ['DC bus loss · 150m', '< 4% @ 48V'],
  ];

  return (
    <section className="content-section power-section" id="power">
      <div className="page-width">
        <SectionHeading number="04 / POWER STATION · NEW" title="From gusts to grid: the VAYU Power Node" meta="48V DC MICROGRID" />
        <p className="section-intro">Each turbine is not standalone. 10–20 turbines along 150m feed one central Power Station via underground 48V DC bus. Low voltage means safe, low loss at this distance, with no AC sync needed. The node buffers, prioritizes, and outputs.</p>
        <div className="power-layout">
          <div className="power-diagram panel-surface">
            <div className="diagram-topline"><span className="eyebrow">POWER FLOW · LIVE NODE 07</span><span className="status-light">ONLINE</span></div>
            <div className="turbine-feeds">{['T1', 'T2', 'T3', 'T4'].map((name) => <div className="feed" key={name}><Wind size={22} /><small>{name}</small></div>)}</div>
            <div className="bus-line"><span>48V DC BUS · 150m</span></div>
            <div className="buffer-unit"><BatteryCharging size={25} /><div><strong>BUFFER BANK</strong><small>LiFePO₄ · 5kWh</small></div><span className="buffer-soc">{stationSoc.toFixed(0)}%</span></div>
            <div className="power-outputs">{[['Streetlight', Lightbulb, 20], ['Sensors', Activity, 30], ['WiFi', Network, 40], ['EV 48V', Zap, 50]].map(([label, Icon, threshold]) => <div className={stationSoc >= threshold ? 'output-port active' : 'output-port'} key={label}><Icon size={16} /><span>{label}</span><Check size={14} /></div>)}</div>
            <div className="diagram-energy">{stationWh.toFixed(1)} Wh buffered · demo scale</div>
          </div>
          <div className="power-copy">
            <div className="power-principles">{POWER_USES.map((item, index) => <article className="principle-row" key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
          </div>
        </div>
        <div className="scale-block"><div className="scale-heading"><span className="eyebrow">CLUSTER SCALE · HONEST NUMBERS</span><span>LIVE ESTIMATES</span></div><div className="scale-grid">{outputs.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><p className="scale-note">A 5kWh bank gives roughly 35× daily harvest buffer, helping it ride through low-traffic days. The system is sized around conservative output, not brochure peak.</p></div>
        <div className="distribution-row"><span className="eyebrow">POWER DISTRIBUTION</span><div className="distribution-bar"><i /><i /><i /><i /></div><div className="distribution-key"><span>40% Lights</span><span>30% EV</span><span>20% Storage</span><span>10% Sensors</span></div></div>
      </div>
    </section>
  );
}

export function MobilitySection() {
  const features = ['Delivery fleet top-up', 'College campus', 'Metro last-mile', 'LiFePO₄ safe', 'Zero grid cost', 'Works with traffic'];

  return (
    <section className="content-section mobility-section" id="ev">
      <div className="page-width">
        <SectionHeading number="05 / EV CHARGING · NEW" title="Traffic powers mobility." meta="INTEGRATED EV CHARGING" />
        <p className="section-intro">Not for highway fast-charging — we're honest. A full EV car (30kWh) needs roughly 800 node-days. Micro-mobility is viable today: e-bike 0.6kWh, e-scooter 1.5kWh, e-rickshaw 2.5kWh. Last-mile, low-grid-dependence charging works around the clock when traffic is flowing.</p>
        <div className="mobility-tiers">
          <article className="mobility-tier"><div className="tier-heading"><span>TIER 1 · VAYU LITE</span><strong>PRACTICAL TODAY</strong></div><div className="tier-main"><div className="tier-icon"><CarFront size={26} /></div><div><h3>Micro-Mobility Hub</h3><p>48V · 0.5–1kW slow charging</p></div></div><ul><li>2× e-bike / scooter ports + 1× e-rickshaw</li><li>E-scooter 1.5kWh ≈ 40 node-days @ moderate traffic</li><li>One cluster charges a scooter in ~1.5 days (honest 2-bike 0.6kWh)</li></ul><p className="tier-use">Use: delivery fleet top-up, college campus, metro last-mile.</p></article>
          <article className="mobility-tier future-tier"><div className="tier-heading"><span>TIER 2 · VAYU BOOST</span><strong>FUTURE BUFFER</strong></div><div className="tier-main"><div className="tier-icon"><BatteryCharging size={26} /></div><div><h3>Trickle + Buffer</h3><p>Type 2 slow AC 1.2kW · buffered</p></div></div><ul><li>20 moderate nodes yield about 8Wh/day per node</li><li>3kWh EV top-up ≈ 31 days per cluster (emergency only)</li><li>At scale, 100 clusters approach one car top-up per day</li></ul><p className="tier-use">Not a grid fast-charge replacement. Built for SOS top-up and night parking.</p></article>
        </div>
        <div className="mobility-lower"><div className="charge-illustration"><span className="eyebrow">CHARGING STATION · SIDE VIEW</span><div className="charging-scene"><div className="scene-turbines"><Wind /><Wind /><Wind /><Wind /></div><div className="scene-bus">UNDERGROUND DC BUS</div><div className="scene-charger"><Zap /><strong>VAYU CHARGE</strong></div><div className="scene-vehicle">🔌　🚙　🛵</div></div><div className="mobility-benefits">{features.map((feature) => <span key={feature}><Check size={14} />{feature}</span>)}</div></div><ClusterCalculator /></div>
        <p className="honesty-footer">HONEST: This is a micro-mobility and resilience system, not a replacement for grid fast-charge.</p>
      </div>
    </section>
  );
}