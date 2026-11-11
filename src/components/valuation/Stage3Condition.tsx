import React from 'react';
import { useValuation } from '../../context/ValuationContext';
import { CONDITION_GRADES } from '../../config/birkinOptions';
import { AlertCircle, Shield, Check } from 'lucide-react';

export const Stage3Condition: React.FC = () => {
  const { formData, updateField, errors } = useValuation();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <div className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '4px' }}>
          Stage 03 • Preservation Audit
        </div>
        <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-espresso)', marginBottom: '6px' }}>
          Physical Condition Classification
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-espresso-muted)' }}>
          Resale valuation is extraordinarily sensitive to condition. Grades correspond to international luxury auction appraisal guidelines.
        </p>
      </div>

      {/* Condition Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {CONDITION_GRADES.map((grade) => {
          const isSelected = formData.condition === grade.value;
          return (
            <button
              type="button"
              key={grade.value}
              onClick={() => updateField('condition', grade.value)}
              className={`interactive-card ${isSelected ? 'is-active' : ''}`}
              style={{
                textAlign: 'left',
                padding: '14px 18px',
                backgroundColor: isSelected ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                border: `1.5px solid ${isSelected ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                cursor: 'pointer',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: isSelected ? 'var(--color-burgundy)' : 'var(--color-espresso)',
                    }}
                  >
                    {grade.label}
                  </span>
                  {grade.value === 'New / Unused' && (
                    <span
                      style={{
                        fontSize: '0.64rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        backgroundColor: 'var(--color-burgundy-subtle)',
                        color: 'var(--color-burgundy)',
                        borderRadius: 'var(--radius-xs)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Boutique Fresh
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-espresso-muted)', lineHeight: 1.35, maxWidth: '580px' }}>
                  {grade.subtext}
                </p>
              </div>

              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: `1.5px solid ${isSelected ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                  backgroundColor: isSelected ? 'var(--color-burgundy)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--color-ivory)',
                }}
              >
                {isSelected && <Check size={11} strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {errors.condition && (
        <p className="error-alert" style={{ color: 'var(--color-burgundy)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={13} />
          <span>{errors.condition}</span>
        </p>
      )}

      {/* Hardware Protective Film Quick Toggle */}
      <div
        className="surface-light"
        style={{
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Shield size={18} color="var(--color-burgundy)" style={{ flexShrink: 0 }} />
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '0.82rem',
            color: 'var(--color-espresso)',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={formData.hasHardwareProtectiveFilm}
            onChange={(e) => updateField('hasHardwareProtectiveFilm', e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              accentColor: 'var(--color-burgundy)',
              cursor: 'pointer',
            }}
          />
          <span>
            <strong>Factory Protective Plastic Seals Intact:</strong> Clear films remain affixed to hardware plates, feet, or touret.
          </span>
        </label>
      </div>

      {/* Optional Wear Note */}
      <div>
        <label
          htmlFor="conditionNotes"
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
          Specific Wear Details & Spa History (Optional)
        </label>
        <textarea
          id="conditionNotes"
          rows={2}
          placeholder="Note any corner softening, hairline markings, or Hermès Spa refurbishment history..."
          value={formData.conditionNotes}
          onChange={(e) => updateField('conditionNotes', e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
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
