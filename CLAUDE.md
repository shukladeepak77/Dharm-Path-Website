# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Dharm Path** — a static HTML mockup for a DFW-area Indian spiritual services business. Used for planning, pitching, and design review. No build step, no framework, no backend.

## Running the Site

Open `index.html` directly in a browser. There is no dev server, build tool, or package manager.

## Architecture

All pages are standalone `.html` files sharing two assets:

- `assets/styles.css` — all styling, using CSS custom properties (`--saffron`, `--gold`, `--maroon`, `--cream`, etc.) defined in `:root`. Layout uses named utility classes (`grid-2/3/4`, `sidebar-layout`, `split`, `stats-row`, `hero`, `section`, `card`, etc.).
- `assets/app.js` — minimal JS; currently only sets the footer `#year` element.

There is no JS routing — each page is a self-contained HTML file with the same header/nav and footer copy-pasted. Navigation links are relative (e.g., `href="booking.html"`).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home / hero + quick booking form |
| `services.html` | Service listing |
| `service-detail.html` | Sample service detail page |
| `cities.html` | City coverage pages |
| `booking.html` | Full booking flow |
| `about.html` | About page |
| `contact.html` | Contact page |
| `login.html` | Login / Register |
| `dashboard.html` | Devotee dashboard (mock) |
| `admin.html` | Admin dashboard (mock) |

## Styling Conventions

- CSS variables for the color palette — always use them instead of hardcoded hex.
- Responsive breakpoint at `900px` via a single `@media` block at the bottom of `styles.css`; at that width all multi-column grids collapse to single column and `.menu` is hidden.
- Card/section styles follow a consistent pattern: `border-radius:18px`, `box-shadow`, `border:1px solid var(--border)`.
