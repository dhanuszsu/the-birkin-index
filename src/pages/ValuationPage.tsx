import React from 'react';
import { useValuation } from '../context/ValuationContext';
import { ValuationStageIndicator } from '../components/valuation/ValuationStageIndicator';
import { ValuationSummarySidebar } from '../components/valuation/ValuationSummarySidebar';
import { Stage1BagIdentity } from '../components/valuation/Stage1BagIdentity';
import { Stage2MaterialAppearance } from '../components/valuation/Stage2MaterialAppearance';
import { Stage3Condition } from '../components/valuation/Stage3Condition';
import { Stage4PurchaseInfo } from '../components/valuation/Stage4PurchaseInfo';
import { Stage5Accessories } from '../components/valuation/Stage5Accessories';
import { StageReview } from '../components/valuation/StageReview';
import { ArrowLeft, ArrowRight, RotateCcw, Check } from 'lucide-react';

export const ValuationPage: React.FC = () => {
  const { currentStage, nextStage, prevStage, resetForm, hasVisitedReview, goToStage, validateStage } = useValuation();

  const renderActiveStage = () => {
    switch (currentStage) {
      case 1:
        return <Stage1BagIdentity />;
      case 2:
        return <Stage2MaterialAppearance />;
      case 3:
        return <Stage3Condition />;
      case 4:
        return <Stage4PurchaseInfo />;
      case 5:
        return <Stage5Accessories />;
      case 6:
        return <StageReview />;
      default:
        return <Stage1BagIdentity />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Top Banner with Reset and Atelier Title */}
      <div
        style={{
          borderBottom: '1px solid var(--color-stone)',
          backgroundColor: 'var(--color-ivory)',
          padding: '16px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="eyebrow" style={{ color: 'var(--color-burgundy)', fontSize: '0.72rem' }}>
              ATELIER VALUATION PROTOCOL
            </span>
            <span style={{ color: 'var(--color-stone-dark)' }}>/</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
              Private Valuation File
            </span>
          </div>

          <button
            type="button"
            onClick={resetForm}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-espresso-light)',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: '4px 8px',
              transition: 'color 160ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-burgundy)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-espresso-light)')}
          >
            <RotateCcw size={12} />
            <span>Reset Form</span>
          </button>
        </div>
      </div>

      {/* Split-Screen Atelier Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 380px) 1fr',
          flex: 1,
          minHeight: 'calc(100vh - var(--header-height) - 140px)',
        }}
        className="atelier-split-layout"
      >
        {/* LEFT COLUMN: Live Configurator Plate */}
        <div className="atelier-sidebar-col">
          <ValuationSummarySidebar />
        </div>

        {/* RIGHT COLUMN: Guided Form Stage & Stage Navigation */}
        <div
          style={{
            backgroundColor: 'var(--color-ivory)',
            padding: '36px clamp(20px, 4vw, 48px) 64px',
            display: 'flex',
            flexDirection: 'column',
          }}
          className="atelier-form-col"
        >
          {/* Stage Progress Bar */}
          <div style={{ marginBottom: '36px' }}>
            <ValuationStageIndicator />
          </div>

          {/* Active Stage Body */}
          <div style={{ flex: 1, maxWidth: '820px' }}>
            {renderActiveStage()}
          </div>

          {/* Step Navigation Controls (Stages 1 through 5) */}
          {currentStage < 6 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '44px',
                paddingTop: '24px',
                borderTop: '1px solid var(--color-stone)',
                maxWidth: '820px',
              }}
            >
              <button
                type="button"
                onClick={prevStage}
                disabled={currentStage === 1}
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                }}
              >
                <ArrowLeft size={14} />
                <span>Previous Stage</span>
              </button>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                {hasVisitedReview && (
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStage(currentStage)) {
                        goToStage(6);
                      }
                    }}
                    className="btn btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '12px 20px',
                      fontSize: '0.75rem',
                      borderColor: 'var(--color-burgundy)',
                      color: 'var(--color-burgundy)',
                    }}
                  >
                    <Check size={13} strokeWidth={2.5} />
                    <span>Return to Review</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={nextStage}
                  className="btn btn-wine"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 32px',
                  }}
                >
                  <span>{currentStage === 5 ? 'Proceed to Review' : 'Save & Continue'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Responsive layout style */}
      <style>{`
        @media (max-width: 960px) {
          .atelier-split-layout {
            grid-template-columns: 1fr !important;
          }
          .atelier-sidebar-col {
            border-right: none !important;
            border-bottom: 1px solid var(--color-stone) !important;
          }
          .atelier-form-col {
            padding: 24px 20px 48px !important;
          }
        }
      `}</style>
    </div>
  );
};
