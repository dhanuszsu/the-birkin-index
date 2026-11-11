import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { X, Scale, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompareDrawer: React.FC = () => {
  const { isOpen, closeCompare, compareNote } = useCompare();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(41, 34, 31, 0.55)',
        backdropFilter: 'blur(4px)',
        transition: 'all var(--transition-normal)',
      }}
      onClick={closeCompare}
    >
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          backgroundColor: 'var(--color-ivory)',
          borderLeft: '1px solid var(--color-stone)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-16px 0 40px rgba(41, 34, 31, 0.16)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '24px clamp(20px, 4vw, 32px)',
            borderBottom: '1px solid var(--color-stone)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '2px' }}>
              Comparative Intelligence
            </div>
            <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--color-espresso)' }}>
              Specification Spread Analysis
            </h3>
          </div>
          <button
            onClick={closeCompare}
            style={{
              padding: '6px',
              color: 'var(--color-espresso-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--color-stone)',
            }}
            aria-label="Close comparative analysis drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ padding: '28px clamp(20px, 4vw, 32px)', overflowY: 'auto', flex: 1 }}>
          <div
            style={{
              backgroundColor: 'var(--color-ivory-light)',
              border: '1px solid var(--color-stone)',
              padding: '28px 20px',
              textAlign: 'center',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                margin: '0 auto 12px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-stone)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-burgundy)',
              }}
            >
              <Scale size={20} strokeWidth={1.5} />
            </div>

            <span className="eyebrow" style={{ display: 'block', marginBottom: '6px' }}>
              {compareNote}
            </span>
            <h4 className="font-display italic-accent" style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--color-espresso)', marginBottom: '10px' }}>
              Comparative Protocol
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-espresso-muted)', lineHeight: 1.6 }}>
              Side-by-side spread analysis between disparate sizes, leathers (Togo vs. Epsom vs. Exotics), and hardware finishes will be activated upon integration of verified historical auction datasets.
            </p>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <span className="eyebrow" style={{ marginBottom: '14px', display: 'block', color: 'var(--color-burgundy)' }}>
              Planned Comparison Features
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-burgundy)', marginTop: '2px' }}>•</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.86rem', color: 'var(--color-espresso)' }}>
                    Liquidity Spread Delta
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-espresso-muted)' }}>
                    Differential premium between 25cm and 30cm across identical skins.
                  </span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-burgundy)', marginTop: '2px' }}>•</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.86rem', color: 'var(--color-espresso)' }}>
                    Hardware Finish Tracking
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-espresso-muted)' }}>
                    Historical price variances between Gold Hardware (GHW) and Palladium (PHW).
                  </span>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-burgundy)', marginTop: '2px' }}>•</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.86rem', color: 'var(--color-espresso)' }}>
                    Condition Retention Curves
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-espresso-muted)' }}>
                    Preservation grade retention curves for investment-tier Birkin pieces.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div
            style={{
              padding: '16px',
              borderLeft: '2px solid var(--color-burgundy)',
              backgroundColor: 'rgba(112, 43, 67, 0.06)',
            }}
          >
            <p style={{ fontSize: '0.8rem', color: 'var(--color-espresso)', lineHeight: 1.5 }}>
              <strong>Phase 01 Note:</strong> To preserve institutional integrity, synthetic comparisons and fabricated price deltas are omitted until verified transaction models are active.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div
          style={{
            padding: '18px clamp(20px, 4vw, 32px)',
            borderTop: '1px solid var(--color-stone)',
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            backgroundColor: 'var(--color-ivory)',
          }}
        >
          <button onClick={closeCompare} className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '0.72rem' }}>
            Close
          </button>
          <Link
            to="/valuation"
            onClick={closeCompare}
            className="btn btn-wine"
            style={{ padding: '10px 18px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>Proceed to Valuation</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
