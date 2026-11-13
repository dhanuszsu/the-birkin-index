import React, { useState, useMemo } from 'react';
import { useCompare } from '../context/CompareContext';
import { useCurrency } from '../context/CurrencyContext';
import { useValuation } from '../context/ValuationContext';
import { ARCHIVE_RECORDS } from '../data/archiveRecords';
import { ArchiveRecord } from '../types/archive';
import {
  convertArchiveRecordToCompareItem,
  convertValuationToCompareItem,
  EDITORIAL_BENCHMARK_ITEMS,
} from '../utils/compareData';
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpRight,
  Database,
  Layers,
  ShieldCheck,
  Calendar,
  RotateCcw,
  Scale,
} from 'lucide-react';

export const IndexPage: React.FC = () => {
  const { openCompare } = useCompare();
  const { formatCurrency } = useCurrency();
  const { formData } = useValuation();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionType, setTransactionType] = useState<'all' | 'completed_sale' | 'asking_price' | 'auction_estimate'>('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedLeather, setSelectedLeather] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedHardware, setSelectedHardware] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'price_desc' | 'price_asc'>('date_desc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter option lists
  const sizeOptions = ['all', '25', '30', '35', '40'];
  const leatherOptions = [
    { id: 'all', label: 'All Skins' },
    { id: 'Togo', label: 'Togo' },
    { id: 'Epsom', label: 'Epsom' },
    { id: 'Clemence', label: 'Clémence' },
    { id: 'Swift', label: 'Swift' },
    { id: 'Box Calf', label: 'Box Calf' },
    { id: 'Porosus Crocodile', label: 'Porosus Croc' },
    { id: 'Niloticus Crocodile', label: 'Niloticus Croc' },
  ];
  const colorOptions = [
    { id: 'all', label: 'All Colours' },
    { id: 'Noir', label: 'Noir (89)' },
    { id: 'Gold', label: 'Gold (37)' },
    { id: 'Etoupe', label: 'Etoupe (18)' },
    { id: 'Craie', label: 'Craie (10)' },
    { id: 'Bleu Nuit', label: 'Bleu Nuit (2Z)' },
    { id: 'Rouge H', label: 'Rouge H (55)' },
    { id: 'Vert Cypress', label: 'Vert Cypress (6O)' },
  ];
  const hardwareOptions = [
    { id: 'all', label: 'All Finishes' },
    { id: 'Gold (GHW)', label: 'Gold (GHW)' },
    { id: 'Palladium (PHW)', label: 'Palladium (PHW)' },
    { id: 'Rose Gold (RGHW)', label: 'Rose Gold (RGHW)' },
  ];
  const conditionOptions = [
    { id: 'all', label: 'All Conditions' },
    { id: 'Store Fresh / Pristine', label: 'Store Fresh' },
    { id: 'Excellent', label: 'Excellent' },
    { id: 'Very Good', label: 'Very Good' },
  ];
  const yearOptions = [
    { id: 'all', label: 'All Eras' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' },
    { id: 'vintage', label: 'Pre-2020 / Vintage' },
  ];

  // Editorial Observations (Part I)
  const editorialObservations = [
    {
      num: '01',
      tag: 'Scale Liquidity',
      category: 'EDITORIAL MARKET COMMENTARY',
      title: 'The Compact Scale Premium: Birkin 25 Liquidity',
      lead: 'Secondary market observations indicate sustained collector demand favoring the 25cm scale over 35cm heritage proportions.',
      body: 'While the 35cm remains the original 1984 proportion designed for Jane Birkin, contemporary secondary market attention has concentrated around the 25cm evening scale. In qualitative observation of Togo Noir GHW pairings across major European and North American auctions, 25cm examples consistently attract broader competitive interest than larger heritage proportions.',
      period: 'Editorial Commentary • Qualitative Assessment',
      sourceAttribution: 'Curatorial Market Observation (Qualitative Analysis — Non-Statistical Benchmark).',
      pairingA: {
        title: 'Birkin 25 Togo Noir GHW',
        model: 'Birkin 25 Retourne',
        size: '25 cm',
        leather: 'Togo Calfskin',
        color: 'Noir (89)',
        hardware: 'Gold (GHW)',
        condition: 'Store Fresh / Pristine',
        productionYear: '2023',
        accessories: 'Full Boutique Packaging (Orange Box, Dustbag, Clochette, Lock, Keys, Raincoat)',
        provenance: "Demonstration Specification (Sotheby's Paris Catalogue Reference)",
        priceFormatted: '€27,500 (Illustrative Hammer Reference)',
        source: "Demonstration Specification (Sotheby's Paris Style)",
        statusBadge: 'Illustrative Specification Reference',
      },
      pairingB: {
        title: 'Birkin 35 Togo Noir GHW',
        model: 'Birkin 35 Retourne',
        size: '35 cm',
        leather: 'Togo Calfskin',
        color: 'Noir (89)',
        hardware: 'Gold (GHW)',
        condition: 'Very Good',
        productionYear: '1984 Heritage Pattern',
        accessories: 'Dustbag, Clochette, Padlock & 2 Keys (Heritage Travel Specification)',
        provenance: "Demonstration Specification (Sotheby's Hong Kong Catalogue Reference)",
        priceFormatted: '€16,500 (Illustrative Hammer Reference)',
        source: "Demonstration Specification (Sotheby's Hong Kong Style)",
        statusBadge: 'Illustrative Specification Reference',
      },
    },
    {
      num: '02',
      tag: 'Architectural Topstitching',
      category: 'EDITORIAL MARKET COMMENTARY',
      title: 'Sellier Rigidity vs. Relaxed Retourne Drape',
      lead: 'Structured Sellier craftsmanship represents distinct artisanal complexity compared to supple Retourne construction.',
      body: 'Originally exclusive to the Kelly, the release of the Birkin Sellier in rigid Epsom skin established a specialized collector niche. Market observers highlight that structured Sellier geometry commands significant attention over relaxed Retourne Clémence, reflecting the rigorous artisanal precision required for visible outer edge saddle stitching.',
      period: 'Construction Study • Qualitative Analysis',
      sourceAttribution: 'Curatorial Craftsmanship Review (Qualitative Analysis).',
      pairingA: {
        title: 'Birkin 25 Sellier Epsom Gold GHW',
        model: 'Birkin 25 Sellier',
        size: '25 cm',
        leather: 'Epsom Leather',
        color: 'Gold (37)',
        hardware: 'Gold (GHW)',
        condition: 'Store Fresh / Pristine',
        productionYear: '2023',
        accessories: 'Full Boutique Packaging (Box, Dustbag, Clochette, Lock, Keys, Raincover)',
        provenance: "Demonstration Specification (Christie's NY Catalogue Reference)",
        priceFormatted: '$31,500 USD (Illustrative Reference)',
        source: "Demonstration Specification (Christie's NY Style)",
        statusBadge: 'Illustrative Specification Reference',
      },
      pairingB: {
        title: 'Birkin 25 Retourne Togo Gold GHW',
        model: 'Birkin 25 Retourne',
        size: '25 cm',
        leather: 'Togo Calfskin',
        color: 'Gold (37)',
        hardware: 'Gold (GHW)',
        condition: 'Store Fresh / Pristine',
        productionYear: '2023',
        accessories: 'Full Boutique Packaging (Box, Dustbag, Clochette, Lock, Keys, Raincover)',
        provenance: 'Demonstration Specification (Bonhams London Catalogue Reference)',
        priceFormatted: '$26,000 USD (Illustrative Reference)',
        source: 'Demonstration Specification (Bonhams Style)',
        statusBadge: 'Illustrative Specification Reference',
      },
    },
    {
      num: '03',
      tag: 'Regulatory Clearance',
      category: 'EDITORIAL MARKET COMMENTARY',
      title: 'The Exotic Provenance Imperative: CITES Compliance',
      lead: 'Physical wildlife trade certificates govern legal settlement and cross-border transportability.',
      body: 'For precious skins—specifically Porosus Crocodile, Niloticus, and Alligator—possession of verifiable CITES documentation dictates liquidity. Handbags lacking original papers face strict legal trade boundaries, restricting secondary buyers and confining sales to domestic jurisdictions.',
      period: 'Regulatory Compliance Dossier',
      sourceAttribution: 'Legal & Auction Compliance Protocol (Washington Convention / CITES Guidelines).',
      pairingA: {
        title: 'Birkin 30 Porosus Croc Bleu Marine GHW',
        model: 'Birkin 30 Retourne',
        size: '30 cm',
        leather: 'Porosus Crocodile',
        color: 'Bleu Nuit (2Z)',
        hardware: 'Gold (GHW)',
        condition: 'Excellent (CITES Intact)',
        productionYear: '2021',
        accessories: 'CITES Wildlife Certificate, Full Orange Box, Dustbag, Lock, Keys, Raincoat',
        provenance: "Demonstration Specification (Sotheby's Paris Catalogue Reference — CITES Intact)",
        priceFormatted: '€52,000 (Illustrative Reference)',
        source: "Demonstration Specification (Sotheby's Paris Style)",
        statusBadge: 'Illustrative Specification Reference',
      },
      pairingB: {
        title: 'Birkin 30 Togo Etoupe PHW',
        model: 'Birkin 30 Retourne',
        size: '30 cm',
        leather: 'Togo Calfskin',
        color: 'Etoupe (18)',
        hardware: 'Palladium (PHW)',
        condition: 'Excellent (Standard Leather)',
        productionYear: '2021',
        accessories: 'Full Orange Box, Dustbag, Clochette, Lock, Keys, Felt',
        provenance: 'Demonstration Specification (Artcurial Monaco Catalogue Reference)',
        priceFormatted: '€22,000 (Illustrative Reference)',
        source: 'Demonstration Specification (Artcurial Style)',
        statusBadge: 'Illustrative Specification Reference',
      },
    },
  ];

  // Active filter detection
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    transactionType !== 'all' ||
    selectedSize !== 'all' ||
    selectedLeather !== 'all' ||
    selectedColor !== 'all' ||
    selectedHardware !== 'all' ||
    selectedCondition !== 'all' ||
    selectedYear !== 'all';

  const clearAllFilters = () => {
    setSearchQuery('');
    setTransactionType('all');
    setSelectedSize('all');
    setSelectedLeather('all');
    setSelectedColor('all');
    setSelectedHardware('all');
    setSelectedCondition('all');
    setSelectedYear('all');
    setSortBy('date_desc');
  };

  // Filter & Sort Logic
  const filteredRecords = useMemo(() => {
    return ARCHIVE_RECORDS.filter((rec) => {
      // Transaction type filter
      if (transactionType !== 'all' && rec.transactionType !== transactionType) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'all' && rec.size !== selectedSize) {
        return false;
      }

      // Leather filter
      if (selectedLeather !== 'all') {
        if (!rec.leather.toLowerCase().includes(selectedLeather.toLowerCase())) {
          return false;
        }
      }

      // Color filter
      if (selectedColor !== 'all') {
        if (!rec.color.toLowerCase().includes(selectedColor.toLowerCase())) {
          return false;
        }
      }

      // Hardware filter
      if (selectedHardware !== 'all') {
        if (!rec.hardware.toLowerCase().includes(selectedHardware.toLowerCase())) {
          return false;
        }
      }

      // Condition filter
      if (selectedCondition !== 'all') {
        if (!rec.condition.toLowerCase().includes(selectedCondition.toLowerCase())) {
          return false;
        }
      }

      // Year filter
      if (selectedYear !== 'all') {
        if (selectedYear === 'vintage') {
          const yr = parseInt(rec.productionYear || '2000', 10);
          if (yr >= 2020) return false;
        } else if (rec.productionYear !== selectedYear) {
          return false;
        }
      }

      // Free Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const searchable = [
          rec.model,
          rec.size,
          rec.leather,
          rec.color,
          rec.hardware,
          rec.sourceName,
          rec.sourceReference,
          rec.condition,
          rec.productionYear,
        ]
          .join(' ')
          .toLowerCase();

        if (!searchable.includes(q)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date_desc') {
        return (b.transactionDate || '').localeCompare(a.transactionDate || '');
      } else if (sortBy === 'date_asc') {
        return (a.transactionDate || '').localeCompare(b.transactionDate || '');
      } else if (sortBy === 'price_desc') {
        return b.priceInINR - a.priceInINR;
      } else if (sortBy === 'price_asc') {
        return a.priceInINR - b.priceInINR;
      }
      return 0;
    });
  }, [
    transactionType,
    selectedSize,
    selectedLeather,
    selectedColor,
    selectedHardware,
    selectedCondition,
    selectedYear,
    searchQuery,
    sortBy,
  ]);

  const handleRecordCompare = (rec: ArchiveRecord) => {
    const recordItem = convertArchiveRecordToCompareItem(rec);
    if (formData.model || formData.size || formData.leather) {
      const userItem = convertValuationToCompareItem(formData);
      openCompare(`Your Valuation vs. ${rec.id}`, userItem, recordItem);
    } else {
      const benchmarkItem =
        rec.size === '25'
          ? EDITORIAL_BENCHMARK_ITEMS[0] // Birkin 35 heritage
          : EDITORIAL_BENCHMARK_ITEMS[1]; // Birkin 25 compact
      openCompare(`Specification Study: ${rec.model} ${rec.size}cm`, recordItem, benchmarkItem);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Editorial Page Header */}
      <section
        style={{
          borderBottom: '1px solid var(--color-stone)',
          paddingTop: 'clamp(56px, 8vw, 96px)',
          paddingBottom: 'clamp(40px, 6vw, 72px)',
          backgroundColor: 'var(--color-ivory)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '840px' }}>
            <span className="eyebrow" style={{ color: 'var(--color-burgundy)', marginBottom: '12px', display: 'block' }}>
              The Secondary Market Repository
            </span>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.8rem, 5vw, 4.4rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
                marginBottom: '16px',
                color: 'var(--color-espresso)',
              }}
            >
              The Index & Market Edit.
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-espresso-muted)' }}>
              Curated luxury market intelligence combined with an uncompromised, non-synthetic secondary price archive.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART I: THE MARKET EDIT — Curated Editorial Journal
         ========================================================================= */}
      <section
        style={{
          borderBottom: '1px solid var(--color-stone)',
          paddingTop: 'clamp(48px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
          backgroundColor: 'var(--color-ivory)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '36px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: 'var(--color-espresso-light)', display: 'block', marginBottom: '4px' }}>
                PART I — EDITORIAL OBSERVATIONS
              </span>
              <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 400, color: 'var(--color-espresso)' }}>
                The Market Edit
              </h2>
            </div>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-burgundy)', fontWeight: 600 }}>
              Curated Market Journal • 2024 Index
            </span>
          </div>

          {/* Continuous Editorial Journal Entries */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {editorialObservations.map((obs) => (
              <article
                key={obs.num}
                style={{
                  borderTop: '1px solid var(--color-stone)',
                  paddingTop: 'clamp(28px, 4vw, 44px)',
                  paddingBottom: 'clamp(28px, 4vw, 44px)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(70px, 110px) minmax(280px, 1.2fr) minmax(280px, 1fr)',
                  gap: 'clamp(20px, 4vw, 48px)',
                  alignItems: 'flex-start',
                }}
                className="journal-entry-row"
              >
                {/* Number & Date */}
                <div>
                  <span className="editorial-number">{obs.num}</span>
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--color-espresso-light)', marginTop: '6px' }}>
                    {obs.period}
                  </span>
                </div>

                {/* Headline & Lead */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '2px 6px',
                        backgroundColor: 'rgba(112, 43, 67, 0.08)',
                        color: 'var(--color-burgundy)',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid rgba(112, 43, 67, 0.15)',
                      }}
                    >
                      {obs.category}
                    </span>
                    <span className="eyebrow" style={{ color: 'var(--color-espresso-light)', fontSize: '0.66rem' }}>
                      {obs.tag}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)',
                      color: 'var(--color-espresso)',
                      lineHeight: 1.15,
                      marginBottom: '10px',
                    }}
                  >
                    {obs.title}
                  </h3>
                  <p className="italic-accent" style={{ fontSize: '0.96rem', color: 'var(--color-wine-deep)', lineHeight: 1.5 }}>
                    “{obs.lead}”
                  </p>
                </div>

                {/* Analysis Body & Active Compare Action */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-espresso-muted)', lineHeight: 1.65, marginBottom: '14px' }}>
                      {obs.body}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-espresso-light)', fontStyle: 'italic', marginBottom: '20px' }}>
                      {obs.sourceAttribution}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openCompare(obs.title, obs.pairingA, obs.pairingB)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-burgundy)',
                      background: 'none',
                      border: 'none',
                      padding: '4px 0',
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Layers size={13} />
                    <span>Open Comparative Study</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </article>
            ))}
            <div style={{ borderTop: '1px solid var(--color-stone)' }} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          PART II: THE PRICE ARCHIVE — Standardized Luxury Repository
         ========================================================================= */}
      <section
        style={{
          paddingTop: 'clamp(56px, 7vw, 88px)',
          paddingBottom: 'clamp(64px, 8vw, 104px)',
          backgroundColor: 'var(--color-ivory-light)',
        }}
      >
        <div className="container">
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: 'var(--color-espresso-light)', display: 'block', marginBottom: '4px' }}>
                PART II — DATA REPOSITORY
              </span>
              <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 400, color: 'var(--color-espresso)' }}>
                The Price Archive
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  if (formData.model || formData.size || formData.leather) {
                    const userItem = convertValuationToCompareItem(formData);
                    openCompare('Your Valuation vs. Compact Benchmark', userItem, EDITORIAL_BENCHMARK_ITEMS[1]);
                  } else {
                    openCompare('Specification Spread Analysis', EDITORIAL_BENCHMARK_ITEMS[1], EDITORIAL_BENCHMARK_ITEMS[0]);
                  }
                }}
                className="btn btn-secondary"
                style={{
                  padding: '9px 15px',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                title="Launch specification comparison atelier"
              >
                <Scale size={13} color="var(--color-burgundy)" />
                <span>Compare Models</span>
              </button>

              {/* Transaction Type Segmented Toggle: Completed Sales vs Asking Prices vs Auction Estimates vs All */}
              <div
                style={{
                  display: 'inline-flex',
                  border: '1px solid var(--color-stone)',
                  backgroundColor: 'var(--color-ivory)',
                  padding: '3px',
                  flexWrap: 'wrap',
                  gap: '2px',
                }}
              >
              <button
                type="button"
                onClick={() => setTransactionType('completed_sale')}
                style={{
                  padding: '8px 14px',
                  fontSize: '0.72rem',
                  fontWeight: transactionType === 'completed_sale' ? 700 : 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: transactionType === 'completed_sale' ? 'var(--color-wine-deep)' : 'transparent',
                  color: transactionType === 'completed_sale' ? 'var(--color-ivory)' : 'var(--color-espresso)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 160ms ease',
                }}
              >
                Completed Sales ({ARCHIVE_RECORDS.filter((r) => r.transactionType === 'completed_sale').length})
              </button>
              <button
                type="button"
                onClick={() => setTransactionType('asking_price')}
                style={{
                  padding: '8px 14px',
                  fontSize: '0.72rem',
                  fontWeight: transactionType === 'asking_price' ? 700 : 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: transactionType === 'asking_price' ? 'var(--color-burgundy)' : 'transparent',
                  color: transactionType === 'asking_price' ? 'var(--color-ivory)' : 'var(--color-espresso)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 160ms ease',
                }}
              >
                Asking Prices ({ARCHIVE_RECORDS.filter((r) => r.transactionType === 'asking_price').length})
              </button>
              <button
                type="button"
                onClick={() => setTransactionType('auction_estimate')}
                style={{
                  padding: '8px 14px',
                  fontSize: '0.72rem',
                  fontWeight: transactionType === 'auction_estimate' ? 700 : 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: transactionType === 'auction_estimate' ? 'var(--color-stone-dark)' : 'transparent',
                  color: transactionType === 'auction_estimate' ? 'var(--color-ivory)' : 'var(--color-espresso)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 160ms ease',
                }}
              >
                Auction Estimates ({ARCHIVE_RECORDS.filter((r) => r.transactionType === 'auction_estimate').length})
              </button>
              <button
                type="button"
                onClick={() => setTransactionType('all')}
                style={{
                  padding: '8px 14px',
                  fontSize: '0.72rem',
                  fontWeight: transactionType === 'all' ? 700 : 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: transactionType === 'all' ? 'var(--color-espresso)' : 'transparent',
                  color: transactionType === 'all' ? 'var(--color-ivory)' : 'var(--color-espresso)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 160ms ease',
                }}
              >
                All Records ({ARCHIVE_RECORDS.length})
              </button>
            </div>
          </div>
        </div>

          {/* Institutional Integrity & Distinction Banner */}
          <div
            style={{
              padding: '14px 20px',
              marginBottom: '20px',
              borderLeft: `3px solid ${
                transactionType === 'completed_sale'
                  ? 'var(--color-wine-deep)'
                  : transactionType === 'asking_price'
                  ? 'var(--color-burgundy)'
                  : transactionType === 'auction_estimate'
                  ? 'var(--color-espresso-muted)'
                  : 'var(--color-espresso)'
              }`,
              backgroundColor:
                transactionType === 'completed_sale'
                  ? 'rgba(75, 23, 41, 0.05)'
                  : transactionType === 'asking_price'
                  ? 'rgba(112, 43, 67, 0.05)'
                  : transactionType === 'auction_estimate'
                  ? 'rgba(138, 126, 118, 0.08)'
                  : 'var(--color-ivory)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <span style={{ maxWidth: '850px', lineHeight: 1.5 }}>
              <strong>
                {transactionType === 'completed_sale'
                  ? 'Completed Sales Archive: '
                  : transactionType === 'asking_price'
                  ? 'Published Dealer Ask Archive: '
                  : transactionType === 'auction_estimate'
                  ? 'Published Auction Estimates: '
                  : 'Demonstration Repository Overview: '}
              </strong>
              {transactionType === 'completed_sale'
                ? 'Displaying recorded auction sale entries (price including buyer’s premium). Segregated from dealer asks and estimates. Records lacking verified catalogue URL proofs remain UNVERIFIED and are strictly excluded from ML training pipelines.'
                : transactionType === 'asking_price'
                ? 'Filtering secondary specialist dealer asking prices. Unnegotiated dealer listings subject to dealer markup; strictly excluded from predictive regression datasets.'
                : transactionType === 'auction_estimate'
                ? 'Displaying pre-sale auction estimate ranges (midpoint references). Speculative auctioneer projections; strictly excluded from settlement benchmarks and ML models.'
                : 'Displaying complete demonstration repository spanning auction sales, dealer asking prices, and auction estimates. All 16 illustrative records are quarantined from the ML research training pipeline.'}
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color:
                  transactionType === 'completed_sale'
                    ? 'var(--color-wine-deep)'
                    : transactionType === 'asking_price'
                    ? 'var(--color-burgundy)'
                    : transactionType === 'auction_estimate'
                    ? 'var(--color-espresso-muted)'
                    : 'var(--color-espresso)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {transactionType === 'completed_sale'
                ? 'COMPLETED SALES (AUCTION)'
                : transactionType === 'asking_price'
                ? 'DEALER ASKS'
                : transactionType === 'auction_estimate'
                ? 'AUCTION ESTIMATES'
                : 'ALL RECORDS'}
            </span>
          </div>

          {/* Interactive Search & Multi-Filter Control Console */}
          <div
            style={{
              backgroundColor: 'var(--color-ivory)',
              border: '1px solid var(--color-stone)',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            {/* Top Row: Search Input + Sorting + Clear */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
                <input
                  type="text"
                  placeholder="Search size, skin, colour, hardware, or auction house (e.g. 25 Togo Noir GHW)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 36px',
                    backgroundColor: 'var(--color-ivory-light)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.86rem',
                    border: '1px solid var(--color-stone)',
                  }}
                />
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--color-espresso-light)' }} />
              </div>

              {/* Sorting Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-ivory-light)',
                    border: '1px solid var(--color-stone)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  <option value="date_desc">Newest Sale Date First</option>
                  <option value="date_asc">Oldest Sale Date First</option>
                  <option value="price_desc">Price: Highest to Lowest</option>
                  <option value="price_asc">Price: Lowest to Highest</option>
                </select>
              </div>

              {/* Mobile filter toggle */}
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="mobile-filter-btn"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 14px',
                  backgroundColor: 'var(--color-ivory-light)',
                  border: '1px solid var(--color-stone)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <SlidersHorizontal size={13} />
                <span>Filters</span>
              </button>

              {/* Clear filters button */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    color: 'var(--color-burgundy)',
                    fontWeight: 700,
                    padding: '9px 14px',
                    backgroundColor: 'rgba(112, 43, 67, 0.08)',
                    border: '1px solid var(--color-burgundy)',
                    borderRadius: 'var(--radius-xs)',
                    cursor: 'pointer',
                  }}
                >
                  <X size={12} />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            {/* Filter Dimensions Grid (Desktop & Expandable Mobile) */}
            <div className={`archive-filters-grid ${showMobileFilters ? 'is-open' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Row 1: Size & Skin */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {/* Size Chips */}
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-espresso-light)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Proportion Scale:
                  </span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {sizeOptions.map((s) => {
                      const isSel = selectedSize === s;
                      return (
                        <button
                          key={`size-${s}`}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          style={{
                            padding: '5px 12px',
                            fontSize: '0.72rem',
                            fontWeight: isSel ? 700 : 500,
                            backgroundColor: isSel ? 'var(--color-wine-deep)' : 'var(--color-ivory-light)',
                            color: isSel ? 'var(--color-ivory)' : 'var(--color-espresso)',
                            border: `1px solid ${isSel ? 'var(--color-wine-deep)' : 'var(--color-stone)'}`,
                            borderRadius: 'var(--radius-xs)',
                            cursor: 'pointer',
                          }}
                        >
                          {s === 'all' ? 'All Sizes' : `${s} cm`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Skin Selector */}
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-espresso-light)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Skin / Leather:
                  </span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {leatherOptions.map((l) => {
                      const isSel = selectedLeather === l.id;
                      return (
                        <button
                          key={`l-${l.id}`}
                          type="button"
                          onClick={() => setSelectedLeather(l.id)}
                          style={{
                            padding: '5px 10px',
                            fontSize: '0.72rem',
                            fontWeight: isSel ? 700 : 500,
                            backgroundColor: isSel ? 'var(--color-wine-deep)' : 'var(--color-ivory-light)',
                            color: isSel ? 'var(--color-ivory)' : 'var(--color-espresso)',
                            border: `1px solid ${isSel ? 'var(--color-wine-deep)' : 'var(--color-stone)'}`,
                            borderRadius: 'var(--radius-xs)',
                            cursor: 'pointer',
                          }}
                        >
                          {l.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Row 2: Colour, Hardware & Condition Dropdowns */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-stone-subtle)' }}>
                {/* Colour */}
                <div>
                  <label htmlFor="colorFilter" style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-espresso-light)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Colour Shade:
                  </label>
                  <select
                    id="colorFilter"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      backgroundColor: 'var(--color-ivory-light)',
                      border: '1px solid var(--color-stone)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.78rem',
                    }}
                  >
                    {colorOptions.map((c) => (
                      <option key={`c-${c.id}`} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hardware */}
                <div>
                  <label htmlFor="hwFilter" style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-espresso-light)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Hardware Plating:
                  </label>
                  <select
                    id="hwFilter"
                    value={selectedHardware}
                    onChange={(e) => setSelectedHardware(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      backgroundColor: 'var(--color-ivory-light)',
                      border: '1px solid var(--color-stone)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.78rem',
                    }}
                  >
                    {hardwareOptions.map((h) => (
                      <option key={`h-${h.id}`} value={h.id}>
                        {h.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label htmlFor="condFilter" style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-espresso-light)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Preservation:
                  </label>
                  <select
                    id="condFilter"
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      backgroundColor: 'var(--color-ivory-light)',
                      border: '1px solid var(--color-stone)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.78rem',
                    }}
                  >
                    {conditionOptions.map((cd) => (
                      <option key={`cd-${cd.id}`} value={cd.id}>
                        {cd.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Production Year */}
                <div>
                  <label htmlFor="yearFilter" style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-espresso-light)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Era / Year:
                  </label>
                  <select
                    id="yearFilter"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      backgroundColor: 'var(--color-ivory-light)',
                      border: '1px solid var(--color-stone)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.78rem',
                    }}
                  >
                    {yearOptions.map((y) => (
                      <option key={`y-${y.id}`} value={y.id}>
                        {y.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--color-stone)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={14} color="var(--color-burgundy)" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-espresso)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Archive Findings: {filteredRecords.length} Record{filteredRecords.length === 1 ? '' : 's'} Indexing
              </span>
            </div>

            <span style={{ fontSize: '0.72rem', color: 'var(--color-espresso-light)' }}>
              Values displayed in {formatCurrency(0).split('0')[0].trim() || 'Selected Currency'} • Segregated by transaction type & data basis
            </span>
          </div>

          {/* Records Display or Honest Empty State */}
          {filteredRecords.length === 0 ? (
            /* Honest Informative Empty State */
            <div
              style={{
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-stone)',
                padding: 'clamp(48px, 6vw, 72px) clamp(24px, 4vw, 48px)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-ivory-light)',
                  border: '1px solid var(--color-stone)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-burgundy)',
                }}
              >
                <Database size={20} strokeWidth={1.5} />
              </div>

              <span className="eyebrow" style={{ color: 'var(--color-burgundy)', display: 'block', marginBottom: '6px' }}>
                Institutional Provenance Integrity
              </span>

              <h3 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-espresso)', marginBottom: '12px' }}>
                No Verified Records Match This Exact Filter Set
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--color-espresso-muted)',
                  maxWidth: '540px',
                  margin: '0 auto 24px',
                }}
              >
                The Birkin Index strictly refrains from populating results with synthetic transactions, interpolated estimates, or unvetted marketplace listings. Adjust or broaden your filters to view recorded auction settlements.
              </p>

              <button
                type="button"
                onClick={clearAllFilters}
                className="btn btn-secondary"
                style={{ padding: '12px 24px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <RotateCcw size={13} />
                <span>Reset All Search Filters</span>
              </button>
            </div>
          ) : (
            /* Records Grid / Table */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredRecords.map((rec) => {
                const isCompleted = rec.transactionType === 'completed_sale';
                const isAsking = rec.transactionType === 'asking_price';

                return (
                  <article
                    key={rec.id}
                    style={{
                      backgroundColor: 'var(--color-ivory)',
                      border: '1px solid var(--color-stone)',
                      borderLeft: `4px solid ${
                        isCompleted
                          ? 'var(--color-wine-deep)'
                          : isAsking
                          ? 'var(--color-burgundy)'
                          : 'var(--color-stone-dark)'
                      }`,
                      padding: '20px 24px',
                      display: 'grid',
                      gridTemplateColumns: 'minmax(220px, 1.4fr) minmax(180px, 1.1fr) minmax(160px, 1fr) auto',
                      gap: '20px',
                      alignItems: 'center',
                      transition: 'border-color 160ms ease, box-shadow 160ms ease',
                    }}
                    className="archive-record-row"
                  >
                    {/* Column 1: Model, Size & Skin Specs */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        {/* Transaction Type Tag */}
                        <span
                          style={{
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            padding: '2px 8px',
                            backgroundColor: isCompleted
                              ? 'var(--color-wine-deep)'
                              : isAsking
                              ? 'rgba(112, 43, 67, 0.1)'
                              : 'rgba(138, 126, 118, 0.15)',
                            color: isCompleted
                              ? 'var(--color-ivory)'
                              : isAsking
                              ? 'var(--color-burgundy)'
                              : 'var(--color-espresso)',
                            borderRadius: 'var(--radius-xs)',
                          }}
                        >
                          {isCompleted ? 'Completed Sale' : isAsking ? 'Dealer Asking' : 'Auction Estimate'}
                        </span>

                        {/* Illustrative Record Tag */}
                        {rec.isIllustrative && (
                          <span
                            style={{
                              fontSize: '0.60rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              padding: '2px 7px',
                              backgroundColor: 'rgba(138, 126, 118, 0.12)',
                              color: 'var(--color-espresso-muted)',
                              border: '1px dashed var(--color-stone-dark)',
                              borderRadius: 'var(--radius-xs)',
                            }}
                          >
                            Illustrative Record
                          </span>
                        )}

                        {/* Audit Verification Status Badge */}
                        <span
                          style={{
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            padding: '2px 8px',
                            backgroundColor:
                              rec.verificationStatus === 'VERIFIED'
                                ? 'rgba(40, 110, 60, 0.12)'
                                : rec.verificationStatus === 'PARTIALLY VERIFIED'
                                ? 'rgba(166, 91, 108, 0.15)'
                                : 'rgba(138, 126, 118, 0.12)',
                            color:
                              rec.verificationStatus === 'VERIFIED'
                                ? '#1b5e20'
                                : rec.verificationStatus === 'PARTIALLY VERIFIED'
                                ? 'var(--color-burgundy)'
                                : 'var(--color-espresso-muted)',
                            border: `1px solid ${
                              rec.verificationStatus === 'VERIFIED'
                                ? '#2e7d32'
                                : rec.verificationStatus === 'PARTIALLY VERIFIED'
                                ? 'var(--color-burgundy)'
                                : 'var(--color-stone-dark)'
                            }`,
                            borderRadius: 'var(--radius-xs)',
                          }}
                        >
                          {rec.verificationStatus}
                        </span>

                        {rec.eligibleForML ? (
                          <span
                            style={{
                              fontSize: '0.6rem',
                              fontWeight: 700,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              padding: '2px 6px',
                              backgroundColor: 'rgba(75, 23, 41, 0.08)',
                              color: 'var(--color-wine-deep)',
                              borderRadius: 'var(--radius-xs)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                            }}
                            title="Eligible as verified ground truth for future ML prediction engine calibration"
                          >
                            <ShieldCheck size={10} />
                            <span>ML Research Eligible</span>
                          </span>
                        ) : (
                          <span
                            style={{
                              fontSize: '0.58rem',
                              fontWeight: 600,
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',
                              padding: '2px 6px',
                              backgroundColor: 'rgba(138, 126, 118, 0.08)',
                              color: 'var(--color-espresso-light)',
                              borderRadius: 'var(--radius-xs)',
                            }}
                            title="Strictly excluded from machine learning training pipeline (illustrative demonstration or unverified record)"
                          >
                            Ineligible for ML
                          </span>
                        )}

                        <span style={{ fontSize: '0.68rem', color: 'var(--color-espresso-light)' }}>
                          ID: {rec.id}
                        </span>
                      </div>

                      <h4
                        className="font-display"
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          color: 'var(--color-espresso)',
                          lineHeight: 1.2,
                          marginBottom: '4px',
                        }}
                      >
                        {rec.model} {rec.size} cm • {rec.leather}
                      </h4>

                      <div style={{ display: 'flex', gap: '12px', fontSize: '0.76rem', color: 'var(--color-espresso-muted)', flexWrap: 'wrap' }}>
                        <span>
                          Colour: <strong>{rec.color}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Hardware: <strong>{rec.hardware}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Era: <strong>{rec.productionYear || '—'}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Column 2: Source Provenance & Lot Reference */}
                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                        Provenance Attribution
                      </span>
                      <strong style={{ fontSize: '0.84rem', color: 'var(--color-espresso)', display: 'block', marginBottom: '2px' }}>
                        {rec.sourceName}
                      </strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--color-espresso-muted)', display: 'block' }}>
                        {rec.sourceReference}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <Calendar size={11} color="var(--color-espresso-light)" />
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-espresso-light)' }}>
                          {rec.transactionDate || 'Recorded Date'}
                        </span>
                      </div>
                      {rec.verificationNotes && (
                        <div style={{ marginTop: '6px', fontSize: '0.68rem', color: 'var(--color-espresso-light)', fontStyle: 'italic', borderLeft: '2px solid var(--color-stone)', paddingLeft: '6px', lineHeight: 1.35 }}>
                          Audit: {rec.verificationNotes}
                        </div>
                      )}
                    </div>

                    {/* Column 3: Price in Active Currency + Original Auction Lot Currency */}
                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--color-espresso-light)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                        {isCompleted ? 'Realized Clearance' : isAsking ? 'Listed Ask' : 'Pre-Sale Estimate'}
                      </span>
                      <strong style={{ fontSize: '1.35rem', fontWeight: 700, color: isCompleted ? 'var(--color-wine-deep)' : isAsking ? 'var(--color-burgundy)' : 'var(--color-espresso)', display: 'block', lineHeight: 1.1 }}>
                        {formatCurrency(rec.priceInINR)}
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-espresso-light)', display: 'block', marginTop: '2px' }}>
                        Orig: {rec.originalPrice.toLocaleString()} {rec.originalCurrency}
                      </span>
                      <span style={{ fontSize: '0.66rem', color: 'var(--color-espresso-muted)', fontStyle: 'italic', display: 'block', marginTop: '1px' }}>
                        Basis: {rec.priceBasis}
                      </span>
                    </div>

                    {/* Column 4: Compare Action */}
                    <div>
                      <button
                        type="button"
                        onClick={() => handleRecordCompare(rec)}
                        className="btn btn-secondary"
                        style={{
                          padding: '9px 14px',
                          fontSize: '0.72rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Layers size={12} />
                        <span>Compare</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 960px) {
          .journal-entry-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .archive-record-row {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
          .archive-filters-grid {
            display: none !important;
          }
          .archive-filters-grid.is-open {
            display: flex !important;
            margin-top: 14px;
          }
        }
      `}</style>
    </div>
  );
};
