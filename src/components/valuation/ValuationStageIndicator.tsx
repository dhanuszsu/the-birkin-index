import React from 'react';
import { useValuation } from '../../context/ValuationContext';
import { Check } from 'lucide-react';

export const STAGES = [
  { id: 1, title: 'Identity', subtitle: 'Silhouette & Scale' },
  { id: 2, title: 'Material', subtitle: 'Skin & Hardware' },
  { id: 3, title: 'Condition', subtitle: 'Preservation Grade' },
  { id: 4, title: 'Provenance', subtitle: 'Invoices & Papers' },
  { id: 5, title: 'Accoutrements', subtitle: 'Box & Inclusions' },
];

export const ValuationStageIndicator: React.FC = () => {
  const { currentStage, completedStages, goToStage } = useValuation();

  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-stone)',
        backgroundColor: 'var(--color-ivory)',
        padding: '16px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}
      >
        {STAGES.map((s, index) => {
          const isCurrent = currentStage === s.id;
          const isCompleted = completedStages.includes(s.id);
          const canClick = isCompleted || s.id < currentStage || s.id === 1;

          return (
            <React.Fragment key={s.id}>
              <button
                type="button"
                onClick={() => canClick && goToStage(s.id)}
                disabled={!canClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'none',
                  border: 'none',
                  padding: '6px 8px',
                  cursor: canClick ? 'pointer' : 'default',
                  opacity: canClick || isCurrent ? 1 : 0.45,
                  textAlign: 'left',
                  flexShrink: 0,
                  transition: 'opacity 200ms ease',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `1.5px solid ${
                      isCurrent
                        ? 'var(--color-burgundy)'
                        : isCompleted
                        ? 'var(--color-wine-deep)'
                        : 'var(--color-stone)'
                    }`,
                    backgroundColor: isCompleted
                      ? 'var(--color-wine-deep)'
                      : isCurrent
                      ? 'rgba(112, 43, 67, 0.1)'
                      : 'transparent',
                    color: isCompleted
                      ? 'var(--color-ivory)'
                      : isCurrent
                      ? 'var(--color-burgundy)'
                      : 'var(--color-espresso-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  {isCompleted ? <Check size={12} strokeWidth={2.5} /> : s.id}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: isCurrent ? 700 : 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: isCurrent
                        ? 'var(--color-burgundy)'
                        : isCompleted
                        ? 'var(--color-espresso)'
                        : 'var(--color-espresso-light)',
                    }}
                  >
                    {s.title}
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      color: 'var(--color-espresso-light)',
                    }}
                  >
                    {s.subtitle}
                  </span>
                </div>
              </button>

              {index < STAGES.length - 1 && (
                <div
                  style={{
                    height: '1px',
                    width: '16px',
                    backgroundColor: isCompleted ? 'var(--color-burgundy)' : 'var(--color-stone)',
                    flexShrink: 0,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Review step indicator */}
        <div
          style={{
            height: '1px',
            width: '16px',
            backgroundColor: currentStage === 6 ? 'var(--color-burgundy)' : 'var(--color-stone)',
            flexShrink: 0,
          }}
        />

        <button
          type="button"
          onClick={() => completedStages.length >= 4 && goToStage(6)}
          disabled={completedStages.length < 4}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            padding: '6px 8px',
            cursor: completedStages.length >= 4 ? 'pointer' : 'default',
            opacity: currentStage === 6 ? 1 : completedStages.length >= 4 ? 0.8 : 0.35,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: `1.5px solid ${currentStage === 6 ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
              backgroundColor: currentStage === 6 ? 'var(--color-burgundy)' : 'transparent',
              color: currentStage === 6 ? 'var(--color-ivory)' : 'var(--color-espresso-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 700,
            }}
          >
            6
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: currentStage === 6 ? 700 : 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: currentStage === 6 ? 'var(--color-burgundy)' : 'var(--color-espresso)',
            }}
          >
            Review
          </span>
        </button>
      </div>
    </div>
  );
};
