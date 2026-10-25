---
name: GhostTrace AI
colors:
  surface: '#101419'
  surface-dim: '#101419'
  surface-bright: '#36393f'
  surface-container-lowest: '#0a0e13'
  surface-container-low: '#181c21'
  surface-container: '#1c2025'
  surface-container-high: '#262a30'
  surface-container-highest: '#31353b'
  on-surface: '#e0e2ea'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e0e2ea'
  inverse-on-surface: '#2d3136'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#68dba9'
  on-secondary: '#003825'
  secondary-container: '#25a475'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#101419'
  on-background: '#e0e2ea'
  surface-variant: '#31353b'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '400'
    lineHeight: 0.9375rem
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

GhostTrace AI is an enterprise-grade forensic data governance and erasure verification platform. The interface balances cryptographic certainty with calm, unflinching authority. Designed for data protection officers, enterprise privacy engineers, and regulatory compliance auditors, the UI evokes precision, indisputable integrity, and complete institutional security.

The aesthetic fuses **Modern Technical Functionalism** with **Forensic High-Density Utility**. Rather than flashy decorative accents, the design language communicates structural rigor through deliberate geometric borders, high contrast data density, restrained tonal layering, and monospace data anchors. The experience feels like a mission-critical forensic terminal engineered for auditing immutable deletion events across petabyte-scale distributed data planes.

## Colors

The palette establishes an uncompromised dark canvas anchored by three functional charcoal tiers: Base Canvas (`#0B0F14`), Panel Surface (`#121820`), and Elevated Workspace (`#182230`). Structural delineation is handled primarily via crisp structural wirelines (`#223042`).

- **Primary Accent (`#10B981` / `#059669`):** Reserved strictly for certified proof states, confirmed deletion hashes, verified cryptographic signatures, and focused operational interactive moments.
- **Secondary / Warning Accent (`#F59E0B`):** Denotes unresolved deletion artifacts, incomplete tombstone propagations, or flagged residual storage nodes.
- **Auditing Neutral & Muted Tones (`#64748B` / `#94A3B8` / `#F8FAFC`):** System copy uses high-contrast slate-to-chalk white values to ensure strict WCAG AAA readability across dense tabular views.
- **Destructive / Cryptographic Error (`#EF4444`):** Flags deletion assertion failures, checksum mismatches, and orphan data violations.

## Typography

Typography prioritizes scannability, vertical alignment across numeric data, and immediate disambiguation of forensic artifacts:

- **Primary Structural Font (Inter):** Deployed for navigation, headers, status messages, and analytical narrative text. High x-height ensures clarity even at dense standard weights (`0.875rem`).
- **Data Anchor & Monospace (JetBrains Mono):** Dedicated to transaction IDs, SHA-256 hashes, raw JSON evidence trees, tombstone offsets, and ledger timestamps. Monospaced elements enforce strict vertical rhythm in tables and log inspectors.
- **Hierarchy Rules:** All display and section headers use tight letter-spacing (`-0.025em`) to balance the horizontal density of analytical dashboards. Status indicators, table headers, and metadata tags are always rendered in uppercase mono-styled labels (`label-mono`).

## Layout & Spacing

This design system uses a dense 12-column fluid grid built for high-throughput operational review. Spacing defaults to compact cadences so investigators can correlate audit logs, pipeline states, and proof certificates without excessive scrolling.

- **Desktop (1280px+):** 12-column layout with 24px (`1.5rem`) gutters, fixed 280px collapsible inspection sidebar, and 32px (`2rem`) canvas margins.
- **Tablet (768px - 1279px):** 8-column layout with 16px (`1rem`) gutters and collapsible drawer navigation.
- **Mobile (< 768px):** Single-column stacked viewport with strict horizontal scrolling for forensic data grids and 16px outer margin buffers.
- **Data Density:** Component paddings strictly leverage `space-xs` and `space-sm` inside tables, headers, and badge wrappers to maximize visible information per square inch.

## Elevation & Depth

Visual hierarchy does not rely on soft drop shadows or artificial blur filters. In an audit environment, boundaries must be exact and definitive:

- **Tonal Stepping:** Layering is achieved solely through surface tones: `#0B0F14` for app backdrops, `#121820` for structural parent panels, and `#182230` for active inspectors, hover highlights, and active modal overlays.
- **Precision Wirelines:** Boundaries are carved out by structural 1px borders using `#223042`. Focused or verified states replace this border with a sharp `#10B981` hairline.
- **Elevation Accent:** If an active floating panel or contextual verification drawer requires separation, it employs a 1px border (`#223042`) accompanied by an ambient, zero-spread anchor shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.75)`.

## Shapes

The platform adopts a compact, restrained corner language (`Soft - level 1`). Precision analytical software requires crisp corners to maintain table grid coherence and tabular density:

- **Base Elements (Buttons, Inputs, Badges, Chips):** `0.25rem` (4px).
- **Cards, Panels, and Modals (`rounded-lg`):** `0.5rem` (8px).
- **Large Contextual Flyouts (`rounded-xl`):** `0.75rem` (12px).
- Circles are reserved exclusively for binary status dots and user profile avatars. Rounded-full pills are strictly avoided to preserve technical, engineered aesthetics.

## Components

### Buttons
- **Primary (Verified Execution):** `#10B981` background, `#04160E` high-contrast bold text. Hover shifts to `#059669`. Border radius `0.25rem`. Height `32px` for high-density action bars.
- **Secondary (Inspect / Configure):** Surface `#182230`, 1px border `#223042`, text `#F8FAFC`. Hover brings border `#10B981` and text `#10B981`.
- **Destructive (Purge Evidence / Flag Violation):** Surface `#1F1418`, 1px border `#7F1D1D`, text `#EF4444`.

### Status Badges (Audit Verification Protocol)
Badges feature a monospaced 11px label with a preceding 6px solid circular status dot:
- `COMPLETE`: Background `rgba(16, 185, 129, 0.1)`, text `#10B981`, border `1px solid rgba(16, 185, 129, 0.3)`.
- `INCOMPLETE`: Background `rgba(245, 158, 11, 0.1)`, text `#F59E0B`, border `1px solid rgba(245, 158, 11, 0.3)`.
- `NOT_APPLICABLE`: Background `rgba(100, 116, 139, 0.1)`, text `#94A3B8`, border `1px solid #223042`.

### Data Tables (Forensic Grid)
- **Header:** Background `#0E141B`, uppercase `0.6875rem` text `#64748B`, 1px border bottom `#223042`.
- **Row:** Height `38px`, alternating hover background `#182230`, border bottom `1px solid #161F2C`.
- **Cells:** Text `#E2E8F0` for generic values; monospaced `#94A3B8` for IDs, execution timestamps, and cryptographic proofs.

### Form Inputs & Query Builders
- Background `#0B0F14`, 1px border `#223042`, text `#F8FAFC`, placeholder `#475569`.
- Focused state transitions border directly to `#10B981` with zero glow radius.

### Cryptographic Proof Inspector (Custom Platform Component)
- Card container with background `#121820`, 1px border `#223042`, and a distinctive top header containing a copyable Merkle root hash in JetBrains Mono.
- Houses collapsible JSON trees, timestamped signature validations, and export buttons for generating tamper-evident regulatory PDF/JSON certificates.