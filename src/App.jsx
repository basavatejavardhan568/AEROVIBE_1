import { useEffect, useRef, useState } from 'react';
import { BatteryCharging } from 'lucide-react';
import { HeroSection } from './components/HeroSection.jsx';
import { LiveDemo } from './components/LiveDemo.jsx';
import { ConceptSection, MobilitySection, PowerStationSection, SystemChainSection } from './components/PageSections.jsx';
import { SiteHeader } from './components/SiteHeader.jsx';
import { FLOW_SPEED, INITIAL_SIMULATION, VEHICLES } from './data/site.js';
import { advanceBackgroundCharge, calculateBurstChargeWh, calculateFlowAndPower, calculateStationSoc, varyTrafficSample } from './lib/simulator.js';

const initialControls = {
  speedKmh: INITIAL_SIMULATION.speedKmh,
  vehicleId: INITIAL_SIMULATION.vehicleId,
  density: INITIAL_SIMULATION.density,
  flowGuide: INITIAL_SIMULATION.flowGuide,
  crosswindKmh: INITIAL_SIMULATION.crosswindKmh,
};

export default function App() {
  const [controls, setControls] = useState(initialControls);
  const [simulation, setSimulation] = useState(INITIAL_SIMULATION);
  const [running, setRunning] = useState(false);
  const [vehiclesInMotion, setVehiclesInMotion] = useState([]);
  const [powerSamples, setPowerSamples] = useState(Array(32).fill(0));
  const burstTimer = useRef(null);
  const stationSoc = calculateStationSoc(simulation.stationWh);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSimulation((current) => ({ ...current, ...advanceBackgroundCharge(current) }));
    }, 120);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => () => {
    if (burstTimer.current !== null) window.clearInterval(burstTimer.current);
  }, []);

  function updateControl(name, value) {
    setControls((current) => ({ ...current, [name]: value }));
  }

  function startTraffic() {
    if (burstTimer.current !== null) return;

    const vehicle = VEHICLES.find((item) => item.id === controls.vehicleId);
    const settings = { ...controls, vehicleMultiplier: vehicle.multiplier };
    let ticks = 0;
    setRunning(true);
    setVehiclesInMotion(Array.from({ length: 8 }, (_, index) => index + 1));

    burstTimer.current = window.setInterval(() => {
      ticks += 1;
      if (ticks % 6 === 0) {
        const measured = varyTrafficSample(calculateFlowAndPower(settings));
        setSimulation((current) => ({
          ...current,
          airflowMps: measured.flow,
          powerW: measured.power,
          stationWh: Math.min(50, current.stationWh + calculateBurstChargeWh(measured.power)),
        }));
        setPowerSamples((current) => [...current.slice(-47), measured.power]);
      }
      if (ticks > 180) {
        window.clearInterval(burstTimer.current);
        burstTimer.current = null;
        setRunning(false);
        setVehiclesInMotion([]);
      }
    }, 32);
  }

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection airflowMps={simulation.airflowMps} powerW={simulation.powerW} stationSoc={stationSoc} evWh={simulation.evWh} />
        <ConceptSection />
        <SystemChainSection />
        <PowerStationSection stationSoc={stationSoc} stationWh={simulation.stationWh} />
        <MobilitySection />
        <LiveDemo controls={{ ...controls, densitySpeed: FLOW_SPEED[controls.density] }} simulation={simulation} stationSoc={stationSoc} vehiclesInMotion={vehiclesInMotion} running={running} powerSamples={powerSamples} onControlChange={updateControl} onStartTraffic={startTraffic} onToggleEvCharging={() => setSimulation((current) => ({ ...current, evCharging: !current.evCharging }))} />
      </main>
      <footer className="site-footer"><div className="page-width"><span className="brand-mark">VG</span><span>VAYU-GRID · TRAFFIC · AIR · ENERGY</span><span><BatteryCharging size={14} />Demo estimates, not field measurements.</span></div></footer>
    </>
  );
}