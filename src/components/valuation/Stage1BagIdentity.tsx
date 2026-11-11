import React from 'react';
import { useValuation } from '../../context/ValuationContext';
import { BIRKIN_MODELS, BIRKIN_SIZES, PRODUCTION_YEARS } from '../../config/birkinOptions';
import { AlertCircle, Check } from 'lucide-react';

export const Stage1BagIdentity: React.FC = () => {
  const { formData, updateField, errors } = useValuation();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <div className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '4px' }}>
          Stage 01 • Bag Architecture
        </div>
        <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-espresso)', marginBottom: '6px' }}>
          Select Model Silhouette & Proportion
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-espresso-muted)' }}>
          Designate the foundational silhouette and scale of the piece.
        </p>
      </div>

      {/* Model Selection */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            color: 'var(--color-espresso)',
          }}
        >
          Model Silhouette *
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '10px',
          }}
        >
          {BIRKIN_MODELS.map((item) => {
            const isSelected = formData.model === item.value;
            return (
              <button
                type="button"
                key={item.value}
                onClick={() => updateField('model', item.value)}
                className={`interactive-card ${isSelected ? 'is-active' : ''}`}
                style={{
                  textAlign: 'left',
                  padding: '14px',
                  backgroundColor: isSelected ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                  border: `1.5px solid ${isSelected ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '84px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                    {item.label}
                  </span>
                  {isSelected && (
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-burgundy)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-ivory)',
                      }}
                    >
                      <Check size={10} strokeWidth={3} />
                    </div>
                  )}
                </div>
                {item.subtext && (
                  <p style={{ fontSize: '0.74rem', color: 'var(--color-espresso-muted)', lineHeight: 1.35 }}>
                    {item.subtext.split('.')[0]}.
                  </p>
                )}
              </button>
            );
          })}
        </div>
        {errors.model && (
          <p style={{ color: 'var(--color-burgundy)', fontSize: '0.78rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={13} />
            <span>{errors.model}</span>
          </p>
        )}
      </div>

      {/* Size Proportion Cards */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            color: 'var(--color-espresso)',
          }}
        >
          Proportion Scale (Base Width) *
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '10px',
          }}
        >
          {BIRKIN_SIZES.map((item) => {
            const isSelected = formData.size === item.value;
            return (
              <button
                type="button"
                key={item.value}
                onClick={() => updateField('size', item.value)}
                className={`interactive-card ${isSelected ? 'is-active' : ''}`}
                style={{
                  textAlign: 'left',
                  padding: '14px',
                  backgroundColor: isSelected ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                  border: `1.5px solid ${isSelected ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-espresso)' }}>
                    {item.value === 'Other / Special' ? 'Custom' : `${item.value} cm`}
                  </span>
                  {isSelected && (
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-burgundy)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-ivory)',
                      }}
                    >
                      <Check size={10} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--color-espresso-muted)', lineHeight: 1.3 }}>
                  {item.subtext ? item.subtext.split('.')[0] : ''}
                </p>
              </button>
            );
          })}
        </div>
        {errors.size && (
          <p style={{ color: 'var(--color-burgundy)', fontSize: '0.78rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={13} />
            <span>{errors.size}</span>
          </p>
        )}
      </div>

      {/* Production Year & Blind Stamp */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        <div>
          <label
            htmlFor="productionYear"
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
            Production Year / Vintage Era *
          </label>
          <select
            id="productionYear"
            value={formData.productionYear}
            onChange={(e) => updateField('productionYear', e.target.value)}
            style={{
              width: '100%',
              padding: '11px 12px',
              backgroundColor: 'var(--color-ivory)',
              borderColor: errors.productionYear ? 'var(--color-burgundy)' : 'var(--color-stone)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            <option value="">Select production year...</option>
            {PRODUCTION_YEARS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
          {errors.productionYear && (
            <p style={{ color: 'var(--color-burgundy)', fontSize: '0.78rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={13} />
              <span>{errors.productionYear}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="blindStamp"
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
            Date Blind Stamp (Optional)
          </label>
          <input
            id="blindStamp"
            type="text"
            placeholder="e.g. U, Z, Y, B, D"
            value={formData.blindStamp}
            onChange={(e) => updateField('blindStamp', e.target.value)}
            style={{
              width: '100%',
              padding: '11px 12px',
              backgroundColor: 'var(--color-ivory)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.88rem',
            }}
          />
        </div>
      </div>
    </div>
  );
};
