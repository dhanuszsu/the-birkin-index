import React, { useState } from 'react';
import { useCompare } from '../context/CompareContext';
import { Search, Layers, Database, ArrowUpRight, X } from 'lucide-react';

export const IndexPage: React.FC = () => {
  const { openCompare } = useCompare();

  // Filters state
  const [recordType, setRecordType] = useState<'completed' | 'asking'>('completed');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedLeather, setSelectedLeather] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const editorialObservations = [
    {
      num: '01',
      tag: 'Scale Analysis',
      title: 'The Compact Scale Premium: Birkin 25 Liquidity',
      lead: 'A structural reallocation of secondary capital toward compact evening proportions.',
      body: 'Over recent auction cycles, the 25cm proportion has solidified an unmistakable liquidity premium over traditional 35cm and 40cm heritage sizes. While 35cm remains the original silhouette commissioned for Jane Birkin in 1984, the contemporary collector market heavily prioritises compact scale, driving substantial price deltas across identical leather and hardware pairings.',
      date: 'Market Journal • Q1 Review',
    },
    {
      num: '02',
      tag: 'Construction Architecture',
      title: 'Sellier Rigidity vs. Retourne Slouch',
      lead: 'Sharp exterior topstitching captures an 18–22% valuation preference.',
      body: 'Traditionally reserved for the Kelly, the introduction of the Birkin Sellier with sharp exterior stitching created a new architectural paradigm. Market evidence demonstrates Sellier examples in rigid Epsom or Box Calf consistently clear above relaxed Retourne counterparts in softer bull calfskins.',
      date: 'Materiality Study',
    },
    {
      num: '03',
      tag: 'CITES Compliance',
      title: 'The Exotic Provenance Imperative',
      lead: 'Physical wildlife permits directly govern international settlement liquidity.',
      body: 'For exotic specimens—specifically Crocodylus Porosus and Alligator Mississippiensis—the presence of intact, matching CITES documentation governs cross-border transaction legality. Secondary pieces lacking verified paperwork face severe geographical containment.',
      date: 'Regulatory Dossier',
    },
  ];

  const sizes = ['all', '25', '30', '35', '40'];
  const leathers = [
    { id: 'all', label: 'All Skins' },
    { id: 'Togo', label: 'Togo' },
    { id: 'Epsom', label: 'Epsom' },
    { id: 'Clemence', label: 'Clémence' },
    { id: 'Swift', label: 'Swift' },
    { id: 'Box', label: 'Box Calf' },
    { id: 'Exotics', label: 'Exotics' },
  ];

  const hasActiveFilters = selectedSize !== 'all' || selectedLeather !== 'all' || searchQuery.trim() !== '';

  const clearFilters = () => {
    setSelectedSize('all');
    setSelectedLeather('all');
    setSearchQuery('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Editorial Header */}
      <section
        style={{
          borderBottom: '1px solid var(--color-stone)',
          paddingTop: 'clamp(56px, 8vw, 96px)',
          paddingBottom: 'clamp(40px, 6vw, 72px)',
          backgroundColor: 'var(--color-ivory)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '840px' }}>
            <span className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '12px', display: 'block' }}>
              The Secondary Market Repository
            </span>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.8rem, 5vw, 4.4rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
                marginBottom: '16px',
                color: 'var(--color-espresso)',
              }}
            >
              The Index & Market Edit.
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-espresso-muted)' }}>
              Curated market intelligence combined with a structured secondary price archive.
            </p>
          </div>
        </div>
      </section>

      {/* PART I: THE MARKET EDIT — Editorial Journal Format (No Generic Cards) */}
      <section
        style={{
          borderBottom: '1px solid var(--color-stone)',
          paddingTop: 'clamp(48px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
          backgroundColor: 'var(--color-ivory)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '36px',
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: 'var(--color-espresso-light)', display: 'block', marginBottom: '4px' }}>
                PART I — EDITORIAL OBSERVATIONS
              </span>
              <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--color-espresso)' }}>
                The Market Edit
              </h2>
            </div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-burgundy)', fontWeight: 600 }}>
              Curated Market Journal
            </span>
          </div>

          {/* Continuous Editorial Journal Entries */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {editorialObservations.map((obs) => (
              <article
                key={obs.num}
                style={{
                  borderTop: '1px solid var(--color-stone)',
                  paddingTop: 'clamp(28px, 4vw, 44px)',
                  paddingBottom: 'clamp(28px, 4vw, 44px)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(70px, 120px) minmax(260px, 1.2fr) minmax(280px, 1fr)',
                  gap: 'clamp(20px, 4vw, 48px)',
                  alignItems: 'flex-start',
                }}
                className="journal-entry-row"
              >
                {/* Number */}
                <div>
                  <span className="editorial-number">{obs.num}</span>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--color-espresso-light)', marginTop: '4px' }}>
                    {obs.date}
                  </span>
                </div>

                {/* Headline & Lead */}
                <div>
                  <span className="eyebrow" style={{ color: 'var(--color-burgundy)', fontSize: '0.68rem', display: 'block', marginBottom: '6px' }}>
                    {obs.tag}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)',
                      color: 'var(--color-espresso)',
                      lineHeight: 1.15,
                      marginBottom: '10px',
                    }}
                  >
                    {obs.title}
                  </h3>
                  <p className="italic-accent" style={{ fontSize: '0.95rem', color: 'var(--color-wine-deep)', lineHeight: 1.5 }}>
                    “{obs.lead}”
                  </p>
                </div>

                {/* Analysis Body & Compare Action */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-espresso-muted)', lineHeight: 1.65, marginBottom: '20px' }}>
                    {obs.body}
                  </p>

                  <button
                    type="button"
                    onClick={() => openCompare(obs.title)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-burgundy)',
                      alignSelf: 'flex-start',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-wine-deep)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-burgundy)')}
                  >
                    <span>Specification Study</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </article>
            ))}
            <div style={{ borderTop: '1px solid var(--color-stone)' }} />
          </div>
        </div>
      </section>

      {/* PART II: THE PRICE ARCHIVE — Serious Research Interface */}
      <section
        style={{
          paddingTop: 'clamp(56px, 7vw, 88px)',
          paddingBottom: 'clamp(64px, 8vw, 104px)',
          backgroundColor: 'var(--color-ivory-light)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: 'var(--color-espresso-light)', display: 'block', marginBottom: '4px' }}>
                PART II — DATA REPOSITORY
              </span>
              <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--color-espresso)' }}>
                The Price Archive
              </h2>
            </div>

            {/* Record Type Switcher: Completed Sales (Default) vs Asking Prices */}
            <div
              style={{
                display: 'inline-flex',
                border: '1px solid var(--color-stone)',
                backgroundColor: 'var(--color-ivory)',
                padding: '3px',
              }}
            >
              <button
                type="button"
                onClick={() => setRecordType('completed')}
                style={{
                  padding: '8px 18px',
                  fontSize: '0.74rem',
                  fontWeight: recordType === 'completed' ? 700 : 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: recordType === 'completed' ? 'var(--color-wine-deep)' : 'transparent',
                  color: recordType === 'completed' ? 'var(--color-ivory)' : 'var(--color-espresso)',
                  transition: 'all 160ms ease',
                }}
              >
                Completed Sales (Verified)
              </button>
              <button
                type="button"
                onClick={() => setRecordType('asking')}
                style={{
                  padding: '8px 18px',
                  fontSize: '0.74rem',
                  fontWeight: recordType === 'asking' ? 700 : 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: recordType === 'asking' ? 'var(--color-burgundy)' : 'transparent',
                  color: recordType === 'asking' ? 'var(--color-ivory)' : 'var(--color-espresso)',
                  transition: 'all 160ms ease',
                }}
              >
                Current Asking Prices
              </button>
            </div>
          </div>

          {/* Record Type Visual Distinction Banner */}
          <div
            style={{
              padding: '12px 20px',
              marginBottom: '24px',
              borderLeft: `3px solid ${recordType === 'completed' ? 'var(--color-wine-deep)' : 'var(--color-burgundy)'}`,
              backgroundColor: recordType === 'completed' ? 'rgba(75, 23, 41, 0.05)' : 'rgba(112, 43, 67, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
            }}
          >
            <span>
              <strong style={{ color: recordType === 'completed' ? 'var(--color-wine-deep)' : 'var(--color-burgundy)' }}>
                {recordType === 'completed' ? 'Verified Settlement Archive: ' : 'Dealer Ask Archive: '}
              </strong>
              {recordType === 'completed'
                ? 'Filtering verified international auction hammer clearance records. Institutional benchmark.'
                : 'Filtering secondary dealer listings and ask rates. Subject to active dealer margins.'}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: recordType === 'completed' ? 'var(--color-wine-deep)' : 'var(--color-burgundy)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {recordType === 'completed' ? 'HAMMER CLEARANCE' : 'DEALER ASKS'}
            </span>
          </div>

          {/* Refined Filter & Search Interface */}
          <div
            style={{
              backgroundColor: 'var(--color-ivory)',
              border: '1px solid var(--color-stone)',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            {/* Top row: search + clear */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <input
                  type="text"
                  placeholder="Filter by silhouette, leather, or colour (e.g. Birkin 25 Togo Noir GHW)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 34px',
                    backgroundColor: 'var(--color-ivory-light)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.85rem',
                  }}
                />
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-espresso-light)' }} />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem',
                    color: 'var(--color-burgundy)',
                    fontWeight: 600,
                    padding: '8px 14px',
                    backgroundColor: 'rgba(112, 43, 67, 0.08)',
                    border: '1px solid var(--color-burgundy)',
                  }}
                >
                  <X size={12} />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            {/* Size Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-espresso-light)', textTransform: 'uppercase', minWidth: '60px' }}>
                Size:
              </span>
              {sizes.map((s) => {
                const isSelected = selectedSize === s;
                return (
                  <button
                    key={`size-${s}`}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.72rem',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--color-wine-deep)' : 'var(--color-ivory-light)',
                      color: isSelected ? 'var(--color-ivory)' : 'var(--color-espresso)',
                      border: `1px solid ${isSelected ? 'var(--color-wine-deep)' : 'var(--color-stone)'}`,
                      borderRadius: 'var(--radius-xs)',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {s === 'all' ? 'All Sizes' : `${s} cm`}
                  </button>
                );
              })}
            </div>

            {/* Leather Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-espresso-light)', textTransform: 'uppercase', minWidth: '60px' }}>
                Skin:
              </span>
              {leathers.map((l) => {
                const isSelected = selectedLeather === l.id;
                return (
                  <button
                    key={`l-${l.id}`}
                    type="button"
                    onClick={() => setSelectedLeather(l.id)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.72rem',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--color-wine-deep)' : 'var(--color-ivory-light)',
                      color: isSelected ? 'var(--color-ivory)' : 'var(--color-espresso)',
                      border: `1px solid ${isSelected ? 'var(--color-wine-deep)' : 'var(--color-stone)'}`,
                      borderRadius: 'var(--radius-xs)',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Research Archive Status Plate */}
          <div
            style={{
              backgroundColor: 'var(--color-ivory)',
              border: '1px solid var(--color-stone)',
              padding: 'clamp(36px, 6vw, 64px) clamp(20px, 4vw, 36px)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-ivory-light)',
                border: '1px solid var(--color-stone)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-burgundy)',
              }}
            >
              <Database size={20} strokeWidth={1.5} />
            </div>

            <span className="eyebrow" style={{ color: 'var(--color-burgundy)', display: 'block', marginBottom: '6px' }}>
              Institutional Data Pipeline
            </span>

            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                fontWeight: 400,
                color: 'var(--color-espresso)',
                marginBottom: '12px',
              }}
            >
              The Market Price Archive Is Being Prepared
            </h3>

            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.65,
                color: 'var(--color-espresso-muted)',
                maxWidth: '560px',
                margin: '0 auto 24px',
              }}
            >
              Fabricated records and speculative prices are omitted in Phase 01. Verified {recordType === 'completed' ? 'auction settlements' : 'active secondary asks'} will unlock once our transaction data ingestion pipeline is confirmed.
            </p>

            <button
              type="button"
              onClick={() => openCompare('Archive Comparative Study')}
              className="btn btn-secondary"
              style={{ padding: '12px 24px', fontSize: '0.75rem' }}
            >
              <Layers size={13} />
              <span>Open Specification Comparison</span>
            </button>
          </div>
        </div>
      </section>

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 900px) {
          .journal-entry-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};
