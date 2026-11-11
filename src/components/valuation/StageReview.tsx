import React from 'react';
import { useValuation } from '../../context/ValuationContext';
import { useNavigate } from 'react-router-dom';
import { Edit2, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';

export const StageReview: React.FC = () => {
  const { formData, goToStage, setIsSubmitted } = useValuation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsSubmitted(true);
    navigate('/valuation/result');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <div className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '4px' }}>
          Verification • Atelier Review
        </div>
        <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-espresso)', marginBottom: '6px' }}>
          Review Specification Dossier
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-espresso-muted)' }}>
          Confirm parameters before generating the final private valuation dossier.
        </p>
      </div>

      {/* Review Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Section 1: Identity */}
        <div className="surface-light" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="eyebrow" style={{ color: 'var(--color-burgundy)', fontSize: '0.68rem' }}>
              01 • Bag Identity
            </span>
            <button
              type="button"
              onClick={() => goToStage(1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem',
                color: 'var(--color-espresso)',
                fontWeight: 600,
              }}
            >
              <Edit2 size={11} />
              <span>Modify</span>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Silhouette</span>
              <strong>{formData.model || 'Unspecified'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Scale</span>
              <strong>{formData.size ? `Birkin ${formData.size} cm` : 'Unspecified'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Era</span>
              <strong>{formData.productionYear || 'Unspecified'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Stamp</span>
              <strong>{formData.blindStamp || 'Not recorded'}</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Material & Hardware */}
        <div className="surface-light" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="eyebrow" style={{ color: 'var(--color-burgundy)', fontSize: '0.68rem' }}>
              02 • Material & Hardware
            </span>
            <button
              type="button"
              onClick={() => goToStage(2)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem',
                color: 'var(--color-espresso)',
                fontWeight: 600,
              }}
            >
              <Edit2 size={11} />
              <span>Modify</span>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Leather / Skin</span>
              <strong>{formData.leather || 'Unspecified'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Colour</span>
              <strong>{formData.color ? formData.color.split('(')[0].trim() : 'Unspecified'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Hardware</span>
              <strong>{formData.hardware ? formData.hardware.split('(')[0].trim() : 'Unspecified'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Stitching</span>
              <strong>{formData.stitching || 'Standard'}</strong>
            </div>
          </div>
        </div>

        {/* Section 3: Condition */}
        <div className="surface-light" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="eyebrow" style={{ color: 'var(--color-burgundy)', fontSize: '0.68rem' }}>
              03 • Condition Grade
            </span>
            <button
              type="button"
              onClick={() => goToStage(3)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem',
                color: 'var(--color-espresso)',
                fontWeight: 600,
              }}
            >
              <Edit2 size={11} />
              <span>Modify</span>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Grade</span>
              <strong style={{ color: 'var(--color-burgundy)' }}>{formData.condition || 'Unspecified'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Hardware Seals</span>
              <strong>{formData.hasHardwareProtectiveFilm ? 'Factory Seals Present' : 'Removed'}</strong>
            </div>
          </div>
        </div>

        {/* Section 4 & 5: Provenance & Accoutrements */}
        <div className="surface-light" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="eyebrow" style={{ color: 'var(--color-burgundy)', fontSize: '0.68rem' }}>
              04 & 05 • Provenance & Accoutrements
            </span>
            <button
              type="button"
              onClick={() => goToStage(4)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem',
                color: 'var(--color-espresso)',
                fontWeight: 600,
              }}
            >
              <Edit2 size={11} />
              <span>Modify</span>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Packaging</span>
              <strong>{formData.packaging || 'Bag only'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Documentation</span>
              <strong>
                {formData.documentation.includes('none')
                  ? 'No Paperwork'
                  : formData.documentation.length > 0
                  ? `${formData.documentation.length} document(s)`
                  : 'None'}
              </strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-espresso-light)', display: 'block', fontSize: '0.7rem' }}>Accessories</span>
              <strong>
                {formData.accessories.includes('none')
                  ? 'Bag Only (No Inclusions)'
                  : formData.accessories.length > 0
                  ? `${formData.accessories.length} element(s)`
                  : 'Bag only'}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Engine Status Note */}
      <div
        style={{
          borderLeft: '2px solid var(--color-burgundy)',
          backgroundColor: 'var(--color-burgundy-subtle)',
          padding: '16px 20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <ShieldAlert size={20} color="var(--color-burgundy)" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: '0.8rem', color: 'var(--color-espresso)', lineHeight: 1.45 }}>
          <strong>Phase 01 Architectural Protocol:</strong> The valuation engine is inactive in this foundation release. Submitting will display the formal valuation dossier without synthetic prices.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-stone)',
        }}
      >
        <button
          type="button"
          onClick={() => goToStage(5)}
          className="btn btn-secondary"
          style={{ padding: '12px 20px', fontSize: '0.75rem' }}
        >
          <ArrowLeft size={13} />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-wine"
          style={{ padding: '12px 28px', fontSize: '0.75rem' }}
        >
          <span>Generate Valuation Dossier</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
