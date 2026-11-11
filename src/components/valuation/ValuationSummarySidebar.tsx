import React from 'react';
import { useValuation } from '../../context/ValuationContext';
import { useCompare } from '../../context/CompareContext';
import { Layers } from 'lucide-react';

export const ValuationSummarySidebar: React.FC = () => {
  const { formData, currentStage } = useValuation();
  const { openCompare } = useCompare();

  const hasAnySpec = Boolean(
    formData.model || formData.size || formData.leather || formData.color || formData.hardware || formData.condition
  );

  const getScaleMultiplier = () => {
    switch (formData.size) {
      case '25':
        return 0.88;
      case '30':
        return 1.0;
      case '35':
        return 1.12;
      case '40':
        return 1.22;
      default:
        return 1.0;
    }
  };

  const getHardwareColor = () => {
    if (formData.hardware.includes('Gold') && !formData.hardware.includes('Rose') && !formData.hardware.includes('Palladium')) {
      return '#B38B4D'; // Rich Gold
    } else if (formData.hardware.includes('Rose')) {
      return '#C98A7F'; // Rose Gold
    } else if (formData.hardware.includes('Palladium')) {
      return '#A8B0B8'; // Palladium Silver
    } else if (formData.hardware.includes('Permabrass')) {
      return '#C4B184'; // Pale Champagne
    } else if (formData.hardware.includes('Ruthenium')) {
      return '#4A4C50'; // Gunmetal
    }
    return 'var(--color-burgundy)';
  };

  const hwColor = getHardwareColor();
  const scaleMultiplier = getScaleMultiplier();

  return (
    <aside
      style={{
        backgroundColor: 'var(--color-ivory-light)',
        borderRight: '1px solid var(--color-stone)',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Brand atelier header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span className="eyebrow" style={{ color: 'var(--color-burgundy)', fontSize: '0.68rem', letterSpacing: '0.14em' }}>
            ATELIER CONFIGURATOR
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--color-espresso-light)', fontWeight: 600 }}>
            STAGE {Math.min(currentStage, 5)} OF 5
          </span>
        </div>
        <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--color-espresso)' }}>
          {formData.model ? formData.model : 'Birkin Configuration'}
        </h3>
      </div>

      {/* Dynamic Architectural Bag Visual */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          backgroundColor: 'var(--color-ivory)',
          border: '1px solid var(--color-stone)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          padding: '16px',
        }}
      >
        <svg
          viewBox="0 0 240 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '85%',
            height: 'auto',
            maxHeight: '135px',
            transform: `scale(${scaleMultiplier})`,
            transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Base shadow */}
          <ellipse cx="120" cy="165" rx="75" ry="5" fill="rgba(75, 23, 41, 0.08)" />

          {/* Bag Body - Trapezoidal Silhouette */}
          <path
            d="M 50 160 L 60 70 L 180 70 L 190 160 Z"
            fill="var(--color-ivory-light)"
            stroke="var(--color-espresso)"
            strokeWidth="1.75"
          />

          {/* Front Flap */}
          <path
            d="M 60 70 L 72 108 L 168 108 L 180 70"
            fill="none"
            stroke="var(--color-espresso)"
            strokeWidth="1.5"
          />

          {/* Sangles (Straps) */}
          <path d="M 64 88 L 176 88" stroke="var(--color-espresso)" strokeWidth="1.75" />
          <line x1="72" y1="84" x2="72" y2="92" stroke={hwColor} strokeWidth="2.5" />
          <line x1="168" y1="84" x2="168" y2="92" stroke={hwColor} strokeWidth="2.5" />

          {/* Center Touret (Turnlock hardware) */}
          <circle cx="120" cy="88" r="4.5" fill={hwColor} stroke="var(--color-espresso)" strokeWidth="1" />
          <line x1="120" y1="84" x2="120" y2="92" stroke="var(--color-ivory)" strokeWidth="1" />

          {/* Rolled Toron Handles */}
          <path
            d="M 85 70 C 85 24, 110 20, 120 20 C 130 20, 155 24, 155 70"
            fill="none"
            stroke="var(--color-espresso)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 92 70 C 92 34, 112 30, 120 30 C 128 30, 148 34, 148 70"
            fill="none"
            stroke="var(--color-stone-dark)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          {/* Clochette hanging string */}
          <path d="M 94 70 Q 98 105 102 120" fill="none" stroke="var(--color-espresso-muted)" strokeWidth="1" />
          <polygon points="98,120 106,120 104,132 100,132" fill="var(--color-wine-deep)" />
        </svg>

        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            fontSize: '0.62rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-burgundy)',
            fontWeight: 700,
          }}
        >
          {formData.size ? `Scale ${formData.size} CM` : 'Architectural Matrix'}
        </div>
      </div>

      {/* Persistent Configuration Breakdown */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            borderBottom: '1px solid var(--color-stone)',
            paddingBottom: '8px',
            marginBottom: '14px',
          }}
        >
          <span className="eyebrow" style={{ fontSize: '0.68rem', color: 'var(--color-espresso-light)' }}>
            Active Dossier Specs
          </span>
        </div>

        {!hasAnySpec ? (
          <div
            style={{
              padding: '20px 14px',
              textAlign: 'center',
              backgroundColor: 'var(--color-ivory)',
              border: '1px dashed var(--color-stone)',
              marginBottom: '16px',
            }}
          >
            <p style={{ fontSize: '0.78rem', color: 'var(--color-espresso-light)' }}>
              Select attributes on the right to configure this piece’s valuation file.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-stone-subtle)', paddingBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-espresso-light)' }}>Silhouette</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                {formData.model || '—'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-stone-subtle)', paddingBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-espresso-light)' }}>Proportion</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                {formData.size ? `${formData.size} cm` : '—'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-stone-subtle)', paddingBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-espresso-light)' }}>Leather / Skin</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                {formData.leather || '—'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-stone-subtle)', paddingBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-espresso-light)' }}>Colour</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                {formData.color ? formData.color.split('(')[0].trim() : '—'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-stone-subtle)', paddingBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-espresso-light)' }}>Hardware</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                {formData.hardware ? formData.hardware.split('(')[0].trim() : '—'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-stone-subtle)', paddingBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-espresso-light)' }}>Condition</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: formData.condition ? 'var(--color-burgundy)' : 'var(--color-espresso)' }}>
                {formData.condition || '—'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Compare Entry Point */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-stone)' }}>
        <button
          type="button"
          onClick={() => openCompare(formData.model ? `Comparing: ${formData.model} ${formData.size}` : 'Current Atelier Configuration')}
          className="btn btn-secondary"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '0.72rem',
            justifyContent: 'center',
          }}
        >
          <Layers size={13} />
          <span>Compare Specifications</span>
        </button>
      </div>
    </aside>
  );
};
