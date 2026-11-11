import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const principles = [
    {
      num: '01',
      title: 'Liquidity over listings',
      subtitle: 'Completed Sales vs. Speculative Asks',
      statement: 'Secondary clearance reflects settled auction hammer transactions rather than aspirational dealer ask rates that sit unliquidated for months.',
    },
    {
      num: '02',
      title: 'Material matters',
      subtitle: 'Micro-Preservation & Skin Biology',
      statement: 'Subtle leather geometry, factory protective film seals, and natural skin patina govern secondary valuation divergence.',
    },
    {
      num: '03',
      title: 'Provenance carries weight',
      subtitle: 'Documentation & Wildlife Trade Compliance',
      statement: 'Original boutique invoices, CITES exotic permits, and authenticated accoutrements directly dictate cross-border trade liquidity.',
    },
    {
      num: '04',
      title: 'Independent by design',
      subtitle: 'Uncompromising Neutrality',
      statement: 'We hold zero secondary inventory, broker no private transactions, and take no dealer commissions—ensuring uncompromised analytical integrity.',
    },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Editorial Page Header */}
      <section
        style={{
          borderBottom: '1px solid var(--color-stone)',
          paddingTop: 'clamp(56px, 8vw, 96px)',
          paddingBottom: 'clamp(40px, 6vw, 72px)',
          backgroundColor: 'var(--color-ivory)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '880px' }}>
            <span className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '16px', display: 'block' }}>
              Institutional Methodology & Principles
            </span>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
                marginBottom: '24px',
                color: 'var(--color-espresso)',
              }}
            >
              The Architecture of Resale Value.
            </h1>
            <p
              className="italic-accent"
              style={{
                fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                color: 'var(--color-burgundy)',
                lineHeight: 1.45,
                maxWidth: '680px',
              }}
            >
              “Price is what is asked in retail windows; value is what clears when two informed parties settle under transparent terms.”
            </p>
          </div>
        </div>
      </section>

      {/* THE FOUR EDITORIAL PRINCIPLES — Full-Width Horizontal Entries */}
      <section
        style={{
          backgroundColor: 'var(--color-ivory)',
          borderBottom: '1px solid var(--color-stone)',
          padding: '0 0 clamp(48px, 6vw, 80px)',
        }}
      >
        <div className="container" style={{ paddingLeft: 'clamp(16px, 3vw, 40px)', paddingRight: 'clamp(16px, 3vw, 40px)' }}>
          <div
            style={{
              paddingTop: 'clamp(40px, 5vw, 64px)',
              paddingBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span className="eyebrow" style={{ color: 'var(--color-espresso-light)' }}>
              Core Operating Tenets
            </span>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-burgundy)', fontWeight: 600 }}>
              01 — 04 Standards
            </span>
          </div>

          {/* Full-width continuous entries */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {principles.map((p, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={p.num}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    borderTop: '1px solid var(--color-stone)',
                    paddingTop: 'clamp(32px, 4vw, 48px)',
                    paddingBottom: 'clamp(32px, 4vw, 48px)',
                    paddingLeft: isHovered ? '20px' : '0px',
                    paddingRight: isHovered ? '20px' : '0px',
                    backgroundColor: isHovered ? 'rgba(112, 43, 67, 0.04)' : 'transparent',
                    transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(80px, 140px) 1fr minmax(280px, 460px)',
                    gap: 'clamp(20px, 4vw, 48px)',
                    alignItems: 'baseline',
                  }}
                  className="editorial-principle-row"
                >
                  {/* Column 1: Number */}
                  <div>
                    <span
                      className="editorial-number"
                      style={{
                        color: isHovered ? 'var(--color-burgundy)' : 'var(--color-espresso-light)',
                        transition: 'color 200ms ease',
                      }}
                    >
                      {p.num}
                    </span>
                  </div>

                  {/* Column 2: Distinctive Heading & Subtitle */}
                  <div>
                    <h2
                      className="font-display"
                      style={{
                        fontSize: 'clamp(1.75rem, 2.8vw, 2.6rem)',
                        fontWeight: 400,
                        color: isHovered ? 'var(--color-wine-deep)' : 'var(--color-espresso)',
                        lineHeight: 1.1,
                        marginBottom: '8px',
                        transition: 'color 200ms ease',
                      }}
                    >
                      {p.title}
                    </h2>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--color-burgundy)',
                        display: 'block',
                      }}
                    >
                      {p.subtitle}
                    </span>
                  </div>

                  {/* Column 3: Concise Supporting Statement */}
                  <div>
                    <p
                      style={{
                        fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
                        lineHeight: 1.6,
                        color: isHovered ? 'var(--color-espresso)' : 'var(--color-espresso-muted)',
                        transition: 'color 200ms ease',
                      }}
                    >
                      {p.statement}
                    </p>
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: '1px solid var(--color-stone)' }} />
          </div>
        </div>
      </section>

      {/* FULL-WIDTH DEEP WINE SECTION — Dramatic Editorial Contrast */}
      <section
        className="section-wine"
        style={{
          paddingTop: 'clamp(64px, 8vw, 100px)',
          paddingBottom: 'clamp(64px, 8vw, 100px)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'flex-start',
            }}
          >
            <div>
              <span className="eyebrow" style={{ marginBottom: '16px', display: 'block' }}>
                Statutory Independence
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  lineHeight: 1.12,
                  marginBottom: '20px',
                }}
              >
                No consignments. No retailer commissions.
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px' }}>
                THE BIRKIN INDEX was founded to bring price transparency to secondary luxury. When resale platforms operate both as appraisers and inventory sellers, valuation conflict of interest is inevitable.
              </p>
              <Link to="/valuation" className="btn btn-outline-ivory" style={{ padding: '14px 28px' }}>
                <span>BEGIN ATELIER VALUATION</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div
              style={{
                borderLeft: '1px solid rgba(243, 238, 231, 0.25)',
                paddingLeft: 'clamp(24px, 4vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
              }}
            >
              <div>
                <h4 style={{ fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-rose-muted)', marginBottom: '8px' }}>
                  Institutional Disclaimer
                </h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65 }}>
                  Resale valuations produced through The Birkin Index represent algorithmic estimations based on verified historical market evidence. They do not constitute formal legal appraisals, guarantees of future resale value, or binding purchase quotes.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-rose-muted)', marginBottom: '8px' }}>
                  Non-Affiliation Notice
                </h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65 }}>
                  THE BIRKIN INDEX is an independent research publication. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Hermès International, Hermès of Paris, or any of their subsidiaries. All trademarks are the property of their respective holders and are used strictly under nominative fair use for identification and market reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive adjustments for editorial row */}
      <style>{`
        @media (max-width: 900px) {
          .editorial-principle-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};
