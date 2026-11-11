import React from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../../context/CompareContext';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openCompare } = useCompare();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-espresso)',
        color: 'var(--color-ivory)',
        paddingTop: '80px',
        paddingBottom: '48px',
        borderTop: '1px solid var(--color-stone)',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        {/* Top Section: Brand Statement & Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '380px' }}>
            <span
              className="wordmark"
              style={{
                fontSize: '1.02rem',
                letterSpacing: '0.24em',
                color: 'var(--color-ivory)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}
            >
              THE BIRKIN INDEX
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--color-burgundy)' }} />
            </span>
            <p
              className="eyebrow"
              style={{
                color: 'var(--color-rose-muted)',
                marginBottom: '16px',
                fontSize: '0.68rem',
              }}
            >
              LUXURY RESALE PRICE INTELLIGENCE
            </p>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(243, 238, 231, 0.72)',
                lineHeight: 1.65,
              }}
            >
              An independent valuation authority dedicated to secondary market price transparency, condition-adjusted analytics, and editorial intelligence on Hermès Birkin handbags.
            </p>
          </div>

          {/* Navigation Col */}
          <div>
            <h4
              className="eyebrow"
              style={{
                color: 'var(--color-rose-muted)',
                marginBottom: '18px',
              }}
            >
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link
                  to="/"
                  style={{
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-rose-muted)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ivory)')}
                >
                  The Fashion Story (Home)
                </Link>
              </li>
              <li>
                <Link
                  to="/valuation"
                  style={{
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-rose-muted)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ivory)')}
                >
                  Valuation Atelier
                </Link>
              </li>
              <li>
                <Link
                  to="/the-index"
                  style={{
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-rose-muted)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ivory)')}
                >
                  The Index & Archive
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-rose-muted)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ivory)')}
                >
                  Institutional Methodology & About
                </Link>
              </li>
            </ul>
          </div>

          {/* Analytical Intelligence Col */}
          <div>
            <h4
              className="eyebrow"
              style={{
                color: 'var(--color-rose-muted)',
                marginBottom: '18px',
              }}
            >
              Research Systems
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <button
                  onClick={() => openCompare('Platform Comparative Utility')}
                  style={{
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-rose-muted)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ivory)')}
                >
                  <span>Multi-Spec Comparison</span>
                  <ArrowUpRight size={12} />
                </button>
              </li>
              <li>
                <Link
                  to="/the-index"
                  style={{
                    color: 'rgba(243, 238, 231, 0.72)',
                    fontSize: '0.88rem',
                  }}
                >
                  Completed Sales vs. Asking Prices
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{
                    color: 'rgba(243, 238, 231, 0.72)',
                    fontSize: '0.88rem',
                  }}
                >
                  Secondary Liquidity Protocol
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Fine Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(243, 238, 231, 0.15)',
            marginBottom: '36px',
          }}
        />

        {/* Disclaimer & Copyright */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: 'rgba(243, 238, 231, 0.45)',
              lineHeight: 1.6,
              maxWidth: '960px',
            }}
          >
            <strong>LEGAL DISCLAIMER:</strong> THE BIRKIN INDEX is an independent research publication and private valuation intelligence platform. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Hermès International, Hermès of Paris, or any of their subsidiaries or affiliates. The official Hermès website can be found at hermes.com. The name “Hermès”, “Birkin”, as well as related names, marks, emblems, and images are registered trademarks of Hermès International. All product names, trademarks, and registered trademarks are property of their respective owners and are used strictly for identification, historical reference, and resale market reporting under nominative fair use.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.72rem',
              color: 'rgba(243, 238, 231, 0.45)',
              gap: '12px',
            }}
          >
            <span>© {new Date().getFullYear()} THE BIRKIN INDEX. Editorial Art Direction Release.</span>
            <span>Independent Luxury Resale Price Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
