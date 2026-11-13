import React, { useEffect, useMemo } from 'react';
import { useCompare, CompareConfigItem } from '../../context/CompareContext';
import { useValuation } from '../../context/ValuationContext';
import {
  X,
  Scale,
  ArrowUpRight,
  ArrowLeftRight,
  Check,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  EDITORIAL_BENCHMARK_ITEMS,
  convertValuationToCompareItem,
  getAllSelectableConfigurations,
  checkAttributeMatch,
} from '../../utils/compareData';

export const CompareDrawer: React.FC = () => {
  const { isOpen, closeCompare, compareNote, configA, configB, setConfigA, setConfigB, swapConfigurations } =
    useCompare();
  const { formData } = useValuation();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCompare();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCompare]);

  // Derive user session dossier if valuation data exists
  const userDossierItem = useMemo(() => {
    if (formData.model || formData.size || formData.leather) {
      return convertValuationToCompareItem(formData);
    }
    return null;
  }, [formData]);

  // Grouped selectable configurations for dropdown menus
  const selectableGroups = useMemo(() => {
    return getAllSelectableConfigurations(userDossierItem);
  }, [userDossierItem]);

  // Default configurations if none provided in context
  const activeItemA: CompareConfigItem = useMemo(() => {
    if (configA) return configA;
    if (userDossierItem) return userDossierItem;
    return EDITORIAL_BENCHMARK_ITEMS[1]; // Birkin 25 Togo Noir GHW
  }, [configA, userDossierItem]);

  const activeItemB: CompareConfigItem = useMemo(() => {
    if (configB) return configB;
    return EDITORIAL_BENCHMARK_ITEMS[0]; // Birkin 35 Togo Noir GHW
  }, [configB]);

  // Flattened catalogue for ID lookup
  const allSelectableItems = useMemo(() => {
    const map = new Map<string, CompareConfigItem>();
    selectableGroups.forEach((g) => {
      g.items.forEach((item) => {
        if (item.id) map.set(item.id, item);
      });
    });
    return map;
  }, [selectableGroups]);

  // Handle configuration selection from dropdown
  const handleSelectA = (selectedId: string) => {
    const found = allSelectableItems.get(selectedId);
    if (found) {
      setConfigA(found);
    }
  };

  const handleSelectB = (selectedId: string) => {
    const found = allSelectableItems.get(selectedId);
    if (found) {
      setConfigB(found);
    }
  };

  if (!isOpen) return null;

  // The 9 Core Architectural Comparison Specifications
  const comparisonAttributes = [
    {
      label: 'Silhouette & Model',
      a: activeItemA.model || 'Birkin Retourne',
      b: activeItemB.model || 'Birkin Retourne',
    },
    {
      label: 'Proportion Scale',
      a: activeItemA.size || '25 cm',
      b: activeItemB.size || '35 cm',
    },
    {
      label: 'Leather / Skin',
      a: activeItemA.leather || 'Togo Calfskin',
      b: activeItemB.leather || 'Togo Calfskin',
    },
    {
      label: 'Colour Shade',
      a: activeItemA.color || 'Noir (89)',
      b: activeItemB.color || 'Noir (89)',
    },
    {
      label: 'Hardware Finish',
      a: activeItemA.hardware || 'Gold Hardware (GHW)',
      b: activeItemB.hardware || 'Gold Hardware (GHW)',
    },
    {
      label: 'Preservation Grade',
      a: activeItemA.condition || 'Store Fresh / Pristine',
      b: activeItemB.condition || 'Very Good',
    },
    {
      label: 'Production Era',
      a: activeItemA.productionYear || '—',
      b: activeItemB.productionYear || '—',
    },
    {
      label: 'Accoutrements & Set',
      a: activeItemA.accessories || 'Standard Set (Dustbag, Lock & Keys)',
      b: activeItemB.accessories || 'Bag Only',
    },
    {
      label: 'Provenance & Documentation',
      a: activeItemA.provenance || activeItemA.source || 'Audited Reference',
      b: activeItemB.provenance || activeItemB.source || 'Audited Reference',
    },
  ];

  // Calculate Match / Difference metrics
  const matchingCount = comparisonAttributes.filter((attr) => checkAttributeMatch(attr.a, attr.b)).length;
  const differingCount = comparisonAttributes.length - matchingCount;

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
      role="dialog"
      aria-modal="true"
      aria-label="Specification Spread Analysis Drawer"
    >
      <div
        className="compare-drawer-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px clamp(20px, 4vw, 32px)',
            borderBottom: '1px solid var(--color-stone)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-ivory)',
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '2px' }}>
              Comparative Intelligence Atelier
            </div>
            <h3
              className="font-display"
              style={{ fontSize: '1.45rem', fontWeight: 400, color: 'var(--color-espresso)', margin: 0 }}
            >
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
              cursor: 'pointer',
              backgroundColor: 'transparent',
              transition: 'all 140ms ease',
            }}
            aria-label="Close comparison drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Body Scroll Area */}
        <div style={{ padding: '20px clamp(20px, 4vw, 32px)', overflowY: 'auto', flex: 1 }}>
          {/* Active Context Banner */}
          <div
            style={{
              backgroundColor: 'var(--color-ivory-light)',
              border: '1px solid var(--color-stone)',
              padding: '12px 16px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Scale size={18} color="var(--color-burgundy)" style={{ flexShrink: 0 }} />
              <div>
                <span className="eyebrow" style={{ color: 'var(--color-burgundy)', fontSize: '0.64rem', display: 'block' }}>
                  Curatorial Inquiry
                </span>
                <strong style={{ fontSize: '0.84rem', color: 'var(--color-espresso)' }}>
                  {compareNote}
                </strong>
              </div>
            </div>

            {/* Quick swap button */}
            <button
              type="button"
              onClick={swapConfigurations}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--color-ivory)',
                color: 'var(--color-burgundy)',
                border: '1px solid var(--color-burgundy)',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                transition: 'all 140ms ease',
              }}
              title="Swap Configuration A and Configuration B positions"
            >
              <ArrowLeftRight size={12} />
              <span>Swap Sides</span>
            </button>
          </div>

          {/* Interactive Configuration Selectors Plate */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '10px',
              alignItems: 'center',
              padding: '14px',
              backgroundColor: 'var(--color-ivory-light)',
              border: '1px solid var(--color-stone)',
              marginBottom: '18px',
            }}
          >
            {/* Configuration A Selector */}
            <div>
              <label
                htmlFor="config-select-a"
                style={{
                  display: 'block',
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-burgundy)',
                  marginBottom: '4px',
                }}
              >
                Configuration A:
              </label>
              <select
                id="config-select-a"
                value={activeItemA.id || ''}
                onChange={(e) => handleSelectA(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 8px',
                  fontSize: '0.75rem',
                  backgroundColor: 'var(--color-ivory)',
                  border: '1px solid var(--color-stone)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--color-espresso)',
                  cursor: 'pointer',
                }}
              >
                {selectableGroups.map((group) => (
                  <optgroup key={`a-grp-${group.group}`} label={group.group}>
                    {group.items.map((item) => (
                      <option key={`a-opt-${item.id}`} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Middle Swap Icon */}
            <div style={{ textAlign: 'center', paddingTop: '16px' }}>
              <button
                type="button"
                onClick={swapConfigurations}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-ivory)',
                  border: '1px solid var(--color-stone)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-espresso-muted)',
                  cursor: 'pointer',
                  transition: 'all 140ms ease',
                }}
                title="Swap Configuration A and B"
              >
                <ArrowLeftRight size={13} />
              </button>
            </div>

            {/* Configuration B Selector */}
            <div>
              <label
                htmlFor="config-select-b"
                style={{
                  display: 'block',
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-espresso-light)',
                  marginBottom: '4px',
                }}
              >
                Configuration B:
              </label>
              <select
                id="config-select-b"
                value={activeItemB.id || ''}
                onChange={(e) => handleSelectB(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 8px',
                  fontSize: '0.75rem',
                  backgroundColor: 'var(--color-ivory)',
                  border: '1px solid var(--color-stone)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--color-espresso)',
                  cursor: 'pointer',
                }}
              >
                {selectableGroups.map((group) => (
                  <optgroup key={`b-grp-${group.group}`} label={group.group}>
                    {group.items.map((item) => (
                      <option key={`b-opt-${item.id}`} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Similarity & Divergence Summary Metric Plate */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: 'var(--color-ivory)',
              border: '1px solid var(--color-stone)',
              marginBottom: '16px',
              fontSize: '0.76rem',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <span
                style={{
                  color: '#2e7d32',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Check size={13} /> {matchingCount} Matching Specifications
              </span>
              <span
                style={{
                  color: 'var(--color-burgundy)',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                • {differingCount} Divergent Parameters
              </span>
            </div>

            <span
              style={{
                fontSize: '0.66rem',
                color: 'var(--color-espresso-light)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              9 Architectural Attributes Evaluated
            </span>
          </div>

          {/* Side-by-Side Comparison Matrix */}
          <div style={{ marginBottom: '24px' }}>
            {/* Table Column Titles */}
            <div
              className="compare-grid-header"
              style={{
                paddingBottom: '10px',
                borderBottom: '2px solid var(--color-stone)',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-espresso-light)',
                }}
              >
                Specification
              </span>

              {/* Header Col A */}
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.60rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '1px 6px',
                    backgroundColor: 'rgba(112, 43, 67, 0.1)',
                    color: 'var(--color-burgundy)',
                    borderRadius: 'var(--radius-xs)',
                    marginBottom: '3px',
                  }}
                >
                  Configuration A
                </span>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-espresso)', lineHeight: 1.25 }}>
                  {activeItemA.title}
                </div>
                <span style={{ fontSize: '0.66rem', color: 'var(--color-espresso-light)', display: 'block', marginTop: '2px' }}>
                  {activeItemA.source || 'Audited Atelier Specification'}
                </span>
              </div>

              {/* Header Col B */}
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.60rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '1px 6px',
                    backgroundColor: 'rgba(41, 34, 31, 0.08)',
                    color: 'var(--color-espresso)',
                    borderRadius: 'var(--radius-xs)',
                    marginBottom: '3px',
                  }}
                >
                  Configuration B
                </span>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-espresso)', lineHeight: 1.25 }}>
                  {activeItemB.title}
                </div>
                <span style={{ fontSize: '0.66rem', color: 'var(--color-espresso-light)', display: 'block', marginTop: '2px' }}>
                  {activeItemB.source || 'Audited Atelier Specification'}
                </span>
              </div>
            </div>

            {/* The 9 Parameter Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {comparisonAttributes.map((attr, idx) => {
                const isMatched = checkAttributeMatch(attr.a, attr.b);

                return (
                  <div
                    key={idx}
                    className="compare-grid-row"
                    style={{
                      padding: '10px 8px',
                      borderBottom: '1px solid var(--color-stone-subtle)',
                      fontSize: '0.78rem',
                      backgroundColor: isMatched ? 'rgba(40, 110, 60, 0.02)' : 'transparent',
                      transition: 'background-color 140ms ease',
                    }}
                  >
                    {/* Left Parameter Title + Match Badge */}
                    <div className="compare-param-col">
                      <span style={{ color: 'var(--color-espresso)', fontWeight: 600, display: 'block', fontSize: '0.78rem' }}>
                        {attr.label}
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '0.58rem',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          marginTop: '3px',
                          padding: '1px 6px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: isMatched ? 'rgba(40, 110, 60, 0.1)' : 'rgba(112, 43, 67, 0.08)',
                          color: isMatched ? '#1b5e20' : 'var(--color-burgundy)',
                          border: `1px solid ${isMatched ? 'rgba(46, 125, 50, 0.25)' : 'rgba(112, 43, 67, 0.2)'}`,
                        }}
                      >
                        {isMatched ? (
                          <>
                            <Check size={9} />
                            <span>Identical</span>
                          </>
                        ) : (
                          <span>Divergent</span>
                        )}
                      </span>
                    </div>

                    {/* Value A */}
                    <div style={{ color: 'var(--color-espresso)', lineHeight: 1.4 }}>
                      <span style={{ fontWeight: isMatched ? 600 : 500 }}>{attr.a}</span>
                    </div>

                    {/* Value B */}
                    <div style={{ color: 'var(--color-espresso)', lineHeight: 1.4 }}>
                      <span style={{ fontWeight: isMatched ? 600 : 500 }}>{attr.b}</span>
                    </div>
                  </div>
                );
              })}

              {/* Price / Settlement Basis Reference Row */}
              <div
                className="compare-grid-row"
                style={{
                  padding: '12px 8px',
                  borderTop: '2px solid var(--color-stone)',
                  borderBottom: '1px solid var(--color-stone)',
                  backgroundColor: 'var(--color-ivory-light)',
                  marginTop: '6px',
                }}
              >
                <div className="compare-param-col">
                  <span style={{ color: 'var(--color-espresso)', fontWeight: 700, fontSize: '0.78rem', display: 'block' }}>
                    Historical / Basis Reference
                  </span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--color-espresso-light)', display: 'block', marginTop: '2px' }}>
                    Non-Algorithmic Benchmark
                  </span>
                </div>

                <div>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--color-wine-deep)', display: 'block' }}>
                    {activeItemA.priceFormatted || 'Awaiting Calibration'}
                  </strong>
                </div>

                <div>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--color-wine-deep)', display: 'block' }}>
                    {activeItemB.priceFormatted || 'Awaiting Calibration'}
                  </strong>
                </div>
              </div>

              {/* Provenance & Institutional Status Row */}
              <div
                className="compare-grid-row"
                style={{
                  padding: '10px 8px',
                  borderBottom: '1px solid var(--color-stone)',
                  fontSize: '0.74rem',
                }}
              >
                <div className="compare-param-col">
                  <span style={{ color: 'var(--color-espresso-light)', fontWeight: 600, fontSize: '0.74rem' }}>
                    Institutional Classification
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '2px 7px',
                      backgroundColor: activeItemA.isCustomConfig
                        ? 'rgba(75, 23, 41, 0.08)'
                        : 'rgba(138, 126, 118, 0.12)',
                      color: activeItemA.isCustomConfig ? 'var(--color-wine-deep)' : 'var(--color-espresso-muted)',
                      border: `1px solid ${activeItemA.isCustomConfig ? 'var(--color-burgundy)' : 'var(--color-stone-dark)'}`,
                      borderRadius: 'var(--radius-xs)',
                      display: 'inline-block',
                    }}
                  >
                    {activeItemA.statusBadge || 'Illustrative Reference'}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '2px 7px',
                      backgroundColor: activeItemB.isCustomConfig
                        ? 'rgba(75, 23, 41, 0.08)'
                        : 'rgba(138, 126, 118, 0.12)',
                      color: activeItemB.isCustomConfig ? 'var(--color-wine-deep)' : 'var(--color-espresso-muted)',
                      border: `1px solid ${activeItemB.isCustomConfig ? 'var(--color-burgundy)' : 'var(--color-stone-dark)'}`,
                      borderRadius: 'var(--radius-xs)',
                      display: 'inline-block',
                    }}
                  >
                    {activeItemB.statusBadge || 'Illustrative Reference'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Genuine Protocol Status & Anti-Fabrication Notice */}
          <div
            style={{
              padding: '14px 18px',
              borderLeft: '3px solid var(--color-burgundy)',
              backgroundColor: 'rgba(112, 43, 67, 0.04)',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Layers size={13} color="var(--color-burgundy)" />
              <strong
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--color-burgundy)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Institutional Integrity Protocol
              </strong>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--color-espresso)', lineHeight: 1.6, margin: 0 }}>
              Specification parameter alignment strictly analyzes artisanal physical attributes, preservation grades, and
              catalogue provenance. In compliance with data integrity standards, no speculative price spread, algorithmic
              premium, or synthetic delta is generated pending calibrated machine learning engine integration.
            </p>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div
          style={{
            padding: '16px clamp(20px, 4vw, 32px)',
            borderTop: '1px solid var(--color-stone)',
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--color-ivory)',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={closeCompare}
              className="btn btn-secondary"
              style={{ padding: '9px 16px', fontSize: '0.72rem' }}
            >
              Close
            </button>
            <button
              type="button"
              onClick={swapConfigurations}
              className="btn btn-secondary"
              style={{
                padding: '9px 14px',
                fontSize: '0.72rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <ArrowLeftRight size={12} />
              <span>Swap</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link
              to="/the-index"
              onClick={closeCompare}
              className="btn btn-secondary"
              style={{ padding: '9px 16px', fontSize: '0.72rem' }}
            >
              Browse Index
            </Link>
            <Link
              to="/valuation"
              onClick={closeCompare}
              className="btn btn-wine"
              style={{
                padding: '9px 16px',
                fontSize: '0.72rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Valuation Atelier</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive layout styles */}
      <style>{`
        .compare-drawer-content {
          width: 100%;
          max-width: 780px;
          height: 100%;
          background-color: var(--color-ivory);
          border-left: 1px solid var(--color-stone);
          display: flex;
          flex-direction: column;
          box-shadow: -16px 0 40px rgba(41, 34, 31, 0.2);
        }
        .compare-grid-header,
        .compare-grid-row {
          display: grid;
          grid-template-columns: minmax(130px, 1.2fr) minmax(180px, 1.6fr) minmax(180px, 1.6fr);
          gap: 12px;
          align-items: baseline;
        }
        @media (max-width: 680px) {
          .compare-drawer-content {
            max-width: 100% !important;
          }
          .compare-grid-header,
          .compare-grid-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .compare-param-col {
            grid-column: 1 / -1;
            margin-bottom: 2px;
            padding-bottom: 4px;
            border-bottom: 1px dashed var(--color-stone-subtle);
          }
        }
      `}</style>
    </div>
  );
};
