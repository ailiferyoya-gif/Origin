# Mimei Town Archive

Working title: 未明町アーカイブ

This project is a large browser-first mystery designed for Booth sale as a ZIP package.
Players investigate a fictional seaside town by moving across many independent-looking
websites: public records, news archives, school pages, radio transcripts, maps, blogs,
and hidden late-game pages.

## Core Direction

- Format: multi-site web mystery / ARG-like investigation
- Visual direction: quiet realism, ordinary regional websites, no overt puzzle framing
- Expected play time: 5 to 8 hours
- Target difficulty: experienced puzzle players, with staged hint pages for support
- Distribution: Booth ZIP package first, online hosted version later if needed
- Runtime: static HTML/CSS/JS, playable offline from `start.html`

## Standing Constraints

- Work under `D:\Codex` when possible.
- Take a backup before changing existing files.
- Use ChatGPT-generated image assets.
- Character images must use transparent backgrounds.
- Do not use sprite sheets unless confirmed first.

## Document Map

- `docs/BRIEF.md`: locked product and story brief
- `docs/STORY_ENTRY.md`: in-world reason for the player to begin investigating
- `docs/SITE_MAP.md`: planned website list and visual identity for each site
- `docs/PUZZLE_FLOW.md`: chapter structure, clue chain, and gating design
- `docs/BOOTH_PACKAGE.md`: sale package contents, buyer experience, and support files
- `HANDOFF.md`: concise continuation note for future work

## Playable Slice

Open `start.html` to begin the current prototype.

Implemented:

- opening archive index
- read-me and grandmother letter
- investigation notebook with Chapter 1 answer check
- Mimei Town Hall site
- Mimei Daily local newspaper archive
- Mimei High School alumni page
- Mimei Town Library OPAC and local history reference page
- Mimei Folk Museum archive page
- multi-page internal links for each first-chapter site
- restored LINE-like message log
- voicemail-style phone number gimmick
- generated image assets for thirteen site and evidence pages
- 30 additional internal pages across radio, weather, bus, tourism, blog, and forum sites
- cross-site search portal with keyword result filtering
- evidence photo ledger with thirteen dedicated casefile pages
- higher-fidelity site interactions: blog comments, BBS replies, OPAC filtering,
  newspaper article search, bus route lookup, weather log filters, radio letters,
  and town hall request receipts
- current HTML count: 74 pages

Current phone gimmick answer:

- `2300918`

## iPhone Support

The prototype includes iPhone-oriented support files:

- `assets/ui/iphone.css`
- `assets/ui/iphone.js`
- `manifest.webmanifest`

These add safe-area spacing, iOS viewport-height stabilization, 44px tap targets,
table overflow handling, and home-screen standalone metadata.
