# Design Plan: Risyal Febrianto Portfolio

## Core Direction
**Clean & Minimal • Dark Mode First • Technical/Developer Aesthetic**

A portfolio that feels like a well-crafted developer tool — precise, intentional, with a distinct technical personality. Not a "template" but a considered interface.

---

## Color Token System

### Dark Mode (Primary)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#080808` | Page background — near-black, not pure black |
| `--bg-elevated` | `#0f0f0f` | Cards, panels, footer — one step up |
| `--bg-hover` | `#181818` | Hover states on elevated surfaces |
| `--fg` | `#fafafa` | Primary text |
| `--fg-muted` | `#737373` | Secondary text, labels, timestamps |
| `--fg-subtle` | `#404040` | Dividers, subtle borders, disabled |
| `--accent` | `#00d4aa` | **Primary accent** — teal/green, technical, high contrast on dark |
| `--accent-dim` | `#00d4aa33` | Accent at 20% — glows, focus rings, subtle highlights |
| `--border` | `#262626` | Card borders, dividers |
| `--border-strong` | `#404040` | Focus rings, active states |

### Light Mode (Secondary, Derived)
| Token | Value |
|-------|-------|
| `--bg` | `#fafafa` |
| `--bg-elevated` | `#ffffff` |
| `--bg-hover` | `#f5f5f5` |
| `--fg` | `#0a0a0a` |
| `--fg-muted` | `#525252` |
| `--fg-subtle` | `#d4d4d4` |
| `--accent` | `#008a6d` (darker teal for contrast on light) |
| `--accent-dim` | `#00d4aa33` |
| `--border` | `#e5e5e5` |
| `--border-strong` | `#a3a3a3` |

**Why this palette:** Pure black (`#000`) causes halation; `#080808` is softer. The teal accent (`#00d4aa`) reads "technical" without being the cliché blue or generic purple. It works on both dark and light.

---

## Typography

| Role | Font | Weights | Scale |
|------|------|---------|-------|
| **Display/Headlines** | `JetBrains Mono` | 700, 500 | Clamp: `clamp(2rem, 4vw + 1rem, 4rem)` |
| **UI/Body** | `IBM Plex Sans` | 400, 500, 600 | Base: `1rem` (16px), line-height 1.7 |
| **Code/Technical** | `JetBrains Mono` | 400, 500 | 0.875rem for inline, 0.8125rem for blocks |

**Why these faces:**
- `JetBrains Mono` for headlines = immediate developer signal, distinctive letterforms (the `@`, `{}`, `=>` ligatures)
- `IBM Plex Sans` for body = highly legible, neutral but not generic, designed for UI
- Single mono family for both display + code creates cohesion

**Type Scale (modular, 1.25 ratio):**
- `--text-xs`: 0.75rem (12px) — labels, meta
- `--text-sm`: 0.875rem (14px) — body small
- `--text-base`: 1rem (16px) — body
- `--text-lg`: 1.125rem (18px) — lead
- `--text-xl`: 1.5rem (24px) — section heading
- `--text-2xl`: 2rem (32px) — card title
- `--text-3xl`: 3rem (48px) — page title
- `--text-4xl`: 4rem (64px) — hero display

---

## Layout Concept

