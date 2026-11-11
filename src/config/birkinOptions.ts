import { BirkinModel, BirkinSize, ConditionGrade, HardwareOption } from '../types/valuation';

export interface OptionGroup<T = string> {
  value: T;
  label: string;
  subtext?: string;
}

export const BIRKIN_MODELS: OptionGroup<BirkinModel>[] = [
  { value: 'Birkin Retourne', label: 'Birkin Retourne', subtext: 'Soft edges with piping sewn inside and turned outwards. Relaxed, classic silhouette.' },
  { value: 'Birkin Sellier', label: 'Birkin Sellier', subtext: 'Rigid exterior topstitching with sharp architectural geometry.' },
  { value: 'Birkin Touch', label: 'Birkin Touch', subtext: 'Classic leather body complemented by exotic skin on the flap, handles, and sangles.' },
  { value: 'Birkin Cargo', label: 'Birkin Cargo', subtext: 'Utilitarian canvas body with external pockets and leather trim.' },
  { value: 'Birkin Faubourg', label: 'Birkin Faubourg 20', subtext: 'Micro architectural tribute to the 24 Rue du Faubourg Saint-Honoré flagship store.' },
  { value: 'Birkin Shadow', label: 'Birkin Shadow', subtext: 'Trompe-l’œil embossed hardware and flap silhouette designed by Jean Paul Gaultier.' },
  { value: 'Birkin Ghillies', label: 'Birkin Ghillies', subtext: 'Brogue-inspired perforated leather trim along seams and sangles.' },
  { value: 'Birkin Casaque', label: 'Birkin Casaque', subtext: 'Graphic multi-colour geometric leather inlay inspired by jockey silks.' },
  { value: 'Other / Custom', label: 'Other / Custom Order (HSS)', subtext: 'Special order horseshoe stamp or unique historical variant.' }
];

export const BIRKIN_SIZES: OptionGroup<BirkinSize>[] = [
  { value: '25', label: 'Birkin 25', subtext: '25 cm width × 20 cm height. Compact evening proportion, commanding top tier collector premium.' },
  { value: '30', label: 'Birkin 30', subtext: '30 cm width × 22 cm height. Everyday versatile balance between function and elegance.' },
  { value: '35', label: 'Birkin 35', subtext: '35 cm width × 25 cm height. The original iconic proportion designed for Jane Birkin in 1984.' },
  { value: '40', label: 'Birkin 40', subtext: '40 cm width × 30 cm height. Travel and substantial executive scale with generous capacity.' },
  { value: 'Other / Special', label: 'Other / Special Scale', subtext: 'Micro 20cm Faubourg or Birkin 45/50 Voyage.' }
];

export const BIRKIN_LEATHERS = [
  { group: 'Textured Heritage Leathers', items: [
    { value: 'Togo', label: 'Togo Leather', subtext: 'Baby calfskin with fine vertical grain, scratch resistant, matte-sheen finish.' },
    { value: 'Epsom', label: 'Epsom Leather', subtext: 'Pressed rigid grain, lightweight, holds sharp structured silhouette exceptionally.' },
    { value: 'Clemence', label: 'Taurillon Clémence', subtext: 'Heavy bull calfskin with flat wide grain; soft, slouchy and supple hand-feel.' },
    { value: 'Chevre Mysore', label: 'Chèvre Mysore', subtext: 'Goat leather with distinct spine grain, lightweight, lustrous and durable.' }
  ]},
  { group: 'Smooth Heritage Leathers', items: [
    { value: 'Swift', label: 'Swift Leather', subtext: 'Fine smooth grain, soft hand, known for vivid pigment saturation.' },
    { value: 'Box Calf', label: 'Box Calf (Veau Box)', subtext: 'Historic Hermès standard. High-gloss polished mirror patina, formal character.' },
    { value: 'Barenia', label: 'Barenia / Barenia Faubourg', subtext: 'Saddle oil calfskin that develops an organic, irreplaceable amber patina.' }
  ]},
  { group: 'Precious & Exotic Skins', items: [
    { value: 'Porosus Crocodile', label: 'Porosus Crocodile (Lisse/Matte)', subtext: 'Highest tier saltwater crocodile with distinct micro-pore on each scale (^ mark).' },
    { value: 'Niloticus Crocodile', label: 'Niloticus Crocodile (Lisse/Matte)', subtext: 'Nile river crocodile with symmetrical squarish scales (•• mark).' },
    { value: 'Alligator', label: 'Alligator Mississippiensis', subtext: 'American freshwater alligator with pronounced scale patterns (square mark).' },
    { value: 'Ostrich', label: 'Ostrich (Autruche)', subtext: 'South African ostrich skin with prominent follicle quills and natural oils.' },
    { value: 'Lizard', label: 'Lizard (Varanus)', subtext: 'Ring lizard with glossy delicate micro-scales (= or - mark).' }
  ]},
  { group: 'Textile & Mixed Media', items: [
    { value: 'Toile H & Leather', label: 'Toile H & Leather Combo', subtext: 'Woven chevron canvas paired with fine leather trim.' },
    { value: 'Other / Unknown', label: 'Other / Not Listed / Unknown', subtext: 'Alternative leather or unidentified vintage skin.' }
  ]}
];

