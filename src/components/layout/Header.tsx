import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CurrencySelector } from '../common/CurrencySelector';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Valuation', path: '/valuation' },
    { label: 'The Index', path: '/the-index' },
    { label: 'About', path: '/about' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--color-ivory)',
        borderBottom: '1px solid var(--color-stone)',
        transition: 'border-color var(--transition-fast)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'var(--header-height)',
        }}
      >
        {/* Brand Wordmark & Positioning */}
        <Link
          to="/"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            textDecoration: 'none',
          }}
        >
          <span
            className="wordmark"
            style={{
              fontSize: '1.02rem',
              letterSpacing: '0.24em',
              fontWeight: 700,
              color: 'var(--color-espresso)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            THE BIRKIN INDEX
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--color-burgundy)' }} />
          </span>
          <span
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-burgundy)',
              fontWeight: 600,
            }}
          >
            LUXURY RESALE PRICE INTELLIGENCE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '40px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);

            return (
              <NavLink
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-burgundy)' : 'var(--color-espresso)',
                  position: 'relative',
                  padding: '10px 0',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--color-burgundy)',
                    }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Action Controls & Currency */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '20px',
          }}
          className="desktop-actions"
        >
          <CurrencySelector />

          <Link
            to="/valuation"
            className="btn btn-burgundy"
            style={{
              padding: '11px 22px',
              fontSize: '0.72rem',
            }}
          >
            <span>ATELIER VALUATION</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
          className="mobile-actions"
        >
          <CurrencySelector />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '8px',
              color: 'var(--color-espresso)',
              border: '1px solid var(--color-stone)',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-ivory)',
            borderBottom: '1px solid var(--color-stone)',
            padding: '24px 20px 32px',
          }}
          className="mobile-menu-drawer animate-fade-in"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '28px' }}>
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--color-burgundy)' : 'var(--color-espresso)',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--color-stone-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && <span style={{ fontSize: '0.65rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>• ACTIVE</span>}
                </NavLink>
              );
            })}
          </nav>

          <Link
            to="/valuation"
            onClick={closeMenu}
            className="btn btn-burgundy"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
            }}
          >
            <span>ATELIER VALUATION</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      )}

      {/* Embedded CSS for responsive visibility */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-actions {
            display: flex !important;
          }
          .mobile-actions button {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-actions {
            display: none !important;
          }
          .mobile-actions {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
