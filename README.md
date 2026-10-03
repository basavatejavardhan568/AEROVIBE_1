# VAYU-GRID EV Power Station

An interactive concept site exploring highway-traffic wake capture, clustered roadside power, and micro-mobility charging. The original single-file export is retained at `reference/standalone-export.html` for comparison; the maintained application lives in `src/`.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local URL. Run the simulator and cluster-calculator regression tests with `npm test`; create a production build with `npm run build`, then inspect it using `npm run preview`.

## Project layout

- `src/App.jsx` owns live simulation state and interval cleanup.
- `src/components/` contains the page sections and interactive controls.
- `src/data/site.js` holds vehicle, traffic, stage, and default simulator data.
- `src/lib/simulator.js` contains the traffic and energy-demo calculations.
- `src/lib/cluster.js` contains the daily cluster-yield calculator.
- `src/lib/*.test.js` tests those calculations using Node's built-in test runner.
- `reference/standalone-export.html` is the original bundled export, kept as a reference.

The simulator intentionally preserves the original demo's accelerated timing and scaling factors. Values are illustrative estimates, not field measurements or a validated engineering forecast.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` on pushes to `main`. In the repository's **Settings → Pages**, set the deployment source to **GitHub Actions**. Subsequent pushes to `main` deploy automatically.