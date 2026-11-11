import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

type HeroProportion = '25' | '30' | '35' | '40';

export const HomePage: React.FC = () => {
  const [selectedProportion, setSelectedProportion] = useState<HeroProportion>('25');

  const proportionsData: Record<HeroProportion, {
    scaleTitle: string;
    dims: string;
    era: string;
    scaleMultiplier: number;
    spreadIndex: string;
  }> = {
    '25': {
      scaleTitle: 'Birkin 25 (Baby Birkin)',
      dims: '25 × 20 × 13 cm',
      era: '2004 — Present',
      scaleMultiplier: 0.88,
      spreadIndex: '+42% auction liquidity premium over legacy scales',
    },
    '30': {
      scaleTitle: 'Birkin 30 (Everyday Classic)',
      dims: '30 × 22 × 16 cm',
      era: 'Late 1990s — Present',
      scaleMultiplier: 1.0,
      spreadIndex: 'Benchmark daily investment liquidity',
    },
    '35': {
      scaleTitle: 'Birkin 35 (Original Flagship)',
      dims: '35 × 25 × 18 cm',
      era: 'Created 1984 for Jane Birkin',
      scaleMultiplier: 1.12,
      spreadIndex: 'Historic foundation scale with deep secondary trade history',
    },
    '40': {
      scaleTitle: 'Birkin 40 (Executive Scale)',
      dims: '40 × 30 × 21 cm',
      era: '1984 — Present',
      scaleMultiplier: 1.24,
      spreadIndex: 'Niche collector demand in heritage Box & Barenia skins',
    },
  };

  const currentProp = proportionsData[selectedProportion];

  const workflowSteps = [
    { num: '01', title: 'Silhouette & Scale', desc: 'Base width (25, 30, 35, 40) paired with blind date stamp verification.' },
    { num: '02', title: 'Skin & Hardware', desc: 'Textured Togo, rigid Epsom, Box Calf, or CITES-certified exotic skins.' },
    { num: '03', title: 'Condition Grade', desc: 'Hardware protective seal status, corner rubbing, and handle posture.' },
    { num: '04', title: 'Provenance & Papers', desc: 'Boutique receipt provenance, official packaging, and CITES permits.' },
    { num: '05', title: 'Accoutrements', desc: 'Numbered cadena padlock, keys, clochette, dustbags, and orange box.' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* HERO SECTION — High-Fashion Editorial Spread */}
      <section
        style={{
          borderBottom: '1px solid var(--color-stone)',
          paddingTop: 'clamp(56px, 8vw, 96px)',
          paddingBottom: 'clamp(56px, 8vw, 96px)',
          backgroundColor: 'var(--color-ivory)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(300px, 0.85fr)',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            {/* Left: Bold Bodoni Headlines with Burgundy Dominance */}
            <div>
              <div
                className="eyebrow animate-slide-up"
                style={{
                  color: 'var(--color-burgundy)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Atelier Resale Intelligence</span>
                <span style={{ opacity: 0.4 }}>/</span>
                <span>Hermès Birkin Index</span>
              </div>

              <h1
                className="font-display animate-slide-up stagger-1"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 5.2rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.035em',
                  lineHeight: 0.98,
                  marginBottom: '24px',
                  color: 'var(--color-espresso)',
                }}
              >
                The Valuation of a{' '}
                <span style={{ color: 'var(--color-burgundy)', display: 'inline-block' }}>
                  Birkin.
                </span>{' '}
                <span className="italic-accent" style={{ color: 'var(--color-wine-deep)', display: 'block' }}>
                  Deciphered.
                </span>
              </h1>

              <p
                className="animate-slide-up stagger-2"
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
                  lineHeight: 1.6,
                  color: 'var(--color-espresso-muted)',
                  maxWidth: '520px',
                  marginBottom: '36px',
                }}
              >
                Independent secondary market price intelligence grounded in auction hammer settlements, leather rarity, and condition integrity.
              </p>

              <div className="animate-slide-up stagger-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                <Link to="/valuation" className="btn btn-wine" style={{ padding: '16px 36px' }}>
                  <span>EXPLORE VALUATION</span>
                  <ArrowUpRight size={15} />
                </Link>

                <Link to="/the-index" className="btn btn-secondary" style={{ padding: '16px 28px' }}>
                  <span>THE PRICE ARCHIVE</span>
                </Link>
              </div>

              {/* Minimal Editorial Footnote */}
              <div
                className="animate-slide-up stagger-4"
                style={{
                  display: 'flex',
                  gap: '32px',
                  marginTop: '44px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--color-stone)',
                }}
              >
                <div>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-espresso)', lineHeight: 1 }}>
                    4 Proportions
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    25 • 30 • 35 • 40 CM
                  </span>
                </div>
                <div style={{ width: '1px', backgroundColor: 'var(--color-stone)' }} />
                <div>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-burgundy)', lineHeight: 1 }}>
                    Zero Dealer Bias
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Independent Research
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Technical Plate Feature */}
            <div className="animate-scale-in">
              <div
                style={{
                  backgroundColor: 'var(--color-ivory-light)',
                  border: '1px solid var(--color-stone)',
                  padding: 'clamp(24px, 4vw, 40px)',
                  position: 'relative',
                  boxShadow: '0 24px 60px rgba(41, 34, 31, 0.06)',
                }}
              >
                {/* Plate Top Bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '20px',
                    borderBottom: '1px solid var(--color-stone)',
                    paddingBottom: '12px',
                  }}
                >
                  <span className="eyebrow" style={{ fontSize: '0.65rem', letterSpacing: '0.16em', color: 'var(--color-espresso-light)' }}>
                    PLATE NO. 01 — PROPORTION STUDY
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-burgundy)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {currentProp.era}
                  </span>
                </div>

                {/* Technical Drawing Canvas */}
                <div
                  className="animate-float"
                  style={{
                    aspectRatio: '16 / 12',
                    backgroundColor: 'var(--color-ivory)',
                    border: '1px solid var(--color-stone-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <svg
                    viewBox="0 0 320 220"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      width: '88%',
                      height: 'auto',
                      maxHeight: '190px',
                      transform: `scale(${currentProp.scaleMultiplier})`,
                      transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Dimension Datum Lines */}
                    <line x1="20" y1="110" x2="300" y2="110" stroke="var(--color-stone)" strokeDasharray="2 3" strokeWidth="0.8" opacity="0.7" />
                    <line x1="160" y1="20" x2="160" y2="200" stroke="var(--color-stone)" strokeDasharray="2 3" strokeWidth="0.8" opacity="0.7" />

                    {/* Shadow */}
                    <ellipse cx="160" cy="198" rx="100" ry="5" fill="rgba(75, 23, 41, 0.08)" />

                    {/* Bag Body */}
                    <path
                      d="M 65 190 L 80 85 L 240 85 L 255 190 Z"
                      fill="#EBE4D8"
                      stroke="var(--color-espresso)"
                      strokeWidth="2"
                    />

                    {/* Side Gussets */}
                    <path d="M 80 85 L 98 190" stroke="var(--color-stone-dark)" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M 240 85 L 222 190" stroke="var(--color-stone-dark)" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Front Flap */}
                    <path
                      d="M 80 85 L 95 130 L 225 130 L 240 85"
                      fill="#DFD5C7"
                      stroke="var(--color-espresso)"
                      strokeWidth="1.75"
                    />

                    {/* Sangles (Straps) */}
                    <path d="M 85 106 L 235 106" stroke="var(--color-espresso)" strokeWidth="2.5" />

                    {/* Metal Plaques */}
                    <rect x="94" y="101" width="14" height="10" fill="var(--color-ivory)" stroke="var(--color-burgundy)" strokeWidth="1.5" />
                    <rect x="212" y="101" width="14" height="10" fill="var(--color-ivory)" stroke="var(--color-burgundy)" strokeWidth="1.5" />

                    {/* Center Touret Turnlock */}
                    <circle cx="160" cy="106" r="6" fill="var(--color-ivory)" stroke="var(--color-burgundy)" strokeWidth="1.5" />
                    <rect x="158" y="101" width="4" height="10" fill="var(--color-espresso)" />

                    {/* Toron Rolled Handles */}
                    <path
                      d="M 115 85 C 115 28, 146 22, 160 22 C 174 22, 205 28, 205 85"
                      fill="none"
                      stroke="var(--color-espresso)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 124 85 C 124 40, 148 35, 160 35 C 172 35, 196 40, 196 85"
                      fill="none"
                      stroke="var(--color-stone-dark)"
                      strokeWidth="1.5"
                    />

                    {/* Clochette */}
                    <path d="M 125 85 Q 130 130 135 150" fill="none" stroke="var(--color-espresso)" strokeWidth="1.2" />
                    <polygon points="130,150 140,150 137,166 133,166" fill="var(--color-wine-deep)" />
                  </svg>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '14px',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-burgundy)',
                      fontWeight: 700,
                    }}
                  >
                    {currentProp.scaleTitle} • {currentProp.dims}
                  </div>
                </div>

                {/* Scale Switcher Tabs */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '12px' }}>
                    {(['25', '30', '35', '40'] as HeroProportion[]).map((size) => {
                      const isSelected = selectedProportion === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedProportion(size)}
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            fontWeight: isSelected ? 700 : 500,
                            letterSpacing: '0.1em',
                            backgroundColor: isSelected ? 'var(--color-wine-deep)' : 'var(--color-ivory)',
                            color: isSelected ? 'var(--color-ivory)' : 'var(--color-espresso)',
                            border: `1px solid ${isSelected ? 'var(--color-wine-deep)' : 'var(--color-stone)'}`,
                            transition: 'all 180ms ease',
                          }}
                        >
                          {size} CM
                        </button>
                      );
                    })}
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--color-espresso-muted)', lineHeight: 1.45 }}>
                    <strong style={{ color: 'var(--color-burgundy)' }}>Secondary Note:</strong> {currentProp.spreadIndex}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTENTIONAL FULL-WIDTH BURGUNDY SECTION — The Editorial Contrast */}
      <section
        className="section-wine"
        style={{
          paddingTop: 'clamp(64px, 8vw, 104px)',
          paddingBottom: 'clamp(64px, 8vw, 104px)',
          borderBottom: '1px solid var(--color-stone)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
            <span className="eyebrow" style={{ color: 'var(--color-rose-muted)', marginBottom: '16px', display: 'block' }}>
              The Anatomy of Resale Value
            </span>
            <h2
              className="font-display italic-accent"
              style={{
                fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
                lineHeight: 1.1,
                color: 'var(--color-ivory)',
                marginBottom: '24px',
              }}
            >
              “In the secondary sphere, a Birkin is an asset class where subtle nuances create six-figure divergence.”
            </h2>
            <div style={{ width: '48px', height: '1px', backgroundColor: 'var(--color-rose-muted)', margin: '0 auto' }} />
          </div>

          {/* Three Asymmetric Horizontal Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(24px, 4vw, 48px)',
              borderTop: '1px solid rgba(243, 238, 231, 0.15)',
              paddingTop: '48px',
            }}
          >
            <div>
              <span className="editorial-number" style={{ color: 'var(--color-rose-muted)', display: 'block', marginBottom: '8px' }}>
                01
              </span>
              <h3 className="font-display" style={{ fontSize: '1.4rem', color: 'var(--color-ivory)', marginBottom: '10px' }}>
                Scale Liquidity Divergence
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.65 }}>
                The 25cm proportion commands an undeniable auction premium over legacy 35cm silhouettes, driven by evening versatility and Asian collector allocation.
              </p>
            </div>

            <div>
              <span className="editorial-number" style={{ color: 'var(--color-rose-muted)', display: 'block', marginBottom: '8px' }}>
                02
              </span>
              <h3 className="font-display" style={{ fontSize: '1.4rem', color: 'var(--color-ivory)', marginBottom: '10px' }}>
                Sellier Rigidity vs. Retourne
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.65 }}>
                Rigid exterior topstitching in Epsom and Box Calf captures an 18–22% spread premium over slouchy, relaxed bull calfskins.
              </p>
            </div>

            <div>
              <span className="editorial-number" style={{ color: 'var(--color-rose-muted)', display: 'block', marginBottom: '8px' }}>
                03
              </span>
              <h3 className="font-display" style={{ fontSize: '1.4rem', color: 'var(--color-ivory)', marginBottom: '10px' }}>
                CITES Wildlife Compliance
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.65 }}>
                For Porosus and Alligator specimens, intact cross-border wildlife documentation governs global clearance liquidity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE FIVE-STAGE ATELIER WORKFLOW — Asymmetric Composition */}
      <section
        style={{
          paddingTop: 'clamp(64px, 8vw, 96px)',
          paddingBottom: 'clamp(64px, 8vw, 96px)',
          backgroundColor: 'var(--color-ivory)',
          borderBottom: '1px solid var(--color-stone)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 380px) 1fr',
              gap: 'clamp(36px, 6vw, 72px)',
              alignItems: 'flex-start',
            }}
            className="workflow-grid"
          >
            {/* Left Column: Heading & CTA */}
            <div style={{ position: 'sticky', top: '120px' }}>
              <span className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '8px', display: 'block' }}>
                Atelier Diagnostic
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  lineHeight: 1.05,
                  marginBottom: '16px',
                  color: 'var(--color-espresso)',
                }}
              >
                The Five-Stage Valuation Dossier
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-espresso-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
                A disciplined audit of proportion, skin chemistry, preservation grade, and documented provenance.
              </p>

              <Link to="/valuation" className="btn btn-wine" style={{ padding: '14px 28px' }}>
                <span>BEGIN VALUATION</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right Column: Numbered Sequence Entries */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {workflowSteps.map((step) => (
                <div
                  key={step.num}
                  style={{
                    borderTop: '1px solid var(--color-stone)',
                    paddingTop: '24px',
                    paddingBottom: '24px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '24px',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-burgundy)', minWidth: '36px' }}>
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display" style={{ fontSize: '1.25rem', color: 'var(--color-espresso)', marginBottom: '4px' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-espresso-muted)', lineHeight: 1.55 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--color-stone)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE PRICE ARCHIVE CALLOUT */}
      <section
        style={{
          paddingTop: 'clamp(56px, 7vw, 88px)',
          paddingBottom: 'clamp(56px, 7vw, 88px)',
          backgroundColor: 'var(--color-ivory-warm)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <span className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '8px', display: 'block' }}>
                Research Archive
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
                  lineHeight: 1.1,
                  color: 'var(--color-espresso)',
                  marginBottom: '10px',
                }}
              >
                The Price Archive & Market Edit
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-espresso-muted)', lineHeight: 1.6 }}>
                Explore historical sales filtered by proportion, leather family, and colour code. Strictly prioritises verified auction hammer clearance over asking prices.
              </p>
            </div>

            <Link to="/the-index" className="btn btn-primary" style={{ padding: '16px 32px' }}>
              <span>EXPLORE THE ARCHIVE</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .workflow-grid {
            grid-template-columns: 1fr !important;
          }
          .workflow-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
};
