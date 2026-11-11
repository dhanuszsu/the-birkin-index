import React from 'react';
import { useValuation } from '../../context/ValuationContext';
import { ACCESSORIES_OPTIONS } from '../../config/birkinOptions';
import { Check } from 'lucide-react';

export const Stage5Accessories: React.FC = () => {
  const { formData, updateField, toggleArrayField } = useValuation();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <div className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '4px' }}>
          Stage 05 • Full Set Elements
        </div>
        <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-espresso)', marginBottom: '6px' }}>
          Included Accessories & Hardware Complements
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-espresso-muted)' }}>
          A complete original boutique set commands the highest liquidity in secondary auction environments.
        </p>
      </div>

      {/* Accessories Grid */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '10px',
            color: 'var(--color-espresso)',
          }}
        >
          Preserved Accessories Checklist
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '10px',
          }}
        >
          {ACCESSORIES_OPTIONS.map((item) => {
            const isChecked = formData.accessories.includes(item.id);
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => toggleArrayField('accessories', item.id)}
                className={`interactive-card ${isChecked ? 'is-active' : ''}`}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  backgroundColor: isChecked ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                  border: `1.5px solid ${isChecked ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '2px',
                    border: `1.5px solid ${isChecked ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                    backgroundColor: isChecked ? 'var(--color-burgundy)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-ivory)',
                    fontSize: '0.65rem',
                    flexShrink: 0,
                  }}
                >
                  {isChecked && <Check size={11} strokeWidth={3} />}
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                    {item.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional Remarks */}
      <div>
        <label
          htmlFor="additionalNotes"
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '6px',
            color: 'var(--color-espresso)',
          }}
        >
          Special Provenance Nuances (Optional)
        </label>
        <textarea
          id="additionalNotes"
          rows={2}
          placeholder="Any unique provenance nuances, special commemorative stamps, or details not captured in previous stages..."
          value={formData.additionalNotes}
          onChange={(e) => updateField('additionalNotes', e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            backgroundColor: 'var(--color-ivory)',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.84rem',
            resize: 'vertical',
          }}
        />
      </div>
    </div>
  );
};
