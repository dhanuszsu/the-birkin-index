# THE BIRKIN INDEX — DATA DICTIONARY & SCHEMA SPECIFICATION

**Version**: 1.0.0  
**Domain**: Hermès Birkin Secondary Resale Intelligence & Hedonic Valuation

---

## 1. Core Field Definitions

| Column Name | Type | Nullable | Description & Allowed Domain | Validation / Constraint |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | No | Primary Unique Identifier (e.g. `REC-SOTH-2024-118`) | Must match pattern `^REC-[A-Z0-9]+-[0-9]{4}-[0-9]+$` |
| `model` | String | No | Hermès Birkin Silhouette (`Birkin 25 Retourne`, `Birkin 25 Sellier`, `Birkin 30 Retourne`, etc.) | Must contain "Birkin" |
| `size` | String | No | Base width in centimeters (`25`, `30`, `35`, `40`) | Must be one of `['25', '30', '35', '40']` |
| `leather` | String | No | Standard Hermès skin/leather type (`Togo`, `Epsom`, `Clemence`, `Box Calf`, `Swift`, `Porosus Crocodile`, `Niloticus Crocodile`) | Normalized canonical taxonomy |
| `color` | String | No | Hermès color shade & official color code (`Noir (89)`, `Gold (37)`, `Etoupe (18)`, etc.) | Standardized name and hex/code |
| `hardware` | String | No | Metal hardware finish (`Gold (GHW)`, `Palladium (PHW)`, `Rose Gold (RGHW)`, `Permabrass`) | Standardized finish abbreviation |
| `condition` | String | No | Standardized condition grade (`Store Fresh / Pristine`, `Excellent`, `Very Good`, `Fair`) | Ordinal preservation rating |
| `production_year` | String | Yes | 4-digit production year or vintage indicator (e.g. `2023`, `1998`) | YYYY format or null |
| `blind_stamp` | String | Yes | Single-letter Hermès blind craft stamp (e.g. `B`, `U`, `Z`, `Y`) | Character token |
| `transaction_type` | String | No | Transaction classification: `completed_sale`, `asking_price`, `auction_estimate` | Strict enum |
| `price_basis` | String | No | Economic price definition: `Hammer price`, `Price including buyer's premium`, `Dealer asking price`, `Auction estimate` | Ingestion separates basis |
| `original_price` | Float | No | Nominal price recorded in the transaction's native currency | Strictly $> 0$ |
| `original_currency` | String | No | 3-letter ISO 4217 currency code (`EUR`, `USD`, `GBP`, `HKD`, `INR`) | ISO format |
| `price_in_inr` | Float | No | Standardized base reference amount in Indian Rupee for multi-currency UI display | Strictly $> 0$ |
| `price_in_usd` | Float | Yes | Standardized hedonic model target price in USD | Computed via transaction date forex |
| `transaction_date` | String | Yes | ISO 8601 date of auction clearance or listing (`YYYY-MM-DD`) | Date format |
| `source_id` | String | Yes | Foreign key identifier matching `data/source_register.json` | Valid registered source ID |
| `source_name` | String | No | Official institution / catalogue name (e.g. `Sotheby's Paris`) | Non-empty string |
| `source_reference` | String | No | Identifiable catalogue lot, consignment, or invoice token | Non-empty string |
| `source_url` | String | Yes | Direct public catalogue link. Must be `null` for unverified/illustrative records | Valid URL or null |
| `verification_status`| String | No | Audit classification: `VERIFIED`, `PARTIALLY VERIFIED`, `UNVERIFIED` | Strict enum |
| `verification_notes` | String | Yes | Audit footnote explaining verification state | Required when unverified |
| `eligible_for_ml` | Boolean| No | Gatekeeper flag indicating suitability for model training | Strictly false unless criteria met |
| `is_illustrative` | Boolean| No | True for demonstration/frontend fixtures; false for genuine research records | Boolean |
| `record_category` | String | No | `illustrative_display` vs `research_dataset` | Partition boundary |
| `accessories` | String | Yes | Accoutrements included (box, dustbag, clochette, lock, keys, raincoat) | Text |
| `provenance` | String | Yes | Provenance notes (receipts, CITES permits, appraisals) | Text |

---

## 2. Machine Learning Ingestion Eligibility Rules

Under strict econometric and data integrity guidelines, a record is admitted into the ML training dataset **if and only if** it satisfies all criteria:

1. `record_category == 'research_dataset'`
2. `is_illustrative == False`
3. `verification_status == 'VERIFIED'`
4. `eligible_for_ml == True`
5. `price_basis in ['Hammer price', "Price including buyer's premium"]`
6. `price_basis != 'Dealer asking price'` (Dealer listings contain speculative margins)
7. `price_basis != 'Auction estimate'` (Pre-sale estimates are subjective projections)
8. `source_url is not None and len(source_url) > 0` (Requires authentic catalogue proof)
9. `original_price > 0`