### Global Structure
```
┌─────────────────────────────────────────────────────────────┐
│  [Theme Toggle]                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   HERO                                                        │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  Terminal-style greeting                            │   │
│   │  $ whoami                                           │   │
│   │  > Risyal Febrianto                                 │   │
│   │  $ cat role.txt                                     │   │
│   │  > Full-Stack Developer                             │   │
│   │                                                     │   │
│   │  [LinkedIn] [Email] [GitHub]                        │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ABOUT (with photo)                                        │
│   ┌──────────────────┬────────────────────────────────────┐ │
│   │                  │  About me narrative                │ │
│   │   [ PHOTO ]      │  Skills as "installed packages"    │ │
│   │   (circular,     │  Tech stack as tagged chips        │ │
│   │    bordered)     │                                     │ │
│   └──────────────────┴────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   EXPERIENCE (timeline)                                     │
│   Clean left-aligned timeline, no vertical line clutter     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   PROJECTS (feed)                                           │
│   Card grid → single column on mobile                       │
│   Each card: thumbnail + title + tags + expandable details  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   FOOTER                                                    │
│   Minimal: copyright + 3 social icons                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Spacing System
- Base unit: `4px` (0.25rem)
- Section padding: `6rem` (96px) vertical, `1.5rem` (24px) horizontal
- Card padding: `1.5rem` (24px)
- Gap between sections: `4rem` (64px)
- Gap between cards: `1.5rem` (24px)

### Container Widths
- **Narrow (text)**: `42rem` (672px) — ~80 chars at 1rem
- **Wide (cards/grid)**: `72rem` (1152px)
- **Full**: `100vw` — for backgrounds, rules

---

## Distinctive Principles

1. **Terminal/CLI metaphor in Hero** — Not a "hello world" cliché, but a realistic `whoami` / `cat` interaction that reveals identity. Feels authentic to a developer.

2. **Photo in About, not Hero** — The hero is for *what you do*; the photo belongs with *who you are*. Side-by-side layout: photo left, narrative right.

3. **Skills as "installed packages"** — Technical metaphor: `npm list --depth=0` style list, or `pip freeze` output. Each skill a tagged package with proficiency hint.

4. **No card shadows, only borders** — Clean, technical, prints well. Hover = border color shift to accent.

5. **One accent color, used surgically** — Links, focus rings, active timeline dot, tag hover. Never as background fills.

6. **Reduced motion respected** — All transitions optional, instant when `prefers-reduced-motion`.

7. **Keyboard-first focus states** — Visible, high-contrast (`--accent` ring), never removed.

---

## Component-Specific Notes

### Hero
- Terminal frame with subtle scanline texture (CSS gradient, no image)
- Typing animation for the two commands (respects reduced motion)
- Actions: LinkedIn (primary), Email (secondary), GitHub (ghost)

### About
- Circular photo with 2px accent border, subtle inner shadow for depth
- Photo size: `160px` desktop, `120px` mobile
- Narrative: 2–3 short paragraphs, max 75 chars/line
- Skills: horizontal scrolling chip list (or wrapped grid), each chip = `tag-base` variant with mono font

### Experience
- Left-aligned, no vertical timeline line (cleaner)
- Date on left (mono, small), content on right
- Company as sub-headline, role as headline
- Bullets: plain, no decorative markers

### Projects
- Single column feed (not grid) — easier to scan
- Thumbnail: 16:9, rounded corners matching card radius
- Expandable details: smooth height transition
- Tags: mono, small, border-only chips

### Footer
- Minimal horizontal rule, centered on mobile
- Three icons only, no labels (tooltips on hover)

---

## Implementation Order

1. **Update CSS tokens** (`globals.css`) — new palette, type scale, fonts
2. **Update Tailwind config** — map tokens to utilities
3. **Hero rewrite** — terminal frame, typing animation
4. **About section (new)** — photo + narrative + skills
5. **Experience cleanup** — remove timeline line, simplify
6. **Projects polish** — tighter cards, better expand animation
7. **Footer simplify** — icons only
8. **Layout/spacing audit** — consistent section gaps, container usage

---

## Self-Critique Checklist (before building)

- [ ] Does the terminal hero feel authentic or gimmicky? → Keep commands realistic, no fake "hacking" text
- [ ] Is the teal accent too bright for dark mode? → Test `#00d4aa` vs `#00c49a` (slightly muted)
- [ ] Are two typefaces too much? → They serve distinct roles (display vs UI), both high-quality
- [ ] Is the photo placement logical? → Yes, About = identity, Hero = value prop
- [ ] Any generic "SaaS card kit" leftovers? → No shadows, no gradient washes, no rounded-everything
- [ ] Does this feel like *Risyal's* portfolio or any developer's? → Terminal metaphor + specific skills + photo = personal