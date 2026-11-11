import React from 'react';
import { useValuation } from '../../context/ValuationContext';
import { useCurrency } from '../../context/CurrencyContext';
import { DOCUMENTATION_OPTIONS, PACKAGING_OPTIONS, PRODUCTION_YEARS } from '../../config/birkinOptions';
import { AlertCircle, Check } from 'lucide-react';

export const Stage4PurchaseInfo: React.FC = () => {
  const { formData, updateField, toggleArrayField, errors } = useValuation();
  const { currency, setCurrency } = useCurrency();

  const isExoticLeather = ['Porosus Crocodile', 'Niloticus Crocodile', 'Alligator', 'Lizard'].some(
    (ex) => formData.leather?.includes(ex) || formData.leather === ex
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <div className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '4px' }}>
          Stage 04 • Provenance & Papers
        </div>
        <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-espresso)', marginBottom: '6px' }}>
          Acquisition History & Documentation
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-espresso-muted)' }}>
          Documented provenance and CITES permits for exotic skins substantially elevate clearance confidence.
        </p>
      </div>

      {/* Acquisition Year & Price */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        <div>
          <label
            htmlFor="originalPurchaseYear"
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
            Original Acquisition Year (Optional)
          </label>
          <select
            id="originalPurchaseYear"
            value={formData.originalPurchaseYear}
            onChange={(e) => updateField('originalPurchaseYear', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: 'var(--color-ivory)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.86rem',
              cursor: 'pointer',
            }}
          >
            <option value="">Select acquisition year or unknown...</option>
            <option value="Secondhand / Pre-loved acquisition">Secondhand / Pre-loved acquisition</option>
            {PRODUCTION_YEARS.map((yr) => (
              <option key={`purch-${yr}`} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="originalPurchasePrice"
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
            Acquisition Price (Optional)
          </label>
          <div style={{ display: 'flex' }}>
            <select
              value={formData.purchaseCurrency || currency}
              onChange={(e) => {
                const nextCurr = e.target.value as any;
                updateField('purchaseCurrency', nextCurr);
                setCurrency(nextCurr);
              }}
              style={{
                width: '75px',
                padding: '10px 6px',
                backgroundColor: 'var(--color-ivory-light)',
                borderRight: 'none',
                borderRadius: 'var(--radius-xs) 0 0 var(--radius-xs)',
                fontWeight: 600,
                fontSize: '0.8rem',
              }}
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
            <input
              id="originalPurchasePrice"
              type="text"
              placeholder="e.g. 1050000"
              value={formData.originalPurchasePrice}
              onChange={(e) => updateField('originalPurchasePrice', e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                backgroundColor: 'var(--color-ivory)',
                borderRadius: '0 var(--radius-xs) var(--radius-xs) 0',
                fontSize: '0.86rem',
                borderColor: errors.originalPurchasePrice ? 'var(--color-burgundy)' : 'var(--color-stone)',
              }}
            />
          </div>
          {errors.originalPurchasePrice && (
            <p className="error-alert" style={{ color: 'var(--color-burgundy)', fontSize: '0.78rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={13} />
              <span>{errors.originalPurchasePrice}</span>
            </p>
          )}
        </div>
      </div>

      {/* Exotic CITES Advisory */}
      {isExoticLeather && (
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: 'var(--color-burgundy-subtle)',
            border: '1.5px solid var(--color-burgundy)',
            borderRadius: 'var(--radius-xs)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <AlertCircle size={18} color="var(--color-burgundy)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-burgundy)', marginBottom: '2px' }}>
              CITES Certification Strongly Advised for Exotic Skin
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-espresso)', lineHeight: 1.4 }}>
              Because this piece features <strong>{formData.leather}</strong>, valid CITES documentation is essential for cross-border transit and optimal secondary auction clearance.
            </p>
          </div>
        </div>
      )}

      {/* Documentation Checklist */}
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
          Accompanying Documentation
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '8px' }}>
          {DOCUMENTATION_OPTIONS.map((doc) => {
            const isChecked = formData.documentation.includes(doc.id);
            const isCitesRecommended = doc.id === 'cites_cert' && isExoticLeather;
            return (
              <button
                type="button"
                key={doc.id}
                onClick={() => toggleArrayField('documentation', doc.id)}
                className={`interactive-card ${isChecked ? 'is-active' : ''}`}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  backgroundColor: isChecked ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                  border: `1.5px solid ${
                    isChecked
                      ? 'var(--color-burgundy)'
                      : isCitesRecommended
                      ? 'rgba(112, 43, 67, 0.45)'
                      : 'var(--color-stone)'
                  }`,
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
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                    <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                      {doc.label}
                    </span>
                    {isCitesRecommended && (
                      <span
                        style={{
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          padding: '2px 5px',
                          backgroundColor: 'var(--color-burgundy)',
                          color: 'var(--color-ivory)',
                          borderRadius: '2px',
                          flexShrink: 0,
                        }}
                      >
                        Exotic
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Packaging Status */}
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
          Packaging State
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {PACKAGING_OPTIONS.map((pkg) => {
            const isSelected = formData.packaging === pkg.value;
            return (
              <button
                type="button"
                key={pkg.value}
                onClick={() => updateField('packaging', pkg.value)}
                className={`interactive-card ${isSelected ? 'is-active' : ''}`}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  backgroundColor: isSelected ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                  border: `1.5px solid ${isSelected ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                  {pkg.label}
                </span>
                {isSelected && (
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-burgundy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-ivory)',
                    }}
                  >
                    <Check size={9} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
