import React from 'react';
import { useValuation } from '../../context/ValuationContext';
import { ACCESSORIES_OPTIONS } from '../../config/birkinOptions';
import { Check } from 'lucide-react';

export const Stage5Accessories: React.FC = () => {
  const { formData, updateField, toggleArrayField } = useValuation();

  const isBagOnly = formData.accessories.includes('none');
  const allIds = ACCESSORIES_OPTIONS.map((a) => a.id);
  const isFullSet = allIds.every((id) => formData.accessories.includes(id));

  const handleSelectAll = () => {
    updateField('accessories', allIds);
  };

  const handleSetBagOnly = () => {
    toggleArrayField('accessories', 'none');
  };

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-espresso)',
            }}
          >
            Preserved Accessories Checklist
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleSelectAll}
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '5px 10px',
                borderRadius: 'var(--radius-xs)',
                border: `1px solid ${isFullSet ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                backgroundColor: isFullSet ? 'var(--color-burgundy-subtle)' : 'var(--color-ivory)',
                color: isFullSet ? 'var(--color-burgundy)' : 'var(--color-espresso)',
                cursor: 'pointer',
              }}
            >
              {isFullSet ? '✓ Full Boutique Set' : 'Select Full Set (8)'}
            </button>
            <button
              type="button"
              onClick={handleSetBagOnly}
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '5px 10px',
                borderRadius: 'var(--radius-xs)',
                border: `1px solid ${isBagOnly ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                backgroundColor: isBagOnly ? 'var(--color-burgundy)' : 'var(--color-ivory)',
                color: isBagOnly ? 'var(--color-ivory)' : 'var(--color-espresso)',
                cursor: 'pointer',
              }}
            >
              Bag Only (No Accessories)
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '10px',
            opacity: isBagOnly ? 0.55 : 1,
            transition: 'opacity 200ms ease',
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

        {isBagOnly && (
          <div
            style={{
              marginTop: '12px',
              padding: '10px 14px',
              backgroundColor: 'var(--color-ivory-light)',
              border: '1px solid var(--color-stone)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.78rem',
              color: 'var(--color-espresso)',
            }}
          >
            <strong>Confirmed:</strong> Presented as <em>Bag Only</em> without clochette, lock & keys, or original boutique inclusions.
          </div>
        )}
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
