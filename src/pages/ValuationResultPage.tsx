import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useValuation } from '../context/ValuationContext';
import { useCompare } from '../context/CompareContext';
import { Download, ArrowLeft, ArrowUpRight, Clock, Layers, Scale } from 'lucide-react';
import { convertValuationToCompareItem, findClosestArchiveMatch } from '../utils/compareData';
import { fetchModelStatus, ModelStatus } from '../services/api';

export const ValuationResultPage: React.FC = () => {
  const { formData, resetForm } = useValuation();
  const { openCompare } = useCompare();
  const navigate = useNavigate();
  const [modelStatus, setModelStatus] = useState<ModelStatus | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchModelStatus().then((status) => {
      if (isMounted) {
        setModelStatus(status);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNewValuation = () => {
    resetForm();
    navigate('/valuation');
  };

  const hasConfig = Boolean(formData.model || formData.size || formData.leather);
  const specTitle = `${formData.model || 'Birkin'} ${formData.size ? `${formData.size} cm` : ''} ${formData.leather || ''}`.trim();

  const handleOpenCompare = () => {
    const userItem = convertValuationToCompareItem(formData);
    const benchmarkItem = findClosestArchiveMatch(formData);
    openCompare(
      specTitle ? `Valuation Dossier: ${specTitle}` : 'Valuation Dossier vs. Historical Benchmark',
      userItem,
      benchmarkItem
    );
  };

  return (
    <div className="animate-fade-in" style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(64px, 8vw, 96px)', flex: 1, backgroundColor: 'var(--color-ivory)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Navigation Crumb */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            to="/valuation"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-espresso-light)',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={13} />
            <span>Return to Valuation Atelier</span>
          </Link>
        </div>

        {/* Minimal Dossier Header */}
        <div
          style={{
            borderBottom: '1px solid var(--color-stone)',
            paddingBottom: '20px',
            marginBottom: '36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '4px' }}>
              Valuation Dossier • Ref: TB-2026-VAL
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 400, color: 'var(--color-espresso)', letterSpacing: '-0.025em' }}>
              Your Valuation Dossier
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
              Dossier Generated:
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Core Valuation Status Plate */}
        <div
          style={{
            backgroundColor: 'var(--color-ivory-light)',
            border: '1px solid var(--color-stone)',
            padding: 'clamp(32px, 5vw, 48px) clamp(20px, 4vw, 36px)',
            marginBottom: '36px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 16px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-ivory)',
              border: '1px solid var(--color-stone)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-burgundy)',
            }}
          >
            <Clock size={20} strokeWidth={1.5} />
          </div>

          <span className="eyebrow" style={{ color: 'var(--color-burgundy)', display: 'block', marginBottom: '6px' }}>
            Empirical Prediction Engine • {modelStatus?.status === 'active' ? 'Calibrated' : 'Offline / Uncalibrated'}
          </span>

          <h2
            className="font-display italic-accent"
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 400,
              color: 'var(--color-espresso)',
              marginBottom: '12px',
            }}
          >
            {modelStatus?.is_available ? 'Predictive Valuation Engine Ready' : 'Valuation Engine Calibration Pending'}
          </h2>

          <p
            style={{
              fontSize: '0.92rem',
              lineHeight: 1.65,
              color: 'var(--color-espresso-muted)',
              maxWidth: '560px',
              margin: '0 auto 20px',
            }}
          >
            {modelStatus?.reason ||
              'Estimated resale prices and fair settlement ranges will activate once the verified machine learning prediction engine connects with calibrated secondary market auction transactions.'}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                padding: '6px 14px',
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-stone)',
                fontSize: '0.74rem',
                color: 'var(--color-espresso)',
                letterSpacing: '0.04em',
              }}
            >
              Verified ML Training Records: <strong>{modelStatus?.eligible_for_ml_count ?? 0} / {modelStatus?.minimum_records_required ?? 50}</strong>
            </div>
            <div
              style={{
                padding: '6px 14px',
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-stone)',
                fontSize: '0.74rem',
                color: 'var(--color-burgundy)',
                letterSpacing: '0.04em',
              }}
            >
              Strict Integrity Guard: <strong>Illustrative display records quarantined</strong>
            </div>
          </div>

          <div
            style={{
              display: 'inline-block',
              padding: '8px 18px',
              backgroundColor: 'var(--color-ivory)',
              border: '1px solid var(--color-stone-subtle)',
              fontSize: '0.78rem',
              color: 'var(--color-espresso)',
            }}
          >
            <em>No fabricated prices or speculative spreads are generated.</em>
          </div>
        </div>

        {/* Selected Birkin Specifications — Architectural Dossier Table */}
        <div style={{ marginBottom: '36px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--color-stone)',
              paddingBottom: '10px',
              marginBottom: '16px',
            }}
          >
            <span className="eyebrow" style={{ fontSize: '0.72rem', color: 'var(--color-espresso-light)' }}>
              Recorded Specifications
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
              VERIFIED IN SESSION
            </span>
          </div>

          {!hasConfig ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--color-espresso-light)', fontStyle: 'italic' }}>
              No configuration recorded. Return to the Valuation Atelier to compile your piece.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                padding: '24px',
                backgroundColor: 'var(--color-ivory-light)',
                border: '1px solid var(--color-stone)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                  Silhouette
                </span>
                <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  {formData.model || '—'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                  Proportion
                </span>
                <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  {formData.size ? `${formData.size} cm` : '—'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                  Skin / Leather
                </span>
                <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  {formData.leather || '—'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                  Colour
                </span>
                <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  {formData.color ? formData.color.split('(')[0].trim() : '—'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                  Hardware Finish
                </span>
                <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  {formData.hardware ? formData.hardware.split('(')[0].trim() : '—'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                  Preservation Grade
                </span>
                <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-burgundy)' }}>
                  {formData.condition || '—'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                  Production Era
                </span>
                <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  {formData.productionYear || '—'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                  Accoutrements
                </span>
                <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  {formData.accessories.includes('none')
                    ? 'Bag Only'
                    : formData.accessories.length > 0
                    ? `${formData.accessories.length} Included`
                    : 'Bag Only'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Comparative Specification Benchmark Callout */}
        <div
          style={{
            backgroundColor: 'var(--color-ivory-light)',
            border: '1px solid var(--color-stone)',
            padding: '20px 24px',
            marginBottom: '36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Scale size={14} color="var(--color-burgundy)" />
              <span className="eyebrow" style={{ color: 'var(--color-burgundy)', fontSize: '0.68rem' }}>
                Comparative Specification Benchmark
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-espresso-muted)', lineHeight: 1.5, margin: 0 }}>
              Compare your recorded Birkin side-by-side with audited auction lots and secondary dealer references to evaluate scale, leather, hardware, and provenance differences.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCompare}
            className="btn btn-secondary"
            style={{
              padding: '11px 18px',
              fontSize: '0.74rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Layers size={13} />
            <span>Launch Specification Comparison</span>
          </button>
        </div>

        {/* Short Editorial Statement */}
        <div
          style={{
            borderLeft: '2px solid var(--color-burgundy)',
            padding: '18px 24px',
            backgroundColor: 'var(--color-ivory-light)',
            marginBottom: '36px',
          }}
        >
          <p className="italic-accent" style={{ fontSize: '1.02rem', color: 'var(--color-espresso)', lineHeight: 1.55 }}>
            “Secondary Birkin valuations reflect historical settlement liquidity rather than speculative retail markups. Once active, each dossier will report empirical auction clearance distributions.”
          </p>
        </div>

        {/* Action Entry Points */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-stone)',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleOpenCompare}
              className="btn btn-secondary"
              style={{ padding: '12px 20px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Layers size={13} />
              <span>Compare Specification</span>
            </button>

            <button
              type="button"
              disabled
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                opacity: 0.45,
                padding: '12px 20px',
                fontSize: '0.74rem',
              }}
              title="Valuation PDF export will become available when the prediction engine is active."
            >
              <Download size={13} />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handleNewValuation}
              className="btn btn-secondary"
              style={{ padding: '12px 20px', fontSize: '0.74rem' }}
            >
              New Valuation
            </button>
          </div>

          <Link
            to="/the-index"
            className="btn btn-wine"
            style={{
              padding: '12px 24px',
              fontSize: '0.74rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Browse The Index</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