export const BIRKIN_COLORS = [
  { group: 'The Holy Trinity & Neutrals', items: [
    { value: 'Noir (89)', label: 'Noir (Black / 89)', hex: '#1C1B1A' },
    { value: 'Gold (37)', label: 'Gold (Caramel Tan / 37)', hex: '#AC7739', note: 'White contrast stitching standard' },
    { value: 'Etoupe (18)', label: 'Etoupe (Warm Taupe / 18)', hex: '#877B70', note: 'White contrast stitching standard' },
    { value: 'Craie (10)', label: 'Craie (Chalk / 10)', hex: '#EBE5D8' },
    { value: 'Nata (I2)', label: 'Nata (Cream / I2)', hex: '#F4ECE0' },
    { value: 'Trench (S2)', label: 'Trench (Warm Khaki Beige / S2)', hex: '#C2B49E' },
    { value: 'Gris Tourterelle (81)', label: 'Gris Tourterelle (Dove Grey / 81)', hex: '#B5AFA4' },
    { value: 'Biscuit (4B)', label: 'Biscuit (Rich Biscuit / 4B)', hex: '#9C6F4E' }
  ]},
  { group: 'Blues & Greens', items: [
    { value: 'Bleu Nuit (2Z)', label: 'Bleu Nuit (Deep Navy / 2Z)', hex: '#1B2433' },
    { value: 'Bleu Jean / New Bleu Jean', label: 'Bleu Jean (Classic Sky Denim)', hex: '#587B95' },
    { value: 'Vert Criquet (3I)', label: 'Vert Criquet (Pastel Cricket Green / 3I)', hex: '#A8B38E' },
    { value: 'Vert Cypress (6O)', label: 'Vert Cypress (Dark Forest Green / 6O)', hex: '#1E352B' },
    { value: 'Malachite (Z6)', label: 'Malachite (Vibrant Mineral Green / Z6)', hex: '#26594B' }
  ]},
  { group: 'Pinks, Reds & Warm Tones', items: [
    { value: 'Rouge H (55)', label: 'Rouge H (Signature Hermès Burgundy / 55)', hex: '#4C1B24' },
    { value: 'Rose Sakura (3Q)', label: 'Rose Sakura (Cherry Blossom Pink / 3Q)', hex: '#F0C7CF' },
    { value: 'Mauve Sylvestre (X9)', label: 'Mauve Sylvestre (Pale Lavender Lilac / X9)', hex: '#D7BED0' },
    { value: 'Rouge Casaque (Q5)', label: 'Rouge Casaque (Vivid True Red / Q5)', hex: '#961B22' }
  ]},
  { group: 'Other Options', items: [
    { value: 'Special Order Multicolour (HSS)', label: 'Special Order Bi-Color / Tricolor (HSS)', hex: '#6B273B' },
    { value: 'Other / Seasonal Shade', label: 'Other / Seasonal / Unlisted Shade', hex: '#645A4E' },
    { value: 'Unknown', label: 'Unknown or Unconfirmed Color Code', hex: '#D8D0C4' }
  ]}
];

