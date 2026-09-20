# Fieldnote Studio: a thoughtful first impression

**Independent portfolio demonstration · React + Vite · Fictional brand**

## The problem

Show how a small service business could explain its offer, establish a visual identity and give visitors a useful next step—without a crowded interface or invented proof. Fieldnote Studio and its design explorations are fictional; this is not a paid client project or a conversion-results case study.

## Design and implementation

The page uses four content sections: introduction, design explorations, approach with FAQs, and an interactive project brief. Warm paper and olive colours, editorial typography and generous spacing create a consistent identity. Original CSS artwork and system fonts avoid remote assets or stock-template dependencies.

React manages the navigation, accordion and form state. Brief validation and outline generation are separate pure functions, making the rules easy to inspect and test. The outline is deterministic—not an AI-generated recommendation.

Accessibility considerations include semantic landmarks, a skip link, visible focus, labelled inputs, descriptive errors, accordion state, reduced-motion support and focus movement after navigation or form actions.

## Walkthrough

1. Explore three original visual directions, clearly presented as design concepts rather than client work.
2. Open the FAQs to understand the demonstration and its boundaries.
3. Try submitting an empty brief to see validation and first-error focus.
4. Enter a fictional project, preview its four-section outline, then reset. Brief values remain in browser memory and disappear on refresh; nothing is submitted or persisted.

## Verification

All **8 automated tests passed**, both locally and in a fresh clone of the published repository. They cover valid choices, required inputs, length boundaries, immutable data and project-specific outlines. The production build passed.

Browser checks covered empty-form errors, a valid preview, reset, FAQ expansion, mobile navigation and destination focus. A 390px narrow-screen check found no horizontal document overflow. These are scoped checks, not exhaustive device testing or accessibility certification.

## Boundaries and provenance

There is no backend, authentication, analytics, payment flow or live enquiry service. Production use would require approved content, a privacy-reviewed contact workflow and broader browser/accessibility testing.

Created for Dhairya Sharma with disclosed AI-assisted implementation. No employer code, client records, confidential material or claimed business outcomes were used.
