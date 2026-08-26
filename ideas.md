# OMNI-NODE — Light Industrial Enterprise Dashboard

## Design Movement

**Precision operations software**: a clean, light B2B industrial interface inspired by modern manufacturing control systems, where rigorous slate hierarchy and carefully limited signal colors replace visual noise.

## Core Principles

1. **Fixed-screen command clarity:** the 1080p workspace is a single restrained page with no browser scrollbars; each bay has a deliberate, bounded role.
2. **Evidence first:** cyan, emerald, violet, amber, and red are reserved for observed signal, healthy state, analytical axis, degradation, and intervention respectively.
3. **Machine-centered decisioning:** the digital twin anchors the composition while telemetry, safety, and explainability panels resolve around its physical condition.
4. **Enterprise restraint:** white instrument cards, Slate-900 hierarchy, thin Slate-200 rules, and shallow shadows establish trust without ornamental excess.

## Layout Paradigm

The dashboard uses a 28/46/26 **industrial inspection bay**: live telemetry at left, a larger digital twin in the center, and safety/XAI evidence at right. Header and KPI rails set the system context above the bounded workspace.

## Signature Elements

- A clean chrome spindle and chuck on a light blueprint grid with a green/amber/red active bearing ring.
- A compact bottom twin strip for material, bearing, relay, and edge-link evidence.
- A staged health demo that turns real operational evidence into a safety action and cost-avoidance message.

## Animation

Healthy signal lines update smoothly. The 30-second demo moves through baseline, degradation, and critical bands with state-appropriate color changes; the spindle halts only at the final protective stop and the intervention modal uses a crisp fade/slide transition.

## Typography System

High-contrast Slate-900 figures pair with semibold uppercase Slate-500 labels. Headings are concise, left-aligned, and technically specific; supporting copy stays operational and source-aware.

## Brand Essence

**OMNI-NODE turns live edge evidence from legacy lathes into a clear protective decision before downtime occurs.**

Personality: **clear, assured, engineering-led.**

## Style Decisions

Within the locked mobile HUD, the digital twin remains the first and largest operational region. Mobile relay rows retain only source, state, and threshold evidence; the detailed XAI table is desktop-only. Cyan is reserved for active signal and measurement, while slate rules carry the structure.

The enterprise finish uses tabular numerals for jitter-free live metrics, terse uppercase source labels, hairline Slate-100 borders, and shallow white-surface elevation. Metric cards gain only a restrained one-pixel hover lift; the cyan demo control adds a crisp, physical response without introducing visual noise.

KPI cards behave as compact instruments at desktop scale, anchoring figure, threshold, and state across their available height. The safety bay makes its causal pathway explicit: **MPU6050 → Jetson AI → GPIO relay**, reinforcing that source evidence triggers protective action.

## Instrument Detail Rules

Every KPI owns a meaningful Lucide signal icon and a compact trend or state indicator. Live charts use recessed 3×3 instrument grids with dark on-hover sample inspectors. The bearing badge and armed relay emit a small pulse, reserving dramatic red feedback for the actual protective-stop state.

Structural caps and bay dividers are slate, not cyan; cyan belongs only to observed data, active signal labels, and the demo control. The engineered wordmark carries a compact node marker and **SIGNAL** provenance tag, while the safety pathway is boxed as a primary decision artifact rather than incidental metadata.

## Retrofit Header & Mobile Decision

The supplied **Retrofit** mark replaces the generic header icon as a transparent, proportion-preserving brand asset. Mobile uses a practical sequential inspection flow—digital twin, then telemetry, then relay evidence—with safe page width, responsive chart/canvas heights, and a bottom-safe finish. The desktop remains the fixed inspection workspace.

## Compact Mobile HUD Decision

Mobile now uses a no-scroll `100dvh` operating surface: abbreviated header and KPI rail, a tightly bounded digital twin, and a two-bay evidence deck. Tri-axial and FFT plots sit side by side to retain live analytical evidence without consuming the phone’s vertical workspace.

The compact twin receives the largest share of the mobile workspace after the KPI rail. Mobile surfaces tighten into squared inspection bays with hairline slate dividers; the safety card prioritizes the causal protection path over decorative space.

## Mobile Instrument Refinement

The mobile wordmark carries a node marker and **SIGNAL** provenance, while telemetry and relay bays use subtle sample-grid and protection-readiness marks to make their fixed-height space operationally meaningful. The spindle receives a controlled final scale increase as the primary inspection artifact.

The spindle scale responds to the available canvas width: close framing is reserved for narrow phone bays, while desktop inspection views retain the complete shaft and chuck assembly.

## Telemetry Evidence Correction

Mobile telemetry uses vertically stacked, full-width horizontal sparklines for tri-axial motion and FFT evidence. The adjoining relay bay matches this evidence density with reduced padding, typography, and inter-row spacing.

The mobile safety bay carries the complete **MPU6050 → Jetson AI → GPIO relay** provenance chain as a visible compact decision rail rather than hiding it behind larger-screen breakpoints.

## Rendering Compatibility Decision

The spindle uses delta-driven timing rather than the deprecated Three.js clock API. Soft ground contact remains a dedicated screen-space effect; the renderer no longer initializes legacy shadow-map state.

The compatible renderer uses a widened camera framing to keep the entire spindle and chuck assembly visible in the inspection bay.

## Integration Resilience

The dashboard treats third-party telemetry analytics as nonessential. It no longer loads a failing external tracker during the interface boot sequence, keeping operator-facing console output focused on actionable application events.

## Mobile Twin Prominence

The compact mobile HUD gives the spindle bay a 13rem inspection field and a modest model scale increase. Sparkline regions tighten slightly, preserving the no-scroll 100dvh decision surface.