export const BIRKIN_HARDWARE: OptionGroup<HardwareOption>[] = [
  { value: 'Gold (GHW)', label: 'Gold Hardware (GHW)', subtext: '18k gold-plated brass. Timeless warm complement to neutral and jewel leathers.' },
  { value: 'Palladium (PHW)', label: 'Palladium Hardware (PHW)', subtext: 'Silvery platinum-group metal plating. Crisp, cool, contemporary finish.' },
  { value: 'Rose Gold (RGHW)', label: 'Rose Gold Hardware (RGHW)', subtext: 'Contemporary warm pink gold plating. Introduced in recent modern collections.' },
  { value: 'Permabrass', label: 'Permabrass Hardware', subtext: 'Subtle champagne gold tone midway between yellow gold and palladium.' },
  { value: 'Brushed Gold', label: 'Brushed Gold Hardware', subtext: 'Satin matte hand-brushed gold surface.' },
  { value: 'Brushed Palladium', label: 'Brushed Palladium Hardware', subtext: 'Satin matte hand-brushed palladium surface.' },
  { value: 'Ruthenium', label: 'Ruthenium Hardware', subtext: 'Dark gunmetal finish used on select limited editions.' },
  { value: 'Guilloché', label: 'Guilloché Hardware', subtext: 'Diamond patterned engine-turned engraving on gold or palladium plates.' },
  { value: 'Unknown', label: 'Unknown Hardware Finish', subtext: 'Hardware composition cannot be verified.' }
];

export const CONDITION_GRADES: OptionGroup<ConditionGrade>[] = [
  {
    value: 'New / Unused',
    label: 'New / Store Fresh',
    subtext: 'Pristine boutique condition. Original protective plastic films intact on all hardware. Never carried outside.'
  },
  {
    value: 'Excellent',
    label: 'Excellent',
    subtext: 'Carried lightly once or twice. Virtually imperceptible hairline markings on feet or sangles. Flawless structure.'
  },
  {
    value: 'Very Good',
    label: 'Very Good',
    subtext: 'Gently loved with slight micro-scratches on hardware or subtle base softening. Leather remains clean and vibrant.'
  },
  {
    value: 'Good',
    label: 'Good',
    subtext: 'Moderate signs of regular use. Noticeable corner smoothing or light rubbing, faint hardware tarnishing, relaxed leather silhouette.'
  },
  {
    value: 'Visible Wear',
    label: 'Visible Wear / Vintage Character',
    subtext: 'Prominent corner scuffing, softened leather posture, hardware scratches, or minor watermarks requiring spa restoration.'
  }
];

export const DOCUMENTATION_OPTIONS = [
  { id: 'original_receipt', label: 'Original Hermès Boutique Receipt', description: 'Original physical receipt showing boutique location and purchase date.' },
  { id: 'cites_cert', label: 'CITES Certificate', description: 'Essential official wildlife trade permit for exotic leathers (Crocodile, Alligator, Lizard).' },
  { id: 'store_invoice_copy', label: 'Hermès Digital Store Invoice / Email', description: 'Verified digital invoice record from Hermès client account.' },
  { id: 'third_party_cert', label: 'Third-Party Authentication Certificate', description: 'Bababebi, Entrupy, or specialist appraisal documentation.' },
  { id: 'none', label: 'No Paperwork / Misplaced', description: 'No original documentation preserved.' }
];

export const PACKAGING_OPTIONS = [
  { value: 'Full Original Packaging', label: 'Full Original Boutique Packaging', description: 'Original Hermès orange box, acid-free tissue paper, and bolduc ribbon.' },
  { value: 'Original Box Only', label: 'Original Orange Box Only', description: 'Box preserved without full interior packaging accessories.' },
  { value: 'Bag Only', label: 'Bag Only (No Box)', description: 'Bag stored without original exterior cardboard box.' }
];

export const ACCESSORIES_OPTIONS = [
  { id: 'box', label: 'Hermès Orange Box', description: 'Sturdy magnetic or lift-top boutique box.' },
  { id: 'dustbag_bag', label: 'Herringbone Bag Dustbag', description: 'Original neutral canvas dust cover with Hermès horse carriage stamp.' },
  { id: 'lock_keys', label: 'Cadena Lock & 2 Keys', description: 'Matching serial numbered padlock and key set.' },
  { id: 'clochette', label: 'Leather Clochette & Key Casing', description: 'Leather clochette strap and key bell housing.' },
  { id: 'dustbag_clochette', label: 'Small Clochette Dustbag', description: 'Dedicated miniature canvas pouch for the lock and keys.' },
  { id: 'raincoat', label: 'Hermès Protective Raincoat', description: 'Waterproof fitted cover with size code.' },
  { id: 'felt_protector', label: 'Felt Flap & Bezel Protector', description: 'Original felt pad placed between flap and sangles.' },
  { id: 'care_booklet', label: 'Hermès Leather Care Booklet', description: 'Original printed care documentation.' }
];

export const PRODUCTION_YEARS = [
  '2026', '2025', '2024', '2023', '2022', '2021', '2020',
  '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010',
  '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000',
  '1999', '1998', '1997', '1996', '1995', '1990–1994 (Vintage)', '1984–1989 (Early Era)', 'Unknown'
];
