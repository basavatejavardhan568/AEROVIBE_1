import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '#concept', label: 'CONCEPT' },
  { href: '#how', label: 'HOW IT WORKS' },
  { href: '#power', label: 'POWER STATION', badge: 'NEW' },
  { href: '#ev', label: 'EV CHARGING', badge: 'NEW' },
  { href: '#demo', label: 'LIVE DEMO', primary: true },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="VAYU-GRID home">
          <span className="brand-mark">VG</span>
          <span className="brand-copy"><strong>VAYU-GRID</strong><small>TRAFFIC · AIR · ENERGY</small></span>
          <span className="version-badge">v2.1 POWER + EV</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => <a className={item.primary ? 'nav-link nav-link-primary' : 'nav-link'} href={item.href} key={item.href}>{item.label}{item.badge && <span className="nav-badge">{item.badge}</span>}</a>)}
        </nav>
        <button className="menu-toggle icon-button" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{NAV_ITEMS.map((item) => <a className={item.primary ? 'nav-link nav-link-primary' : 'nav-link'} href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}{item.badge && <span className="nav-badge">{item.badge}</span>}</a>)}</nav>}
    </header>
  );
}