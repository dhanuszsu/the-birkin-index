import React from 'react';
import { useValuation } from '../../context/ValuationContext';
import { BIRKIN_LEATHERS, BIRKIN_COLORS, BIRKIN_HARDWARE } from '../../config/birkinOptions';
import { AlertCircle, Check } from 'lucide-react';

export const Stage2MaterialAppearance: React.FC = () => {
  const { formData, updateField, errors } = useValuation();

  const primaryLeathers = [
    { name: 'Togo', desc: 'Baby calfskin • Scratch resistant matte grain' },
    { name: 'Epsom', desc: 'Pressed rigid grain • Lightweight & structured' },
    { name: 'Clemence', desc: 'Taurillon bull calf • Relaxed supple drape' },
    { name: 'Swift', desc: 'Fine smooth grain • Luminous pigment saturation' },
    { name: 'Box Calf', desc: 'Heritage formal standard • Mirror gloss patina' },
    { name: 'Porosus Crocodile', desc: 'Top tier exotic • Distinct symmetrical pore' },
  ];

  const allColors = BIRKIN_COLORS.flatMap((g) => g.items);
  const selectedColorObj = allColors.find((c) => c.value === formData.color);
  const isColorInQuickSwatches = BIRKIN_COLORS[0].items.some((c) => c.value === formData.color);

  const isExoticLeather = ['Porosus Crocodile', 'Niloticus Crocodile', 'Alligator', 'Lizard', 'Ostrich'].some(
    (ex) => formData.leather?.includes(ex) || formData.leather === ex
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <div className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '4px' }}>
          Stage 02 • Materiality & Finish
        </div>
        <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-espresso)', marginBottom: '6px' }}>
          Skin Family, Colour & Hardware Plating
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-espresso-muted)' }}>
          Hermès skins and hardware treatments establish both aesthetic desirability and physical durability.
        </p>
      </div>

      {/* Primary Leather Cards */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-espresso)',
            }}
          >
            Leather / Skin Specification *
          </label>
        </div>

        {/* Quick-Select Cards for Top Leathers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '10px', marginBottom: '12px' }}>
          {primaryLeathers.map((item) => {
            const isSelected = formData.leather === item.name || (formData.leather ? formData.leather.includes(item.name) : false);
            return (
              <button
                type="button"
                key={item.name}
                onClick={() => updateField('leather', item.name)}
                className={`interactive-card ${isSelected ? 'is-active' : ''}`}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  backgroundColor: isSelected ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                  border: `1.5px solid ${isSelected ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                    {item.name}
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
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--color-espresso-muted)', lineHeight: 1.3 }}>
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Full Archive Leather Dropdown for Rare Skins */}
        <select
          id="leatherSelect"
          value={formData.leather}
          onChange={(e) => updateField('leather', e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            backgroundColor: 'var(--color-ivory)',
            borderColor: errors.leather ? 'var(--color-burgundy)' : 'var(--color-stone)',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          <option value="">Or browse full exotic & vintage leather catalog...</option>
          {BIRKIN_LEATHERS.map((group) => (
            <optgroup key={group.group} label={group.group}>
              {group.items.map((it) => (
                <option key={it.value} value={it.value}>
                  {it.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        {isExoticLeather && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px 14px',
              backgroundColor: 'var(--color-burgundy-subtle)',
              border: '1px solid rgba(112, 43, 67, 0.15)',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--color-burgundy)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Exotic Skin Classification:
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-espresso)' }}>
              CITES export permit verification will be highlighted in Stage 04 for international auction validity.
            </span>
          </div>
        )}

        {errors.leather && (
          <p className="error-alert" style={{ color: 'var(--color-burgundy)', fontSize: '0.78rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={13} />
            <span>{errors.leather}</span>
          </p>
        )}
      </div>

      {/* Colour Swatches Grid */}
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
          Hermès Colour Shade *
        </label>

        {/* Visual Swatch Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          {BIRKIN_COLORS[0].items.map((c) => {
            const isSelected = formData.color === c.value;
            return (
              <button
                type="button"
                key={c.value}
                onClick={() => updateField('color', c.value)}
                className={`interactive-card ${isSelected ? 'is-active' : ''}`}
                style={{
                  padding: '8px',
                  border: `1.5px solid ${isSelected ? 'var(--color-burgundy)' : 'var(--color-stone)'}`,
                  backgroundColor: isSelected ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: c.hex,
                    border: '1px solid rgba(48, 42, 35, 0.2)',
                    boxShadow: isSelected ? '0 0 0 2px var(--color-burgundy)' : 'none',
                    transition: 'box-shadow 200ms ease',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--color-espresso)',
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}
                >
                  {c.label.split('(')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Full catalog select */}
        <select
          id="colorInput"
          value={formData.color}
          onChange={(e) => updateField('color', e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            backgroundColor: 'var(--color-ivory)',
            borderColor: errors.color ? 'var(--color-burgundy)' : 'var(--color-stone)',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          <option value="">Or select from comprehensive colour archive...</option>
          {BIRKIN_COLORS.map((grp) => (
            <optgroup key={grp.group} label={grp.group}>
              {grp.items.map((ci) => (
                <option key={ci.value} value={ci.value}>
                  {ci.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        {formData.color && !isColorInQuickSwatches && (
          <div
            style={{
              marginTop: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: 'var(--color-ivory-light)',
              border: '1px solid var(--color-stone)',
              borderRadius: 'var(--radius-xs)',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: selectedColorObj?.hex || '#877B70',
                border: '1px solid rgba(48, 42, 35, 0.2)',
              }}
            />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
              Active Archive Shade: {selectedColorObj?.label || formData.color}
            </span>
          </div>
        )}

        {errors.color && (
          <p className="error-alert" style={{ color: 'var(--color-burgundy)', fontSize: '0.78rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={13} />
            <span>{errors.color}</span>
          </p>
        )}
      </div>

      {/* Hardware Finish Cards */}
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
          Hardware Plating *
        </label>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '10px',
          }}
        >
          {BIRKIN_HARDWARE.slice(0, 6).map((hw) => {
            const isSelected = formData.hardware === hw.value;
            const chipColor = hw.value.includes('Gold') && !hw.value.includes('Rose') && !hw.value.includes('Palladium')
              ? '#C59B51'
              : hw.value.includes('Rose')
              ? '#D89E94'
              : hw.value.includes('Palladium')
              ? '#A8B0B8'
              : '#C4B184';

            return (
              <button
                type="button"
                key={hw.value}
                onClick={() => updateField('hardware', hw.value)}
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
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: chipColor,
                    border: '1px solid rgba(48, 42, 35, 0.2)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-espresso)' }}>
                    {hw.label.split('(')[0].trim()}
                  </div>
                </div>
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

        {errors.hardware && (
          <p className="error-alert" style={{ color: 'var(--color-burgundy)', fontSize: '0.78rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={13} />
            <span>{errors.hardware}</span>
          </p>
        )}
      </div>

      {/* Stitching / Construction Style */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          paddingTop: '12px',
          borderTop: '1px solid var(--color-stone-subtle)',
        }}
      >
        <div>
          <label
            htmlFor="stitching"
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
            Stitching Geometry (Construction)
          </label>
          <select
            id="stitching"
            value={formData.stitching}
            onChange={(e) => updateField('stitching', e.target.value as any)}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: 'var(--color-ivory)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.85rem',
            }}
          >
            <option value="">Select stitching architecture...</option>
            <option value="Retourne">Retourne (Turned inside-out, relaxed classic)</option>
            <option value="Sellier">Sellier (Rigid exterior topstitching, architectural)</option>
            <option value="Unknown">Uncertain / Standard</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              color: 'var(--color-espresso)',
              userSelect: 'none',
            }}
          >
            <input
              type="checkbox"
              checked={formData.twoToneOrCustom}
              onChange={(e) => updateField('twoToneOrCustom', e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: 'var(--color-burgundy)',
                cursor: 'pointer',
              }}
            />
            <span>Bi-Color or Contrasting Interior / Stitching</span>
          </label>
        </div>
      </div>
    </div>
  );
};
